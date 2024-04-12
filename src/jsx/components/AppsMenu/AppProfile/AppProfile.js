import React, { Fragment, useEffect, useState } from "react";
import { Tab, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useGetProfileQuery } from "../../../../redux/services/profile";
import { unwrapResult } from '@reduxjs/toolkit';
import { useUpdateProfileMutation } from "../../../../redux/services/profile";
import { updateState } from "../../../../redux/features/auth/authSlice";
import Spinner from 'react-bootstrap/Spinner';
import MyToast from "../../myToast";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { clearState } from "../../../../redux/features/auth/authSlice";


const AppProfile = () => {
    const { userInfo, userToken } = useSelector(state => state.auth);
    const [firstName, setFirstName] = useState(userInfo.first_name);
    const [lastName, setLastName] = useState(userInfo.last_name);
    const [email, setEmail] = useState(userInfo.email)
    const [phoneNumber, setPhoneNumber] = useState(userInfo.phone_number);
    const dispatch = useDispatch()
    const [dob, setDob] = useState(userInfo.date_of_birth);
    const [country, setCountry] = useState(userInfo.country);
    const [city, setCity] = useState(userInfo.address);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [updateProfile, { isLoading, isError, error }] = useUpdateProfileMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            email: email,
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            date_of_birth: dob,
            country: country,
            address: city,
            token: userToken
        };
        try {
            const resultAction = await updateProfile(userData);
                dispatch(updateState(resultAction.data.data));
                toast.success("Profile updated successfully.");
        } catch (error) {
            console.error("Error:", error);
            
                localStorage.removeItem('userInfo');
                localStorage.removeItem('token');
                toast.error("An Error occurred");
        }
    };
    return (
        <Fragment>
            <ToastContainer />
            <div className="row">
                <div className="col-lg-12" style={{ alignItems: "center", display: "flex" }}>
                    <div className="profile-info" style={{ margin: "auto", display: "flex", alignItems: "center", gap: "20px" }}>
                        <img src={"https://i.guim.co.uk/img/media/70a2fd5f5acddd683b892245209974fa4c768498/324_0_1429_858/master/1429.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=e2b8991e17e7bd966a29f5c706fe2552"} width={200} className="img-fluid rounded-circle" alt="profile" />
                        <h4 className="text-primary mb-0 text-xl">{userInfo.first_name + " " + userInfo.last_name}</h4>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="">
                    <div className="card">
                        <div className="card-body">
                            <div className="profile-tab">
                                <div className="custom-tab-1">
                                    <Tab.Container defaultActiveKey='Posts'>
                                        <Nav as='ul' className="nav nav-tabs">
                                            <Nav.Item as='li' className="nav-item">
                                                <Nav.Link to="#profile-settings" eventKey='Setting'>Edit Profile</Nav.Link>
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
                                                            <div className="form-group mb-3 col-md-6">
                                                                <label className="form-label">Email</label>
                                                                <input type="text" placeholder="Email address" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                            </div>
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
                                                                    <label className="form-label">country</label>
                                                                    <input type="text" placeholder="country" className="form-control" value={country} onChange={(e) => setCountry(e.target.value)} />
                                                                </div>
                                                                <div className="form-group mb-3 col-md-6">
                                                                    <label className="form-label">City</label>
                                                                    <input type="text" className="form-control" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                                                                </div>
                                                            </div>

                                                            <button className="btn btn-primary" type="submit">{
                                                                isLoading ? <Spinner animation="border" role="status" size="sm">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </Spinner> : "Edit Profile"
                                                            }</button>
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

                                                            <button className="btn btn-primary" type="submit">Change Password</button>
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
            </div>
        </Fragment>
    );
};

export default AppProfile;
