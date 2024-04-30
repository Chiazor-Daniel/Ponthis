import React, { useEffect, useMemo, useState } from 'react';
import { useTable, useGlobalFilter, useFilters, usePagination } from 'react-table';
import { GlobalFilter } from './GlobalFilter';
import { Tab, Nav, Button } from 'react-bootstrap';
import './filtering.css';

export const FilteringTable = ({ data, isLoading, user }) => {
    const [currentTab, setCurrentTab] = useState('All');
    const [originalData, setOriginalData] = useState(data); // Store original data
    const [transactionsData, setTransactionsData] = useState(data);

    useEffect(() => {
        // Update transactionsData based on currentTab
        if (currentTab === "bank") {
            setTransactionsData(originalData.filter(transaction => transaction?.transaction_method === "bank-transfer"));
        } else if (currentTab === "crypto") {
            setTransactionsData(originalData.filter(transaction => transaction?.transaction_method === "cryptocurrency"));
        } else if (currentTab === "card") {
            setTransactionsData(originalData.filter(transaction => transaction?.transaction_method === "card-payment"));
        } else {
            setTransactionsData(originalData);
        }
    }, [currentTab, originalData]);

    useEffect(() => {
        // Update originalData when data prop changes
        setOriginalData(data);
    }, [data]);
    
    const handleTabChange = (tab) => {
        setCurrentTab(tab);
    };

    const columns = useMemo(() => [
        {
            Header: 'Id',   
            accessor: 'id',
            Cell: ({ row }) => row.index + 1 // Use index to assign IDs starting from 1
        },
        {
            Header: 'Transaction Method',
            accessor: 'transaction_method'
        },
        {
            Header: 'Status',
            accessor: 'status'
        },
        {
            Header: 'Created At',
            accessor: 'created_at',
            Cell: ({ value }) => {
                const formattedDate = new Date(value).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                });
                return formattedDate;
            }
        },
        {
            Header: 'Transaction Amount',
            accessor: 'transaction_amount'
        },
        {
            Header: 'Transaction Type',
            accessor: 'transaction_type'
        },
        {
            Header: 'Action',
            Cell: ({ row }) => (
                user === 'admin' && <Button variant="success" onClick={() => handleEditTransaction(row)}>Edit Transaction</Button>
            )
        }
    ], []);


    const handleEditTransaction = (row) => {
        // Handle edit transaction action here
        console.log('Edit transaction for row:', row);
    };

    const tableInstance = useTable(
        {
            columns,
            data: transactionsData,
            initialState: { pageIndex: 0 }
        },
        useFilters,
        useGlobalFilter,
        usePagination
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        state,
        page,
        gotoPage,
        pageCount,
        pageOptions,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        setGlobalFilter,
    } = tableInstance;

    const { globalFilter, pageIndex } = state;

    const filteredData = currentTab === 'All' ? data : data.filter(item => item.transaction_method === currentTab);

    return (
        <>
            <div className="card">
                <div className="card-header">
					<div style={{display: "flex", justifyContent: 'space-between', width:"100%"}}>
                    <h4 className="card-title">{user === "admin" ? "User" : "View"} Transactions</h4>
					{user === "admin" && (
							<Button>Make New Transaction</Button>
						)
					}
					</div>
                </div>
                {
                    isLoading ? (
                        <p>Loading....</p>
                    ) : (
                        <div className="card-body">
                            <div className="table-responsive">
                                <div className="card-header border-0">
                                    <Nav as="ul" className="order  nav-tabs" id="pills-tab" role="tablist">
                                        <Nav.Item as="li" className="my-1" role="presentation">
                                            <Nav.Link as="button" eventKey="All" type="button" onClick={()=>setCurrentTab("All")}>All</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li" className="my-1" role="presentation">
                                            <Nav.Link as="button" eventKey="Spot" type="button" onClick={()=>setCurrentTab("bank")}>Bank Transfer</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li" className="my-1" role="presentation">
                                            <Nav.Link as="button" className="me-0" eventKey="Listing" type="button" onClick={()=>setCurrentTab("card")}>Card Payment</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li" className="my-1" role="presentation">
                                            <Nav.Link as="button" className="me-0" eventKey="Crypto" type="button" onClick={()=>setCurrentTab("crypto")}>Crypto Payment</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </div>
                                <table {...getTableProps()} className="table dataTable display">
                                    <thead>
                                        {headerGroups.map(headerGroup => (
                                            <tr {...headerGroup.getHeaderGroupProps()}>
                                                {headerGroup.headers.map(column => (
                                                    <th {...column.getHeaderProps()}>
                                                        {column.render('Header')}
                                                    </th>
                                                ))}
                                            </tr>
                                        ))}
                                    </thead>
                                    <tbody {...getTableBodyProps()} className="">
                                        {page.map((row) => {
                                            prepareRow(row)
                                            return (
                                                <tr {...row.getRowProps()}>
                                                    {row.cells.map((cell, index) => {
                                                        // Check if the current cell corresponds to the "Transaction Amount" column
                                                        if (index === 4) { // Assuming "Transaction Amount" is the fifth column (index 4)
                                                            return <td {...cell.getCellProps()}>$ {cell.render('Cell')} </td>; // Prepend '$' to the cell value
                                                        } else {
                                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>; // Render other columns normally
                                                        }
                                                    })}
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                <div className="d-flex justify-content-between">
                                    <span>
                                        Page{' '}
                                        <strong>
                                            {pageIndex + 1} of {pageOptions.length}
                                        </strong>{''}
                                    </span>
                                    <span className="table-index">
                                        Go to page : {' '}
                                        <input type="number"
                                            className="ml-2"
                                            defaultValue={pageIndex + 1}
                                            onChange={e => {
                                                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                                                gotoPage(pageNumber)
                                            }}
                                        />
                                    </span>
                                </div>
                                <div className="text-center mb-3">
                                    <div className="filter-pagination  mt-3">
                                        <button className=" previous-button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                                        <button className="previous-button" onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                                        <button className="next-button" onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                                        <button className=" next-button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}
export default FilteringTable;
