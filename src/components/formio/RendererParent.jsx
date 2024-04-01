import { Component } from "react";

/**
 * Parent class for all renderers.
 */
export default class RendererParent extends Component {
  constructor(props) {
    if (new.target === RendererParent) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }
    super(props);
    this.state = {
      value: props.value,
    };
  }
}
