import { ReactComponent } from "react-formio";
import editDummy from "../EditDummy";
import ReactDOM from "react-dom";
import AbstractReactComponent from "../AbstractReactComponent";
import React from "react";
import RegidRenderer from "./RegidRenderer";

/**
 * Registration ID component that just prints a hidden field.
 */
export default class Regid extends AbstractReactComponent {
  /**
   * This function tells the form builder about your component. It's name, icon and what group it should be in.
   *
   * @returns {{title: string, icon: string, group: string, documentation: string, weight: number, schema: *}}
   */
  static get builderInfo() {
    return {
      title: "Registration ID Component",
      icon: "square",
      group: "basic",
      documentation: "",
      weight: -10,
      schema: Regid.schema(),
    };
  }

  /**
   * Defines the settingsForm when editing a component in the builder.
   * Since there is no editing of forms in this app we simply point to a dummy.
   */
  static editForm = editDummy;

  /**
   * This function is called when the DIV has been rendered and added to the DOM. You can now instantiate the react component.
   *
   * @param element
   * #returns ReactInstance
   */
  attachReact(element) {
    return ReactDOM.render(
      <RegidRenderer
        component={this.component} // These are the component settings if you want to use them to render the component.
        value={this.dataValue} // The starting value of the component.
        onChange={this.updateValue} // The onChange event to call when the value changes.
      />,
      element,
    );
  }

  checkComponentValidity = (data, dirty, row) => {
    return true;
  };

  labelIsHidden() {
    return true;
  }
}
