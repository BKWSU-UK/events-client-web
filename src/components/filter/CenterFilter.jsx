import React, { useContext, useEffect, useMemo, useState } from 'react'
import EventContext, { ALL_ORG_IDS } from '../../context/EventContext'
import { useTranslation } from '../../i18n'
import {
    extractParameter
} from '../../utils/paramExtraction'
import { fetchOrganisations } from '../../service/dataAccess'
import { DISPLAY_ORG_FILTER } from '../../context/appParams'

/**
 * Filter for the centers.
 * @returns {JSX.Element}
 * @constructor
 */
const CenterFilter = () => {

    const [orgInfo, setOrgInfo] = useState([])
    const eventContext = useContext(EventContext)
    const {orgIdFilter, setOrgIdFilter} = eventContext;
    const {t} = useTranslation();

    useEffect(() => {
        async function fetchOrgInfo() {
            const orgInfoJson = extractParameter({...eventContext}, DISPLAY_ORG_FILTER) &&
                await fetchOrganisations(extractParameter({...eventContext}, 'orgId')) || []
            setOrgInfo(orgInfoJson)
        }
        fetchOrgInfo().catch((e) => {
            console.error('Failed to fetch organisation information', e)
        })
    }, [])

    const changeOrgIdFilter = (e) => {
        const value = e.target.value
        setOrgIdFilter(value)
    }

    const useOrgFilter = useMemo(() => extractParameter(eventContext, DISPLAY_ORG_FILTER), [])

    if(useOrgFilter) {
        return <div className="row mt-2 mb-2 center-filter">
            <div className="col-md-12">
                <label className="col-form-label"
                    htmlFor="centre-list">{t('Centre')}:</label>
            </div>
            <div className="col-md-12">
                <select id="centre-list" className="form-control"
                        value={orgIdFilter} onChange={changeOrgIdFilter}>
                    <option key={ALL_ORG_IDS} value={ALL_ORG_IDS}
                            title={orgInfo.map(e => e.name).join(", ")}>{t(
                        '-- Select option --')}</option>
                    {orgInfo.map((org, i) => {
                        return <option key={i}
                                       value={org.id}>{org.name} ({org.futureCount})</option>
                    })}
                </select>
            </div>
        </div>
    } else {
        return <></>
    }
}

export default CenterFilter