import {extractFromLocationQuery} from "./urlUtils";


export const extractParameter = (props, name, defaultValue) => {
    return (props && props.match.params[name]) || extractFromLocationQuery(name) || window.eventsConfig[name] || defaultValue;
};