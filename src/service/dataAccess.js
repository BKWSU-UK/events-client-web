import { extractParameter } from '../utils/paramExtraction'
import { ALL_ORG_IDS } from '../context/EventContext'

const eventLimit = () => extractParameter(null, 'eventsLimit', 10000)

const onlyWebcast = () => extractParameter(null, 'onlyWebcast', false)

const onlineOnly = () => extractParameter(null, 'onlineOnly', false)

const range = len => {
    const arr = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
}

function processOnlineOnly (targetUrl) {
    const isOnlineOnly = onlineOnly()
    if (isOnlineOnly === 'yes') {
        targetUrl += `&onlineOnly=true`
    } else if (isOnlineOnly === 'no') {
        targetUrl += `&onlineOnly=false`
    }
    return targetUrl
}

export const fetchEventList = (setEvents, events, params) => {
    const { orgId, eventTypeIds, eventsLang, orgIdFilter } = params

    const orgIdStrFactory = () => {
        if (parseInt(orgIdFilter) === ALL_ORG_IDS) {
            return Array.isArray(orgId) ? orgId.join(',') : orgId
        }
        return orgIdFilter
    }

    const orgIdStr = orgIdStrFactory()
    const eventsLimit = eventLimit()
    console.log('eventsLimit', eventsLimit)
    let targetUrl = `https://events.brahmakumaris.org/bkregistration/organisationEventReportController.do?orgEventTemplate=jsonEventExport.ftl&orgId=${orgIdStr}`
    targetUrl += `&eventTypeIds=${eventTypeIds}&fromIndex=0&toIndex=${eventsLimit}&mimeType=application/json`
    if (params.featured) {
        targetUrl += `&featured=true`
    }
    const isOnlyWebcast = onlyWebcast()
    if (isOnlyWebcast) {
        targetUrl += `&onlyWebcast=${isOnlyWebcast}`
    }
    if (eventsLang) {
        targetUrl += `&lang=${eventsLang}`
    }
    targetUrl = processOnlineOnly(targetUrl)
    console.log('targetUrl', targetUrl)
    fetch(targetUrl).then((response) => response.json()).then((json) => {
        const response = json.response
        console.log('response.data', response.data)
        setEvents(response.data)
    })

    return []
}

function fetchSingleEvent (fun, eventId) {
    if (!eventId) {
        return
    }
    const targetUrl = `https://events.brahmakumaris.org/bkregistration/organisationEventReportController.do?simpleEventTemplate=jsonEvent.ftl&mimeType=application/json&eventIds=${eventId}`
    fetch(targetUrl).then((response) => response.json()).then((json) => {
        const response = json.response
        console.log(response)
        fun(response)
    })
}

export function fetchEvent (setEvent, eventId) {
    fetchSingleEvent((response) => setEvent(response.data[0]), eventId)
}

export function fetchEventDateList (setDateList, eventId) {
    fetchSingleEvent((response) => setDateList(response.data[0].dateList),
        eventId)
}

export const fetchSimilarEventList = async (
    eventDateId, setSimilarEvents, limit = 3) => {
    if (!eventDateId) {
        return
    }
    const targetUrl = `https://events.brahmakumaris.org/registration/similarEvents.do?eventDateId=${eventDateId}&limit=${limit}`
    console.log('fetchSimilarEventList target', targetUrl)
    const response = await fetch(targetUrl)
    const json = await response.json()
    console.log('similar events', json)
    setSimilarEvents(json)
}

export const fetchOrganisations = async (orgIds) => {
    const orgList = orgIds.join(',')
    const targetUrl = `https://events.brahmakumaris.org/registration/organisations/ids?ids=${orgList}`
    const response = await fetch(targetUrl)
    return response.json()
}