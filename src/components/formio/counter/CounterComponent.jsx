import React from 'react';
import ReactDOM from 'react-dom';
import {ReactComponent} from 'react-formio';
import CounterRenderer from "./CounterRenderer";
import editDummy from "../EditDummy";
import AbstractReactComponent from "../AbstractReactComponent";

export default class Counter extends AbstractReactComponent {
    /**
     * This function tells the form builder about your component. It's name, icon and what group it should be in.
     *
     * @returns {{title: string, icon: string, group: string, documentation: string, weight: number, schema: *}}
     */
    static get builderInfo() {
        return {
            title: 'Counter Component',
            icon: 'square',
            group: 'basic',
            documentation: '',
            weight: -10,
            schema: Counter.schema()
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
            type: 'counter',
            label: 'Counter',
        });
    }

    /*
     * Defines the settingsForm when editing a component in the builder.
     */
    static editForm = editDummy;

    /**
     * This function is called when the DIV has been rendered and added to the DOM. You can now instantiate the react component.
     *
     * @param DOMElement
     * #returns ReactInstance
     */
    attachReact(element) {
        return ReactDOM.render(
            <CounterRenderer
                component={this.component} // These are the component settings if you want to use them to render the component.
                value={this.dataValue} // The starting value of the component.
                onChange={this.updateValue} // The onChange event to call when the value changes.
            />,
            element
        );
    }

}