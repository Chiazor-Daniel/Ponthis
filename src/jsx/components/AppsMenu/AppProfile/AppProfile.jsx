/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Tab, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useUpdateProfileMutation } from "../../../../redux-contexts/redux/services/profile";
import { useChangePasswordMutation } from "../../../../redux-contexts/redux/services/profile";
import { updateState } from "../../../../redux-contexts/redux/features/auth/authSlice";
import Spinner from 'react-bootstrap/Spinner';
import { toast, ToastContainer } from "react-toastify";
import { FaMedal } from "react-icons/fa6";
import Avatar from 'react-avatar';
import { FaEdit } from "react-icons/fa";

const AppProfile = ({ userType }) => {
    const { userInfo, userToken } = useSelector(state => state.auth);
    const { adminInfo, adminToken } = useSelector(state => state.adminAuth);
    const { account_type } = useSelector(state => state.userAccount);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const { pathname } = location;
        setData(pathname === '/dashboard/profile/edit');
    }, [location]);

    const [firstName, setFirstName] = useState(userType === 'user' ? userInfo?.first_name : adminInfo?.first_name);
    const [lastName, setLastName] = useState(userType === 'user' ? userInfo?.last_name : adminInfo?.last_name);
    const [email, setEmail] = useState(userType === 'user' ? userInfo?.email : adminInfo?.email);
    const [phoneNumber, setPhoneNumber] = useState(userType === 'user' ? userInfo?.phone_number : adminInfo?.phone_number);
    const [dob, setDob] = useState(userType === 'user' ? userInfo?.date_of_birth : adminInfo?.date_of_birth);
    const [country, setCountry] = useState(userType === 'user' ? userInfo?.country : adminInfo?.country);
    const [city, setCity] = useState(userType === 'user' ? userInfo?.address : adminInfo?.address);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();
    const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            email,
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            date_of_birth: dob,
            country,
            address: city,
            token: userType === 'user' ? userToken : adminToken
        };
        try {
            const resultAction = await updateProfile(userData);
            console.log(resultAction);
            dispatch(updateState(resultAction.data.data));
            resultAction.data.status && toast.success("Profile updated successfully.", { autoClose: 500, onClose: () => navigate("/dashboard/profile") });
        } catch (error) {
            console.error("Error:", error);
            localStorage.removeItem('userInfo');
            localStorage.removeItem('token');
            toast.error("An Error occurred", {
                onClose: () => {
                    // navigate("/error")
                    // dispatch(logout())
                }
            });
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        const pwd = {
            oldPassword,
            newPassword,
            token: userType === 'user' ? userToken : adminToken
        }
        try {
            const response = await changePassword(pwd);
            console.log(response)
            response.data?.status === "success" ? toast.success("Password updated successfully.") : toast.error("Unable to change password");
        } catch (error) {
            toast.error("An error Occurred while changing password");
        }
    }

    return (
        <div>
            <ToastContainer />
            <div className="row" style={{ display: "grid", alignItems: "center" }}>
                {
                    !data && (
                        <div className="col-lg-6 card" style={{ display: "grid", alignItems: "center", height: "auto", margin: "auto" }}>
                            <div className="profile-info" style={{ margin: "auto", display: "flex", alignItems: "center", flexDirection: "column", position: "relative" }}>
                                <div style={{ position: "relative" }}>
                                    <Avatar name={`${firstName} ${lastName}`} size={150} round />
                                    <div style={{ position: "absolute", right: 0, bottom: 20, cursor: "pointer" }} onClick={() => setData(true)}>
                                        <FaEdit size={30} />
                                    </div>
                                </div>
                                <h4 className="text-primary mb-0" style={{ fontSize: "2rem" }}>{`${firstName} ${lastName}`}</h4>
                                <p className="" style={{ fontSize: "1.1rem" }}>{email}</p>
                                <p className="" style={{ fontSize: "1.1rem", color: "gray" }}>Account Type : <FaMedal color="#DC6B19" /> <span style={{ fontWeight: "bold" }}>{account_type.toUpperCase()}</span></p>
                            </div>
                        </div>
                    )
                }
                {
                    data && (
                        <div className="col-lg-8" style={{ margin: "auto" }}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="profile-tab">
                                        <div className="custom-tab-1">
                                            <h4 className="text-primary mb-0" style={{ fontSize: "2rem" }}>Edit Profile</h4>
                                            <Tab.Container defaultActiveKey='Posts'>
                                                <Nav as='ul' className="nav nav-tabs">
                                                    <Nav.Item as='li' className="nav-item">
                                                        <Nav.Link to="#profile-settings" eventKey='Setting'>Update Profile</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item as='li' className="nav-item">
                                                        <Nav.Link to="#profile-password" eventKey='password'>Change Password</Nav.Link>
                                                    </Nav.Item>
                                                </Nav>
                                                <Tab.Content>
                                                    <Tab.Pane id="profile-settings" eventKey='Setting'>
                                                        <div className="pt-3">
                                                            <div className="settings-form">
                                                                <form onSubmit={handleSubmit}>
                                                                    <div className="row">
                                                                        <div className="form-group mb-3 col-md-6">
                                                                            <label className="form-label">First Name</label>
                                                                            <input type="text" placeholder="First Name" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                                                        </div>
                                                                        <div className="form-group mb-3 col-md-6">
                                                                            <label className="form-label">Last Name</label>
                                                                            <input type="text" placeholder="Last Name" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="form-group mb-3 col-md-6">
                                                                            <label className="form-label">Phone number</label>
                                                                            <input type="text" placeholder="Phone number" className="form-control" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                                                        </div>
                                                                        <div className="form-group mb-3 col-md-6">
                                                                            <label className="form-label">Date of Birth</label>
                                                                            <input type="date" className="form-control" value={dob} onChange={(e) => setDob(e.target.value)} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="form-group mb-3 col-md-6">
                                                                            <label className="form-label">Country</label>
                                                                            <input type="text" placeholder="Country" className="form-control" value={country} onChange={(e) => setCountry(e.target.value)} />
                                                                        </div>
                                                                        <div className="form-group mb-3 col-md-6">
                                                                            <label className="form-label">City</label>
                                                                            <input type="text" className="form-control" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                                                                        </div>
                                                                    </div>
                                                                    <button className="btn btn-primary" type="submit">{isUpdatingProfile ? <Spinner animation="border" role="status" size="sm"><span className="visually-hidden">Loading...</span></Spinner> : "Edit Profile"}</button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </Tab.Pane>
                                                    <Tab.Pane id="profile-password" eventKey='password'>
                                                        <div className="pt-3">
                                                            <div className="settings-form">
                                                                <form onSubmit={(e) => e.preventDefault()}>
                                                                    <div className="row">
                                                                        <div className="form-group mb-3 col-md-6">
                                                                            <label className="form-label">Old Password</label>
                                                                            <input type="password" placeholder="Enter Old Password" className="form-control" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                                                                        </div>
                                                                        <div className="form-group mb-3 col-md-6">
                                                                            <label className="form-label">New Password</label>
                                                                            <input type="password" className="form-control" placeholder="Enter New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group mb-3 col-md-6">
                                                                        <label className="form-label">Confirm Password</label>
                                                                        <input type="password" className="form-control" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                                                    </div>
                                                                    <button className="btn btn-primary" onClick={handleChangePassword}>{isChangingPassword ? <Spinner animation="border" role="status" size="sm"><span className="visually-hidden">Loading...</span></Spinner> : "Change Password"}</button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </Tab.Pane>
                                                </Tab.Content>
                                            </Tab.Container>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default AppProfile;
