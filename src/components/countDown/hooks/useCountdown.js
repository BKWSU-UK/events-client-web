import { useContext, useEffect, useState } from 'react'
import {
    EVENT_COUNTDOWN_ACTIONS,
    EventCountdownContext,
} from '../../../context/EventCountdownContext'
import moment from 'moment-timezone'
import { ANIMATION } from '../animConstants'

const round = (n) => Math.floor(n).toString().padStart(2, '0')

const timeFactory = (data, timezone) => {

    const { startDate, startTime } = data[0]
    const timeExpression = `${startDate}T${startTime}`
    return moment.tz(timeExpression, timezone)
}

/**
 * Returns the countdown data.
 * @returns {[*, unknown]}
 */
const useCountdown = (timezone) => {
    const { stateCountdownData, dispatchCountdown } = useContext(EventCountdownContext)
    const [timediff, setTimediff] = useState(null)

    useEffect(() => {
        let interval = setInterval(() => {
            const data = stateCountdownData?.data
            if(!data || data.length === 0) {
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
                const millis = duration.asMilliseconds()
                const seconds = millis / 1000
                const minutes = seconds / 60
                const hours = minutes / 60
                const days = hours / 24
                const milliseconds = millis % 1000
                let humanSeconds = seconds % 60
                let humanminutes = minutes % 60
                let humanHours = hours % 24
                setTimediff({
                    timeTarget,
                    milliseconds: milliseconds,
                    seconds: round(seconds),
                    humanSeconds: round(humanSeconds),
                    humanminutes: round(humanminutes),
                    humanHours: round(humanHours),
                    days: round(days),
                })
            }

        }, ANIMATION.SPEED)
        return () => {
            if(!!interval) {
                clearInterval(interval)
            }
        }
    }, [stateCountdownData.data])

    return [stateCountdownData, timediff]
}

export default useCountdown