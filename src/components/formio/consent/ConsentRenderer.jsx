import CheckboxRenderer from "../CheckboxRenderer";
import React from "react";

/**
 * Renders a checkbox (defaults to false)
 */
export default class ConsentRenderer extends CheckboxRenderer {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <input
          type="checkbox"
          checked={this.state.value}
          id={this.props.component.id}
          onChange={this.setValue}
          required={this?.props?.component?.validate?.required}
        />
      </>
    );
  }
}
