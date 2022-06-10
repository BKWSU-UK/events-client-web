import React from 'react'

const EventExtraInfo = ({currentEvent}) => {
    return (
        <div className="row event-extra-info">
            <div className="col-12 text-muted mt-1">
                {currentEvent.shortDescription}
            </div>
        </div>
    )
}

export default EventExtraInfo