import {extractFromLocationQuery} from "./urlUtils";

export const extractParameterSimple = (name, defaultValue = null) => extractParameter(null, name, defaultValue);

export const extractParameter = (props, name, defaultValue) => {
    if(!!props) {
        return props.match?.params[name] || props.eventsConfig[name] || defaultValue
    }
    return extractFromLocationQuery(name) || window.eventsConfig[name] || defaultValue;
};