import React, { useState } from 'react';
import AdminTable from '../../jsx/components/table/FilteringTable/AdminTable';
import { useNavigate } from 'react-router-dom';
import { useCreateUserMutation, useGetSingleAdminQuery } from '../../redux-contexts/redux/services/admin';
import { useGetAllAdminsQuery } from '../../redux-contexts/redux/services/admin';
import { useGetAllUsersQuery } from '../../redux-contexts/redux/services/admin';
import { useSelector } from 'react-redux';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

const UserManagement = ({ superAdmin }) => {
  const { adminInfo, adminToken } = useSelector(state => state.adminAuth);
  const navigate = useNavigate()
  const { data: admin, isLoading: isAdminLoading, error: isAdminError, refetch } = useGetSingleAdminQuery({ id: adminInfo.id, adminToken: adminToken });
  const { data: allUsers, isLoading: isUsersLoading, error: isUsersError,refetch: usersRefetch } = useGetAllUsersQuery(adminToken);
  const [createUser] = useCreateUserMutation()
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    country: '',
    phoneNumber: '',
    dateOfBirth: '',
    password: '',
  });

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
    []
  );

  const handleCreateUser = async () => {
    try {
      const response = await createUser({
        ...newUser,
        token: adminToken,
      });
      if(response.data.status === 'success'){
        usersRefetch()
        Swal.fire({
          icon: 'success', title: 'User Created Succesfully'
        })
      } else {
        Swal.fire({
          icon: 'error', title: 'User Already Exists'
        })
      }
      setShowModal(false);
    } catch (error) {
      Swal.fire({
        icon: 'error', title: 'User Already Exists'
      })
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {!isUsersLoading && allUsers && !superAdmin && <AdminTable columns={user_columns} data={allUsers.message} title={'Users'} />}
      {!isAdminLoading && allUsers && superAdmin && (
        <>
          <Button className='m-4' onClick={() => setShowModal(true)}>Create New User</Button>
          <AdminTable columns={user_columns} data={allUsers.message} title={'Users'} superAdmin={superAdmin} />
        </>
      )}
      {!isAdminLoading && !superAdmin && admin && <AdminTable columns={user_columns} data={admin.users_assigned} title={"Assigned users"} />}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={newUser.firstName}
                onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={newUser.lastName}
                onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={newUser.address}
                onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                value={newUser.country}
                onChange={(e) => setNewUser({ ...newUser, country: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={newUser.phoneNumber}
                onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="dateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                value={newUser.dateOfBirth}
                onChange={(e) => setNewUser({ ...newUser, dateOfBirth: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateUser}>
            Create User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserManagement;