/* eslint-disable */
import React, { useMemo } from 'react';
import { useTable, useGlobalFilter, useFilters, usePagination } from 'react-table';
import { GlobalFilter } from './GlobalFilter';
import './filtering.css';

export const FilteringTable = ({ data, isLoading }) => {
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
		}
	], []);

	const tableInstance = useTable(
		{
			columns,
			data,
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

	return (
		<>
			<div className="card">
				<div className="card-header">
					<h4 className="card-title">View Transactions</h4>
				</div>
        {
          isLoading ? (
            <p>Loading....</p>
          ) : (
          <div className="card-body">
            <div className="table-responsive">
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
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
