import React, { useContext, useEffect, useState } from 'react'
import CompositeCalendarContext, { DATE_ACTIONS } from '../../../context/CompositeCalendarContext'
import { useTranslation } from '../../../i18n'

const KEY_SEARCH = 'eventKeySearch'

/**
 * Sets the search filter
 * @constructor
 */
const SearchFilter = () => {

    const { t } = useTranslation()
    const [searchExpression, setSearchExpression] = useState('')
    const compositeCalendarContext = useContext(CompositeCalendarContext)
    const { stateCalendar, dispatchDate } = compositeCalendarContext

    useEffect(() => {
        const storedSearch = window.localStorage.getItem(KEY_SEARCH)
        if(!!storedSearch) {
            setSearchExpression(storedSearch)
            dispatchDate({
                type: DATE_ACTIONS.SET_SEARCH_EXPRESSION,
                payload: { searchExpression: storedSearch }
            })
        }
    }, [])

    const onChange = (e) => {
        const value = e.target.value
        setSearchExpression(value)
    }

    const acceptedSearch = () => {
        return !!searchExpression && searchExpression.trim().length > 2
    }

    function processSearch () {
        if (acceptedSearch()) {
            dispatchDate({
                type: DATE_ACTIONS.SET_SEARCH_EXPRESSION,
                payload: { searchExpression: searchExpression },
            })
            window.localStorage.setItem(KEY_SEARCH, searchExpression)
        }
    }

    const onSearch = (e) => {
        e.preventDefault()
        processSearch()
    }

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            processSearch()
        }
    }

    const onClear = (e) => {
        e.preventDefault()
        const emptyExpression = ''
        setSearchExpression(emptyExpression)
        dispatchDate({
            type: DATE_ACTIONS.SET_SEARCH_EXPRESSION,
            payload: { searchExpression: emptyExpression }
        })
        window.localStorage.setItem(KEY_SEARCH, emptyExpression)
    }

    return (
        <>
            <input type="text"
                   className="btn btn-primary calendar-search-selector"
                   value={searchExpression}
                   onChange={onChange} onKeyDown={handleEnter}/>
            <button className="btn btn-primary calendar-search-selector"
                onClick={onSearch} disabled={!acceptedSearch()}>{t('search')}</button>
            {!!stateCalendar.searchExpression &&
            <button className="btn btn-danger calendar-search-selector"
                    onClick={onClear}>{t('clear')}</button>}
        </>
    )
}

export default SearchFilter