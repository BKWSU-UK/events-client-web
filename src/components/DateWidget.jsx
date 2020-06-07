import React from 'react';
import 'moment/locale/es';

import moment from "moment-timezone";
import {useTranslation} from "../i18n";

function guessTimezone() {
    const guess = moment.tz.guess(true);
    if(!guess) {
        console.warn('Guess undefined');
    }
    return guess || Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/London";
}

function formatTime(mom, format, timezone) {
    return timezone ? mom.tz(guessTimezone()).format(format) : mom.format(format);
}

function showLocalTime(localIsRemote, defaultFormat, timeParams) {
    const {baseMoment, baseEndMoment, timezone, t} = timeParams;
    if(!localIsRemote && window.eventsConfig.showLocalTime) {
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

function displayTimes(timeParams) {
    const {baseMoment, baseEndMoment, timezone, t} = timeParams;
    const localIsRemote = baseMoment.format("h:mm a") === formatTime(baseMoment.clone(), "h:mm a", timezone);
    if (baseMoment.date() === baseEndMoment.date() && baseMoment.month() === baseEndMoment.month()) {
        return (
            <>
                <div className="simpleTimePeriod">{baseMoment.format("h:mm a")} - {baseEndMoment.format("h:mm a")}</div>
                {!localIsRemote ? <div className="simpleTimePeriod">{formatTime(baseEndMoment, "h:mm a", timezone)} - {formatTime(baseEndMoment, "h:mm a", timezone)} (your time)</div> : ''}
                <div className="fromNow">({baseMoment.fromNow()})</div>
            </>
        )
    } else {
        const defaultFormat = "ddd MMM DD, hh:mm a";
        return (
            <div className="extendedPeriod">
                <div className="extendedTimePeriod">{baseMoment.format(defaultFormat)}</div>
                <div className="extendedTimePeriod">{baseEndMoment.format(defaultFormat)}</div>
                {showLocalTime(localIsRemote, defaultFormat, timeParams)}
                <div className="fromNow">({baseMoment.fromNow()})</div>
            </div>
        )
    }
}

function momentFactory(dateExpr, timezone) {
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
    const { t } = useTranslation();
    moment.locale(window.eventsConfig.language);
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