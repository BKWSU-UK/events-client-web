import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment-timezone'
import { useTranslation } from '../../i18n'
import {
    EVENT_COUNTDOWN_ACTIONS,
    EventCountdownContext,
} from '../../context/EventCountdownContext'

const round = (n) => Math.floor(n).toString().padStart(2, '0')

moment.tz.load(require('moment-timezone/data/packed/latest.json'));

const timeFactory = (data, timezone) => {

    const { startDate, startTime, endDate, endTime } = data[0]
    const timeExpression = `${startDate}T${startTime}`
    const target = moment.tz(timeExpression, timezone)
    return target
}

/**
 * Displays the countdown numbers.
 * @constructor
 */
const CountdownNumbers = ({timezone}) => {

    const { stateCountdownData, dispatchCountdown } = useContext(EventCountdownContext)
    const { t } = useTranslation()
    const [timediff, setTimediff] = useState(null)

    useEffect(() => {
        let interval = setInterval(() => {
            const data = stateCountdownData?.data
            if(data?.length === 0) {
                return
            }
            const timeTarget = timeFactory(data, timezone)
            const now = moment()
            const duration = moment.duration(timeTarget.diff(now))
            if(duration < 0) {
                dispatchCountdown({type: EVENT_COUNTDOWN_ACTIONS.START_EVENT})
                clearInterval(interval)
                interval = null
            } else {
                const seconds = duration.asSeconds()
                const minutes = seconds / 60
                const hours = minutes / 60
                const days = hours / 24
                let humanSeconds = seconds % 60
                let humanminutes = minutes % 60
                let humanHours = hours % 24
                setTimediff({
                    timeTarget,
                    seconds: round(seconds),
                    humanSeconds: round(humanSeconds),
                    humanminutes: round(humanminutes),
                    humanHours: round(humanHours),
                    days: round(days),
                })
            }
        }, 1000)
        return () => {
            if(!!interval) {
                clearInterval(interval)
            }
        }
    }, [stateCountdownData.data])

    if (!timediff || stateCountdownData.started) {
        return <></>
    }

    return (
        <>
            <div className="row countdown">
                <div className="col-3 cell">
                    <div className="cell-number-container">
                        <div
                            className="cell-number-container-text">{timediff.days}
                            <div className="cell-number-container-text-unit">{t('days')}</div>
                        </div>
                    </div>
                </div>
                <div className="col-3 cell">
                    <div
                        className="cell-number-container">
                        <div
                            className="cell-number-container-text">{timediff.humanHours}
                            <div className="cell-number-container-text-unit">{t('hours')}</div>
                        </div>
                    </div>
                </div>
                <div className="col-3 cell">
                    <div
                        className="cell-number-container">
                        <div
                            className="cell-number-container-text">{timediff.humanminutes}
                            <div className="cell-number-container-text-unit">{t('minutes')}</div>
                        </div>
                    </div>
                </div>
                <div className="col-3 cell">
                    <div
                        className="cell-number-container">
                        <div
                            className="cell-number-container-text">{timediff.humanSeconds}
                            <div className="cell-number-container-text-unit">{t('seconds')}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CountdownNumbers