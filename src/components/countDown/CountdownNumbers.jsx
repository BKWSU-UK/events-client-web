import React from 'react'
import moment from 'moment-timezone'
import { useTranslation } from '../../i18n'
import useCountdown from './hooks/useCountdown'

moment.tz.load(require('moment-timezone/data/packed/latest.json'));

/**
 * Displays the countdown numbers.
 * @constructor
 */
const CountdownNumbers = ({timezone}) => {

    const { t } = useTranslation()
    const [stateCountdownData, timediff] = useCountdown(timezone)

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