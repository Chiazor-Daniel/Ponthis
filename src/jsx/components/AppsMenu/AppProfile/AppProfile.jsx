/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Tab, Nav, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useUpdateProfileMutation, useChangePasswordMutation } from "../../../../redux-contexts/redux/services/profile";
import { updateState } from "../../../../redux-contexts/redux/features/auth/authSlice";
import Spinner from 'react-bootstrap/Spinner';
import { toast, ToastContainer } from "react-toastify";
import { FaMedal, FaEdit } from "react-icons/fa";
import Avatar from 'react-avatar';

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
    const [frontImage, setFrontImage] = useState(null);
    const [frontImagePreview, setFrontImagePreview] = useState(null);
    const [backImage, setBackImage] = useState(null);
    const [backImagePreview, setBackImagePreview] = useState(null);
    const [frontImageBinary, setFrontImageBinary] = useState('');
    const [backImageBinary, setBackImageBinary] = useState('');

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

    const handleFileChange = async (e, setFile, setPreview, setBinary) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            setPreview(URL.createObjectURL(file));

            const reader = new FileReader();
            reader.onloadend = () => {
                setBinary(reader.result);
            };
            reader.readAsBinaryString(file);
        }
    };

    return (
        <div>
            <ToastContainer />
            <div className="row" style={{ display: "grid", alignItems: "center" }}>
                {
                    !data && (
                        <div className="col-lg-6 card" style={{ display: "grid", backgroundColor: 'rgba(243, 243, 243, 0.04)', alignItems: "center", height: "auto", margin: "auto" }}>
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
                            <div className="card" style={{ backgroundColor: 'rgba(243, 243, 243, 0.04)' }}>
                                <div className="card-body">
                                    <div className="profile-tab">
                                        <div className="custom-tab-1">
                                            <h4 className="text-primary mb-0" style={{ fontSize: "2rem" }}>Edit Profile</h4>
                                            <Tab.Container defaultActiveKey='Setting'>
                                                <Nav as='ul' className="nav nav-tabs">
                                                    <Nav.Item as='li' className="nav-item">
                                                        <Nav.Link eventKey='Setting'>Update Profile</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item as='li' className="nav-item">
                                                        <Nav.Link eventKey='password'>Change Password</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item as='li' className="nav-item">
                                                        <Nav.Link eventKey='verification'>Account Verification</Nav.Link>
                                                    </Nav.Item>
                                                </Nav>
                                                <Tab.Content>
                                                    <Tab.Pane eventKey='Setting'>
                                                        <div className="pt-3">
                                                            <div className="settings-form">
                                                                <form onSubmit={handleSubmit}>
                                                                    <div className="row">
                                                                        <div className="form-group mb-3 col-md-6">
                                                                            <label className="form-label">First Name</label>
                                                                            <input type="text" style={{ backgroundColor: '#131722', border: 'none' }} placeholder="First Name" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                                                        </div>
                                                                        <div className="form-group mb-3 col-md-6">
                                                                            <label className="form-label">Last Name</label>
                                                                            <input type="text" style={{ backgroundColor: '#131722', border: 'none' }} placeholder="Last Name" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="form-group mb-3 col-md-6">
                                                                            <label className="form-label">Phone number</label>
                                                                            <input type="tel" style={{ backgroundColor: '#131722', border: 'none' }} placeholder="Phone number" className="form-control" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                                                        </div>
                                                                        <div className="form-group mb-3 col-md-6">
                                                                            <label className="form-label">Email</label>
                                                                            <input type="email" style={{ backgroundColor: '#131722', border: 'none' }} placeholder="Email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="form-group mb-3 col-md-6">
                                                                            <label className="form-label">Date of Birth</label>
                                                                            <input type="date" style={{ backgroundColor: '#131722', border: 'none' }} placeholder="Date of Birth" className="form-control" value={dob} onChange={(e) => setDob(e.target.value)} />
                                                                        </div>
                                                                        <div className="form-group mb-3 col-md-6">
                                                                            <label className="form-label">Country</label>
                                                                            <input type="text" style={{ backgroundColor: '#131722', border: 'none' }} placeholder="Country" className="form-control" value={country} onChange={(e) => setCountry(e.target.value)} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="form-group mb-3 col-md-12">
                                                                            <label className="form-label">City</label>
                                                                            <input type="text" style={{ backgroundColor: '#131722', border: 'none' }} placeholder="City" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} />
                                                                        </div>
                                                                    </div>
                                                                    <button className="btn btn-primary" type="submit">{isUpdatingProfile ? <Spinner animation="border" size="sm" /> : "Update Profile"}</button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey='password'>
                                                        <div className="pt-3">
                                                            <div className="settings-form">
                                                                <h4 className="text-primary">Change Password</h4>
                                                                <form onSubmit={handleChangePassword}>
                                                                    <div className="mb-3">
                                                                        <label className="form-label">Old Password</label>
                                                                        <input type="password" style={{ backgroundColor: '#131722', border: 'none' }} placeholder="Old Password" className="form-control" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <label className="form-label">New Password</label>
                                                                        <input type="password" style={{ backgroundColor: '#131722', border: 'none' }} placeholder="New Password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <label className="form-label">Confirm Password</label>
                                                                        <input type="password" style={{ backgroundColor: '#131722', border: 'none' }} placeholder="Confirm Password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                                                    </div>
                                                                    <button className="btn btn-primary" type="submit">{isChangingPassword ? <Spinner animation="border" size="sm" /> : "Change Password"}</button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey='verification'>
                                                        <div className="pt-3">
                                                            <div className="settings-form">
                                                                <Tab.Container defaultActiveKey='frontImage'>
                                                                    <Nav as='ul' className="nav justify-content-center pt-3">
                                                                        <Nav.Item as='li' className="nav-item">
                                                                            <Nav.Link eventKey='frontImage'>Upload Front Only</Nav.Link>
                                                                        </Nav.Item>
                                                                        <Nav.Item as='li' className="nav-item">
                                                                            <Nav.Link eventKey='bothImages'>Upload Front & Back</Nav.Link>
                                                                        </Nav.Item>
                                                                    </Nav>

                                                                    <Tab.Content className="pt-3">
                                                                        <p className="text-center">Provide verification documents either Driver's License, National Identity or Passport</p>
                                                                        <Tab.Pane eventKey='frontImage'>
                                                                        <div className="row d-flex" style={{gap: '10px', justifyContent: 'center'}}>
                                                                                <div className="col-md-6">
                                                                                    <label className="form-label">Front Image</label>
                                                                                    <input type="file" className="form-control"  style={{backgroundColor: 'rgba(243, 243, 243, 0.04)', border: 'none'}} accept="image/*" onChange={(e) => handleFileChange(e, setFrontImage, setFrontImagePreview, setFrontImageBinary)} />
                                                                                    {frontImagePreview && (
                                                                                        <div className="mt-2">
                                                                                            <img src={frontImagePreview} alt="Front Image Preview" className="img-fluid" />
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </Tab.Pane>
                                                                        <Tab.Pane eventKey='bothImages'>
                                                                            <div className="row d-flex" style={{gap: '10px', justifyContent: 'center'}}>
                                                                                <div className="col-md-5">
                                                                                    <label className="form-label">Front Document</label>
                                                                                    <input type="file" className="form-control"  style={{backgroundColor: 'rgba(243, 243, 243, 0.04)', border: 'none'}} accept="image/*" onChange={(e) => handleFileChange(e, setFrontImage, setFrontImagePreview, setFrontImageBinary)} />
                                                                                    {frontImagePreview && (
                                                                                        <div className="mt-2">
                                                                                            <img src={frontImagePreview} alt="Front Image Preview" className="img-fluid" />
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                                <div className="col-md-5">
                                                                                    <label className="form-label">Back Doucument</label>
                                                                                    <input type="file" className="form-control"  style={{backgroundColor: 'rgba(243, 243, 243, 0.04)', border: 'none'}} accept="image/*" onChange={(e) => handleFileChange(e, setBackImage, setBackImagePreview, setBackImageBinary)} />
                                                                                    {backImagePreview && (
                                                                                        <div className="mt-2">
                                                                                            <img src={backImagePreview} alt="Back Image Preview" className="img-fluid" />
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </Tab.Pane>
                                                                    </Tab.Content>
                                                                </Tab.Container>
                                                            </div>
                                                            <Button className="mt-4">Submit</Button>
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
