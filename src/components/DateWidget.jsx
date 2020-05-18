import React from 'react';
import moment from "moment";
import 'moment/locale/es';

function displayTimes(baseMoment, baseEndMoment) {
    if (baseMoment.date() === baseEndMoment.date() && baseMoment.month() === baseEndMoment.month()) {
        return (
            <>
                <div className="simpleTimePeriod">{baseMoment.format("h:mm a")} - {baseEndMoment.format("h:mm a")}</div>
                <div className="fromNow">({baseMoment.fromNow()})</div>
            </>
        )
    } else {
        const defaultFormat = "ddd MMM DD, hh:mm a";
        return (
            <div className="extendedPeriod">
                <div className="extendedTimePeriod">{baseMoment.format(defaultFormat)}</div>
                <div className="extendedTimePeriod">{baseEndMoment.format(defaultFormat)}</div>
                <div className="fromNow">({baseMoment.fromNow()})</div>
            </div>
        )
    }
}

/**
 * Widget used to display a date.
 * @param startTimeStamp The start timestamp.
 * @returns {*}
 * @constructor
 */
export default function DateWidget({startDate, endDate}) {
    moment.locale(window.eventsConfig.language);
    const baseMoment = moment(startDate);
    const baseEndMoment = moment(endDate);
    return (
        <div className="calendarWidget">
            <div className="weekday">{baseMoment.format("dddd")}</div>
            <div className="month">{baseMoment.format("MMM")}</div>
            <div className="day">{baseMoment.format("DD")}</div>
            {displayTimes(baseMoment, baseEndMoment)}
        </div>
    );
}