import React from 'react'
import { useTranslation } from '../../i18n'
import Loader from './Loader'

/**
 * Container used to display the loading and error states.
 * @param props
 * @returns {JSX.Element|*}
 * @constructor
 */
const LoadingContainer = (props) => {
    const { t } = useTranslation()
    if(!props.data || props.isLoading) {
        return <Loader />
    }
    if(props.error) {
        return <div className="error">{t('An error has occurred.')}</div>
    }
    if(Array.isArray(props.data) && props.data.length === 0) {
        return <div className="warning">{t('No events found')}</div>
    }
    return props.children
}

export default LoadingContainer