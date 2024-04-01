import React from "react";

/**
 * Container for all event info items.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const EventInfoContainer = (props) => {
  return (
    <li className="list-group-item">
      <div className="calendar-flex-centre">{props.children}</div>
    </li>
  );
};

export default EventInfoContainer;
