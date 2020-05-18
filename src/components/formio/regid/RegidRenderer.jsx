import RendererParent from "../RendererParent";
import React from "react";

/**
 * Registration ID renderer.
 */
export default class RegidRenderer extends RendererParent {

    constructor(props) {
        super(props);
    }

    render() {
        return  (
            <input type="hidden" id={this.props.component.id}/>
        );
    }
}