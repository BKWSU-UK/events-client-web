import React, { useContext, useMemo } from "react";
import EventContext, { ACTIONS } from "../../context/EventContext";
import { extractParameter } from "../../utils/paramExtraction";
import { DISPLAY_ONLINE_FILTER } from "../../context/appParams";
import { useTranslation } from "../../i18n";
import { ONLINE_STATES } from "../../context/onlineStates";

const SELECT_NAME = "onlineFilter";

/**
 * Displays the online filter.
 * @constructor
 */
const OnlineFilter = () => {
  const { t } = useTranslation();
  const eventContext = useContext(EventContext);
  const { filterState, filterDispatch } = eventContext;

  const useFilter = useMemo(
    () => extractParameter(eventContext, DISPLAY_ONLINE_FILTER),
    [],
  );

  const onChange = (e) => {
    const onlineStatus = e.target.value;
    filterDispatch({
      type: ACTIONS.CHANGE_ONLINE_STATE,
      payload: { onlineStatus },
    });
  };

  return (
    (useFilter && (
      <div className="row form-group online-filter">
        <div className="col-12">
          <label className="col-form-label" htmlFor={SELECT_NAME}>
            {t("Online State")}:
          </label>
        </div>
        <div className="col-12">
          <select
            className="form-control"
            id={SELECT_NAME}
            value={filterState.onlineStatus}
            onChange={onChange}
          >
            {ONLINE_STATES.map((s, i) => {
              return (
                <option key={i} value={s}>
                  {t(`online_state_${s}`)}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    )) || <></>
  );
};

export default OnlineFilter;
