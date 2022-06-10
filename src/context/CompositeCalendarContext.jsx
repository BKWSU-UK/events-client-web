import React, { createContext, useReducer } from 'react'
import { dateDiff } from '../utils/dateUtils'

const CompositeCalendarContext = createContext()

export const DATE_ACTIONS = {
    SET_DATE: 'SET_DATE',
    INIT_DATE: 'INIT_DATE',
    SET_PERIOD: 'SET_PERIOD',
    SET_RANGE: 'SET_RANGE',
    SELECT_SINGLE_DATE: 'SELECT_SINGLE_DATE',
}

const calculateVisibleEndDate = (dateRange, visibleDateStart) =>
    !!visibleDateStart
        ? dateDiff(visibleDateStart, dateRange - 1)
        : null

const dateReducer = (state, action) => {
    switch (action.type) {
        case DATE_ACTIONS.SET_DATE:
            return {
                ...state,
                currentDate: action.payload,
            }
        case DATE_ACTIONS.INIT_DATE:
            console.log('DATE_ACTIONS.INIT_DATE')
            const now = new Date()
            const startDate = dateDiff(now, state.startBefore)
            const endDate = dateDiff(now, state.endAfter)
            return {
                ...state,
                currentDate: now,
                startDate: startDate,
                endDate: endDate,
                visibleDateStart: startDate
            }
        case DATE_ACTIONS.SET_PERIOD: {
            const dateRange = state.dateRange
            return {
                ...state,
                visibleDateStart: action.payload.visibleDateStart,
                visibleDateEnd: calculateVisibleEndDate(dateRange, action.payload.visibleDateStart)
            }
        }
        case DATE_ACTIONS.SET_RANGE: {
            const dateRange = action.payload.dateRange
            return {
                ...state,
                dateRange,
                visibleDateEnd: calculateVisibleEndDate(dateRange, state.visibleDateStart)
            }
        }
        case DATE_ACTIONS.SELECT_SINGLE_DATE: {
            return {
                ...state,
                selectedSingleDate: action.payload.selectedSingleDate
            }
        }
    }
}

export const CompositeCalendarContextProvider = (props) => {
    const [stateDate, dispatchDate] = useReducer(
        dateReducer, {
            currentDate: new Date(),
            startDate: null,
            endDate: null,
            startBefore: -2,
            endAfter: 60,
            visibleDateStart: null,
            visibleDateEnd: null,
            dateRange: -1,
            selectedSingleDate: null
        },
    )
    return (
        <CompositeCalendarContext.Provider value={{
            stateDate, dispatchDate
        }}>{props.children}</CompositeCalendarContext.Provider>
    )
}

export default CompositeCalendarContext