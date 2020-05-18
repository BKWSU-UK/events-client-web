import React from "react";

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

function venuePostalCodeLocality(venuePostalCode, venueLocality) {
    return (
        <div>
            {venuePostalCodeDisplay(venuePostalCode)} {venueLocality}
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
    if (venue.phone) {
        return (
            <div>
                {String.fromCharCode(9742)}: <a href={`tel:${venue.phone}`}>{venue.phone}</a>
            </div>
        );
    }
}

export default function Venue({venue, venueName, venueAddress, venuePostalCode, venueLocality}) {
    return (
        <div className="card card-body bg-light">
            {venueNameDisplay(venueName)}
            <div>{venueAddress}</div>
            {venuePostalCodeLocality(venuePostalCode, venueLocality)}
            {venueEmail(venue)}
            {venuePhone(venue)}
        </div>
    )
}