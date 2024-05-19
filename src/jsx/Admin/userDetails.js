/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleUserQuery, useResetUserPasswordMutation } from '../../redux/services/admin';
import Avatar from 'react-avatar';
import Dropdown from 'react-bootstrap/Dropdown';
import { BiSolidBoltCircle } from "react-icons/bi";
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserForm from './userForm';
import { useEditUseretailsMutation } from '../../redux/services/admin';
import FilteringTable from '../components/table/FilteringTable/FilteringTable';
import Swal from 'sweetalert2';
import { useLoginUserMutation } from '../../redux/services/admin';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { BASE_URL } from '../../api';
import { loginSuccess } from '../../redux/features/auth/authSlice';
import { useGetAllTradesQuery } from '../../redux/services/trades'
import { Tab, Nav } from 'react-bootstrap';
import { useCreateCustomProfitMutation } from '../../redux/services/admin';
import FutureTable from '../components/Trading/futuretable';
const UserDetails = ({ setUserType, setAsAdmin, userType }) => {
    console.log(userType)
    const { id } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [createCustomProfit] = useCreateCustomProfitMutation()
    const { adminToken } = useSelector(state => state.adminAuth)
    const [editUserDetails, { isLoading: isEditing, error: editingError }] = useEditUseretailsMutation();
    const { data: userData, isLoading, error, refetch } = useGetSingleUserQuery({ id, adminToken });
    const [resetUserPassword, { isLoading: resetLoading, error: reseError }] = useResetUserPasswordMutation()
    const [loginUser, { isLoading: loginLoading, error: loginError }] = useLoginUserMutation()
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const [fills, setFills] = useState("all")
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
                    console.log(editRes);
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
                    console.log(error);
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
                    console.log(resetRes)
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
                    console.log(error);
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
            console.log(loginRes);
            console.log("user token", loginRes?.data["access-token"]);

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
                    position: toast.POSITION.TOP_CENTER,
                    onClose: () => {
                        navigate("/dashboard");
                        console.log("hey", userInfo.data)
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





    useEffect(() => {
        if (shouldRefetch) {
            setShouldRefetch(false); // Reset state after re-render
        }
    }, [shouldRefetch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const user = userData[0]?.user;

    const userDetails = [
        { label: 'First Name', value: user.first_name },
        { label: 'Last Name', value: user.last_name },
        { label: 'Email', value: user.email },
        { label: 'Phone Number', value: user.phone_number },
        { label: 'Can Auto Trade', value: user.can_auto_trade ? 'Yes' : 'No' },
        { label: 'Is Active', value: user.is_active ? 'Yes' : 'No' },
        { label: 'User Type', value: user.user_type },
        { label: 'Address', value: user.address },
        { label: 'Country', value: user.country },
        { label: 'Date of Birth', value: user.date_of_birth },
        { label: 'Auto Trade Count', value: user.auto_trade_count },
        { label: 'Verified', value: user.verified ? 'Yes' : 'No' },
        { label: 'Assigned To', value: user.assigned_to },
        { label: 'Created At', value: user.created_at },
    ];

    const transactionDataAvailable = userData[2]?.transaction_activities;
    console.log(userData[1]['trading activities'])
    console.log(userData)

    

    return (
        <>
            <ToastContainer />
            <div className=''>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h1>User Details</h1>
                </div>
                <div className='row' style={{ gap: "50px", display: "flex", justifyContent: "center" }}>
                    <div className='card col-5' style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", fontSize: "1.3rem" }}>
                        <Dropdown style={{ position: "absolute", right: 20 }}>
                            <Dropdown.Toggle style={{ backgroundColor: "transparent", border: "none", fontSize: "1.5rem", color: "#6c757d", padding: "0" }}>
                                <BiSolidBoltCircle />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">
                                    <button className='btn' style={{ backgroundColor: "red", color: "white" }}>Delete User</button>
                                </Dropdown.Item>
                                {/* Add more dropdown items if needed */}
                            </Dropdown.Menu>
                        </Dropdown>
                        <div className="d-flex align-items-center mb-3" style={{ position: "relative" }}>
                            <Avatar name={`${user.first_name} ${user.last_name}`} size="150" round />
                            <div style={{ position: "absolute", top: "20px", right: "0px", width: "20px", height: "20px", borderRadius: "50%", backgroundColor: user.is_active ? "green" : "gray" }}></div>
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
                    <div className='col-5'>
                        <div className='' style={{ padding: "20px" }}>
                            <h1>Edit User Details</h1>
                            <UserForm user={user} onSubmit={handleSubmit} userResetPassword={userResetPassword} />
                        </div>
                        <div className='card' style={{maxHeight:"400px", padding: '20px'}}>
                            <h3>User Account</h3>
                            <p style={{fontSize: '2rem'}}>Main Balance : $<span style={{fontWeight: 'bold'}}>{userData[3]?.accounts[0].main_balance}</span></p>
                            <p style={{fontSize: '1.5rem'}}>Referral Balance : $<span style={{fontWeight: 'bold'}}>{userData[3]?.accounts[0].referral_balance}</span></p>
                            <p style={{fontSize: '1.5rem'}}>Bonus Balance : $<span style={{fontWeight: 'bold'}}>{userData[3]?.accounts[0].bonus_balance}</span></p>

                        </div>
                    </div>
                </div>
                <div>
                    {userData[2]?.transaction_activities && (
                        <FilteringTable user="admin" data={userData[2].transaction_activities} userId={id} refetchUser={reUser} />
                    )}
                      <div className="card" style={{ padding: "20px" }}>
                        <h4>User trading activities</h4>
                        <Tab.Container defaultActiveKey="All">

                            <div className="card-header border-0">
                                <Nav as="ul" className="order  nav-tabs" id="pills-tab" role="tablist">
                                    <Nav.Item as="li" className=" my-1" role="presentation">
                                        <Nav.Link as="button" eventKey="All" type="button" onClick={()=>setFills("all")}>All Trade</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li" className=" my-1" role="presentation">
                                        <Nav.Link as="button" eventKey="Spot" type="button" onClick={()=>setFills("open")}>Opened</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li" className=" my-1" role="presentation">
                                        <Nav.Link as="button" className="me-0" eventKey="Listing" type="button" onClick={()=>setFills("close")}>Closed</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                </div>
                        <div className="card-body pt-0">
                            <div style={{display: "flex", justifyContent: "flex-end"}}>
                                
                            </div>
                            <FutureTable tradesData={userData[1]['trading activities']} isLoading={isLoading} refetchData={refetch} fills={'all'} userToken={adminToken} userType={userType} userId={parseInt(id)}/>
                        </div>
                        </Tab.Container>
                      </div>
                </div>
            </div>
        </>
    );
};

export default UserDetails;
