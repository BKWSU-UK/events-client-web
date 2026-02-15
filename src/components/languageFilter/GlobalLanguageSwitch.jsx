import useFetchLanguage from "../../hooks/useFetchLanguage";
import LoadingPlaceHolder from "../loading/LoadingPlaceHolder";
import { useTranslation } from "../../i18n";
import { useContext, useEffect } from "react";
import EventContext, { extractEventListParameters } from "../../context/EventContext";
import useGlobalLanguage from "../../hooks/useGlobalLanguage";

if (window.eventsConfig) {

    window.eventsConfig.languageListeners = []

    let _languageCode = "en";

    Object.defineProperty(window.eventsConfig, "languageCode", {
        get() {
            return _languageCode;
        },
        set(newValue) {
            _languageCode = newValue;
            onLanguageChange(newValue);
        },
        configurable: true,
        enumerable: true
    });

    function onLanguageChange(newLang) {
        console.info("Language changed to:", newLang);
        window.eventsConfig.languageListeners.forEach(listener => listener(newLang));
    }

}

function LanguageButton({languageCode, language, currentLanguage}) {
    const { t } = useTranslation();
    const isActive = currentLanguage === languageCode;
    return (
        <button
            className={`ems-language-button btn btn-primary mb-1 w-100 ${isActive ? "btn-danger" : ""}`}
            onClick={() => {
                if (window.eventsConfig) window.eventsConfig.languageCode = languageCode;
            }}
        >
            {t(`lang_${language}`)}
        </button>
    );
}

export default function GlobalLanguageSwitch() {
    const { t } = useTranslation();
    const eventContext = useContext(EventContext);
    const allParams = extractEventListParameters({ ...eventContext });
    const { orgId } = allParams;
    const { orgIdFilter } = eventContext;
    const { isLoading, error, data } = useFetchLanguage({ orgId, orgIdFilter });
    const { globalLanguage, setGlobalLanguage } = useGlobalLanguage();

    useEffect(() => {
        const listener = (newLang) => setGlobalLanguage(newLang);
        window.eventsConfig.languageListeners.push(listener);
        return () => {
            window.eventsConfig.languageListeners = window.eventsConfig.languageListeners
               .filter(l => l !== listener);
        };
    }, []);

    return (
    <div className="language-switch-container w-100 mt-2 mb-3">
        <LanguageButton 
            languageCode="en"
            language="English"
            currentLanguage={globalLanguage}
        />
        <label htmlFor="language-dropdown" style={{ fontWeight: "bold", marginBottom: "8px", display: "block" }}>
            {t("Select Language")}
        </label>
        <LoadingPlaceHolder data={data} isLoading={isLoading} error={error}>

            <select
                id="language-dropdown"
                className="form-control mb-2 w-100"
                value={globalLanguage}
                onChange={e => {
                    if (window.eventsConfig) window.eventsConfig.languageCode = e.target.value;
                }}
            >
                <option key="all" value={null}>{t("lang_All")}</option>
                {data?.map((language) => (
                    <option key={`language_${language.iso_639_1_code}`} value={language.iso_639_1_code}>{t(`lang_${language.name}`)} ({language.count})</option>
                ))}
            </select>
        </LoadingPlaceHolder>
    </div>
    );
}