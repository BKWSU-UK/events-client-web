import React from "react";

import {useTranslation} from "../i18n";
import { eventMap } from '../service/dataAccessConstants'

export default function EventType({eventTypeInt}) {
    const { t } = useTranslation();

    return (
        <p className="lead">{t(eventMap[eventTypeInt])}</p>
    )
}