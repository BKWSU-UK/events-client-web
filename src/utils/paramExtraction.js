import {extractFromLocationQuery} from "./urlUtils";

export const extractParameterSimple = (name, defaultValue) => extractParameter(null, name, defaultValue);

export const extractParameter = (props, name, defaultValue) => {
    return (props && props.match?.params[name]) || extractFromLocationQuery(name) || window.eventsConfig[name]
        || defaultValue;
};