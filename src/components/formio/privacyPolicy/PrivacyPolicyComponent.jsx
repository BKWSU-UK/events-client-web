import AbstractReactComponent from '../AbstractReactComponent'
import { ReactComponent } from 'react-formio'
import ReactDOM from 'react-dom'
import React from 'react'
import editDummy from '../EditDummy'

/**
 * Label component used to separate
 */
export default class PrivacyPolicy extends AbstractReactComponent {

    setValue(value) {}

    /**
     * This function tells the form builder about your component. It's name, icon and what group it should be in.
     *
     * @returns {{title: string, icon: string, group: string, documentation: string, weight: number, schema: *}}
     */
    static get builderInfo() {
        return {
            title: 'Privacy Policy Component',
            icon: 'square',
            group: 'basic',
            documentation: '',
            weight: -10,
            schema: PrivacyPolicy.schema()
        };
    }

    /**
     * This function is the default settings for the component. At a minimum you want to set the type to the registered
     * type of your component (i.e. when you call Components.setComponent('type', MyComponent) these types should match.
     *
     * @returns {*}
     */
    static schema() {
        return ReactComponent.schema({
            type: 'privacyPolicy',
            label: 'Privacy Policy',
            hidden: true
        });
    }

    /**
     * This function is called when the DIV has been rendered and added to the DOM. You can now instantiate the react component.
     *
     * @param element
     * #returns ReactInstance
     */
    attachReact(element) {
        return ReactDOM.render(
            <div dangerouslySetInnerHTML={{__html: this.component.content}} /> ,
            element
        );
    }

    /**
     * Defines the settingsForm when editing a component in the builder.
     * Since there is no editing of forms in this app we simply point to a dummy.
     */
    static editForm = editDummy;

    checkComponentValidity = (data, dirty, row) => {
        return true;
    }

    labelIsHidden() {
        return true;
    }
}