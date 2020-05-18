import React from "react";
import {useTranslation} from "../../i18n";

function CloseButton({onClick, cross=false}) {
    const { t } = useTranslation();
    if(cross) {
        return (
            <button type="button" className="close" aria-label="Close" onClick={onClick}>
                <span aria-hidden="true">&times;</span>
            </button>
        )
    }
    return (
        <button className="btn btn-info" onClick={onClick}>{t('back-to-events')}</button>
    )
}

export default function makeModal(WrappedComponent) {
    return class extends React.Component {

        constructor(props) {
            super(props);
        }

        closeClick = () => {
            this.props.setShow(false);
            this.props.setEventTableVisible(true);
            document.getElementsByTagName("body")[0].style = "overflow-y: scroll";
        };

        render() {
            if (this.props.show) {
                this.props.setEventTableVisible(false);
                if(window.eventsConfig.useBodyHiddenOverflow) {
                    document.getElementsByTagName("body")[0].style = "overflow-y: hidden";
                }
                return (
                    <div className="simple-overlay">
                        <CloseButton cross={true} onClick={this.closeClick} />
                        <WrappedComponent {...this.props} />
                        <br/>
                        <CloseButton onClick={this.closeClick}/>
                    </div>
                );
            } else {
                return <></>
            }
        }
    }
};