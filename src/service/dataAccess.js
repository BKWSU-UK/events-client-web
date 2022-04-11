import { extractParameter } from '../utils/paramExtraction'
import { ALL_ORG_IDS } from '../context/EventContext'
import { SERVER_BASE } from '../apiConstants'

const eventLimit = (eventContext) => extractParameter({ ...eventContext }, 'eventsLimit', 10000)

const onlyWebcast = (eventContext) => extractParameter({ ...eventContext }, 'onlyWebcast', false)

const onlineOnly = (eventContext) => extractParameter({ ...eventContext }, 'onlineOnly', false)

const isPrivate = (eventContext) => extractParameter({ ...eventContext }, 'private', false)

const hasRegistration = (eventContext) => extractParameter({ ...eventContext }, 'hasRegistration', false)

const appendToTargetUrl = (value, targetUrl, parameter) => {
    console.log('appendToTargetUrl', appendToTargetUrl)
    if (value === 'yes') {
        targetUrl += `&${parameter}=true`
    } else if (value === 'no') {
        targetUrl += `&${parameter}=false`
    }
    return targetUrl
}

const processHasRegistration = (targetUrl, eventContext) => appendToTargetUrl(
    hasRegistration(eventContext), targetUrl, 'hasRegistration')

const processPrivate = (targetUrl, eventContext) => appendToTargetUrl(
    isPrivate(eventContext), targetUrl, 'private')

const processOnlineOnly = (targetUrl, eventContext) => appendToTargetUrl(
    onlineOnly(eventContext), targetUrl, 'onlineOnly')

const joinIfArray = (ids) => Array.isArray(ids) ? ids.join(',') : ids

const orgIdStrFactory = ({ orgIdFilter, orgId, useAllOrgIds }) => {
    if (parseInt(orgIdFilter) === ALL_ORG_IDS) {
        console.log('orgIdStrFactory')
        const extractParameterSimple1 = extractParameter({eventsConfig: { useAllOrgIds }}, 'useAllOrgIds', false)
        if(!extractParameterSimple1) {
            return `${ALL_ORG_IDS}`
        }
        return joinIfArray(orgId)
    }
    return orgIdFilter ? joinIfArray(orgIdFilter) : joinIfArray(orgId)
}

const targetUrlFactory = ({orgIdStr, eventTypeIds, eventsLimit, eventsLang, featured, eventContext}) => {
    let targetUrl = `${SERVER_BASE}/organisationEventReportController.do?orgEventTemplate=jsonEventExport.ftl&orgId=${orgIdStr}`
    targetUrl += `&eventTypeIds=${eventTypeIds}&fromIndex=0&toIndex=${eventsLimit}&mimeType=application/json`
    if (featured) {
        targetUrl += `&featured=true`
    }
    const isOnlyWebcast = onlyWebcast(eventContext)
    if (isOnlyWebcast) {
        targetUrl += `&onlyWebcast=${isOnlyWebcast}`
    }
    if (eventsLang) {
        targetUrl += `&lang=${eventsLang}`
    }
    targetUrl = processOnlineOnly(targetUrl, eventContext)
    targetUrl = processPrivate(targetUrl, eventContext)
    targetUrl = processHasRegistration(targetUrl, eventContext)
    return targetUrl
}

export const getEventList = async (params) => {
    const { orgId, eventTypeIds, eventsLang, orgIdFilter, eventContext } = params
    const orgIdStr = orgIdStrFactory({ orgIdFilter, orgId, useAllOrgIds: eventContext.useAllOrgIds })
    if(parseInt(orgIdStr) < 1) {
        return []
    }
    const eventsLimit = eventLimit(eventContext)
    const targetUrl = targetUrlFactory({orgIdStr, eventTypeIds, eventsLimit, eventsLang,
        featured: params.featured, eventContext})
    console.log('targetUrl', eventContext.eventsConfig.id, targetUrl)
    const fetchResponse = await fetch(targetUrl)
    const json = await fetchResponse.json()
    if(json?.response?.status !== 0) {
        console.error('Error occurred whiles fetching events', json)
    }
    const response = json.response
    console.log('response.data', json)
    return response?.data
}

function fetchSingleEvent (fun, eventId) {
    if (!eventId) {
        return
    }
    const targetUrl = `${SERVER_BASE}/organisationEventReportController.do?simpleEventTemplate=jsonEvent.ftl&mimeType=application/json&eventIds=${eventId}`
    fetch(targetUrl).then((response) => response.json()).then((json) => {
        const response = json.response
        console.log(targetUrl, response)
        fun(response)
    })
}

export function fetchEvent (setEvent, eventId) {
    console.log('fetchEvent', setEvent)
    fetchSingleEvent((response) => {
        setEvent(response.data[0])
    }, eventId)
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