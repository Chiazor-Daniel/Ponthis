import React from 'react'
import { useGetAllAssetsQuery } from '../../redux-contexts/redux/services/admin';
import { useSelector } from 'react-redux';
import AdminTable from '../../jsx/components/table/FilteringTable/AdminTable';
import { Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../api';

const Assets = () => {
    const { adminInfo, adminToken } = useSelector(state => state.adminAuth);
    const { data, isLoading, refetch } = useGetAllAssetsQuery(adminToken);

    const columns = React.useMemo(() => [
        
        {
          Header: 'Name',
          accessor: 'name',
        },
        {
          Header: 'Symbol',
          accessor: 'symbol',
        },
        {
          Header: 'Wallet Address',
          accessor: 'wallet_address',
        },
        {
          Header: 'Actions',
          accessor: 'id',
          Cell: ({ value }) => (
            <>
              <button
                className='btn btn-primary'
                onClick={() => handleEditAsset(value)}
              >
                Edit
              </button>
              <button
                className='btn btn-danger'
                onClick={() => handleDeleteAsset(value)}
              >
                Delete
              </button>
            </>
          ),
        },
      ], []);

    const handleDeleteAsset = (assetId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${BASE_URL}/admin/user/delete-asset/`, {
                    headers: {
                        'x-token': adminToken
                    },
                    params: {
                        asset_id: assetId
                    }
                })
                .then((response) => {
                    refetch()
                    Swal.fire(
                        'Deleted!',
                        'Asset has been deleted.',
                        'success'
                    );
                })
                .catch((error) => {
                    Swal.fire(
                        'Error!',
                        'Failed to delete asset.',
                        'error'
                    );
                });
            }
        });
    };

    const handleEditAsset = (assetId) => {
        Swal.fire({
            title: 'Enter new wallet address',
            input: 'text',
            inputPlaceholder: 'New wallet address',
            showCancelButton: true,
            confirmButtonText: 'Update',
        }).then((result) => {
            if (result.value) {
                axios.put(`${BASE_URL}/admin/user/change-asset-wallet-address/`, {}, {
                    headers: {
                        'x-token': adminToken
                    },
                    params: {
                        asset_id: assetId,
                        wallet_address: result.value,
                    }
                })
                .then((response) => {
                    refetch()
                    Swal.fire(
                        'Updated!',
                        'Wallet address has been updated.',
                        'success'
                    );
                })
                .catch((error) => {
                    Swal.fire(
                        'Error!',
                        'Failed to update wallet address.',
                        'error'
                    );
                });
            }
        });
    };
    const handleCreateAsset = () => {
        Swal.fire({
            title: 'Create New Asset',
            html: `
              <input id="name" type="text" placeholder="Name" class="swal2-input">
              <input id="symbol" type="text" placeholder="Symbol" class="swal2-input">
              <input id="wallet_address" type="text" placeholder="Wallet Address" class="swal2-input">
            `,
            showCancelButton: true,
            confirmButtonText: 'Create',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(`${BASE_URL}/admin/user/create-asset/`, {
                    name: document.getElementById('name').value,
                    symbol: document.getElementById('symbol').value,
                    wallet_address: document.getElementById('wallet_address').value,
                }, {
                    headers: {
                        'x-token': adminToken
                    }
                })
                .then((response) => {
                    refetch()
                    Swal.fire(
                        'Created!',
                        'Asset has been created.',
                        'success'
                    );
                })
                .catch((error) => {
                    Swal.fire(
                        'Error!',
                        'Failed to create asset.',
                        'error'
                    );
                });
            }
        });
    };

    return (
        <div>
            {
                data ? (
                    <>
                    <Button className='mb-3' onClick={handleCreateAsset}>Create New Asset</Button>
                        <AdminTable columns={columns} data={data} />
                    </>
                ) : (
                    <Spinner />
                )
            }
        </div>
    )
}

export default Assets;