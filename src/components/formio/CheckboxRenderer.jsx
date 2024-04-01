/**
 * Parent class for all renderers.
 */
import RendererParent from "./RendererParent";
import React from "react";

/**
 * Abstract class used to render a simple checkbox.
 */
export default class CheckboxRenderer extends RendererParent {
  constructor(props) {
    if (new.target === CheckboxRenderer) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }
    super(props);
  }

  setValue = (event) => {
    this.setState({ value: !this.state.value }, this.postSetValueCallback);
  };

  postSetValueCallback = () => {
    this.props.onChange(this.state.value, {});
  };

  render() {
    return (
      <input
        type="checkbox"
        checked={this.state.value}
        id={this.props.component.id}
        onChange={this.setValue}
      />
    );
  }
}
