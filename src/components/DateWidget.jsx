import React from 'react';
import 'moment/locale/es';
import 'moment/locale/en-gb';
import 'moment/locale/pt-br';

import moment from "moment-timezone";
import {useTranslation} from "../i18n";
import {extractParameterSimple} from "../utils/paramExtraction";

export const determineTimeFormat = () => {
    const language = extractParameterSimple('language', 'en-US');
    if(language.indexOf("en") === 0) {
        return "h:mm a"
    }
    return "HH:mm"
}

function guessTimezone() {
    const guess = moment.tz.guess(true);
    if (!guess) {
        console.warn('Guess undefined');
    }
    return guess || Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/London";
}

function formatTime(mom, format, timezone) {
    return timezone ? mom.tz(guessTimezone()).format(format) : mom.format(format);
}

function showLocalTimeFull(localIsRemote, defaultFormat, timeParams) {
    const {baseMoment, baseEndMoment, timezone, t} = timeParams;
    if (!localIsRemote && window.eventsConfig.showLocalTime) {
        return (
            <div className="yourTime">
                <div className="small">{t('Your time')}</div>
                <div className="extendedTimePeriod">{formatTime(baseMoment, defaultFormat, timezone)}</div>
                <div className="extendedTimePeriod">{formatTime(baseEndMoment, defaultFormat, timezone)}</div>
            </div>
        );
    } else {
        return (
            <></>
        )
    }
}

function showLocalTimeSimple(localIsRemote, defaultFormat, timeParams) {
    const {baseMoment, baseEndMoment, timezone, t} = timeParams;
    const timeFormat = determineTimeFormat()
    if (!localIsRemote && window.eventsConfig.showLocalTime) {
        return (
            <div className="yourTime">
                <div className="small">{t('Your time')}</div>
                <div className="simpleTimePeriod">
                    {formatTime(baseMoment, timeFormat, timezone)} -{' '}
                    {formatTime(baseEndMoment, timeFormat, timezone)}
                </div>
            </div>
        )
    } else {
        return (
            <></>
        )
    }
}

function displayTimes(timeParams) {

    const hideTime = extractParameterSimple('hideTime', false);
    const {baseMoment, baseEndMoment, timezone, t} = timeParams;
    const timeFormat = determineTimeFormat()
    const localIsRemote = baseMoment.format(timeFormat) === formatTime(baseMoment.clone(), timeFormat, timezone);
    if (baseMoment.date() === baseEndMoment.date() && baseMoment.month() === baseEndMoment.month()) {
        if(hideTime) {
            return <></>;
        }
        return (
            <>
                <div className="simpleTimePeriod">
                    {baseMoment.clone().format(timeFormat)} - {baseEndMoment.clone().format(timeFormat)}
                    {showLocalTimeSimple(localIsRemote, timeFormat, timeParams)}
                </div>
                <div className="fromNow">({baseMoment.fromNow()})</div>
            </>
        )
    } else {
        const defaultFormat = hideTime ? "ddd MMM DD" : "ddd MMM DD, hh:mm a";
        return (
            <div className="extendedPeriod">
                <div className="extendedTimePeriod">{baseMoment.format(defaultFormat)}</div>
                <div className="extendedTimePeriod">{baseEndMoment.format(defaultFormat)}</div>
                {showLocalTimeFull(localIsRemote, defaultFormat, timeParams)}
                <div className="fromNow">({baseMoment.fromNow()})</div>
            </div>
        )
    }
}


export function momentFactory(dateExpr, timezone) {
    moment.tz.load(require('moment-timezone/data/packed/latest.json'));
    return timezone ? moment.tz(dateExpr, timezone) : moment(dateExpr);
}

/**
 * Widget used to display a date.
 * @param startTimeStamp The start timestamp.
 * @returns {*}
 * @constructor
 */
export default function DateWidget({startDate, endDate, timezone}) {
    const {t} = useTranslation();
    moment.locale(extractParameterSimple('language', 'en-US'));
    const baseMoment = momentFactory(startDate, timezone);
    const baseEndMoment = momentFactory(endDate, timezone);
    return (
        <div className="calendarWidget">
            <div className="weekday">{baseMoment.format("dddd")}</div>
            <div className="month">{baseMoment.format("MMM")}</div>
            <div className="day">{baseMoment.format("DD")}</div>
            {displayTimes({baseMoment, baseEndMoment, timezone, t})}
        </div>
    );
}