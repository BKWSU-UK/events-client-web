import React from 'react'
import { useTranslation } from '../../i18n'
import CreateForm from '../forms/CreateForm'
import { GoogleMapsDisplay } from '../compositeCalendar/EventDateModal'
import { missesCoordinates } from '../../utils/googleCalendarUtils'

/**
 * The form location section.
 * @constructor
 */
const FormLocationSection = ({ev}) => {

    const { t } = useTranslation()
    const hasRegistration = ev.requiresRegistration
    const hasCoordinates = !missesCoordinates(ev)

    console.log('hasCoordinates', hasCoordinates)

    const applyHalfCol = () =>
        hasRegistration && hasCoordinates ? 'col-sm-6' : ''

    return (
        <div className="row">
            {hasRegistration && <div
                className={`col - 12 ${applyHalfCol()} calendar-details-form`}>
                <h6 className="calendar-please-register">Please register for
                    this event</h6>
                <CreateForm currentEvent={ev}/>
            </div>}
            {hasCoordinates && <div
                className={`col - 12 ${applyHalfCol()} calendar-details-google-map`}>
                <GoogleMapsDisplay event={ev} useWrapper={false}/>
            </div>}
        </div>
    )
}

export default FormLocationSection