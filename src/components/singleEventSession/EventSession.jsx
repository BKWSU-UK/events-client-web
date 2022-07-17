import React from 'react'
import { useTranslation } from '../../i18n'
import useTimeFormat from '../../hooks/useTimeFormat'
import { useQuery } from 'react-query'
import { fetchEventDateWithSeats } from '../../service/dataAccess'
import LoadingContainer from '../loading/LoadingContainer'
import HeroImage from './HeroImage'
import EventInfoMain from './EventInfoMain'
import SpeakerSection from './SpeakerSection'
import FormLocationSection from './FormLocationSection'
import VenueAndOnlineLink from './VenueAndOnlineLink'

/**
 * Event session display.
 * @constructor
 */
const EventSession = ({ eventSessionId }) => {

    const { t } = useTranslation()
    const timeFormat = useTimeFormat()

    const { isLoading, error, data } = useQuery([eventSessionId],
        () => fetchEventDateWithSeats(eventSessionId))

    return (
        <LoadingContainer data={data}
                          isLoading={isLoading}
                          error={error}>
            <HeroImage ev={data} />
            <EventInfoMain ev={data} />
            <SpeakerSection ev={data} />
            <FormLocationSection ev={data} />
            <VenueAndOnlineLink ev={data} />
        </LoadingContainer>
    )
}

export default EventSession