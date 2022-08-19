import React from 'react'
import linkifyHtml from 'linkifyjs/html'

/**
 * Contains the speaker description.
 * @constructor
 */
const SpeakerDescription = ({ev}) => {

    return (
        <div className="row countdown-speaker">
            {!!ev.speakerDescription && <div className="col-12" dangerouslySetInnerHTML={{
                __html: linkifyHtml(ev.speakerDescription, {
                    defaultProtocol: 'https',
                }),
            }}/>}
        </div>
    )
}

export default SpeakerDescription