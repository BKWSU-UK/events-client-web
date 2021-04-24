import React, { useContext } from 'react'
import EventContext from '../../context/EventContext'
import { extractParameter } from '../../utils/paramExtraction'
import { useTranslation } from '../../i18n'
import { eventMap } from '../EventDisplay'

/**
 * Simple component used to render similar events.
 * @returns {*|boolean|JSX.Element}
 * @constructor
 */
const RenderSimilarEvents = () => {
    const { similarEvents } = useContext(EventContext)
    const { t } = useTranslation()
    const showSimilarEvents = extractParameter(null, 'showSimilarEvents', false)
    if (showSimilarEvents) {
        return (
            similarEvents && similarEvents.length > 0 &&
            <>
                <h4>{t('Similar Events')}</h4>
                <div className="card card-body bg-light">
                    {similarEvents.map((event, i) => {
                        return (
                            <div className="row" key={i}>
                                <div className="col-sm-12">
                                    <h5>{event.eventName}</h5>
                                </div>
                                <div className="col-sm-12">
                                    <h6>{t(eventMap[event.eventTypeId])}</h6>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </>
        )
    }
    return <></>
}

export default RenderSimilarEvents