import React from 'react'
import { useTranslation } from '../../i18n'
import {
    extractParameter
} from '../../utils/paramExtraction'
import EventContext from '../../context/EventContext'

function CloseButton ({ onClick, cross = false, id = null }) {
    const { t } = useTranslation()
    if (cross) {
        return (
            <button type="button" className="close" aria-label="Close"
                    onClick={onClick} {...(id ? {id} : {})}>
                <span aria-hidden="true">&times;</span>
            </button>
        )
    }
    return (
        <button className="btn btn-info mb-3" onClick={onClick} {...(id ? {id} : {})}>{t(
            'back-to-events')}</button>
    )
}

export default function makeModal (WrappedComponent) {
    return class extends React.Component {

        static contextType = EventContext;

        constructor (props) {
            super(props)
        }

        closeClick = () => {
            this.props.setShow(false)
            this.props.setEventTableVisible(true)
            document.getElementsByTagName(
                'body')[0].style = 'overflow-y: scroll'
        }

        render () {
            if (this.props.show) {
                this.props.setEventTableVisible(false)
                if (extractParameter({...this.context}, 'useBodyHiddenOverflow')) {
                    document.getElementsByTagName(
                        'body')[0].style = 'overflow-y: hidden'
                }
                return (
                    <div className="simple-overlay">
                        {/*<CloseButton cross={true} onClick={this.closeClick} id="closeTop"/>*/}
                        <CloseButton onClick={this.closeClick} id="closeTop"/>
                        <WrappedComponent {...this.props} />
                        <br/>
                        <CloseButton onClick={this.closeClick}/>
                    </div>
                )
            } else {
                return <></>
            }
        }
    }
};