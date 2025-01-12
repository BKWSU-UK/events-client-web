import React, { useContext, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import styled from "styled-components";
import { Pager } from "./table/Pager";
import { withRouter } from "react-router-dom";
import EventDisplay from "./EventDisplay";
import FormModal from "./forms/FormModal";
import ReadMoreModal from "./readMore/ReadMore";
import GlobalFilter from "./filter/GlobalFilter";
import { useTranslation } from "../i18n";
import EventContext, {
  extractEventListParameters,
} from "../context/EventContext";
import CenterFilter from "./filter/CenterFilter";
import { extractParameter } from "../utils/paramExtraction";
import OnlineFilter from "./filter/OnlineFilter";
import { eventMap } from "../service/dataAccessConstants";
import TagsFilter from "./filter/TagsFilter";
import LoadingPlaceHolder from "./loading/LoadingPlaceHolder";
import useOrganisationEvents from "../hooks/useOrganisationEvents";
import { EVENT_CONFIG } from "../context/appParams";
import TableFilterPager from "./table/TableFilterPager";

function EventTableStruct({ columns, params, show }) {
  const { events, eventContext, data, isLoading, error } =
    useOrganisationEvents(params);

  // Use the state and functions returned from useTable to build your UI
  const table = useTable(
    {
      columns,
      data: events ?? [],
      initialState: {
        pageIndex: 0,
        pageSize: extractParameter({ ...eventContext }, "pageSize", 10),
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } =
    table;

  // Render the UI for your table
  const showColumns = ["description"];
  return (
    <>
      <TableFilterPager show={show} params={params} table={table} />
      <OnlineFilter />
      <TagsFilter />
      <CenterFilter />
      <LoadingPlaceHolder data={data} isLoading={isLoading} error={error}>
        <table
          {...getTableProps()}
          className="table"
          style={{ visibility: show ? "visible" : "hidden" }}
        >
          <thead className="thead-dark">
            {headerGroups.map((headerGroup, i) => (
              <tr
                key={`event_table_row_${i}`}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers
                  .filter((column) => showColumns.includes(column.id))
                  .map((column, j) => {
                    return (
                      // Add the sorting props to control sorting. For this example
                      // we can add them into the header props

                      <th
                        key={`event_table_header_${j}`}
                        {...column.getHeaderProps(
                          column.getSortByToggleProps(),
                        )}
                      >
                        {column.render("Header")}
                        {/* Add a sort direction indicator */}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔽"
                              : " 🔼"
                            : ""}
                        </span>
                      </th>
                    );
                  })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={`event_table_${i}`}>
                  {row.cells
                    .filter((cell) => showColumns.includes(cell.column.id))
                    .map((cell, k) => {
                      return (
                        <td key={`body_division_${k}`} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <TableFilterPager
          show={show}
          params={params}
          table={table}
          showSearch={false}
        />
      </LoadingPlaceHolder>
    </>
  );
}

export function EventTable(props) {
  const Styles = styled.div`
    padding: 0;

    table {
      width: 100%;
    }
  `;
  const eventContext = useContext(EventContext);
  const { currentEvent, setCurrentEvent } = eventContext;
  const allParams = extractEventListParameters({ ...props, ...eventContext });
  const [eventTableVisible, setEventTableVisible] = useState(true);
  const [displayMoreAbout, setDisplayMoreAbout] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);
  const [dateList, setDateList] = useState({});
  const { t } = useTranslation();

  const eventColumns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name" /* This is a hidden column */,
      },
      {
        Header: "Name" /* This is a hidden column */,
        accessor: (props) => {
          return eventMap["" + props.eventTypeId];
        },
      },
      {
        Header: t("description"),
        accessor: "description",
        Cell: (props) => {
          const original = props.row.original;
          const useSimpleLayout = extractParameter(
            { ...eventContext },
            "useSimpleLayout",
          );
          return (
            <EventDisplay
              original={original}
              simple={
                typeof useSimpleLayout == "undefined" ? false : useSimpleLayout
              }
              props={props}
              setDisplayMoreAbout={setDisplayMoreAbout}
              setCurrentEvent={setCurrentEvent}
              setDateList={setDateList}
              setDisplayForm={setDisplayForm}
              setEventTableVisible={setEventTableVisible}
            />
          );
        },
      },
      {
        Header:
          "Venue" /* This is a hidden column. Used to allow search to find this data. */,
        accessor: (props) => {
          return `${props.venue.locality} ${props.venue.country}`;
        },
      },
      {
        Header: "Start Date",
        accessor: "startTimestamp" /* This is a hidden column */,
      },
    ],
    [],
  );

  return (
    <>
      <ReadMoreModal
        show={displayMoreAbout}
        setShow={setDisplayMoreAbout}
        setEventTableVisible={setEventTableVisible}
        currentEvent={currentEvent}
        dateList={dateList}
      />
      <FormModal
        show={displayForm}
        setShow={setDisplayForm}
        currentEvent={currentEvent}
        setEventTableVisible={setEventTableVisible}
      />
      <Styles>
        <EventTableStruct
          columns={eventColumns}
          params={allParams}
          show={eventTableVisible}
        />
      </Styles>
    </>
  );
}

export default withRouter(EventTable);
