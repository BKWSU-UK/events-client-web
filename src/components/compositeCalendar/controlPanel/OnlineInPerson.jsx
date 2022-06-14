import { useTranslation } from '../../../i18n'
import React, { useContext } from 'react'
import CompositeCalendarContext, {
    DATE_ACTIONS,
    ONLINE_STATUS,
} from '../../../context/CompositeCalendarContext'

/**
 * Online and in person buttons.
 * @constructor
 */
const OnlineStatusButtons = () => {

    const compositeCalendarContext = useContext(CompositeCalendarContext)
    const { stateDate, dispatchDate } = compositeCalendarContext
    const { t } = useTranslation()

    const activateOnline = () => {
        dispatchDate({
            type: DATE_ACTIONS.CHANGE_ONLINE_STATUS,
            payload: {
                onlineStatus: stateDate.onlineStatus === ONLINE_STATUS.ONLINE
                    ? ONLINE_STATUS.ALL
                    : ONLINE_STATUS.ONLINE
            },
        })
    }

    const activateInPerson = () => {
        dispatchDate({
            type: DATE_ACTIONS.CHANGE_ONLINE_STATUS,
            payload: {
                onlineStatus: stateDate.onlineStatus === ONLINE_STATUS.IN_PERSON
                    ? ONLINE_STATUS.ALL
                    : ONLINE_STATUS.IN_PERSON
            },
        })
    }

    return (
        <>
            <button type="button" data-toggle="button"
                    className={`btn btn-info ${stateDate.onlineStatus ===
                    ONLINE_STATUS.ONLINE && 'active'} `}
                    onClick={activateOnline}>{t('online_state_Online')}</button>
            <button type="button" data-toggle="button"
                    className={`btn btn-info ${stateDate.onlineStatus ===
                    ONLINE_STATUS.IN_PERSON && 'active'}`}
                    onClick={activateInPerson}>{t('online_state_In Person')}</button>
        </>
    )

}

export default OnlineStatusButtons