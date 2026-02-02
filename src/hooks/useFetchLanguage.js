import { useQuery } from "@tanstack/react-query";
import { fetchLanguages } from "../service/dataAccess";

export default function useFetchLanguage({ orgId, orgIdFilter }) {
    const { isLoading, error, data } = useQuery({
        queryKey: [
            `language`,
            orgId,
            orgIdFilter
        ],
        queryFn: () => {
            if (!!orgIdFilter && orgIdFilter > 0) {
                return fetchLanguages(orgIdFilter);
            } else if (orgId) {
                return fetchLanguages(orgId);
            } else {
                return [];
            }
        },
    });
    return { isLoading, error, data };
}