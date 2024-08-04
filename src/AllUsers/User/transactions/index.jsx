/* eslint-disable */
import React from 'react';
import { Spinner } from 'react-bootstrap';
import FilteringTable from '../../../jsx/components/table/FilteringTable/FilteringTable';
import useViewTransactions from '../../../customHooks/user/transactions/useViewTransactions';
import { useGetUserDepositsQuery, useGetUserWithdrawalsQuery } from '../../../redux-contexts/redux/services/transactions';
import { useSelector } from 'react-redux';
import AdminTable from '../../../jsx/components/table/FilteringTable/AdminTable';
import { format } from 'date-fns';

const ViewTransactions = () => {
  const { transactionsData, isLoading } = useViewTransactions();
  const { userInfo, userToken } = useSelector(state => state.auth);
  const { data: userDeposits, isLoading: depositsLoading } = useGetUserDepositsQuery(userToken)
  const { data: allWithdrawals, isLoading: allWithdrawalsLoading, refetch: allWithdrawalsRefetch } = useGetUserWithdrawalsQuery(userToken);
  const financial_columns = React.useMemo(
    () => [
      {
        Header: 'Amount',
        accessor: 'amount',
        Cell: ({ value }) => (
          <div className="amount-cell">
            <span className="currency">USD</span>
            <span className="value">{value}</span>
          </div>
        ),
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ value }) => {
          const statusStyles = {
            approved: { backgroundColor: '#e6f4ea', color: '#1e8e3e' },
            pending: { backgroundColor: '#fef7e0', color: '#f9ab00' },
            canceled: { backgroundColor: '#fce8e6', color: '#d93025' },
          };
          const style = statusStyles[value.toLowerCase()] || { backgroundColor: '#f1f3f4', color: '#5f6368' };
          return (
            <div className="status-cell" style={style}>
              <span className="status-dot" style={{ backgroundColor: style.color }}></span>
              <span className="status-text">{value}</span>
            </div>
          );
        },
      },
      {
        Header: 'Created At',
        accessor: 'created_at',
        Cell: ({ value }) => {
          const date = new Date(value);
          return (
            <div className="date-cell">
              <span className="date">{format(date, 'MMM d, yyyy')}</span>
              <span className="time">{format(date, 'h:mm a')}</span>
            </div>
          );
        },
      },
    ],
    []
  );
  const columns = React.useMemo(() => [
    {
      Header: 'Transaction Amount',
      accessor: 'transaction_amount',
    },
    {
      Header: 'Transaction Method',
      accessor: 'transaction_method',
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ value }) => {
        const statusStyles = {
          approved: { backgroundColor: '#e6f4ea', color: '#1e8e3e' },
          pending: { backgroundColor: '#fef7e0', color: '#f9ab00' },
          canceled: { backgroundColor: '#fce8e6', color: '#d93025' },
        };
        const style = statusStyles[value.toLowerCase()] || { backgroundColor: '#f1f3f4', color: '#5f6368' };
        return (
          <div className="status-cell" style={style}>
            <span className="status-dot" style={{ backgroundColor: style.color }}></span>
            <span className="status-text">{value}</span>
          </div>
        );
      },
    },
    {
      Header: 'Created At',
      accessor: 'created_at',
      Cell: ({ value }) => {
        const date = new Date(value);
        return (
          <div className="date-cell">
            <span className="date">{format(date, 'MMM d, yyyy')}</span>
            <span className="time">{format(date, 'h:mm a')}</span>
          </div>
        );
      },
    },
  ], []);

  return (
    <div>
      {!Array.isArray(userDeposits) ? (
          <div
          className='card'
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '400px',
              fontSize: '18px',
              color: '#666',
              fontWeight: 'bold',
              padding: '20px',
              borderRadius: '10px',
              // backgroundColor: '#f0f0f0',
            }}
          >
            <p style={{ margin: 0 }}>No Transactions available</p>
          </div>
      ) : (
        <AdminTable columns={financial_columns} data={userDeposits} search={true} title={'Desposits'}/>
      )}

{
              Array.isArray(allWithdrawals) ? (
                <AdminTable columns={columns} data={allWithdrawals[1]?.data} search={true} title={'Withdrawals'}/>
              ) : (
                <div
                className='card'
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    fontSize: '18px',
                    color: '#666',
                    fontWeight: 'bold',
                    padding: '20px',
                    borderRadius: '10px',
                    // backgroundColor: '#f0f0f0',
                  }}
                >
                  <p style={{ margin: 0 }}>No Withdrawals available</p>
                </div>
              )
            }
    </div>
  );
};

export default ViewTransactions;
