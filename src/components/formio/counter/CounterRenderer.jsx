import React, { Component } from 'react';
import RendererParent from "../RendererParent";

const defaultValue = 1;

/**
 * The counter component used to render a person counter.
 *
 * This component sets its value to the value.
 */
const CounterRenderer = class extends RendererParent {

    constructor(props) {
        super(props);
        this.props.onChange(defaultValue, {});
    }

    setValue = (event) => {
        const value = event.target.value;
        this.setState({value: value}, () => this.props.onChange(value, {}));
    };

    render() {
        let {value, min, max} = this.state;
        value = value || defaultValue;
        min = min || defaultValue;
        max = max || 100;
        return  (
            <input type="number" value={value} className="form-control"
                   id={this.props.component.id}
                   onChange={this.setValue} min={min} max={max}/>
        );
    }
};

export default CounterRenderer;