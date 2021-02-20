import React, { useContext, useEffect, useState } from 'react'
import { fetchEventList } from '../service/dataAccess'
import EventContext, { extractEventListParameters } from '../context/EventContext'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { convertToBigCalendar } from '../service/calendarFactory'
import moment from 'moment'
import { extractParameterSimple } from '../utils/paramExtraction'
import { useTranslation } from '../i18n'

/**
 * Used to display the events in a calendar format.
 * @param props Can contain at most the organisation id.
 * @returns {JSX.Element}
 * @constructor
 */
const EventCalendar = (props) => {
    const { t } = useTranslation()
    const { orgId, eventTypeIds, featured } = extractEventListParameters(props)
    const { events, setEvents } = useContext(EventContext)
    const [showModal, setShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState(false)

    const language = extractParameterSimple('language', 'en-US')
    console.log('Calendar language', language)
    moment.locale(language)
    const localizer = momentLocalizer(moment)

    useEffect(() => {
        fetchEventList(setEvents, events, { orgId, eventTypeIds, featured })
    }, [orgId])

    const onSelectEvent = (event, e) => {
        setShowModal(!showModal)
        setModalTitle(event.title)
        e.preventDefault()
    }

    return (
        <>
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
            <CalendarModal showModal={showModal}
                           setShowModal={setShowModal}
                           modalTitle={modalTitle}/>
        </>
    )
}

const CalendarModal = ({ showModal, setShowModal, modalTitle }) => {
    return (
        <div className={`modal fade ${showModal && 'show'}`} tabIndex="-1"
             style={{ display: showModal ? 'block' : 'none' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{modalTitle}</h5>
                        <button type="button" className="close"
                                data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(!showModal)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Modal body text goes here.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"
                                data-dismiss="modal" onClick={() => setShowModal(!showModal)}>Close
                        </button>
                        <button type="button" className="btn btn-primary">Save
                            changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventCalendar