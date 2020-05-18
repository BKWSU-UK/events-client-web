import AbstractReactComponent from "../AbstractReactComponent";
import {ReactComponent} from "react-formio";
import ReactDOM from "react-dom";
import React from "react";
import LabelRenderer from "./LabelRenderer";
import editDummy from "../EditDummy";

/**
 * Label component used to separate
 */
export default class Label extends AbstractReactComponent {

    /**
     * This function tells the form builder about your component. It's name, icon and what group it should be in.
     *
     * @returns {{title: string, icon: string, group: string, documentation: string, weight: number, schema: *}}
     */
    static get builderInfo() {
        return {
            title: 'Label Component',
            icon: 'square',
            group: 'basic',
            documentation: '',
            weight: -10,
            schema: Label.schema()
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
            type: 'label',
            label: 'Label',
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
            <LabelRenderer
                component={this.component} // These are the component settings if you want to use them to render the component.
            />,
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