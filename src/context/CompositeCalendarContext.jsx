import React, { createContext, useReducer } from 'react'
import { dateDiff } from '../utils/dateUtils'

const CompositeCalendarContext = createContext()

export const DATE_ACTIONS = {
    SET_DATE: 'SET_DATE',
    INIT_DATE: 'INIT_DATE',
    SET_PERIOD: 'SET_PERIOD',
    SET_RANGE: 'SET_RANGE',
    SELECT_SINGLE_DATE: 'SELECT_SINGLE_DATE',
    SET_DATE_COUNTS: 'SET_DATE_COUNTS',
    SHOW_MODAL_EVENT_DATE: 'SHOW_MODAL_EVENT_DATE',
    HIDE_MODAL_EVENT_DATE: 'HIDE_MODAL_EVENT_DATE',
    CHANGE_CARD_TYPE: 'CHANGE_CARD_TYPE'
}

export const CARD_TYPE = {
    LONG_CARD: 0,
    IMAGE_CARD: 1
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
        case DATE_ACTIONS.INIT_DATE: {
            const dateRange = state.dateRange
            console.log('dateRange', dateRange)
            const now = new Date()
            const startDate = dateDiff(now, state.startBefore)
            const endDate = dateDiff(now, state.endAfter)
            return {
                ...state,
                currentDate: now,
                startDate: startDate,
                endDate: endDate,
                visibleDateStart: startDate,
                visibleDateEnd: calculateVisibleEndDate(dateRange, startDate),
                selectedSingleDate: now
            }
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
            if(state.selectedSingleDate?.getTime() === action.payload.selectedSingleDate.getTime()) {
                return {
                    ...state,
                    selectedSingleDate: null
                }
            }
            return {
                ...state,
                selectedSingleDate: action.payload.selectedSingleDate
            }
        }
        case DATE_ACTIONS.SET_DATE_COUNTS: {
            return {
                ...state,
                groupedCount: { ...state.groupedCount, ...action.payload.groupedCount }
            }
        }
        case DATE_ACTIONS.SHOW_MODAL_EVENT_DATE: {
            return {
                ...state,
                modalEventDateId: action.payload.modalEventDateId
            }
        }
        case DATE_ACTIONS.HIDE_MODAL_EVENT_DATE: {
            return {
                ...state,
                modalEventDateId: null
            }
        }
        case DATE_ACTIONS.CHANGE_CARD_TYPE: {
            return {
                ...state,
                cardType: action.payload.cardType
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
            selectedSingleDate: null,
            groupedCount: null,
            modalEventDateId: null,
            cardType: CARD_TYPE.LONG_CARD
        },
    )
    return (
        <CompositeCalendarContext.Provider value={{
            stateDate, dispatchDate
        }}>{props.children}</CompositeCalendarContext.Provider>
    )
}

export default CompositeCalendarContext