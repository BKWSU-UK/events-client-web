import GlobalFilter from "../filter/GlobalFilter";
import { Pager } from "./Pager";
import React from "react";
import { extractParameter } from "../../utils/paramExtraction";
import { EVENT_CONFIG } from "../../context/appParams";
import useOrganisationEvents from "../../hooks/useOrganisationEvents";

export default function TableFilterPager({
  show,
  params,
  table,
  showSearch = true,
}) {
  const { eventContext } = useOrganisationEvents(params);
  const {
    rows,
    setGlobalFilter,
    gotoPage,
    canPreviousPage,
    previousPage,
    nextPage,
    canNextPage,
    pageCount,
    pageOptions,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
  } = table;
  const hideSearch = extractParameter(
    { ...eventContext },
    EVENT_CONFIG.HIDE_SEARCH,
    false,
  );
  const hidePager = extractParameter(
    { ...eventContext },
    EVENT_CONFIG.HIDE_PAGER,
    false,
  );
  return (
    <div
      className="row mt-1 mb-1 ml-1"
      style={{ visibility: show ? "visible" : "hidden" }}
    >
      {!hideSearch && showSearch && (
        <GlobalFilter
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          rowsLength={rows.length}
        />
      )}
      {!showSearch && <div className="col-md-6 col-sm-12" />}
      {!hidePager && (
        <Pager
          gotoPage={gotoPage}
          canPreviousPage={canPreviousPage}
          previousPage={previousPage}
          nextPage={nextPage}
          canNextPage={canNextPage}
          pageCount={pageCount}
          pageOptions={pageOptions}
          pageIndex={pageIndex}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      )}
    </div>
  );
}
