import React, { useContext } from 'react'
import useGetEventList from '../../hooks/useGetEventList'
import LoadingContainer from '../loading/LoadingContainer'
import useLanguage from '../../hooks/useLanguage'
import HeroTile from './HeroTile'
import CompositeCalendarContext, { DATE_ACTIONS } from '../../context/CompositeCalendarContext'
import SmallTile from './SmallTile'

const EVENTS_LIMIT = 10

const LIMIT = 5

/**
 * The tiles component.
 * @constructor
 */
const Tiles = () => {

    const { dispatchDate } = useContext(CompositeCalendarContext)

    const showEventDate = (e, ev) => {
        e.preventDefault()
        dispatchDate({
            type: DATE_ACTIONS.SHOW_MODAL_EVENT_DATE,
            payload: { modalEventDateId: ev.eventDateId },
        })
    }

    const { isLoading, error, data } = useGetEventList(
        EVENTS_LIMIT)
    const { t } = useLanguage()

    return (
        <LoadingContainer data={data} isLoading={isLoading} error={error}>
            <div className="tiles-grid-container-2">
                <HeroTile data={data} showEventDate={showEventDate} />
                <div>
                    {data?.slice(1, LIMIT).map((ev, i) => {
                        return <SmallTile ev={ev} showEventDate={showEventDate} key={i} />
                    })}
                </div>
            </div>
        </LoadingContainer>
    )
}

export default Tiles