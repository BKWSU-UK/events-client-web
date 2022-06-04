import { extractParameter } from '../utils/paramExtraction'
import { ALL_ORG_IDS } from '../context/EventContext'
import { SERVER_BASE } from '../apiConstants'
import { DISPLAY_ONLINE_FILTER } from '../context/appParams'
import { ONLINE_STATUSES } from '../context/onlineStates'
import { DATA_ACCESS_PARAMS } from './dataAccessConstants'

const eventLimit = (eventContext) => extractParameter({ ...eventContext }, 'eventsLimit', 10000)

const onlyWebcast = (eventContext) => extractParameter({ ...eventContext }, DATA_ACCESS_PARAMS.ONLY_WEBCAST, false)

const onlineOnly = (eventContext) => extractParameter({ ...eventContext }, 'onlineOnly', false)

const isPrivate = (eventContext) => extractParameter({ ...eventContext }, 'private', false)

const hasRegistration = (eventContext) => extractParameter({ ...eventContext }, 'hasRegistration', false)

const appendToTargetUrl = (value, targetUrl, parameter) => {
    if (value === DATA_ACCESS_PARAMS.LOGICAL_YES) {
        targetUrl += `&${parameter}=true`
    } else if (value === DATA_ACCESS_PARAMS.LOGICAL_NO) {
        targetUrl += `&${parameter}=false`
    }
    return targetUrl
}

const processHasRegistration = (targetUrl, eventContext) => appendToTargetUrl(
    hasRegistration(eventContext), targetUrl, 'hasRegistration')

const processPrivate = (targetUrl, eventContext) => appendToTargetUrl(
    isPrivate(eventContext), targetUrl, 'private')

const onlyWebcastAdapter = (isOnlyWebcast, targetUrl) => {
    if (isOnlyWebcast) {
        targetUrl += `&${DATA_ACCESS_PARAMS.ONLY_WEBCAST}=${isOnlyWebcast}`
    }
    return targetUrl
}

const processOnlineOnly = (targetUrl, eventContext) => {
    const onlineOnlyFilter = extractParameter(eventContext, DISPLAY_ONLINE_FILTER)
    if(!onlineOnlyFilter) {
        return appendToTargetUrl(
            onlineOnly(eventContext), targetUrl, DATA_ACCESS_PARAMS.ONLINE_ONLY)
    } else {
        console.log('processOnlineOnly', eventContext.filterState)
        switch(eventContext.filterState.onlineStatus) {
            case ONLINE_STATUSES.NONE:
                return targetUrl
            case ONLINE_STATUSES.IN_PERSON:
                return appendToTargetUrl(
                    DATA_ACCESS_PARAMS.LOGICAL_NO, targetUrl, DATA_ACCESS_PARAMS.ONLINE_ONLY)
            case ONLINE_STATUSES.ONLINE_ONLY:
                return appendToTargetUrl(
                    DATA_ACCESS_PARAMS.LOGICAL_YES, targetUrl, DATA_ACCESS_PARAMS.ONLINE_ONLY)
            case ONLINE_STATUSES.MIXED:
                const targetUrl1 = appendToTargetUrl(
                    DATA_ACCESS_PARAMS.LOGICAL_NO, targetUrl, DATA_ACCESS_PARAMS.ONLINE_ONLY)
                return onlyWebcastAdapter(true, targetUrl1)
        }
        return targetUrl
    }
}

const joinIfArray = (ids) => Array.isArray(ids) ? ids.join(',') : ids

const orgIdStrFactory = ({ orgIdFilter, orgId, useAllOrgIds }) => {
    if (parseInt(orgIdFilter) === ALL_ORG_IDS) {
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
    targetUrl = onlyWebcastAdapter(isOnlyWebcast, targetUrl)
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
    const fetchResponse = await fetch(targetUrl)
    const json = await fetchResponse.json()
    if(json?.response?.status !== 0) {
        console.error('Error occurred whiles fetching events', json)
    }
    const response = json.response
    console.log('response.data', json)
    return response?.data
}

export const fetchSingleEvent = async (eventId) => {
    if (!eventId) {
        return
    }
    const targetUrl = `${SERVER_BASE}/organisationEventReportController.do?simpleEventTemplate=jsonEvent.ftl&mimeType=application/json&eventIds=${eventId}`
    const response = await fetch(targetUrl)
    const json = await response.json()
    const jsonResponse = json.response
    console.log(targetUrl, jsonResponse)
    return jsonResponse
}

export const fetchEvent = async (setEvent, eventId) => {
    const response = await fetchSingleEvent( eventId)
    setEvent(response.data[0])
}

export const fetchEventDateList = async (setDateList, eventId) => {
    const response = await fetchSingleEvent(eventId)
    setDateList(response.data[0].dateList)
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

export const fetchSeatInformation = async (eventDateId) => {
    const targetUrl = `https://events.brahmakumaris.org/bkregistration/seatsAvailable.do?eventDateId=${eventDateId}`
    const response = await fetch(targetUrl)
    return await response.json()
}