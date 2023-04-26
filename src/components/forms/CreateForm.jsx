import React, { useContext, useRef, useState } from 'react'
import EventContext from '../../context/EventContext'
import { SERVER_BASE } from '../../apiConstants'
import { extractParameter } from '../../utils/paramExtraction'
import { Form } from 'react-formio'
import { formTranslations_en_gb } from './formTranslations_en_gb'
import { formTranslation_pt_br } from './formTranslation_pt_br'
import { formTranslation_de_de } from './formTranslation_de_de'

const _Webform = require('formiojs/Webform').default

_Webform.prototype.showErrors = function showErrors (error) {
  const validationErrors = error?.validationErrors
  if (!!validationErrors) {
    const errorHtml = validationErrors.map(
      ve => `<li class="list-group-item list-group-item-action list-group-item-danger">${ve.name}: ${ve.errorMessage}</li>`).
      join('')
    let formIOContainer = window.document.querySelector(
      '#formIOContainer')
    formIOContainer.innerHTML = `<ul class="list-group">${errorHtml}</ul>`
    window.document.getElementById('formIOContainerScroller').scrollIntoView()
  }
  return []
}

export const eventDateIdAdapter = (currentEvent) => {
  const event = currentEvent.currentEvent
  return !!event.eventDateId ? event.eventDateId :
    !!event.dateList && event.dateList.length > 0
      ? event.dateList[0].eventDateId
      : -1
}

export default function CreateForm (currentEvent) {
  const eventContext = useContext(EventContext)
  // Used to hide the form on successful submission.
  const [hideForm, setHideForm] = useState(false)
  const targetUrl = `${SERVER_BASE}/FormIOGeneration.do?eventDateId=${eventDateIdAdapter(
    currentEvent)}&addSubmit=true`
  const formLanguage = extractParameter({ ...eventContext }, 'language') || 'en-GB'
  const formSuccessMessage = extractParameter({ ...eventContext }, 'formSuccessMessage')
  const formIOContainer = useRef()
  const formComponent = useRef()

  const formOptions = {
    language: formLanguage,
    i18n: {
      'en-GB': formTranslations_en_gb,
      'pt-BR': formTranslation_pt_br,
      'de-DE': formTranslation_de_de,
    },
  }

  const formOptionsClone = JSON.parse(JSON.stringify(formOptions))

  const forceTranslate = (selector, translationKey) => {
    const el = document.querySelector(selector)
    // Hack to get the translation working.
    if (!!el && !!formOptionsClone['i18n'][formLanguage]) {
      el.textContent = formOptionsClone['i18n'][formLanguage]['translation'][translationKey]
    }
  }

  const onFormLoad = () => forceTranslate('button[type=\'submit\']', 'Submit')

  const resetForm = () => {
    const current = formComponent.current
    current.formio.emit('resetForm')
  }

  const onSubmitDone = (e) => {

    const getMethods = (obj) => Object.getOwnPropertyNames(obj).filter(item => typeof obj[item] === 'function')

    forceTranslate('div[role=\'alert\'] > p', 'complete')

    setTimeout(() => {
        forceTranslate('span[ref=\'buttonMessage\']', 'complete')
      },
      1000)
    resetForm()
    if(!!formSuccessMessage) {
      setHideForm(true)
    }
  }

  // The submit handler
  const onSubmit = () => {
    formIOContainer.current.innerHTML = ''
  }

  // The Form IO form with the on submit event handler
  return (
    <>
      {!hideForm && <>
          <div id="formIOContainerScroller"/>
          <div id="formIOContainer" ref={formIOContainer}/>
        </>
      }

      {hideForm && formSuccessMessage &&
        <div id="formSuccessMessage" dangerouslySetInnerHTML={{__html: formSuccessMessage}}/> }

      {!hideForm && <Form src={targetUrl}
             onFormLoad={onFormLoad}
             options={formOptions}
             onSubmitDone={onSubmitDone}
             onSubmit={onSubmit}
             ref={formComponent}
      />}
    </>
  )

}