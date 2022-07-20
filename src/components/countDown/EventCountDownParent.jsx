import moment from 'moment-timezone'
import React, { useContext } from 'react'
import '../../css/eventCountdown.css'
import CountdownNumbers from './CountdownNumbers'
import EventContext from '../../context/EventContext'
import { useQuery } from 'react-query'
import { fetchNextListEvents } from '../../service/dataAccess'
import LoadingContainer from '../loading/LoadingContainer'
import ImageContainer from './ImageContainer'
import { EventCountdownContextProvider } from '../../context/EventCountdownContext'
import EventHeader from './EventTitle'
import VideoDisplay from './VideoDisplay'

moment.tz.load(require('moment-timezone/data/packed/latest.json'))

/**
 * Event countdown parent component which fetches the data for a specific country or contries.
 * using a single time zone.
 * @constructor
 */
const EventCountDownParent = ({ defaultTimezone = 'Europe/London', defaultCountries = 'United Kingdom' }) => {

    const { eventsConfig } = useContext(EventContext)

    const timezone = eventsConfig.eventCountDownTimezone || defaultTimezone
    const countries = eventsConfig.eventCountDownCountries || defaultCountries
    const target = moment.tz('2022-07-20T13:00:00', timezone)

    const { isLoading, error, data } = useQuery(
        [`${timezone}_${countries}`],
        () => fetchNextListEvents(countries, timezone))

    console.log('data', data)

    return (
        <EventCountdownContextProvider>
            <LoadingContainer data={data}
                              isLoading={isLoading}
                              error={error}>
                <EventHeader />
                <ImageContainer data={data}>
                    <CountdownNumbers timeTarget={target} timezone={timezone} />
                    <VideoDisplay />
                </ImageContainer>

            </LoadingContainer>
        </EventCountdownContextProvider>
    )
}

export default EventCountDownParent