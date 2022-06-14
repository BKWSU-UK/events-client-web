import React, { useContext, useEffect, useMemo } from 'react'
import CompositeCalendarContext, {
    CARD_TYPE,
    DATE_ACTIONS,
} from '../../../context/CompositeCalendarContext'
import { useTranslation } from '../../../i18n'
import { monthStartAndEnd } from '../../../utils/dateUtils'

const CARD_TYPE_KEY = 'cardType'

/**
 * Used to switch between the calendar modes.
 * @returns {JSX.Element}
 * @constructor
 */
export const CalendarModes = () => {
    const { stateDate, dispatchDate } = useContext(CompositeCalendarContext)
    const { t } = useTranslation()

    const setCardType = (cardType) => {
        dispatchDate({
            type: DATE_ACTIONS.CHANGE_CARD_TYPE,
            payload: { cardType },
        })
        window.localStorage.setItem(CARD_TYPE_KEY, cardType)
    }

    useEffect(() => {
        const cardType = window.localStorage.getItem(CARD_TYPE_KEY)
        if (!!cardType) {
            setCardType(parseInt(cardType))
        }
    }, [])

    const activateTable = () => setCardType(CARD_TYPE.IMAGE_CARD)

    const activateAgenda = () => setCardType(CARD_TYPE.LONG_CARD)

    const activateMonth = () => {
        const { monthStart, monthEnd } = monthStartAndEnd(stateDate.selectedSingleDate)
        dispatchDate({
            type: DATE_ACTIONS.SELECT_MONTH,
            payload: {
                selectedSingleDate: stateDate.selectedSingleDate,
                visibleDateStart: monthStart,
                visibleDateEnd: monthEnd
            },
        })
        window.localStorage.setItem(CARD_TYPE_KEY, CARD_TYPE.MONTH)
    }

    const activeOnType = (cardType) => stateDate.cardType === cardType &&
        'active'

    const caledarModes = useMemo(() => [
        {
            cardType: CARD_TYPE.LONG_CARD,
            func: activateAgenda,
            label: 'Agenda',
        },
        {
            cardType: CARD_TYPE.MONTH,
            func: activateMonth,
            label: 'month',
        },
        {
            cardType: CARD_TYPE.IMAGE_CARD,
            func: activateTable,
            label: 'Table',
        },

    ], [])

    return (
        <>
            {caledarModes.map((ct, i) => (
                <button key={i} type="button" data-toggle="button"
                        className={`btn btn-info ${activeOnType(ct.cardType)}`}
                        onClick={ct.func}>{t(ct.label)}</button>
            ))}
        </>
    )

}

export default CalendarModes