import React, { Fragment, useEffect, useState } from "react";
import { Tab, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useUpdateProfileMutation } from "../../../../redux/services/profile";
import { useChangePasswordMutation } from "../../../../redux/services/profile";
import { updateState } from "../../../../redux/features/auth/authSlice";
import Spinner from 'react-bootstrap/Spinner';
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { FaMedal } from "react-icons/fa6";
import Avatar from 'react-avatar';
import { FaEdit } from "react-icons/fa";

const AppProfile = () => {
    const { userInfo, userToken } = useSelector(state => state.auth);
    const [firstName, setFirstName] = useState(userInfo.first_name);
    const [lastName, setLastName] = useState(userInfo.last_name);
    const [email, setEmail] = useState(userInfo.email)
    const [phoneNumber, setPhoneNumber] = useState(userInfo.phone_number);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [dob, setDob] = useState(userInfo.date_of_birth);
    const [country, setCountry] = useState(userInfo.country);
    const [city, setCity] = useState(userInfo.address);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [updateProfile, { isLoading: isUpdatingProfile, isError: isUpdateProfileError, error: updateProfileError }] = useUpdateProfileMutation();
    const [changePassword, { isLoading: isChangingPassword, isError: isChangePasswordError, error: changePasswordError }] = useChangePasswordMutation();
    const [data, setData] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const { pathname } = location;
        setData(pathname === '/dashboard/profile/edit');
    }, [location]);

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
            console.log(resultAction)
            dispatch(updateState(resultAction.data.data));
            resultAction.data.status && toast.success("Profile updated successfully.", {autoClose: 500, onClose: ()=>navigate("/dashboard/profile")});
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
            oldPassword, newPassword, token: userToken
        }
        try {
            const response = await changePassword(pwd)
            console.log(response)
            response.data?.status === "success" ? toast.success("Password updated successfully.") : toast.error("Unable to change password")
        } catch (error) {
            toast.error("An error Occured while changing password")
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="row" style={{ display: "grid", alignItems: "center" }}>
                {
                    !data && (
                        <div className="col-lg-6 card" style={{ display: "grid", alignItems: "center", height: "auto", margin: "auto" }}>
                            <div className="profile-info" style={{ margin: "auto", display: "flex", alignItems: "center", flexDirection: "column", position: "relative" }}>
                                <div style={{ position: "relative" }}>

                                    <Avatar name={userInfo.first_name + " " + userInfo.last_name} size={150} round />
                                    <div style={{ position: "absolute", right: 0, bottom: 20, cursor: "pointer" }} onClick={()=>setData(true)}>
                                        <FaEdit size={30}/>
                                    </div>

                                </div>
                                <h4 className="text-primary mb-0" style={{ fontSize: "2rem" }}>{userInfo.first_name + " " + userInfo.last_name}</h4>
                                <p className="" style={{ fontSize: "1.1rem" }}>{userInfo.email}</p>
                                <p className="" style={{ fontSize: "1.1rem", color: "gray" }}>Account Type : <FaMedal color="#DC6B19" /> Premium</p>
                            </div>
                        </div>
                    )
                }
                {
                    data && (
                        <div className="col-lg-8" style={{ margin: "auto" }}>
                            <div className="">
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
                                                                                <label className="form-label">country</label>
                                                                                <input type="text" placeholder="country" className="form-control" value={country} onChange={(e) => setCountry(e.target.value)} />
                                                                            </div>
                                                                            <div className="form-group mb-3 col-md-6">
                                                                                <label className="form-label">City</label>
                                                                                <input type="text" className="form-control" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                                                                            </div>
                                                                        </div>

                                                                        <button className="btn btn-primary" type="submit">{
                                                                            isUpdatingProfile ? <Spinner animation="border" role="status" size="sm">
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

                                                                        <button className="btn btn-primary" onClick={handleChangePassword}>{
                                                                            isChangingPassword ? <Spinner animation="border" role="status" size="sm">
                                                                                <span className="visually-hidden">Loading...</span>
                                                                            </Spinner> : "Change Password"
                                                                        }</button>
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

                    )
                }

            </div>

        </>
    );
};

export default AppProfile;
