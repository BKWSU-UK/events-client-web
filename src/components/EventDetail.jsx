import React from 'react'
import { withRouter } from 'react-router-dom'
import { ReadMore } from './readMore/ReadMore'
import DetailRenderer from './DetailRenderer'

/**
 * Displays an event using the event identifier.
 * @param props Contains router related properties we might want to keep.
 * @returns {JSX.Element}
 * @constructor
 */
function EventDetail (props) {

    return (
        <DetailRenderer origProps={props}>
            <ReadMore />
        </DetailRenderer>
    )
}

export default withRouter(EventDetail)