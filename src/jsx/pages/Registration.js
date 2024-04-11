import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import bg6 from '../../images/background/bg6.jpg';
import Spinner from 'react-bootstrap/Spinner';
import axios from "axios";
function Register(props) {
	const [email, setEmail] = useState('me@me.com');
	const [firstName, setFirstName] = useState('John');
	const [lastName, setLastName] = useState('Doe');
	const [dob, setDob] = useState('1990-01-01'); // Format: YYYY-MM-DD
	const [country, setCountry] = useState('United States');
	const [phoneNumber, setPhoneNumber] = useState('1234567890');
	const [address, setAddress] = useState("Lousiana")
	const [password, setPassword] = useState('mepass');
	const [terms, setTerms] = useState(false)
	const [load, setLoad] = useState(false)
    const [errors, setErrors] = useState({});

	const onSignUp = (e) => {
		e.preventDefault();
		setLoad(true);
	
		axios.post("https://trader-app.onrender.com/user/auth/signup/", null, {
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
			console.log("reg",response.data);
		})
		.catch(error => {
			console.error("Error signing up:", error);
			setLoad(false);

		})
		.finally(() => {
			setLoad(false);
		});
	};
	
	

    return (
        <>
            <div className="page-wraper">
                <div className="browse-job login-style3">
                    <div className="bg-img-fix overflow-hidden" style={{ background: '#fff url(' + bg6 + ')', height: "100vh" }}>
                        <div className="row gx-0">
                            <div className="col-xl-4 col-lg-5 col-md-6 col-sm-12 vh-100 bg-white">
                                <div className="login-form style-2">
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
            </div>
        </>
    );
};

export default Register;
