import React from 'react'
import { useTranslation } from '../../i18n'

/**
 * The speaker section.
 * @constructor
 */
const SpeakerSection = ({ev}) => {

    const { t } = useTranslation()
    const speaker = ev.speaker

    let speakerImage = ev.image3
    if(!!speakerImage) {
        if(speakerImage.startsWith("/imageupload")) {
            speakerImage = "https://events.brahmakumaris.org" + speakerImage
        }
    }

    if(!speaker || !speakerImage) {
        return <></>
    }

    return (
        <div className="row calendar-speaker-main">
            <div className="col-12 col-sm-6 col-lg-7 col-xl-8 calendar-speaker-bio">
                <div className="row">
                    <div className="col-12">
                        <h4 className="calendar-speaker-title">{t('About Our Speaker')}</h4>
                        <h4>{speaker}</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                    </div>
                </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-5 col-xl-4 calendar-speaker-img-container">
                {speakerImage && <div className="calendar-speaker-img"
                      style={{ background: `url('${speakerImage}') center center / cover no-repeat` }}/>}
            </div>
        </div>
    )
}

export default SpeakerSection