import React, { useEffect, useRef } from "react";
import useCountdown from "./hooks/useCountdown";
import { useTranslation } from "../../i18n";

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function drawArc(x, y, radius, startAngle, endAngle) {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
}

function drawTimeArc(targetElement, timeUnits, isDiff, range) {
  targetElement = targetElement.current;
  if (!!targetElement) {
    const boundingBox = targetElement.getBoundingClientRect();
    const secondsWidth = boundingBox.width;
    const secondsHeight = boundingBox.height;
    const radius = secondsWidth * 0.4;
    const centerWidth = secondsWidth / 2;
    const centerHeight = secondsHeight / 2;
    let { lowerUnit: lu, upperUnit: uu } = timeUnits;
    lu = parseInt(lu);
    uu = parseInt(uu);
    const combinedUnit = uu + lu / 1000;
    const endAngle = isDiff
      ? (combinedUnit * 360) / range
      : 360 - ((uu + lu / 1000) * 360) / range;
    targetElement
      .querySelector("path")
      .setAttribute(
        "d",
        drawArc(centerWidth, centerHeight, radius, 0, endAngle),
      );

    const smallTextSeconds = targetElement.querySelector("text");
    const { width: smallTextWidth, height: smallTextHeight } =
      smallTextSeconds.getBBox();
    smallTextSeconds.textContent = isDiff ? uu : range - uu;
    smallTextSeconds.setAttribute("x", centerWidth - smallTextWidth / 2);
    smallTextSeconds.setAttribute("y", centerHeight);

    const smallTextUnit = targetElement.querySelectorAll("text")[1];
    const { width: smallTextUnitWidth, height: smallTextUnitHeight } =
      smallTextUnit.getBBox();
    smallTextUnit.setAttribute("x", centerWidth - smallTextUnitWidth / 2);
    smallTextUnit.setAttribute("y", centerHeight + smallTextUnitHeight);
  }
}

function animateArc(targetElement, range, speed, calcTimeUnit, isDiff = false) {
  return setInterval(() => {
    drawTimeArc(targetElement, calcTimeUnit, isDiff, range);
  }, speed);
}

const getDayOfYear = (now) => {
  var start = new Date(now.getFullYear(), 0, 0);
  var diff =
    now -
    start +
    (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  var oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

const millisToSeconds = 1000 / 60;
const millisToMinutes = 1000 / 60;

/**
 * Graphical version of the countdown.
 * @constructor
 */
const CountdownSVG = ({ timezone }) => {
  const svgDays = useRef();
  const svgHours = useRef();
  const svgMinutes = useRef();
  const svgSeconds = useRef();

  const { t } = useTranslation();

  const [stateCountdownData, timediff] = useCountdown(timezone);

  useEffect(() => {
    drawTimeArc(
      svgDays,
      {
        upperUnit: timediff?.days,
        lowerUnit: timediff?.humanHours,
      },
      true,
      365,
    );
    drawTimeArc(
      svgHours,
      {
        upperUnit: timediff?.humanHours,
        lowerUnit: timediff?.humanminutes,
      },
      true,
      24,
    );
    drawTimeArc(
      svgMinutes,
      {
        upperUnit: timediff?.humanminutes,
        lowerUnit: timediff?.humanSeconds,
      },
      true,
      60,
    );
    drawTimeArc(
      svgSeconds,
      {
        upperUnit: timediff?.humanSeconds,
        lowerUnit: timediff?.milliseconds,
      },
      true,
      60,
    );
  }, [timediff?.milliseconds]);

  if (!timediff || stateCountdownData.started) {
    return <></>;
  }

  const timeComponents = [
    {
      id: "svg-days",
      ref: svgDays,
      label: "days",
    },
    {
      id: "svg-hours",
      ref: svgHours,
      label: "hours",
    },
    {
      id: "svg-minutes",
      ref: svgMinutes,
      label: "minutes",
    },
    {
      id: "svg-seconds",
      ref: svgSeconds,
      label: "seconds",
    },
  ];

  if (!timediff || stateCountdownData.started) {
    return <></>;
  }

  return (
    <div className="row countdown-svg">
      {timeComponents.map((svgElement, i) => {
        return (
          <svg
            id={svgElement.id}
            xmlns="http://www.w3.org/2000/svg"
            ref={svgElement.ref}
          >
            <circle cx="50" cy="50" r="50" />
            <text x="0" y="0" className="small-text" />
            <text x="0" y="0" className="small-text-unit">
              {t(svgElement.label)}
            </text>

            <path fill="none" />
          </svg>
        );
      })}
    </div>
  );
};

export default CountdownSVG;
