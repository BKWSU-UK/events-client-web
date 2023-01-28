import React from 'react';
import RendererParent from "../RendererParent";

const defaultValue = 1;

const defaultMin = 1
const defaultMax = 10

/**
 * The counter component used to render a person counter.
 *
 * This component sets its value to the value.
 */
const CounterRenderer = class extends RendererParent {

    constructor(props) {
        super(props);
        console.log('props', props)
        this.props.onChange(defaultValue, {});
        this.max = this.props.component.validate.max ?? defaultMax
        this.min = this.props.component.validate.min ?? defaultMin
    }

    setValue = (event) => {
        let value = event.target.value === '' ? 0 : event.target.value;
        console.log('setValue', value)
        if (value > this.max) {
            value = value % this.max
        } else if (value < this.min) {
            value = this.min
        }
        this.setState({value: value}, () => this.props.onChange(value, {}));
    };

    render() {
        let {value, min, max} = this.state;

        value = value || defaultValue;
        min = min || defaultValue;
        max = max || 50;
        return  (
            <input type="number" value={value} className="form-control"
                   id={this.props.component.id}
                   onChange={this.setValue} min={min} max={max}/>
        );
    }
};

export default CounterRenderer;