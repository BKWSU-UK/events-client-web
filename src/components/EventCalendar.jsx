import React, { useContext, useEffect, useState, useCallback } from 'react'
import { getEventList } from '../service/dataAccess'
import EventContext, { extractEventListParameters } from '../context/EventContext'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { convertToBigCalendar } from '../service/calendarFactory'
import moment from 'moment'
import {
    extractParameter
} from '../utils/paramExtraction'
import { useTranslation } from '../i18n'
import { EventDisplayBody } from './EventDisplay'
import WebcastButton from './WebcastButton'
import { EventForm } from './forms/FormModal'
import CenterFilter from './filter/CenterFilter'
import { useQuery } from 'react-query'
import LoadingContainer from './loading/LoadingContainer'
import OnlineFilter from './filter/OnlineFilter'
import useLanguage from '../hooks/useLanguage'

/**
 * Used to display the events in a calendar format.
 * @param props Can contain at most the organisation id.
 * @returns {JSX.Element}
 * @constructor
 */
const EventCalendar = (props) => {
    const { t } = useTranslation()
    const eventContext = useContext(EventContext)
    const allParams = extractEventListParameters({ ...props, ...eventContext })
    const { orgId } = allParams
    const { events, setEvents, orgIdFilter, filterState} = eventContext
    const [showModal, setShowModal] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState(false)

    useLanguage()

    const localizer = momentLocalizer(moment)

    const { isLoading, error, data } = useQuery(
        [`eventsCalendar_${eventContext.id}`, orgId, orgIdFilter, filterState], () => {
        if(!!orgIdFilter && orgIdFilter > 0) {
            return getEventList({ ...allParams, orgIdFilter, eventContext })
        }
        else if (extractParameter({...eventContext}, 'fetchEvents')) {
            return getEventList({ ...allParams, eventContext })
        } else {
            return []
        }
    })

    setEvents(data)

    const onSelectEvent = (event, e) => {
        setShowModal(!showModal)
        setSelectedEvent(event)
        e.preventDefault()
    }

    return (
        <>
            <CenterFilter />
            <OnlineFilter />
            <LoadingContainer data={data} isLoading={isLoading} error={error}>
                <Calendar
                    localizer={localizer}
                    events={convertToBigCalendar(events)}
                    startAccessor="start"
                    endAccessor="end"
                    messages={{
                        'today': t('today'),
                        'previous': t('previous'),
                        'next': t('next'),
                        'month': t('month'),
                        'week': t('week'),
                        'day': t('day'),
                        'agenda': t('agenda'),
                        'more': t('More'),
                    }}
                    onSelectEvent={onSelectEvent}
                />
            </LoadingContainer>
            <CalendarModal showModal={showModal}
                           setShowModal={setShowModal}
                           selectedEvent={selectedEvent}/>
        </>
    )
}

const CalendarModal = ({ showModal, setShowModal, selectedEvent }) => {
    const original = selectedEvent.original
    const {t} = useTranslation();

    const escFunction = useCallback((event) => {
        if (event.keyCode === 27) {
            setShowModal(false)
        }
    }, [])

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, []);

    return (
        selectedEvent &&
        <div className={`modal fade ${showModal && 'show'}`} tabIndex="-1"
             style={{ display: showModal ? 'block' : 'none' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{selectedEvent.title}</h5>
                        <button type="button" className="close"
                                data-dismiss="modal" aria-label="Close"
                                onClick={() => setShowModal(!showModal)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <EventDisplayBody original={original} simple={true}/>
                        <WebcastButton original={original}/>
                        {original.requiresRegistration ? <EventForm
                            show={showModal} setShow={setShowModal}
                            currentEvent={original}/> : ''}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={() => setShowModal(!showModal)}>{t('Close')}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventCalendar