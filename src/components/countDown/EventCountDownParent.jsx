import moment from 'moment-timezone'
import React, { useContext, useEffect } from 'react'
import '../../css/eventCountdown.css'
import CountdownNumbers from './CountdownNumbers'
import EventContext from '../../context/EventContext'
import { useQuery } from 'react-query'
import { fetchNextListEvents } from '../../service/dataAccess'
import LoadingContainer from '../loading/LoadingContainer'
import ImageContainer from './ImageContainer'
import {
    EVENT_COUNTDOWN_ACTIONS,
    EventCountdownContext,
} from '../../context/EventCountdownContext'
import EventHeader from './EventTitle'
import VideoDisplay from './VideoDisplay'
import EventDescriptionSpeaker from './EventDescriptionSpeaker'
import CountdownSVG from './CountdownSVG'
import { ANIMATION } from './animConstants'

moment.tz.load(require('moment-timezone/data/packed/latest.json'))

/**
 * Event countdown parent component which fetches the data for a specific country or contries.
 * using a single time zone.
 * @constructor
 */
const EventCountDownParent = ({ defaultTimezone = 'Europe/London', defaultCountries = 'United Kingdom' }) => {

    const { eventsConfig } = useContext(EventContext)
    const { dispatchCountdown } = useContext(EventCountdownContext)

    const timezone = eventsConfig.eventCountDownTimezone || defaultTimezone
    const countries = eventsConfig.eventCountDownCountries || defaultCountries
    const target = moment.tz('2022-07-20T13:00:00', timezone)

    const { isLoading, error, data } = useQuery(
        [`${timezone}_${countries}`],
        () => fetchNextListEvents(countries, timezone))

    useEffect(() => {
        dispatchCountdown({ type: EVENT_COUNTDOWN_ACTIONS.SET_DATA, data })
    }, [data])

    const useSvg = eventsConfig.eventCountDownStyle === ANIMATION.ANIMATED

    return (
        <LoadingContainer data={data}
                          isLoading={isLoading}
                          error={error}>
            <EventHeader/>
            <ImageContainer data={data}>
                {useSvg ? <CountdownSVG timezone={timezone}/> :
                    <CountdownNumbers timeTarget={target} timezone={timezone}/>}
                <VideoDisplay/>
            </ImageContainer>
            <EventDescriptionSpeaker/>
        </LoadingContainer>
    )
}

export default EventCountDownParent