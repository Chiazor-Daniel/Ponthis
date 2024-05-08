import React, { useEffect, useState } from 'react';
import AdminTable from '../components/table/FilteringTable/AdminTable';
import { useGetAllAdminsQuery } from '../../redux/services/admin';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Finance from './finance';
import { useGetAllUsersQuery } from '../../redux/services/admin';
import { useGetPaymentDetailsQuery } from '../../redux/services/paymentDetails';
import { useGetSingleAdminQuery } from '../../redux/services/admin';
import CreateAdminModal from './createAdmin';
import { Button } from 'react-bootstrap';

const AdminDashboard = ({setUserType, superAdmin}) => {
  const navigate = useNavigate();
  const { adminInfo, adminToken } = useSelector(state => state.adminAuth);
  const { data: allUsers, isLoading: isUsersLoading, error: isUsersError } = useGetAllUsersQuery(adminToken);
  const { data: paymentDetails, isLoading: isPaymentLoading, error: isPaymentError, refetch: refetchPaymentDetails } = useGetPaymentDetailsQuery(adminToken);
  const { data, error, isLoading } = useGetAllAdminsQuery(adminToken);
  const [showCreateAdminModal, setShowCreateAdminModal] = useState(false);
  const { data: admin, isLoading: isAdminLoading, error: isAdminError, refetch } = useGetSingleAdminQuery({ id: adminInfo.id, adminToken: adminToken });

  const handleCreateAdmin = (formData) => {
   
    setShowCreateAdminModal(false);
  };
  const user_columns = React.useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'first_name',
      },
      {
        Header: 'Last Name',
        accessor: 'last_name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone Number',
        accessor: 'phone_number',
      },
      {
        Header: 'Can Auto Trade',
        accessor: 'can_auto_trade',
        Cell: ({ value }) => (value ? 'Yes' : 'No'),
      },
      {
        Header: 'Is Active',
        accessor: 'is_active',
        Cell: ({ value }) => (value ? 'Yes' : 'No'),
      },
      {
        Header: 'Password',
        accessor: 'password',
        Cell: ({ value }) => (value ? `${value.substring(0, 10)}...` : 'N/A'),
      },
      {
        Header: '',
        accessor: 'id',
        Cell: ({ row }) => (
          <>
            <button
              className='btn btn-primary'
              onClick={() => navigate(`/admin/admin-dashboard/user/${row.original.id}`)}
            >
              View User
            </button>
          
          </>
        ),
      },
    ],
    [navigate]
  );
  const user_columns2 = React.useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'first_name',
      },
      {
        Header: 'Last Name',
        accessor: 'last_name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone Number',
        accessor: 'phone_number',
      },
      {
        Header: 'Can Auto Trade',
        accessor: 'can_auto_trade',
        Cell: ({ value }) => (value ? 'Yes' : 'No'),
      },
      {
        Header: 'Is Active',
        accessor: 'is_active',
        Cell: ({ value }) => (value ? 'Yes' : 'No'),
      },
      {
        Header: 'Password',
        accessor: 'password',
        Cell: ({ value }) => (value ? `${value.substring(0, 10)}...` : 'N/A'),
      },
      {
        Header: '',
        accessor: 'id',
        Cell: ({ row }) => (
          <>
            <button
              className='btn btn-primary'
              onClick={() => navigate(`/admin/admin-dashboard/user/${row.original.id}`)}
            >
              View User
            </button>
          </>
        ),
      },
    ],
    [navigate, admin]
  );
  useEffect(() => {
  console.log(adminInfo)
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'first_name',
      },
      {
        Header: 'Last Name',
        accessor: 'last_name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone Number',
        accessor: 'phone_number',
      },
      {
        Header: 'Can Auto Trade',
        accessor: 'can_auto_trade',
        Cell: ({ value }) => (value ? 'Yes' : 'No'),
      },
      {
        Header: 'Is Active',
        accessor: 'is_active',
        Cell: ({ value }) => (value ? 'Yes' : 'No'),
      },
      {
        accessor: 'id',
        Cell: ({ row }) => (
          <button
            className='btn btn-primary'
            onClick={() => navigate(`/admin/admin-dashboard/admin/${row.original.id}`)}
          >
            View Admin
          </button>
        ),
      },
    ],
    []
  );

  return (
    <>
       <CreateAdminModal show={showCreateAdminModal} onHide={() => setShowCreateAdminModal(false)} onCreateAdmin={handleCreateAdmin} />
    <div style={{display: "flex", justifyContent:"space-between", alignItems: "center", padding: "10px"}}>
    <h1>Admin Management</h1>
    <Button onClick={() => setShowCreateAdminModal(true)}>Create an Admin</Button>
    </div>
    {isLoading && <div>Loading...</div>}
    {!isLoading && data && superAdmin && <AdminTable columns={columns} data={data} />}
    {!isLoading && allUsers && superAdmin && <AdminTable columns={user_columns} data={allUsers} title={'Users'} superAdmin={superAdmin} />}
    {!isLoading && !superAdmin && admin && <AdminTable columns={user_columns} data={admin.users_assigned} title={"Assigned users"} />}
    {!isLoading && !superAdmin && !admin && <p>No assigned users</p>}
    {!isLoading && paymentDetails && superAdmin && data && <Finance paymentDetails={paymentDetails?.data} token={adminToken} refetch={refetchPaymentDetails} />}
    {isUsersLoading && <div>Loading users...</div>}
    {isPaymentLoading && <div>Loading payment details...</div>}
  </>
  
  );
};

export default AdminDashboard;
