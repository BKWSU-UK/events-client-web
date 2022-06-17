

const searchAdapter = (eventList, searchExpression) => {
    console.log('searchAdapter', eventList)
    if(!searchExpression) {
        return eventList
    }
    if(!eventList) {
        return []
    }
    return eventList?.filter(e => {
        const name = e.name.toLowerCase()
        const shortDescription = e.shortDescription.toLowerCase()
        const subTitle = e.subTitle.toLowerCase()
        const lowercaseSearch = searchExpression.toLowerCase()
        return [name, shortDescription, subTitle].some(s => s.includes(lowercaseSearch))
    })
}

export default searchAdapter