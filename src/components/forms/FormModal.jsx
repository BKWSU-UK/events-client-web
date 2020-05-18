import React from "react";
import {Form} from 'react-formio';
import makeModal from "../simpleModal/makeModal";

export function createForm(currentEvent) {
    const targetUrl = `https://events.brahmakumaris.org/bkregistration/FormIOGeneration.do?eventDateId=${currentEvent.eventDateId}&addSubmit=true`;
    return (
        <>
        <div id="formIOContainer"/>
        <Form src={targetUrl} options={{
            language: 'en-GB',
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
                        confirmCancel: 'Are you sure you want to cancel?',
                        saveDraftInstanceError: 'Cannot save draft because there is no formio instance.',
                        saveDraftAuthError: 'Cannot save draft unless a user is authenticated.',
                        restoreDraftInstanceError: 'Cannot restore draft because there is no formio instance.',
                    }
                }
                }
            }
        }/>
            </>
            )
// const targetUrl = `http://gil.brahmakumaris.org:8085/FormIOGeneration.do?eventDateId=${currentEvent.eventDateId}&addSubmit=true`;
//     return <>
//         <div id="formIOContainer"/>
//         <Form src={targetUrl}
//               onSubmitDone={(response) => {
//                   console.log('onSubmitDone', response);
//                   return false;
//               }} onError={(response) => {
//             console.log('onError', response);
//             // Used to inject the errors into the message.
//             const validationErrors = response[0].validationErrors;
//             Array.from(document.getElementsByTagName('li')).filter(e => e.getAttribute("ref") === "errorRef")[0]
//                 .innerHTML = validationErrors.map(ve => {
//                 return `<p>${ve.errorMessage}</p>`
//             }).join(' ');
//         }}/>
//     </>;
        }

            /**
             * Modal used to display forms.
             * @param show Determines, if the form is displayed or not.
             * @param setShow The function invoked when the modal is closed.
             * @param currentEvent The current event with all properties.
             * @constructor
             */
              function EventForm({show, setShow, currentEvent}) {
        return (
        <>
        <h2 id="eventDisplayName">{currentEvent.name}</h2>
        <div className="row-fluid">
            <div className="col-sd-12">
                {createForm(currentEvent)}
            </div>
        </div>
        </>
        );
        }

const FormModal = makeModal(EventForm);

export default FormModal;