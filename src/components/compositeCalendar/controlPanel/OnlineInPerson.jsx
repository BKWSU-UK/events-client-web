import React from 'react'
import { ONLINE_STATUS } from '../../../context/CompositeCalendarContext'
import useOnlineStatus from '../../../hooks/useOnlineStatus'

export const OnlineStatusButtonsRender = ({ stateCalendar, activateOnline, activateInPerson, t }) => {
    return (
        <>
            <button type="button" data-toggle="button"
                    className={`btn btn-info ${stateCalendar.onlineStatus ===
                    ONLINE_STATUS.ONLINE && 'active'} `}
                    onClick={activateOnline}>{t('online_state_Online')}</button>
            <button type="button" data-toggle="button"
                    className={`btn btn-info ${stateCalendar.onlineStatus ===
                    ONLINE_STATUS.IN_PERSON && 'active'}`}
                    onClick={activateInPerson}>{t(
                'online_state_In Person')}</button>
        </>
    )
}

/**
 * Online and in person buttons. This is a filter.
 * @constructor
 */
const OnlineStatusButtons = () => {

    const [stateCalendar, activateOnline, activateInPerson, t] = useOnlineStatus()

    return (
        <>
            <OnlineStatusButtonsRender t={t} activateInPerson={activateInPerson}
                                       activateOnline={activateOnline}
                                       stateCalendar={stateCalendar} />
        </>
    )

}

export default OnlineStatusButtons