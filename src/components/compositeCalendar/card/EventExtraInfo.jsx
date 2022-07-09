import React from 'react'
import linkifyHtml from 'linkifyjs/html'

const EventExtraInfo = ({currentEvent, limit = 70, linkify=false}) => {
    let text = currentEvent.shortDescription || currentEvent.subTitle || currentEvent.descriptionText
    if(text?.length > limit) {
        text = `${text.slice(0, limit)} ...`
    }
    if(linkify) {
        text = linkifyHtml(text, {
            defaultProtocol: 'https',
        })
    }
    return (
        <div className="row event-extra-info">
            <div className="col-12 text-muted mt-1" dangerouslySetInnerHTML={{__html: text}} />
        </div>
    )
}

export default EventExtraInfo