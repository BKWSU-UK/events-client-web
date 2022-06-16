/**
 * Chooses between the default and the chosen event type ids.
 * @param stateCalendar
 * @param eventTypeIds
 * @returns {*|number[]}
 */
export const eventTypeIdAdapter = (stateCalendar, eventTypeIds) => {
    return stateCalendar.categoryFilter === 0
        ? eventTypeIds
        : [stateCalendar.categoryFilter]
}