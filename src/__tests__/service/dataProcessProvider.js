

export const buildTargetUrlData = () => {
    const orgIdStr = "2,335"
    const eventTypeIds = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15"
    const eventsLimit = 10
    const eventsLang = null
    const featured = null
    const eventContext = {
        eventsConfig: {
            displayOrgFilter: true,
            displayWebcastButton: false,
            eventTypeIds: '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15',
            eventsLimit: 10,
            featured: false,
            fetchEvents: true,
            id: 0,
            language: 'de',
        }
    }
    return {orgIdStr, eventTypeIds, eventsLimit, eventsLang, featured, eventContext}
}

export const buildTargetUrlDataWithDates = () => {
    const params = buildTargetUrlData()
    const dateStart = new Date(2022, 5, 10)
    const dateEnd = new Date(2022, 5, 20)
    return {...params, dateStart, dateEnd}
}