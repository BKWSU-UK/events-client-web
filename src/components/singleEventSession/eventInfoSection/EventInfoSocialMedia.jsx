import React, { useContext } from 'react'
import EventInfoContainer from './EventInfoContainer'
import { useTranslation } from '../../../i18n'
import EventContext from '../../../context/EventContext'

/**
 * Social Media buttons.
 * @constructor
 */
const EventInfoSocialMedia = ({ev}) => {

    const { t } = useTranslation()
    const { eventsConfig } = useContext(EventContext)
    const facebookShareImage = eventsConfig.facebookShareImage || '/assets/images/calendar_facebook.png'
    const twitterShareImage = eventsConfig.twitterShareImage || '/assets/images/calendar_twitter.png'
    const mailShareImage = eventsConfig.mailShareImage || '/assets/images/calendar_mail.png'

    const encodedURL = encodeURI(window.location.href)

    const eventName = ev.name

    const moreInfoAbout = t('More informations about this event on')

    return (
        <EventInfoContainer>
            <div className="calendar-flex-icon">
                <a href={`http://www.facebook.com/sharer.php?u=${encodedURL}`}><img src={facebookShareImage} alt={t('Share on Facebook')}/></a>
            </div>
            <div className="calendar-flex-icon">
                <a href={`http://twitter.com/share?text=${encodeURI(eventName)}&url=${encodedURL}`}><img src={twitterShareImage} alt={t('Share on Twitter')}/></a>
            </div>
            <div className="calendar-flex-icon">
                <a href={`mailto:?subject=${eventName}&body=${moreInfoAbout} ${encodedURL}`}><img src={mailShareImage} alt={t('Share via Email')}/></a>
            </div>
        </EventInfoContainer>
    )
}

export default EventInfoSocialMedia