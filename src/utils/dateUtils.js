import moment from 'moment-timezone'
import { extractParameter } from './paramExtraction'
import { momentFactory } from '../components/DateWidget'

export function iterateDates (startDate, endDate) {
    let rollDate = startDate
    const dateArray = []
    dateArray.push(rollDate)
    iterateDatesBase(startDate, endDate, (rollDate) => dateArray.push(rollDate))
    return dateArray
}

export function iterateDatesBase (startDate, endDate, func) {
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
        func(rollDate)
    }
    return dateArray
}

export const dateDiff = (date, diff) => {
    const clone = new Date(date.getTime())
    clone.setDate(clone.getDate() + diff)
    return clone
}

export const dateToKey = (date) => !!date &&
    `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

export const formatHeaderDates = (date) => {
    moment.locale(extractParameter(null, 'language', 'en-US'))
    return !!date &&
        moment(date).format('dddd, DD MMM YYYY')
}

export const pad2 = (n) => !!n ? n.toString().padStart(2, '0') : ''

export const convertMonth = (d) => `${d.getFullYear()}-${pad2(
    d.getMonth() + 1)}`

export const convertDate = (d) => `${convertMonth(d)}-${pad2(d.getDate())}`

export const isBeforeToday = (date) => {
    if (!date) {
        return false
    }
    const now = new Date()
    return now.getTime() > date.getTime()
}

export const timeAfterNow = (timeIso, timezone = 'Europe/London') => {
    const diff = momentFactory(timeIso, timezone).diff(moment())
    return diff > 0
}

export function monthStartAndEnd (date)
{
    if (!date) {
        return monthStartAndEnd(new Date())
    }
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)
    let monthEnd = new Date(date.getFullYear(), date.getMonth() + 1 % 12, 1, 23, 59, 59)
    monthEnd = dateDiff(monthEnd, -1)
    return { monthStart, monthEnd }
}

const MONDAY = 1

export function weekStartAndEnd (date)
{
    if (!date) {
        return weekStartAndEnd(new Date())
    }

    let weekStart = dateDiff(date, 0)
    const weekDay = -1
    while(weekStart.getDay() !== MONDAY) {
        weekStart = dateDiff(weekStart, -1)
    }
    const weenEnd = dateDiff(weekStart, 7)
    return { weekStart, weenEnd }
}

export function weekListInYears(yearsNumber) {
    const fullYear = new Date().getFullYear()
    return [...Array(yearsNumber).keys()].map(i => i + fullYear).flatMap((year) => {
        let date = new Date(year, 0, 1)
        let currentYear = year
        const weeks = []
        while(currentYear === year) {
            if(date.getDay() === MONDAY) {
                weeks.push(`${currentYear}-W${pad2(weeks.length + 1)}`)
            }
            date = dateDiff(date, 1)
            currentYear = date.getFullYear()
        }
        return weeks
    })
}

export const eventDateAdapter = (eventDate) => {
    if (!eventDate) {
        return null
    }
    return {
        ...eventDate,
        startIso: `${eventDate.startDate}T${eventDate.startTime}`,
        endIso: `${eventDate.endDate}T${eventDate.endTime}`,
    }
}

export const isSameDay = (date) => {
    const startSplit = date.startIso.split('T')
    const endSplit = date.endIso.split('T')
    return startSplit[0] === endSplit[0]
}

export const renderTimeFromIso = (isoDate, langCode, timeFormat) => moment(isoDate, 'YYYY-MM-DD\'T\'hh:mm:ss').locale(langCode).
    format(timeFormat)