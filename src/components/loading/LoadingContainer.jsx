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

    return !props.data || props.isLoading ? <Loader /> : props.error ? <div>{t('An error has occurred.')}</div> : props.children
}

export default LoadingContainer