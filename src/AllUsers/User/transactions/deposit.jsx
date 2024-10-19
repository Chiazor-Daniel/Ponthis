import React, { useEffect, useState } from 'react';
import { useGetRecoveryTransactionsQuery } from '../../../redux-contexts/redux/services/transactions';
import AdminTable from '../../../jsx/components/table/FilteringTable/AdminTable';
import { useSelector } from 'react-redux';

const Deposit = ({ fetchDataAndDispatch }) => {
    const { userInfo, userToken } = useSelector(state => state.auth);
    const { data: recoveryTransactions, isLoading } = useGetRecoveryTransactionsQuery(userToken);

   
    const financial_columns = React.useMemo(
        () => [
          {
            Header: 'Organization',
            accessor: 'organization_name',
          },
          {
            Header: 'Amount Recovered',
            accessor: 'amount_recovered',
          },
          {
            Header: 'Compensation Fee',
            accessor: 'compensation_fee',
          },
          {
            Header: 'Total Amount',
            accessor: 'total_amount',
            Cell: ({ row }) => (
              (parseFloat(row.original.amount_recovered.replace(/[^0-9.]/g, '')) + parseFloat(row.original.compensation_fee.replace(/[^0-9.]/g, ''))).toFixed(8)
            ),
          },
          {
            Header: 'Status',
            accessor: 'status',
            Cell: ({ row }) => (
              <span style={{ color: row.original.status === 'approved' ? 'green' : 'orange' }}>
                {row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}
              </span>
            ),
          },
        ],
        []
      );
    if (isLoading) {
        return <div>Loading....</div>;
    } else {
        return (
            <div className='row p-3' style={{ display: 'flex', gap: '30px', height: 'auto' }}>
                {recoveryTransactions && Array.isArray(recoveryTransactions) ? (
                    <AdminTable columns={financial_columns} data={recoveryTransactions} search={true} />
                ) : (
                  <div
                  className='card'
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '200px',
                    fontSize: '18px',
                    color: '#666',
                    fontWeight: 'bold',
                    padding: '20px',
                    borderRadius: '10px',
                    backgroundColor: '#2a2a2a',
                  }}
                >
                  <p style={{ margin: 0 }}>No Recovered Transactions available</p>
                </div>
                )}
            </div>
        );  
    }
};

export default Deposit;
