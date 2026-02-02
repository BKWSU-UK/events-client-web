import useLocalStorage from "./useLocalStorage";

const GLOBAL_LANGUAGE_KEY = "ems_global_language";

export default function useGlobalLanguage() {
    const [globalLanguage, setGlobalLanguage] = useLocalStorage(GLOBAL_LANGUAGE_KEY, "en");
    return { globalLanguage: globalLanguage || "en", setGlobalLanguage };
}