import EmailComponent from 'formiojs/components/email/Email';
import {isChrome} from "../../../utils/browserDetection";

/**
 * Email confirmation component that inherits from the original email component.
 */
export default class EmailConfirmation extends EmailComponent {

    constructor(component, options, data) {
        super(component, options, data);
    }

    /**
     * This component is only valid in case the checkbox is ticked.
     * @param data
     * @param dirty
     * @param row
     * @returns {*|string}
     */
    checkComponentValidity = (data, dirty, row) => {
        const res = super.checkComponentValidity(data, dirty, row);
        const key = this.key;
        return res && Object.entries(data).some(e => {
            return e[1] === this.getValue() && key !== e[0];

        });
    };

    /**
     * Injects into the DOM autocomplete
     *
     * @param element
     * #returns ReactInstance
     */
    attach(element) {
        console.log(this, typeof element);
        const inputElements = element.getElementsByTagName('input');
        [...inputElements].forEach(input => {
            var att = document.createAttribute("autocomplete");
            att.value = isChrome ? "nope" : "off";
            input.setAttributeNode(att);
        });
        return super.attach(element);
    }
}