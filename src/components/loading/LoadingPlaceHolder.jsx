import React from "react";
import { useTranslation } from "../../i18n";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";

/**
 * Uses a placeholder instead of a spinner to let the user wait in a better way.
 * @constructor
 */
const LoadingPlaceHolder = (props) => {
  const { t } = useTranslation();
  const ready = !(!props.data || props.isLoading);
  return (
    <ReactPlaceholder
      type="media"
      ready={ready}
      rows={props.rows ?? 30}
      color="#E0E0E0"
      showLoadingAnimation={true}
    >
      {!!props.error ? (
        <div className="error">
          {t(props.errorMessage ?? "An error has occurred.")}
        </div>
      ) : Array.isArray(props.data) && props.data.length === 0 ? (
        <div className="warning">
          {t(props.noDataMessage ?? "No events found")}
        </div>
      ) : (
        props.children
      )}
    </ReactPlaceholder>
  );
};

export default LoadingPlaceHolder;
