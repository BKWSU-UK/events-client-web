import {extractFromLocationQuery} from "./urlUtils";


export const extractParameter = (props, name, defaultValue) => {
    return props.match.params[name] || extractFromLocationQuery(name) || window.eventsConfig[name] || defaultValue;
};