import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import EventContext, { ACTIONS, extractEventListParameters } from "../../context/EventContext";
import { fetchLanguages } from "../../service/dataAccess";
import LoadingPlaceHolder from "../loading/LoadingPlaceHolder";
import { useTranslation } from "../../i18n";

import { DEFAULT_LANGUAGE } from "../../context/EventContext";

export default function LanguageDropDown(props) {

    const eventContext = useContext(EventContext);
    const allParams = extractEventListParameters({ ...props, ...eventContext });
    const { orgId } = allParams;
    const { orgIdFilter, eventsConfig } = eventContext;
    const { t } = useTranslation();

    const { isLoading, error, data } = useQuery({
        queryKey: [
            `language`,
            orgId,
            orgIdFilter
        ],
        queryFn: () => {
            console.info("fetchLanguages", orgIdFilter, orgId);
            if (!!orgIdFilter && orgIdFilter > 0) {
                return fetchLanguages(orgIdFilter);
            } else if (orgId) {
                return fetchLanguages(orgId);
            } else {
                return [];
            }
        },
    });


    if(!eventsConfig?.showLanguageFilter || !data) {
        return null;
    }

    return (
        <LoadingPlaceHolder data={data} isLoading={isLoading} error={error}>
            <select className="ems-language-filter form-control mb-2"
                id="languageFilter"
                name="languageFilter"
                value={eventContext.filterState.languageCode} onChange={(e) => {
                eventContext.filterDispatch({ type: ACTIONS.SET_LANGUAGE_CODE, payload: { languageCode: e.target.value } });
            }}>
                <option value={DEFAULT_LANGUAGE}>{t("lang_All")}</option>
                {data.map((language) => (
                    <option key={`language_${language.iso_639_1_code}`} value={language.iso_639_1_code}>{t(`lang_${language.name}`)} ({language.count})</option>
                ))}
            </select>
        </LoadingPlaceHolder>
    );
}