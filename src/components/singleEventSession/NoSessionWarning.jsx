import React from "react";
import { useTranslation } from "../../i18n";
import { URL_PARAMS } from "../../context/appParams";

/**
 * Issues a warning about a missing session id.
 * @constructor
 */
const NoSessionWarning = () => {
  const { t } = useTranslation();
  return (
    <div className="alert alert-primary" role="alert">
      {t(
        `Please add event session id parameter to URL ${URL_PARAMS.EVENT_SESSION_ID}`,
      )}
    </div>
  );
};

export default NoSessionWarning;
