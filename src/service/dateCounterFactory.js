import _ from 'lodash'

export const groupByDate = (eventResponse) => {
    if(!!eventResponse) {
        const eventsWithData = eventResponse.map(e => {
            e.startDate = e.startIso.split('T')[0]
            return e
        })
        return _.countBy(eventsWithData, (e) => e.startDate)
    }
    return []
}