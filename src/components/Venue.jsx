import React, { useContext } from 'react'
import { extractParameter } from '../utils/paramExtraction'
import EventContext from '../context/EventContext'

function venueNameDisplay(venueName) {
    if (venueName) {
        return (
            <div className="font-weight-bold">
                {venueName}
            </div>
        );
    }
}

function venuePostalCodeDisplay(venuePostalCode) {
    if (venuePostalCode) {
        return (
            <>
                {venuePostalCode}
            </>
        );
    }
}

function VenuePostalCodeLocality({ venuePostalCode, venueLocality, venue }) {
    const eventContext = useContext(EventContext)
    const language = extractParameter({...eventContext}, 'language', 'en-US')
    if(language.includes('en')) {
        return (
            <div>
                <span className="venue-locality">{venueLocality}</span>
                {' '}{venuePostalCodeDisplay(venuePostalCode)}
                {' '}<span className="venue-country">({venue.country} )</span>
            </div>
        )
    }
    return (
        <div>
            {venuePostalCodeDisplay(venuePostalCode)}
            {' '}<span className="venue-locality">{venueLocality}</span>
            {' '}<span className="venue-country">({venue.country})</span>
        </div>
    );
}

function venueEmail(venue) {
    if (venue.email) {
        return (
            <div>
                {String.fromCharCode(9993)}: <a href={`mailto:${venue.email}`}>{venue.email}</a>
            </div>
        );
    }
}

function venuePhone(venue) {
    if (!!venue.phone && !venue.phone === 'null') {
        return (
            <div>
                {String.fromCharCode(9742)}: <a href={`tel:${venue.phone}`}>{venue.phone}</a>
            </div>
        );
    }
}

export default function Venue({venue, venueName, venueAddress, venuePostalCode, venueLocality, currentEvent}) {
    return (
        <div className="card card-body bg-light venue-display">
            {venueNameDisplay(venueName)}
            <div>{venueAddress}</div>
            <VenuePostalCodeLocality venue={venue} venueLocality={venueLocality} venuePostalCode={venuePostalCode} />
            {currentEvent?.requiresRegistration ? '' : venueEmail(venue)}
            {venuePhone(venue)}
        </div>
    )
}