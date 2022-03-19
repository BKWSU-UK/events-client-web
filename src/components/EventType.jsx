import React from "react";

import {eventMap} from "./EventDisplay";
import {useTranslation} from "../i18n";

export default function EventType({eventTypeInt}) {
    const { t } = useTranslation();

    return (
        <p className="lead">{t(eventMap["" + eventTypeInt])}</p>
    )
}