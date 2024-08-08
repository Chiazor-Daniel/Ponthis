/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleUserQuery, useMakeNewRecoveryTransactionMutation, useResetUserPasswordMutation } from '../../redux-contexts/redux/services/admin';
import Avatar from 'react-avatar';
import Dropdown from 'react-bootstrap/Dropdown';
import { BiSolidBoltCircle } from "react-icons/bi";
import { Button, Form, FormControl } from 'react-bootstrap';
import { Modal, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserForm from './userForm';
import { useEditUseretailsMutation } from '../../redux-contexts/redux/services/admin';
import FilteringTable from '../../jsx/components/table/FilteringTable/FilteringTable';
import Swal from 'sweetalert2';
import { useLoginUserMutation } from '../../redux-contexts/redux/services/admin';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { BASE_URL } from '../../api';
import { loginSuccess } from '../../redux-contexts/redux/features/auth/authSlice';
import { useGetAllTradesQuery } from '../../redux-contexts/redux/services/trades'
import { Tab, Nav } from 'react-bootstrap';
import { useResponsive } from '../../redux-contexts/context/responsive';
import { useCreateCustomProfitMutation } from '../../redux-contexts/redux/services/admin';
import FutureTable from '../../jsx/components/Trading/futuretable';
import { FaLongArrowAltRight } from "react-icons/fa";
import { useUpdateAccountTypeMutation } from '../../redux-contexts/redux/services/admin';
import AdminTable from '../../jsx/components/table/FilteringTable/AdminTable';
import { useGetAllCardsQuery } from '../../redux-contexts/redux/services/admin';
import UserCards from './userCards';
import UserDeposits from './userDeposits';

const UserDetails = ({ setUserType, setAsAdmin, userType, superAdmin }) => {
    const { id } = useParams();
    const { isMobile } = useResponsive()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [createCustomProfit] = useCreateCustomProfitMutation()
    const [updateAccountType] = useUpdateAccountTypeMutation()
    const { adminToken, adminInfo } = useSelector(state => state.adminAuth)
    const { data: cards, isLoading: cardsLoading, refetch: cardRefetch } = useGetAllCardsQuery({
        token: adminToken,
        user_id: id
    })
    const [editUserDetails, { isLoading: isEditing, error: editingError }] = useEditUseretailsMutation();
    const { data: userData, isLoading, error, refetch } = useGetSingleUserQuery({ id, adminToken });
    const [resetUserPassword, { isLoading: resetLoading, error: reseError }] = useResetUserPasswordMutation()
    const [loginUser, { isLoading: loginLoading, error: loginError }] = useLoginUserMutation()
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const [makeNewRecovery] = useMakeNewRecoveryTransactionMutation()
    const [fills, setFills] = useState("all")
    const [userAccountType, setUserAccountType] = useState('')
    const [organizationName, setOrganizationName] = useState('');
    const [amountRecovered, setAmountRecovered] = useState('');
    const [compensationFee, setCompensationFee] = useState('');
    const [status, setStatus] = useState('pending');
    const [createdAt, setCreatedAt] = useState(new Date().toISOString());
    const [modalShow, setModalShow] = useState(false)
    const [userBalances, setUserBalances] = useState(null);
    const [userAssets, setUserAssets] = useState([]);
    
    const fetchUserBalancesAndAssets = async () => {
        try {
            const balancesResponse = await axios.get(`${BASE_URL}/admin/user/get-user-balances/`, {
                params: { user_id: id },
                headers: { 'x-token': adminToken }
            });
            setUserBalances(balancesResponse.data);

            const assetsResponse = await axios.get(`${BASE_URL}/admin/user/get-user-assets/`, {
                params: { user_id: id },
                headers: { 'x-token': adminToken }
            });
            setUserAssets(assetsResponse.data);
        } catch (error) {
            console.error('Error fetching user balances and assets:', error);
        }
    };
    useEffect(() => {

        fetchUserBalancesAndAssets();
    }, [id, adminToken]);

    const columns = [
        {
            Header: 'Amount Recovered',
            accessor: 'amount_recovered',
        },
        {
            Header: 'Status',
            accessor: 'status',
        },

        {
            Header: 'Organization Name',
            accessor: 'organization_name',
        },
        {
            Header: 'Compensation Fee',
            accessor: 'compensation_fee',
        },
        {
            Header: 'Created At',
            accessor: 'created_at',
        },
        {
            Header: '',
            accessor: 'id',
            Cell: ({value}) => {
                return(
                <>
                    <Button
                    variant='danger'
                        onMouseEnter={() => 
                            Swal.fire({
                                title: 'Delete Recovery',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes, delete it!'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    console.log('Confirmed deletion'); // Debugging log
                                    console.log('Transaction ID:', value); // Debugging log
                                    axios.delete(`${BASE_URL}/admin/user/delete-recover-transaction/`, {
                                        headers: {
                                            'x-token': adminToken
                                        },
                                        params: {
                                            transaction_id: value
                                        }
                                    }).then((res) => {
                                        console.log(res); // Debugging log
                                        if (res.data.status === "success") {
                                            refetch()
                                            fetchUserBalancesAndAssets()
                                            Swal.fire(
                                                'Deleted',
                                                'Recovery Transaction Deleted',
                                                'success'
                                            );
                                        }
                                    }).catch((error) => {
                                        console.error('Error during deletion:', error); // Debugging log
                                        Swal.fire(
                                            'Error',
                                            'An Error Occurred',
                                            'error'
                                        );
                                    });
                                }
                            })}
                    >Delete Recvoery</Button>
                </>
                )
            }
        }, 
    ]

    const handleSubmit = async (formData) => {
        Swal.fire({
            icon: 'info',
            title: 'Update user details',
            text: 'Are you sure you want to update user details?',
            showCancelButton: true,
            confirmButtonText: 'Yes, update',
            cancelButtonText: 'Cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'info',
                    title: 'Updating user details...',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });
                try {
                    const editRes = await editUserDetails({ user_id: id, userDetails: formData, token: adminToken });
                    if (editRes.data.status === "success") {
                        refetch()
                        Swal.fire({
                            icon: 'success',
                            title: 'User details updated successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed to update user details! No changes were made',
                        text: 'Try again',
                        showConfirmButton: true
                    });
                }
            }
        });
    };
    const userResetPassword = async () => {
        Swal.fire({
            icon: 'info',
            title: 'Reset user password',
            text: 'Are you sure you want to reset this user password?',
            showCancelButton: true,
            confirmButtonText: 'Yes, reset',
            cancelButtonText: 'Cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'info',
                    title: 'Resetting...',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });
                try {
                    const resetRes = await resetUserPassword({ user_id: id, token: adminToken });
                    if (resetRes.data.status === "success") {
                        refetch()
                        Swal.fire({
                            icon: 'success',
                            title: 'Password reset success!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Failed to reset!',
                            text: 'Try again',
                            showConfirmButton: true
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed to reset!',
                        text: 'Try again',
                        showConfirmButton: true
                    });
                }
            }
        });
    };

    const reUser = () => {
        refetch();
        setShouldRefetch(true); // Set state to trigger re-render
    };

    const handleLoginUser = async () => {
        try {
            Swal.fire({
                title: 'Logging In',
                html: '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>',
                allowOutsideClick: false,
                showConfirmButton: false,
                onBeforeOpen: () => {
                    Swal.showLoading();
                }
            });

            const loginRes = await loginUser({ user_id: id, token: adminToken });

            if (loginRes.data.status === 'success') {
                const userToken = loginRes?.data["access-token"];
                const userInfo = await axios.get(`${BASE_URL}/user/profile/users/`, {
                    headers: {
                        "x-token": userToken
                    }
                });

                sessionStorage.setItem("userToken", userToken); // Save user token in sessionStorage
                sessionStorage.setItem("userInfo", JSON.stringify(userInfo.data)); // Save user info in sessionStorage
                dispatch(loginSuccess({ userInfo: userInfo.data, userToken: userToken }))
                localStorage.setItem("user", "user")


                Swal.fire({
                    icon: "success",
                    title: "Login user success",
                    text: "logged into user account successfully",
                    showConfirmButton: false,
                });

                toast.success("Login successful!", {
                    autoClose: 1000,
                    position: 'top-center',
                    onClose: () => {
                        navigate("/dashboard");
                        setUserType("user");
                        setAsAdmin(true)
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Please check your credentials and try again.'
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while logging in. Please try again later.'
            });
        }
    };
    // const user = userData?.message[0]?.user

    const userDetails = [
        { label: 'First Name', value: userData?.message[0]?.user.first_name },
        { label: 'Last Name', value: userData?.message[0]?.user.last_name },
        { label: 'Email', value: userData?.message[0]?.user.email },
        { label: 'Phone Number', value: userData?.message[0]?.user.phone_number },
        { label: 'Can Auto Trade', value: userData?.message[0]?.user.can_auto_trade ? 'Yes' : 'No' },
        { label: 'Is Active', value: userData?.message[0]?.user.is_active ? 'Yes' : 'No' },
        { label: 'User Type', value: userData?.message[0]?.user.user_type },
        { label: 'Address', value: userData?.message[0]?.user.address },
        { label: 'Country', value: userData?.message[0]?.user.country },
        { label: 'Date of Birth', value: userData?.message[0]?.user.date_of_birth },
        { label: 'Auto Trade Count', value: userData?.message[0]?.user.auto_trade_count },
        { label: 'Verified', value: userData?.message[0]?.user.verified ? 'Yes' : 'No' },
        { label: 'Assigned To', value: userData?.message[0]?.user.assigned_to },
        { label: 'Created At', value: userData?.message[0]?.user.created_at },
    ];
    // const [transactionDataAvailable, setTransactionDataAvailable] = useState(userData.message[2]?.transaction_activities)
    
    const [assets, setAssets] = useState([]);
    const [selectedAsset, setSelectedAsset] = useState(null);

    const fetchAssets = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/admin/user/get-all-assets/`, {
                headers: {
                    'x-token': adminToken,
                },
            });
            console.log(response)
            setAssets(response.data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchAssets();
    }, [adminToken]);

    const handleAssetChange = (e) => {
        const selectedAsset = assets.find((asset) => asset.id === parseInt(e.target.value));
        setSelectedAsset(selectedAsset);
    };
    const [verificationStatus, setVerificationStatus] = useState('unverified');


    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (

        <>
            <ToastContainer />
            <div className=''>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h1>User Details</h1>
                </div>
                <div className='row' style={{ gap: "50px", display: "flex", justifyContent: "center" }}>
                    <div className='card col-12 col-lg-5' style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", fontSize: "1.3rem" }}>
                        <Dropdown style={{ position: "absolute", right: 20 }}>
                            <Dropdown.Toggle style={{ backgroundColor: "transparent", border: "none", fontSize: "1.5rem", color: "#6c757d", padding: "0" }}>
                                <BiSolidBoltCircle />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">
                                    <button className='btn' style={{ backgroundColor: "red", color: "white" }}>Delete User</button>
                                </Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>
                        <div className="d-flex align-items-center mb-3" style={{ position: "relative", flexDirection: 'column' }}>
                            <Avatar name={`${userData?.message[0]?.user.first_name} ${userData?.message[0]?.user.last_name}`} size="150" round />
                            <div style={{ position: "absolute", top: "20px", right: "10px", width: "20px", height: "20px", borderRadius: "50%", backgroundColor: userData?.message[0]?.user.is_active ? "green" : "gray" }}></div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                                <div style={{ display: 'grid', alignItems: 'center', gap: '10px' }}>
                                    <Form.Select size='sm' value={verificationStatus} onChange={(e) => setVerificationStatus(e.target.value)}>
                                        <option value='unverified'>Unverified</option>
                                        <option value='verifying'>Verifying</option>
                                        <option value='verified'>Verified</option>
                                    </Form.Select>
                                    <Button style={{ marginTop: '20px' }} onClick={() => {
                                        Swal.fire({
                                            icon: "info",
                                            title: 'Update verification status',
                                            text: '',
                                            showCancelButton: true,
                                            confirmButtonText: "Yes",
                                            cancelButtonText: "No",
                                        }).then(async (result) => {
                                            if (result.isConfirmed) {
                                                try {
                                                    const res = await axios.put(`${BASE_URL}/admin/user/change-verification-status/${parseInt(id)}`, null, {
                                                        headers: {
                                                            'x-token': adminToken
                                                        },
                                                        params: {
                                                            status_: verificationStatus
                                                        }
                                                    })
                                                    if (res.data.status === 'success') {
                                                        refetch()
                                                        Swal.fire({
                                                            icon: 'success',
                                                            title: 'Updated',
                                                            text: `Updated user verification status.`,
                                                        });
                                                    }
                                                } catch (error) {
                                                    console.error(error);
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Update failed',
                                                        text: 'There was an error updating the verification status. Please try again later.',
                                                    });
                                                }
                                            }
                                        });
                                    }}>{verificationStatus === 'verified' ? "Change Verification Status" : "Verify User"}</Button>
                                    <Button onClick={() => {
                                        Swal.fire({
                                            icon: "info",
                                            title: "Confirm Action",
                                            text: "Are you sure you want to enable/disable withdrawal?",
                                            showCancelButton: true,
                                            confirmButtonText: "Yes",
                                            cancelButtonText: "No",
                                        }).then(async (result) => {
                                            if (result.isConfirmed) {
                                                try {
                                                    const res = await axios.put(`${BASE_URL}/admin/user/can-withdraw/${id}`, null, {
                                                        headers: {
                                                            'x-token': adminToken
                                                        }
                                                    });
                                                    if (res.data.status === 'success') {
                                                        refetch()
                                                        Swal.fire({
                                                            icon: 'success',
                                                            title: 'Updated',
                                                            text: `Updated user withdrawal status.`,
                                                        });
                                                    }
                                                } catch (error) {
                                                    console.error(error);
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Update failed',
                                                        text: 'There was an error updating the withdrawal status. Please try again later.',
                                                    });
                                                }
                                            }
                                        });
                                    }}>Enable/Disable Withdrawal</Button>
                                </div>
                            </div>
                        </div>
                        {userDetails.map((detail, index) => (
                            <div key={index} className='row' style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", width: "100%" }}>
                                <p style={{ width: "50%" }}>{detail.label}:</p>
                                <p style={{ width: "50%" }}>{detail.value}</p>
                            </div>
                        ))}
                        <div className='row' style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                            <button className='btn btn-primary' onClick={handleLoginUser}>
                                Login User Account
                            </button>
                        </div>
                    </div>
                    <div className='col-12 col-lg-5'>
                        <div className='' style={{ padding: "20px" }}>
                            <h1>Edit User Details</h1>
                            <UserForm user={userData?.message[0]?.user} onSubmit={handleSubmit} userResetPassword={userResetPassword} />
                        </div>
                        
                    </div>
                    <div className='row mb-4' style={{ padding: "20px", marginTop: "20px" }}>
  <h2 className="mb-4">User Balances and Assets</h2>
  
  {userBalances && (
    <div className="col-md-6 mb-4">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h3 className="card-title mb-4">Balances</h3>
          <div className="d-flex justify-content-between mb-3">
            <span className="text-muted">User Currency</span>
            <span className="font-weight-bold">{userBalances.user_currency.toUpperCase()}</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span className="text-muted">Total Balance</span>
            <span className="font-weight-bold">{userBalances.total_balance.toFixed(2)} {userBalances.user_currency.toUpperCase()}</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span className="text-muted">Crypto Assets Value</span>
            <span className="font-weight-bold">{userBalances.crypto_assets_value.toFixed(2)} {userBalances.user_currency.toUpperCase()}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span className="text-muted">Fiat Balance</span>
            <span className="font-weight-bold">{userBalances.fiat_balance} {userBalances.user_currency.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  )}
  
  {userAssets.length > 0 && (
    <div className="col-md-6 mb-4">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h3 className="card-title mb-4">Assets</h3>
          <div className="asset-list">
            {userAssets.map((asset) => (
              <div key={asset.id} className="asset-item mb-3 p-3 bg-black rounded" style={{color: 'white'}}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="font-weight-bold">{asset.asset_name} ({asset.asset_symbol})</span>
                  <span className="badge bg-primary">{asset.balance}</span>
                </div>
                <div className="text-muted small" style={{wordBreak: "break-all"}}>
                  {asset.wallet_address}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )}
</div>
                </div>
                <UserDeposits adminToken={adminToken} user_id={id} fetchUserBalancesAndAssets={fetchUserBalancesAndAssets} />
                {cards && <UserCards cards={cards} adminToken={adminToken} user_id={id} refetch={cardRefetch} />}

                <div>
                    <div className="" style={{ padding: "20px" }}>
                        <>
                            <Modal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                size="md"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">
                                        Create New Recovery Transaction
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group controlId="assetId">
                                            <Form.Label>Asset</Form.Label>
                                            <Form.Select value={selectedAsset?.id} onChange={handleAssetChange}>
                                                <option value="">Select Asset</option>
                                                {assets && assets.map((asset) => (
                                                    <option key={asset.id} value={asset.id}>
                                                        {asset.name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group controlId="organizationName">
                                            <Form.Label>Organization Name</Form.Label>
                                            <FormControl
                                                type="text"
                                                value={organizationName}
                                                onChange={(e) => setOrganizationName(e.target.value)}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="amountRecovered">
                                            <Form.Label>Amount Recovered</Form.Label>
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                    type="number"
                                                    value={amountRecovered}
                                                    onChange={(e) => setAmountRecovered(e.target.value)}
                                                />
                                                <InputGroup.Text></InputGroup.Text>
                                            </InputGroup>
                                        </Form.Group>

                                        <Form.Group controlId="compensationFee">
                                            <Form.Label>Compensation Fee</Form.Label>
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                    type="number"
                                                    value={compensationFee}
                                                    onChange={(e) => setCompensationFee(e.target.value)}
                                                />
                                                <InputGroup.Text></InputGroup.Text>
                                            </InputGroup>
                                        </Form.Group>

                                        <Form.Group controlId="status">
                                            <Form.Label>Status</Form.Label>
                                            <Form.Select
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="processing">Processing</option>
                                                <option value="not approved">Not Approved</option>
                                                <option value="approved">Approved</option>
                                            </Form.Select>
                                        </Form.Group>

                                        {/* <Form.Group controlId="createdAt">
                                            <Form.Label>Created At</Form.Label>
                                            <FormControl
                                                type="datetime-local"
                                                value={createdAt}
                                                onChange={(e) => setCreatedAt(e.target.value)}
                                            />
                                        </Form.Group> */}
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>

                                    <Button onClick={async () => {
                                        try {
                                            const response = await axios.post(`${BASE_URL}/admin/user/make-recover-transaction/`, null, {
                                                params: {
                                                    user_id: id,
                                                    asset_id: selectedAsset?.id,
                                                    organization_name: organizationName,
                                                    amount_recovered: amountRecovered,
                                                    compensation_fee: compensationFee,
                                                    status: status,
                                                    created_at: createdAt,
                                                },
                                                headers: {
                                                    'x-token': adminToken,
                                                },
                                            });
                                            if (response.data.status === 'success') {
                                                refetch();
                                                fetchUserBalancesAndAssets()
                                                Swal.fire({
                                                    icon: "success",
                                                    title: "Recovery Transaction Created Successfully",
                                                    onClose: () => setModalShow(false)
                                                });
                                            }
                                        } catch (err) {
                                            Swal.fire({
                                                icon: "error",
                                                title: "An error occurred",
                                            });
                                        }
                                    }}>
                                        Create New Recovery Transaction
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            {
                                userData.message[1]['recovery activities'] && (
                                    <AdminTable data={userData.message[1]['recovery activities']} columns={columns} title={'User Recovery Activities'} makeRec={true} makeRecovery={() => setModalShow(true)} />
                                )
                            }
                        </>
                        <h1>User Withdrawals</h1>
                        {
                            userData.message[2]?.withdrawal_activities && (
                                <FilteringTable user="admin" data={userData.message[2]?.withdrawal_activities} userId={id} refetchUser={reUser} superAdmin={superAdmin} fetchUserBalancesAndAssets={fetchUserBalancesAndAssets}/>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserDetails;
