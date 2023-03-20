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
  const { data } = props
  const { t } = useTranslation()
  if (!data || props.isLoading) {
    return <Loader/>
  }
  if (props.error) {
    const errorMessage = props.errorMessage ?? 'An error has occurred.'
    return <div className="error">{t(errorMessage)}</div>
  }
  if (Array.isArray(data) && data.length === 0) {
    const noDataMessage = props.noDataMessage ?? 'No events found'
    return <div className="warning">{t(noDataMessage)}</div>
  }
  return props.children
}

export default LoadingContainer