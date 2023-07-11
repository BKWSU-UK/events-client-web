import {extractFromLocationQuery} from "./urlUtils";

export const extractParameterSimple = (name, defaultValue = null) => extractParameter(null, name, defaultValue);

export const extractParameter = (props, name, defaultValue) => {
    const urlValue = extractFromLocationQuery(name)
    if(typeof urlValue !== "undefined" && urlValue !== null) {
        if(urlValue === "true") {
            return true
        }
        if(urlValue === "false") {
            return false
        }
        return urlValue
    }
    if(!!props) {
        return props.match?.params[name] || props.eventsConfig[name] || defaultValue
    }
    return window?.eventsConfig.length > 0 ? window.eventsConfig[0][name] : defaultValue;
};