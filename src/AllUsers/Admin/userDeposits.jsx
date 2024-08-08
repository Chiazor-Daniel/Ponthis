import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useGetUserDepositsQuery } from '../../redux-contexts/redux/services/transactions';
import { useGetAllDepositsQuery } from '../../redux-contexts/redux/services/admin';
import { formatDistance, parseISO } from 'date-fns';
import AdminTable from '../../jsx/components/table/FilteringTable/AdminTable';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { BASE_URL } from '../../api';

const UserDeposits = ({ adminToken, user_id, fetchUserBalancesAndAssets }) => {
  const { data, error, isLoading, refetch } = useGetAllDepositsQuery({ token: adminToken, user_id: user_id });
  const [statuses, setStatuses] = useState({});

  const updateDepositStatus = async (deposit_transaction_id) => {
    try {
      const response = await axios.put(`${BASE_URL}/admin/user/change-deposit-status/`, {}, {
        headers: { 'x-token': adminToken },
        params: {
          user_id,
          deposit_transaction_id,
          status_: statuses[deposit_transaction_id],
        },
      });
      if (response.data.status === 'success') {
        refetch()
        fetchUserBalancesAndAssets()
        Swal.fire('Success', response.data.message, 'success');
      } else {
        Swal.fire('Error', response.data.message, 'error');
      }
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Amount',
        accessor: 'amount',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ row }) => (
          <div>
            {row.original.status === 'pending' ? (
              <span style={{ color: 'orange' }}>{row.original.status}</span>
            ) : row.original.status === 'approved' ? (
              <span style={{ color: 'green' }}>{row.original.status}</span>
            ) : (
              <span style={{ color: 'red' }}>{row.original.status}</span>
            )}
          </div>
        ),
      },
      {
        Header: 'Created At',
        accessor: 'created_at',
        Cell: ({ row }) => (
          <div>
            {formatDistance(parseISO(row.original.created_at), new Date())}
          </div>
        ),
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          <div style={{display: 'flex', gap: '20px'}}>
            <DropdownButton id="dropdown-basic-button" title={statuses[row.original.id] || 'Select Status'}>
              <Dropdown.Item onClick={() => setStatuses(prev => ({ ...prev, [row.original.id]: 'pending' }))}>Pending</Dropdown.Item>
              <Dropdown.Item onClick={() => setStatuses(prev => ({ ...prev, [row.original.id]: 'approved' }))}>Approved</Dropdown.Item>
              <Dropdown.Item onClick={() => setStatuses(prev => ({ ...prev, [row.original.id]: 'not approved' }))}>Not Approved</Dropdown.Item>
            </DropdownButton>
            <Button
              variant="primary"
              onClick={() => updateDepositStatus(row.original.id, statuses[row.original.id])}
              className="ml-2"
            >
              Update Status
            </Button>
          </div>
        ),
      },
    ],
    [statuses]
  );

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {data && <AdminTable columns={columns} data={data} title="User Deposits"/>}
        </>
      )}
    </div>
  );
};

export default UserDeposits;