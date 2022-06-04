import React, { useContext } from 'react'
import EventContext from '../../context/EventContext'
import { SERVER_BASE } from '../../apiConstants'
import { extractParameter } from '../../utils/paramExtraction'
import { Form } from 'react-formio'

export const eventDateIdAdapter = (currentEvent) => {
    const event = currentEvent.currentEvent
    return !!event.eventDateId ? event.eventDateId :
        !!event.dateList && event.dateList.length > 0 ? event.dateList[0].eventDateId  : -1
}

export default function CreateForm (currentEvent) {
    const eventContext = useContext(EventContext)
    const targetUrl = `${SERVER_BASE}/FormIOGeneration.do?eventDateId=${eventDateIdAdapter(currentEvent)}&addSubmit=true`
    const formLanguage = extractParameter({...eventContext}, 'language') || 'en-GB'

    const formOptions = {
        language: formLanguage,
        i18n: {
            'en-GB': {
                translation: {
                    complete: 'Submission Complete',
                    error: 'Please fix the following errors before submitting.',
                    submitError: 'Please check the form and correct all errors before submitting.',
                    required: '{{field}} is required',
                    unique: '{{field}} must be unique',
                    array: '{{field}} must be an array',
                    array_nonempty: '{{field}} must be a non-empty array', // eslint-disable-line camelcase
                    nonarray: '{{field}} must not be an array',
                    select: '{{field}} contains an invalid selection',
                    pattern: '{{field}} does not match the pattern {{pattern}}',
                    minLength: '{{field}} must have at least {{length}} characters.',
                    maxLength: '{{field}} must have no more than {{length}} characters.',
                    minWords: '{{field}} must have at least {{length}} words.',
                    maxWords: '{{field}} must have no more than {{length}} words.',
                    min: '{{field}} cannot be less than {{min}}.',
                    max: '{{field}} cannot be greater than {{max}}.',
                    maxDate: '{{field}} should not contain date after {{- maxDate}}',
                    minDate: '{{field}} should not contain date before {{- minDate}}',
                    maxYear: '{{field}} should not contain year greater than {{maxYear}}',
                    minYear: '{{field}} should not contain year less than {{minYear}}',
                    invalid_email: '{{field}} must be a valid email.', // eslint-disable-line camelcase
                    invalid_url: '{{field}} must be a valid url.', // eslint-disable-line camelcase
                    invalid_regex: '{{field}} does not match the pattern {{regex}}.', // eslint-disable-line camelcase
                    invalid_date: '{{field}} is not a valid date.', // eslint-disable-line camelcase
                    invalid_day: '{{field}} is not a valid day.', // eslint-disable-line camelcase
                    mask: '{{field}} does not match the mask.',
                    stripe: '{{stripe}}',
                    month: 'Month',
                    day: 'Day',
                    year: 'Year',
                    january: 'January',
                    february: 'February',
                    march: 'March',
                    april: 'April',
                    may: 'May',
                    june: 'June',
                    july: 'July',
                    august: 'August',
                    september: 'September',
                    october: 'October',
                    november: 'November',
                    december: 'December',
                    next: 'Next',
                    previous: 'Previous',
                    cancel: 'Cancel',
                    submit: 'Submit Form',
                    'Submit': 'Submit',
                    confirmCancel: 'Are you sure you want to cancel?',
                    saveDraftInstanceError: 'Cannot save draft because there is no formio instance.',
                    saveDraftAuthError: 'Cannot save draft unless a user is authenticated.',
                    restoreDraftInstanceError: 'Cannot restore draft because there is no formio instance.',
                },
            }, 'pt-BR': {
                translation: {
                    complete: 'Agradecemos sua inscrição! ' +
                        'Você agora receberá um email de confirmação. ' +
                        'Saudações de Paz, ' +
                        'Brahma Kumaris ',
                    error: 'Please fix the following errors before submitting.',
                    submitError: 'Please check the form and correct all errors before submitting.',
                    required: '{{field}} is required',
                    unique: '{{field}} must be unique',
                    array: '{{field}} must be an array',
                    array_nonempty: '{{field}} must be a non-empty array', // eslint-disable-line camelcase
                    nonarray: '{{field}} must not be an array',
                    select: '{{field}} contains an invalid selection',
                    pattern: '{{field}} does not match the pattern {{pattern}}',
                    minLength: '{{field}} must have at least {{length}} characters.',
                    maxLength: '{{field}} must have no more than {{length}} characters.',
                    minWords: '{{field}} must have at least {{length}} words.',
                    maxWords: '{{field}} must have no more than {{length}} words.',
                    min: '{{field}} cannot be less than {{min}}.',
                    max: '{{field}} cannot be greater than {{max}}.',
                    maxDate: '{{field}} should not contain date after {{- maxDate}}',
                    minDate: '{{field}} should not contain date before {{- minDate}}',
                    maxYear: '{{field}} should not contain year greater than {{maxYear}}',
                    minYear: '{{field}} should not contain year less than {{minYear}}',
                    invalid_email: '{{field}} must be a valid email.', // eslint-disable-line camelcase
                    invalid_url: '{{field}} must be a valid url.', // eslint-disable-line camelcase
                    invalid_regex: '{{field}} does not match the pattern {{regex}}.', // eslint-disable-line camelcase
                    invalid_date: '{{field}} is not a valid date.', // eslint-disable-line camelcase
                    invalid_day: '{{field}} is not a valid day.', // eslint-disable-line camelcase
                    mask: '{{field}} does not match the mask.',
                    stripe: '{{stripe}}',
                    month: 'Month',
                    day: 'Day',
                    year: 'Year',
                    january: 'January',
                    february: 'February',
                    march: 'March',
                    april: 'April',
                    may: 'May',
                    june: 'June',
                    july: 'July',
                    august: 'August',
                    september: 'September',
                    october: 'October',
                    november: 'November',
                    december: 'December',
                    next: 'Next',
                    previous: 'Previous',
                    cancel: 'Cancelar',
                    submit: 'Enviar',
                    'Submit': 'Enviar',
                    confirmCancel: 'Are you sure you want to cancel?',
                    saveDraftInstanceError: 'Cannot save draft because there is no formio instance.',
                    saveDraftAuthError: 'Cannot save draft unless a user is authenticated.',
                    restoreDraftInstanceError: 'Cannot restore draft because there is no formio instance.',
                },
            },
        },
    }

    const formOptionsClone = JSON.parse(JSON.stringify(formOptions))

    const forceTranslate = (selector, translationKey) => {
        const el = document.querySelector(selector)
        // Hack to get the translation working.
        if(!!el && !!formOptionsClone['i18n'][formLanguage]) {
            el.textContent = formOptionsClone['i18n'][formLanguage]['translation'][translationKey];
        }
    }

    const onFormLoad = () => forceTranslate('button[type=\'submit\']', 'Submit')

    const onSubmitDone = () => {
        forceTranslate('div[role=\'alert\'] > p', 'complete')
        setTimeout(() => forceTranslate('span[ref=\'buttonMessage\']', 'complete'), 1000)
    }

    return (
        <>
            <div id="formIOContainer"/>
            <Form src={targetUrl} onFormLoad={onFormLoad} options={formOptions} onSubmitDone={onSubmitDone}/>
        </>
    )

}