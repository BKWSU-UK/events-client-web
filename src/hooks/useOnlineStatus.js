import { useContext } from 'react'
import CompositeCalendarContext, {
    DATE_ACTIONS,
    ONLINE_STATUS,
} from '../context/CompositeCalendarContext'
import { useTranslation } from '../i18n'

const useOnlineStatus = () => {
    const compositeCalendarContext = useContext(CompositeCalendarContext)
    const { stateCalendar, dispatchDate } = compositeCalendarContext
    const { t } = useTranslation()

    const activateOnline = () => {
        dispatchDate({
            type: DATE_ACTIONS.CHANGE_ONLINE_STATUS,
            payload: {
                onlineStatus: stateCalendar.onlineStatus === ONLINE_STATUS.ONLINE
                    ? ONLINE_STATUS.ALL
                    : ONLINE_STATUS.ONLINE
            },
        })
    }

    const activateInPerson = () => {
        dispatchDate({
            type: DATE_ACTIONS.CHANGE_ONLINE_STATUS,
            payload: {
                onlineStatus: stateCalendar.onlineStatus === ONLINE_STATUS.IN_PERSON
                    ? ONLINE_STATUS.ALL
                    : ONLINE_STATUS.IN_PERSON
            },
        })
    }

    return [stateCalendar, activateOnline, activateInPerson, t]
}

export default useOnlineStatus