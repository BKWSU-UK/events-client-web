import { DEFAULT_LANGUAGE } from "../context/EventContext";
import useLocalStorage from "./useLocalStorage";

export const GLOBAL_LANGUAGE_KEY = "ems_global_language";

export default function useGlobalLanguage() {
    const [globalLanguage, setGlobalLanguage] = useLocalStorage(GLOBAL_LANGUAGE_KEY, DEFAULT_LANGUAGE);
    return { globalLanguage: globalLanguage || DEFAULT_LANGUAGE, setGlobalLanguage };
}