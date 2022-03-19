import React, { useContext, useState } from 'react'
import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from 'react-table'
import styled from 'styled-components'
import { getEventList } from '../service/dataAccess'
import { Pager } from './Pager'
import { withRouter } from 'react-router-dom'
import EventDisplay, { eventMap } from './EventDisplay'
import FormModal from './forms/FormModal'
import ReadMoreModal from './readMore/ReadMore'
import GlobalFilter from './GlobalFilter'
import { useTranslation } from '../i18n'
import EventContext, { extractEventListParameters } from '../context/EventContext'
import CenterFilter from './CenterFilter'
import { useQuery } from 'react-query'
import LoadingContainer from './loading/LoadingContainer'
import {
    extractParameter
} from '../utils/paramExtraction'

function EventTableStruct ({ columns, params, show }) {
    const eventContext = useContext(EventContext)
    const { events, setEvents, orgIdFilter } = eventContext

    const { isLoading, error, data } = useQuery(
        [`eventsTable_${eventContext['eventsConfig']['id']}`, orgIdFilter], () => {
            if(!!orgIdFilter && orgIdFilter > 0) {
                return getEventList({ ...params, orgIdFilter, eventContext })
            }
            else if (extractParameter({...eventContext}, 'fetchEvents')) {
                return getEventList({ ...params, eventContext })
            } else {
                return []
            }
        })

    if(!!data) {
        setEvents(data)
    }

    console.log('events', events)

    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        state,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        rows,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        setGlobalFilter,
        state: { pageIndex, pageSize },
    } = useTable({
        columns,
        data: events,
        initialState: { pageIndex: 0 },
    }, useGlobalFilter, useSortBy, usePagination)

    // Render the UI for your table
    const showColumns = ['description']
    return (
        <>
            <div className="row mt-1 mb-1 ml-1"
                 style={{ visibility: show ? 'visible' : 'hidden' }}>
                <GlobalFilter
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                    rowsLength={rows.length}
                />
                <Pager gotoPage={gotoPage} canPreviousPage={canPreviousPage}
                       previousPage={previousPage} nextPage={nextPage}
                       canNextPage={canNextPage} pageCount={pageCount}
                       pageOptions={pageOptions} pageIndex={pageIndex}
                       pageSize={pageSize} setPageSize={setPageSize}/>
            </div>
            <CenterFilter/>
            <LoadingContainer data={data} isLoading={isLoading} error={error}>
                <table {...getTableProps()} className="table table-hover"
                       style={{ visibility: show ? 'visible' : 'hidden' }}>
                    <thead className="thead-dark">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.filter(
                                column => showColumns.includes(column.id)).
                                map(column => {
                                        return (
                                            // Add the sorting props to control sorting. For this example
                                            // we can add them into the header props

                                            <th {...column.getHeaderProps(
                                                column.getSortByToggleProps())}>
                                                {column.render('Header')}
                                                {/* Add a sort direction indicator */}
                                                <span>
                                    {column.isSorted ? column.isSortedDesc
                                        ? ' 🔽'
                                        : ' 🔼' : ''}
                                </span>
                                            </th>
                                        )
                                    },
                                )}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.filter(cell => showColumns.includes(
                                    cell.column.id)).map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render(
                                        'Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </LoadingContainer>
        </>
    )
}

export const Styles = styled.div`
        padding: 0rem;
        table {
            width: 100%;
        }
        `

export function EventTable (props) {
    const eventContext = useContext(EventContext)
    const { currentEvent, setCurrentEvent } = eventContext
    const allParams = extractEventListParameters({ ...props, ...eventContext })
    const [eventTableVisible, setEventTableVisible] = useState(true)
    const [displayMoreAbout, setDisplayMoreAbout] = useState(false)
    const [displayForm, setDisplayForm] = useState(false)
    const [dateList, setDateList] = useState({})
    const { t } = useTranslation()

    const eventColumns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name', /* This is a hidden column */
            },
            {
                Header: 'Name', /* This is a hidden column */
                accessor: (props) => {
                    return eventMap['' + props.eventTypeId]
                },
            },
            {
                Header: t('description'),
                accessor: 'description',
                Cell: (props) => {
                    const original = props.row.original
                    const useSimpleLayout = extractParameter({...eventContext},'useSimpleLayout')
                    return (
                        <EventDisplay original={original}
                                      simple={typeof useSimpleLayout ==
                                      'undefined'
                                          ? false
                                          : useSimpleLayout}
                                      props={props}
                                      setDisplayMoreAbout={setDisplayMoreAbout}
                                      setCurrentEvent={setCurrentEvent}
                                      setDateList={setDateList}
                                      setDisplayForm={setDisplayForm}
                                      setEventTableVisible={setEventTableVisible}/>
                    )
                },
            },
            {
                Header: 'Venue', /* This is a hidden column. Used to allow search to find this data. */
                accessor: (props) => {
                    return `${props.venue.locality} ${props.venue.country}`
                },
            },
            {
                Header: 'Start Date',
                accessor: 'startTimestamp', /* This is a hidden column */
            },
        ],
        [],
        )

    return (
        <>
            <ReadMoreModal show={displayMoreAbout} setShow={setDisplayMoreAbout}
                           setEventTableVisible={setEventTableVisible}
                           currentEvent={currentEvent} dateList={dateList}/>
            <FormModal show={displayForm} setShow={setDisplayForm}
                       currentEvent={currentEvent}
                       setEventTableVisible={setEventTableVisible}/>
            <Styles>
                <EventTableStruct
                    columns={eventColumns}
                    params={allParams}
                    show={eventTableVisible}/>
            </Styles>
        </>
    )
}

export default withRouter(EventTable)