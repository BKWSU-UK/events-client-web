import React, {Component} from "react";

/**
 * Renderer for the date.
 * @type {LabelRenderer}
 */
export default class LabelRenderer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card bg-light pl-2 pt-1">
                <h3>{this.props.component.label}</h3>
            </div>
        );
    }
};