import React, { useContext, useEffect, useRef, useState } from "react";
import EventContext from "../../context/EventContext";
import { SERVER_BASE } from "../../apiConstants";
import { extractParameter } from "../../utils/paramExtraction";
import { Form } from "react-formio";
import { formTranslations_en_gb } from "./formTranslations_en_gb";
import { formTranslation_pt_br } from "./formTranslation_pt_br";
import { formTranslation_de_de } from "./formTranslation_de_de";
import { fetchEventFormResponse } from "../../service/dataAccess";

const _Webform = require("formiojs/Webform").default;

_Webform.prototype.showErrors = function showErrors(error) {
  const validationErrors = error?.validationErrors;
  if (!!validationErrors) {
    const errorHtml = validationErrors
      .map(
        (ve) =>
          `<li class="list-group-item list-group-item-action list-group-item-danger">${ve.name}: ${ve.errorMessage}</li>`,
      )
      .join("");
    let formIOContainer = window.document.querySelector("#formIOContainer");
    formIOContainer.innerHTML = `<ul class="list-group">${errorHtml}</ul>`;
    window.document.getElementById("formIOContainerScroller").scrollIntoView();
  }
  return [];
};

export const eventDateIdAdapter = (currentEvent) => {
  const event = currentEvent.currentEvent;
  return !!event.eventDateId
    ? event.eventDateId
    : !!event.dateList && event.dateList.length > 0
      ? event.dateList[0].eventDateId
      : -1;
};

export function injectParameters(components) {
  const url = new URL(window.location.href);
  const searchParams = url.searchParams;
  const booleanComponents = ["newsletter", "checkbox"];
  if (searchParams) {
    components.forEach((component) => {
      console.info("component", component);
      const key = component?.component?.key;
      if (key) {
        const value = searchParams.get(key);
        if (value) {
          const type = component.type;
          if (booleanComponents.includes(type)) {
            if ("true" === value) {
              component.setValue(true);
            }
          } else {
            component.setValue(value);
          }
        }
      }
    });
  }
}

/**
 * Used to display missing fields.
 * @constructor
 */
function ShowMissingFields({ formComponent, changeCount }) {
  const [displayMissing, setDisplayMissing] = useState(false);
  const requiredFields = formComponent?.current?.formio?.components?.filter(
    (c) => c.component.validate.required,
  );

  useEffect(
    () => window.scrollTo(0, document.body.scrollHeight),
    [displayMissing],
  );

  const handleClick = (e, c) => {
    const element =
      document.querySelector(`#${c.component.id} div[tabindex]`) ??
      document.querySelector(`#${c.component.id} input`);
    if (!!element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
      element.focus();
    }
    e.preventDefault();
  };

  const data = !!requiredFields ? requiredFields[0]?.data : {};

  return (
    <>
      {!displayMissing && (
        <a
          href="#"
          onClick={(e) => {
            setDisplayMissing(true);
            e.preventDefault();
          }}
        >
          Show required fields
        </a>
      )}
      {displayMissing && (
        <a
          href="#"
          onClick={(e) => {
            setDisplayMissing(false);
            e.preventDefault();
          }}
        >
          Hide required fields
        </a>
      )}
      {displayMissing && changeCount && (
        <ul className="missing-fields">
          {requiredFields.map((c, i) => {
            const value = !!data && !!data[c.key] ? `: ${data[c.key]}` : "";
            return (
              <li key={`missing_field_${i}`}>
                <a
                  href="#"
                  className={`${!value ? "text-danger" : ""}`}
                  onClick={(e) => handleClick(e, c)}
                >
                  {c.label} {value}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

function getGlobalThis() {
  return typeof globalThis !== 'undefined' ? globalThis : window;
}

export default function CreateForm(currentEvent) {
  const eventContext = useContext(EventContext);
  // Used to hide the form on successful submission.
  const [hideForm, setHideForm] = useState(false);
  const [changeCount, setChangeCount] = useState(1);
  const formResponse = useRef({ formResponseHtml: "" })
  const targetUrl = `${SERVER_BASE}/FormIOGeneration.do?eventDateId=${eventDateIdAdapter(
    currentEvent,
  )}&addSubmit=true`;
  const formLanguage =
    extractParameter({ ...eventContext }, "language") || "en-GB";
  const formSuccessMessage = extractParameter(
    { ...eventContext },
    "formSuccessMessage",
  );
  const showMissingFields = extractParameter(
    { ...eventContext },
    "formShowMissingFields",
  );
  const formIOContainer = useRef();
  const formComponent = useRef();

  const formOptions = {
    language: formLanguage,
    i18n: {
      "en-GB": formTranslations_en_gb,
      "pt-BR": formTranslation_pt_br,
      "de-DE": formTranslation_de_de,
      "de": formTranslation_de_de,
      "en": formTranslations_en_gb,
      "pt": formTranslation_pt_br,
    },
  };

  useEffect(() => {
    hideButtonMessage()
  }, [])

  const formOptionsClone = JSON.parse(JSON.stringify(formOptions));

  function showButtonMessage() {
    const el = getGlobalThis().document.querySelector("span[ref='buttonMessage']");
    if (!!el) {
      el.style.display = "block";
    }
  }

  function hideButtonMessage() {
    const el = getGlobalThis().document.querySelector("span[ref='buttonMessage']");
    if (!!el) {
      el.style.display = "none";
    }
  }

  const forceTranslate = (selector, translationKey) => {
    const el = getGlobalThis().document.querySelector(selector);
    // Hack to get the translation working.
    if (!!el && !!formOptionsClone["i18n"]) {
      const language = Object.keys(formOptionsClone["i18n"]).includes(formLanguage) ? formLanguage : "en-GB"
      el.textContent = formOptionsClone["i18n"][language]["translation"][translationKey];
    }
  };

  const onFormLoad = () => {
    forceTranslate("button[type='submit']", "Submit");
    const formInstance = formComponent.current?.instance?.instance;
    if (!!formInstance) {
      formInstance.components
        .filter((c) => c.component.validate.required)
        .forEach((c) => {
          const element = document.querySelector(`#${c.component.id} label`);
          if (!!element && !element.classList.contains("field-required")) {
            element.classList.add("field-required");
          }
        });
      injectParameters(formInstance.components);
      fetchEventFormResponse(currentEvent.currentEvent.id)
        .then(res => {
          formResponse.current = res
          console.info("formResponse.current", formResponse.current)
        })
    }
  };

  const resetForm = () => {
    const current = formComponent.current;
    hideButtonMessage()
    current.formio.emit("resetForm");
  };

  const onSubmitDone = () => {
    debugger
    const translationKey = "Registration successful";
    forceTranslate("div[role='alert'] > p", translationKey);

    setTimeout(() => {
      showButtonMessage()
      forceTranslate("span[ref='buttonMessage']", translationKey);
    }, 200);
    resetForm();
    if (!!formSuccessMessage) {
      setHideForm(true);
    }
    const formResponseRedirect = formResponse.current?.formResponseRedirect
    if (formResponseRedirect && ["https://", "http://"].some(prefix => formResponseRedirect.startsWith(prefix))) {
      window.location.href = formResponseRedirect
    }
  };

  // The submit handler
  const onSubmit = () => {
    formIOContainer.current.innerHTML = "";
  };

  // The Form IO form with the on submit event handler
  return (
    <>
      {!hideForm && (
        <>
          <div id="formIOContainerScroller" />
          <div id="formIOContainer" ref={formIOContainer} />
        </>
      )}

      {hideForm && formSuccessMessage && (
        <>
          <div
            id="formSuccessMessage"
            dangerouslySetInnerHTML={{ __html: formSuccessMessage }}
          />
        </>
      )}

      {hideForm && formResponse.current?.formResponseHtml && <div id="formResponseHtml"
        dangerouslySetInnerHTML={{ __html: formResponse.current.formResponseHtml }} />}

      {!hideForm && (
        <Form
          src={targetUrl}
          onFormLoad={onFormLoad}
          options={formOptions}
          onSubmitDone={onSubmitDone}
          onChange={() => setChangeCount(changeCount + 1)}
          onSubmit={onSubmit}
          ref={formComponent}
        />
      )}
      {!hideForm && !!showMissingFields && (
        <ShowMissingFields
          formComponent={formComponent}
          changeCount={changeCount}
        />
      )}
    </>
  );
}
