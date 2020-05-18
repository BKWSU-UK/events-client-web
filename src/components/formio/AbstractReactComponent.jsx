import {ReactComponent} from "react-formio";
import ReactDOM from "react-dom";

/**
 * Parent class for all Form IO React components.
 */
export default class AbstractReactComponent extends ReactComponent {

    /**
     * Automatically detach any react components.
     *
     * @param element
     */
    detachReact(element) {
        if (element) {
            ReactDOM.unmountComponentAtNode(element);
        }
    }
}