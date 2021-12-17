import { useContext, useEffect, useState } from 'react'
import { fetchOrganisations } from '../service/dataAccess'
import React, { Component }  from 'react';
import EventContext, { ALL_ORG_IDS } from '../context/EventContext'
import { useTranslation } from '../i18n'

/**
 * Filter for the centers.
 * @returns {JSX.Element}
 * @constructor
 */
const CenterFilter = () => {

    const [orgInfo, setOrgInfo] = useState([])
    const {orgIdFilter, setOrgIdFilter} = useContext(EventContext);
    const {t} = useTranslation();

    useEffect(() => {
        async function fetchOrgInfo() {
            const orgInfoJson = window.eventsConfig.displayOrgFilter && await fetchOrganisations(window.eventsConfig.orgId) || []
            setOrgInfo(orgInfoJson)
        }
        fetchOrgInfo()
    }, [])

    const changeOrgIdFilter = (e) => {
        const value = e.target.value
        setOrgIdFilter(value)
    }

    return window.eventsConfig.displayOrgFilter && <div className="row mt-2 mb-2 center-filter">
        <div className="col-md-12"><label className="col-form-label" htmlFor="centre-list">{t('Centre')}:</label></div>
        <div className="col-md-12">
            <select id="centre-list" className="form-control" value={orgIdFilter} onChange={changeOrgIdFilter}>
                <option key={ALL_ORG_IDS} value={ALL_ORG_IDS} title={orgInfo.map(e => e.name).join(", ")}>{t('-- Select option --')}</option>
                {orgInfo.map((org, i) => {
                    return <option key={i} value={org.id}>{org.name} ({org.futureCount})</option>
                })}
            </select>
        </div>
    </div>
}

export default CenterFilter