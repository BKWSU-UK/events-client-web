import React from "react";
import { useTranslation } from "../../i18n";

const gotoPageElement = (pageIndex, gotoPage, pageCount, t) => {
  if (pageCount > 1) {
    return (
      <span className="d-none d-lg-inline">
        | {t("go-to-page")}:{" "}
        <input
          className="form-control-sm"
          id="pagerNumberField"
          type="number"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(page);
          }}
          style={{ width: "100px" }}
          min={1}
          max={pageCount}
        />
      </span>
    );
  }
};

const pageSelector = (pageSize, setPageSize, pageCount, t) => {
  if (pageCount > 1) {
    return (
      <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
        className="d-none d-lg-inline form-control-sm"
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {t("show")} {pageSize}
          </option>
        ))}
      </select>
    );
  }
};

/**
 * Displays a simple pager with navigation based on buttons or on a number field.
 * @param gotoPage
 * @param canPreviousPage
 * @param previousPage
 * @param nextPage
 * @param canNextPage
 * @param pageCount
 * @param pageOptions
 * @param pageIndex
 * @param pageSize
 * @param setPageSize
 * @returns {*}
 * @constructor
 */
export function Pager({
  gotoPage,
  canPreviousPage,
  previousPage,
  nextPage,
  canNextPage,
  pageCount,
  pageOptions,
  pageIndex,
  pageSize,
  setPageSize,
}) {
  const { t } = useTranslation();
  if (pageOptions.length < 2) {
    return <></>;
  }
  return (
    <div className="col-md-6 col-sm-12 text-right pager-box">
      <button
        type="button"
        className="btn btn-light"
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}
      >
        {"<<"}
      </button>{" "}
      <button
        type="button"
        className="btn btn-light"
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
      >
        {"<"}
      </button>{" "}
      <button
        type="button"
        className="btn btn-light"
        onClick={() => nextPage()}
        disabled={!canNextPage}
      >
        {">"}
      </button>{" "}
      <button
        type="button"
        className="btn btn-light"
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
      >
        {">>"}
      </button>{" "}
      <span>
        {t("page")}{" "}
        <strong>
          {pageIndex + 1} {t("of")} {pageOptions.length}
        </strong>{" "}
      </span>
      {gotoPageElement(pageIndex, gotoPage, pageCount, t)}{" "}
      {pageSelector(pageSize, setPageSize, pageCount, t)}
    </div>
  );
}
