import React, { useContext, useEffect } from 'react'
import CompositeCalendarContext, {
    CARD_TYPE,
    DATE_ACTIONS,
} from '../../../context/CompositeCalendarContext'
import { convertDate } from '../../../utils/dateUtils'
import { useTranslation } from '../../../i18n'

const CARD_TYPE_KEY = "cardType"

/**
 * Displays the buttons used to navigate the dates.
 * @returns {JSX.Element}
 * @constructor
 */
const SearchButtonsContainer = () => {

    const compositeCalendarContext = useContext(CompositeCalendarContext)
    const { stateDate, dispatchDate } = compositeCalendarContext
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
        if(!!cardType) {
            setCardType(parseInt(cardType))
        }
    }, [])

    const setToday = () => {
        dispatchDate({
            type: DATE_ACTIONS.SELECT_SINGLE_DATE,
            payload: { selectedSingleDate: new Date() },
        })
    }

    const onChangeDate = (e) => {
        const value = e.target.value
        if (!!value) {
            const splits = value.split('-')
            const year = parseInt(splits[0])
            const month = parseInt(splits[1])
            const day = parseInt(splits[2])
            const targetDate = new Date(year, month - 1, day)
            dispatchDate({
                type: DATE_ACTIONS.SELECT_SINGLE_DATE,
                payload: { selectedSingleDate: targetDate },
            })
        }
    }

    const convertDateToStr = (date) => {
        if (!date) {
            return ''
        }
        return convertDate(date)
    }



    const activateTable = () => setCardType(CARD_TYPE.IMAGE_CARD)

    const activateAgenda = () => setCardType(CARD_TYPE.LONG_CARD)

    return (
        <div className="row calendar-button-row">
            <div className="col-12 col-md-6 mb-3">
                <button type="button" className="calendar-today btn btn-info"
                        onClick={setToday}>&#128197; <span
                    className="d-none d-md-inline">{t('today')}</span></button>
                {' '}<input type="date" className="calendar-today btn btn-info"
                            onChange={onChangeDate}
                            value={convertDateToStr(
                                stateDate.selectedSingleDate)}/>
            </div>
            <div className="col-12 col-md-6 mb-3 text-right">
                <button type="button" className={`btn btn-info ${stateDate.cardType === CARD_TYPE.LONG_CARD && 'font-weight-bold'}`} onClick={activateAgenda}>{t('Agenda')}</button>
                <button type="button" className={`btn btn-info ${stateDate.cardType === CARD_TYPE.IMAGE_CARD && 'font-weight-bold'}`} onClick={activateTable}>{t('Table')}</button>
            </div>
        </div>
    )
}

export default SearchButtonsContainer