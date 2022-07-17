import moment from 'moment-timezone'
import React from 'react'

export function convertIsoToGoogleCal (dateStr) {
    return moment(dateStr, 'YYYY-MM-DD\'T\'hh:mm:ss').format('YYYYMMDDTHHmmss')
}

export function googleCalendarLink (event, date) {
    const venue = event.venue

    const renderedLocation = !!venue &&
        `&location=${encodeURI(venue.address)}` || ''

    return `http://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURI(
        event.name)}&dates=${convertIsoToGoogleCal(
        date.startIso)}/${convertIsoToGoogleCal(
        date.endIso)}&details=${encodeURI(
        event.descriptionText)}${renderedLocation}&trp=false&sf=true&output=xml`
}

export function missesCoordinates(event) {
    const latitude = event?.simpleVenue.latitude
    const longitude = event?.simpleVenue.longitude
    return (event.onlineOnly || !latitude || !longitude || latitude === "0.0"|| longitude === "0.0")
}