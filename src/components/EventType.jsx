import React from "react";

import {eventMap} from "./EventDisplay";
import {useTranslation} from "../i18n";

const { t } = useTranslation();

export default function EventType({eventTypeInt}) {
    return (
        <p className="lead">{t(eventMap["" + eventTypeInt])}</p>
    )
}