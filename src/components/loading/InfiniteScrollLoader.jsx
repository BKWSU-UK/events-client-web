import Loader from "./Loader";
import { useTranslation } from "../../i18n";

export default function InfiniteScrollLoader({
  isFetchingNextPage,
  hasNextPage,
  displayNothingMore,
  pages,
}) {
  const { t } = useTranslation();

  if (isFetchingNextPage) {
    // Show the loader while fetching the next page
    return <Loader />;
  }

  if (!hasNextPage && displayNothingMore && pages > 1) {
    // Show the "Nothing more to load" message
    return (
      <div className="row">
        <div className="col-12 alert alert-info text-center mt-2" role="alert">
          {t("Nothing more to load")}
        </div>
      </div>
    );
  }

  return <></>;
}
