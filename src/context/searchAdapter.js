

const searchAdapter = (eventList, searchExpression, searchFilterFunction, eventSliceFunction) => {
    console.log('searchAdapter', eventList)
    if(!eventList) {
        return []
    }
    if(!!searchExpression) {
        eventList = eventList.filter(e => {
            const name = e.name.toLowerCase()
            const shortDescription = e.shortDescription.toLowerCase()
            const subTitle = e.subTitle.toLowerCase()
            const lowercaseSearch = searchExpression.toLowerCase()
            return [name, shortDescription, subTitle].some(s => s.includes(lowercaseSearch))
        })
    }
    if(!!searchFilterFunction) {
        eventList = eventList.filter(searchFilterFunction)
    }
    if(!!eventSliceFunction) {
        eventList = eventSliceFunction(eventList)
    }
    return eventList
}

export default searchAdapter