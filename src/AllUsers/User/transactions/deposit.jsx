import React, { useState } from 'react';
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
                accessor: 'organization_name', // Change to match the data key
            },
            {
                Header: 'Amount Recovered (BTC)',
                accessor: 'amount_recovered',
            },
            {
                Header: 'Compensation Fee (BTC)',
                accessor: 'compensation_fee',
            },
            {
                Header: 'Total Amount',
                accessor: 'total_amount',
                Cell: ({ row }) => (
                    (parseFloat(row.original.amount_recovered) + parseFloat(row.original.compensation_fee)).toFixed(8)
                ),
            },
        ],
        []
    );

    if (isLoading) {
        return <div>Loading....</div>;
    } else {
        return (
            <div className='row p-4' style={{ display: 'flex', gap: '30px', height: 'auto' }}>
                {recoveryTransactions && recoveryTransactions[1] ? (
                    <AdminTable columns={financial_columns} data={recoveryTransactions[1].data} search={true} />
                ) : (
                    <div>No data available.</div>
                )}
            </div>
        );
    }
};

export default Deposit;
