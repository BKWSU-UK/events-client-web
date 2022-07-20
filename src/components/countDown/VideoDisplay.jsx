import React, { useContext } from 'react'
import { EventCountdownContext } from '../../context/EventCountdownContext'

/**
 * Used to display avideo.
 * @constructor
 */
const VideoDisplay = () => {
    const { stateCountdownData } = useContext(EventCountdownContext)
    if(!stateCountdownData.data || stateCountdownData.data.length === 0 || !stateCountdownData.started) {
        return <></>
    }

    const ev = stateCountdownData.data[0]

    const isYoutube = ev.webcastUrl.includes('you')

    return (
        <div className="row video-container">{isYoutube &&
        <iframe src={ev.webcastUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen="" /> || ev.webcastUrl}</div>
    )
}

export default VideoDisplay