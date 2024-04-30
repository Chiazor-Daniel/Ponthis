import React, { useMemo } from 'react';
import { useTable, useGlobalFilter, useFilters, usePagination } from 'react-table';
import { GlobalFilter } from './GlobalFilter';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './filtering.css';

export const dummyData = [
  {
    id: 1,
    firstName: 'Hans',
    lastName: 'Schmidt',
    email: 'hans.schmidt@example.com',
    phoneNumber: '555-555-5555',
    canAutoTrade: true,
    isActive: true
  },
  {
    id: 2,
    firstName: 'Anna',
    lastName: 'Müller',
    email: 'anna.muller@example.com',
    phoneNumber: '555-555-5556',
    canAutoTrade: false,
    isActive: false
  },
  {
    id: 3,
    firstName: 'Johann',
    lastName: 'Schneider',
    email: 'johann.schneider@example.com',
    phoneNumber: '555-555-5557',
    canAutoTrade: true,
    isActive: true
  },
  {
    id: 4,
    firstName: 'Maria',
    lastName: 'Fischer',
    email: 'maria.fischer@example.com',
    phoneNumber: '555-555-5558',
    canAutoTrade: false,
    isActive: true
  },
  {
    id: 5,
    firstName: 'Julia',
    lastName: 'Weber',
    email: 'julia.weber@example.com',
    phoneNumber: '555-555-5559',
    canAutoTrade: true,
    isActive: false
  },
  {
    id: 6,
    firstName: 'Michael',
    lastName: 'Wagner',
    email: 'michael.wagner@example.com',
    phoneNumber: '555-555-5560',
    canAutoTrade: false,
    isActive: true
  }
];


export const AdminTable = () => {
  const columns = useMemo(() => [
    {
      Header: 'First Name',
      accessor: 'firstName'
    },
    {
      Header: 'Last Name',
      accessor: 'lastName'
    },
    {
      Header: 'Email',
      accessor: 'email'
    },
    {
      Header: 'Phone Number',
      accessor: 'phoneNumber'
    },
    {
      Header: 'Can Auto Trade',
      accessor: 'canAutoTrade',
      Cell: ({ value }) => (value ? 'Yes' : 'No')
    },
    {
      Header: 'Is Active',
      accessor: 'isActive',
      Cell: ({ value }) => (value ? 'Yes' : 'No')
    },
    {
      accessor: 'id',
      Cell: ({ row }) => (
        <button className='btn btn-primary' onClick={() => navigate(`/admin/admin-dashboard/user/${row.original.id}`)}>View User</button>
      )
    }
  ], []);

  const navigate = useNavigate()

  const tableInstance = useTable(
    {
      columns,
      data: dummyData,
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
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setGlobalFilter,
    state: { pageIndex, globalFilter }
  } = tableInstance;

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">View Users</h4>
        </div>
        <div className="card-body"><div className="table-responsive">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} w={true}/>
            <div>

              <Nav as="ul" className="order nav-tabs" id="pills-tab" role="tablist">
                <Nav.Item as="li" className=" my-1" role="presentation">
                  <Nav.Link as="button" eventKey="All" type="button" >All</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li" className=" my-1" role="presentation">
                  <Nav.Link as="button" eventKey="Spot" type="button">Activated</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li" className=" my-1" role="presentation">
                  <Nav.Link as="button" className="me-0" eventKey="Listing" type="button">Deactivated</Nav.Link>
                </Nav.Item>
              </Nav>
            </div>

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
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell, index) => {
                      // Check if the current cell corresponds to the "Transaction Amount" column
                      if (index === 4) { // Assuming "Transaction Amount" is the fifth column (index 4)
                        return <td {...cell.getCellProps()}>{cell.render('Cell')} </td>; // Prepend '$' to the cell value
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
          {/* <div className="text-center mb-3">
              <div className="filter-pagination  mt-3">
                <button className=" previous-button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                <button className="previous-button" onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                <button className="next-button" onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                <button className=" next-button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
              </div>
            </div> */}
        </div>
        </div>
      </div>
    </>
  )

  function viewUser(user) {
    // Implement the view user functionality here.
    // You can access the user data using the `user` argument.
    console.log('View user:', user);
  }
}

export default AdminTable;