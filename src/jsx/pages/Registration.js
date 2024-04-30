/* eslint-disable */
import React, { useEffect, useState } from "react";
import { NavLink, Link, Navigate } from "react-router-dom";
import bg6 from '../../images/background/bg6.jpg';
import Spinner from 'react-bootstrap/Spinner';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../redux/features/auth/authSlice";
import { BASE_URL } from "../../api";

function Register(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [email, setEmail] = useState('steph@me.com');
    const [firstName, setFirstName] = useState('MIly');
    const [lastName, setLastName] = useState('Larry');
    const [dob, setDob] = useState('1990-01-01'); // Format: YYYY-MM-DD
    const [country, setCountry] = useState('United States');
    const [phoneNumber, setPhoneNumber] = useState('787567890');
    const [address, setAddress] = useState("Lousiana")
    const [password, setPassword] = useState('rice');
    const [terms, setTerms] = useState(false);
    const [load, setLoad] = useState(false);
    const [errors, setErrors] = useState({});

    const onSignUp = (e) => {
        e.preventDefault();
        setLoad(true);
        axios.post(`${BASE_URL}/user/auth/register/`, null, {
            params: {
                email,
                first_name: firstName,
                last_name: lastName,
                address: '',
                country,
                phone_number: phoneNumber,
                date_of_birth: dob,
                password
            },
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.status === 200) {
                    if (response.data.message) {
                        toast.success("Registration Successful!", { autoClose: 2000 }); // Toast success message
                        axios.get(`${BASE_URL}/user/profile/users/`, {
                            headers: {
                                "x-token": response.data.message
                            }
                        })
                            .then(user => {
                                localStorage.setItem("userInfo", JSON.stringify(user.data));
                                console.log("resuser", user.data)
                                dispatch(loginSuccess({ userInfo: user.data, userToken: response.data.message }));
                                navigate("/dashboard");
                            })
                            .catch(error => {
                                console.error("Error fetching user data:", error);
                            });
                    }
                    console.log("reg", response.data);
                } else {
                    console.error("Error signing up:", response.statusText);
                    toast.error("Error signing up: " + response.statusText); // Toast error message
                }
            })
            .catch(error => {
                console.error("Error signing up:", error);
                toast.error("Error signing up: " + error.message); // Toast error message
            })
            .finally(() => {
                setLoad(false);
            });
    };


    return (
        <>
            <div className="page-wraper">
                <ToastContainer />
                <div className="browse-job login-style3">
                <div className="bg-img-fix overflow-hidden" style={{ background: '#fff url(' + bg6 + ')', height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div className="col-6 bg-white rounded">
                            <div className="col-12">
                                <div className="card-body">
                                    <nav className="nav nav-tabs border-bottom-0">
                                        <div className="tab-content w-100" id="nav-tabContent">
                                            <div className="tab-pane active show fade">
                                                <form className="dz-form py-2" onSubmit={onSignUp}>
                                                    <h3 className="form-title">Sign Up</h3>
                                                    <div className="dz-separator-outer m-b5">
                                                        <div className="dz-separator bg-primary style-liner"></div>
                                                    </div>
                                                    <p>Enter your personal details below: </p>
                                                    <div className="form-group mt-3">
                                                        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-control" placeholder="First Name" type="text" />
                                                    </div>
                                                    <div className="form-group mt-3">
                                                        <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-control" placeholder="Last Name" type="text" />
                                                    </div>
                                                    <div className="form-group mt-3">
                                                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email Address" type="text" />
                                                        {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
                                                    </div>
                                                    <div className="form-group mt-3">
                                                        <input value={dob} onChange={(e) => setDob(e.target.value)} className="form-control" placeholder="Date of Birth" type="date" />
                                                    </div>
                                                    <div className="form-group mt-3">
                                                        <input value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" placeholder="Address" type="text" />
                                                    </div>
                                                    <div className="form-group mt-3">
                                                        <input value={country} onChange={(e) => setCountry(e.target.value)} className="form-control" placeholder="Country" type="text" />
                                                    </div>
                                                    <div className="form-group mt-3">
                                                        <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="form-control" placeholder="Phone Number" type="text" />
                                                    </div>
                                                    <div className="form-group mt-3">
                                                        <input value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" type="password" />
                                                        {errors.password && <div className="text-danger fs-12">{errors.password}</div>}
                                                    </div>
                                                    <div className="mb-3 mt-3">
                                                        <span className="form-check float-start me-2">
                                                            <input type="checkbox" className="form-check-input mt-0" id="check2" name="example1" />
                                                            <label className="form-check-label d-unset" htmlFor="check2">I agree to the</label>
                                                        </span>
                                                        <label><Link to={"#"}>Terms of Service </Link>&amp; <Link to={"#"}>Privacy Policy</Link></label>
                                                    </div>
                                                    <div className="form-group clearfix text-left">
                                                        <NavLink to="/" className="btn btn-primary outline gray" type="button">Back</NavLink >
                                                        <button type="submit" className="btn btn-primary float-end">{
                                                            load ? (
                                                                <Spinner animation="border" role="status" size="sm">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </Spinner>
                                                            ) : "Submit"
                                                        }</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
