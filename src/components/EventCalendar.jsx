import React, { useEffect, useState } from 'react'
import { extractParameter } from '../utils/paramExtraction'
import { fetchEventList } from '../service/dataAccess'

const EventCalendar = (props) => {
    const orgId = extractParameter(props, 'orgId', 2);

    useEffect(() => {
        fetchEventList(setEvents, data, params);
    })
}