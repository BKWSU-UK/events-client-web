import React from "react";
import { useTranslation } from "../../../i18n";

/**
 * Online notice.
 * @param ev
 * @returns {JSX.Element}
 * @constructor
 */
const OnlineNotice = ({ ev }) => {
  const { t } = useTranslation();
  return (
    <>
      {!!ev.hasWebcast && (
        <div className="online-notice">{t("online_state_Online")}</div>
      )}
      {!ev.onlineOnly && (
        <div className="in-person-notice">{t("online_state_In Person")}</div>
      )}
    </>
  );
};

export default OnlineNotice;
