import React from 'react'

const EventExtraInfo = ({currentEvent, limit = 70}) => {
    let text = currentEvent.shortDescription || currentEvent.subTitle || currentEvent.descriptionText
    if(text?.length > limit) {
        text = `${text.slice(0, limit)} ...`
    }
    return (
        <div className="row event-extra-info">
            <div className="col-12 text-muted mt-1">
                {text}
            </div>
        </div>
    )
}

export default EventExtraInfo