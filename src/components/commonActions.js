import { extractParameter } from '../utils/paramExtraction'
import { EVENT_CONFIG } from '../context/appParams'
import { EVENT_DATE_ID } from './EventDisplay'
import { DATE_ACTIONS } from '../context/CompositeCalendarContext'
import { extractImageFromEvent } from '../utils/imgUtils'

export const handleShowEventDate = (eventContext, ev, dispatchDate) => {
    console.log('handleShowEventDate')
    const singleEventUrlTemplate = extractParameter({ ...eventContext },
        EVENT_CONFIG.SINGLE_EVENT_URL_TEMPLATE)
    const eventDateId = ev.eventDateId || ev.original?.eventDateId
    if (!!singleEventUrlTemplate) {
        const image = extractImageFromEvent(ev)
        window.location.href = singleEventUrlTemplate.replace(EVENT_DATE_ID,
            eventDateId)
            + `&startDateTime=${window.encodeURI(ev.startIso)}`
            + `&endDateTime=${window.encodeURI(ev.endIso)}`
            + `&title=${window.encodeURI(ev.name)}`
            + (!!image ? `&image=${window.encodeURI(image)}`: '')

    } else {
        dispatchDate({
            type: DATE_ACTIONS.SHOW_MODAL_EVENT_DATE,
            payload: { modalEventDateId: eventDateId },
        })
    }
}