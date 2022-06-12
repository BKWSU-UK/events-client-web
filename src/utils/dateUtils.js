import moment from 'moment-timezone'
import { extractParameter } from './paramExtraction'
import { momentFactory } from '../components/DateWidget'

export function iterateDates (startDate, endDate) {
    console.log('iterateDates')
    if (!startDate) {
        console.error('start date needs to exist')
        return
    }
    if (!endDate) {
        console.error('end date needs to exist')
        return
    }
    if (startDate > endDate) {
        console.warn('start date bigger that end date')
    }
    let rollDate = startDate
    const dateArray = []
    dateArray.push(rollDate)
    while (rollDate < endDate) {
        rollDate = dateDiff(rollDate, 1)
        dateArray.push(rollDate)
    }
    return dateArray
}

export const dateDiff = (date, diff) => {
    const clone = new Date(date.getTime())
    clone.setDate(clone.getDate() + diff)
    return clone
}

export const dateToKey = (date) => !!date && `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

export const formatHeaderDates = (date) => {
    moment.locale(extractParameter(null,'language', 'en-US'));
    return !!date &&
        moment(date).format('DD MMM YYYY')
}

const pad2 = (n) => !!n ? n.toString().padStart(2, "0") : ""

export const convertDate = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`

export const isBeforeToday = (date) => {
    if(!date) {
        return false
    }
    const now = new Date()
    return now.getTime() > date.getTime()
}

export const timeAfterNow = (timeIso, timezone = 'Europe/London') => {
    const diff  = momentFactory(timeIso, timezone).diff(moment())
    return diff > 0
}