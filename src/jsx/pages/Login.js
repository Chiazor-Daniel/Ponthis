import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { loginStart, loginFailure, loginSuccess } from '../../redux/features/auth/authSlice';
import axios from 'axios';
import logo from '../../images/logo/logo-full.png'
import { UseSelector } from 'react-redux/es/hooks/useSelector';
import bg6 from '../../images/background/bg6.jpg';
import Spinner from 'react-bootstrap/Spinner';

function Login(props) {
	const {loading, userInfo, userToken, error, success} = useSelector(state => state.auth);
	const [load, setLoad] = useState(false)
	const [heartActive, setHeartActive] = useState(true);
	const navigate = useNavigate();
	const [email, setEmail] = useState('a@a.com');
	let errorsObj = { email: '', password: '' };
	const [errors, setErrors] = useState(errorsObj);
	const [password, setPassword] = useState('string');
	const dispatch = useDispatch();

	const loginUser = (email, password) => {
		setLoad(true);
		console.log("Login Start...");
	  
		// Check if local storage has token and user info
		const token = localStorage.getItem("token");
		const userInfo = JSON.parse(localStorage.getItem("userInfo"));
	  
		if (token && userInfo) {
		  dispatch(loginSuccess({ userInfo, userToken: token }));
		  navigate("/dashboard");
		} else {
		  dispatch(loginStart());
	  
		  axios.post("https://trader-app.onrender.com/user/auth/login/", {
			email,
			password
		  }, {
			params: {
			  email,
			  password
			},
			headers: {
			  "Content-Type": "application/json"
			}
		  })
		  .then(response => {
			console.log(response.data);
			const accessToken = response.data.access_token;
			localStorage.setItem("token", accessToken);
	  
			axios.get("https://trader-app.onrender.com/user/profile/users/", {
			  headers: {
				"x-token": accessToken
			  }
			})
			.then(user => {
			  localStorage.setItem("userInfo", JSON.stringify(user.data));
			  dispatch(loginSuccess({ userInfo: user.data, userToken: accessToken }));
	  
			  if (user) {
				setLoad(false);
				setTimeout(() => {
				  navigate("/dashboard");
				}, 500);
			  }
			})
			.catch(error => {
			  console.error("Error fetching user data:", error);
			  dispatch(loginFailure(error.message));
			  setLoad(false); // Set load to false when there is an error
			});
		  })
		  .catch(error => {
			console.error("Error logging in:", error);
			dispatch(loginFailure(error.message));
			setLoad(false); // Set load to false when there is an error
		  });
		}
	  };
	
	

	function onLogin(e) {
		e.preventDefault();
		loginUser(email, password);
		// let error = false;
		// const errorObj = { ...errorsObj };
		// if (email === '') {
		//     errorObj.email = 'Email is Required';
		//     error = true;
		// }
		// if (password === '') {
		//     errorObj.password = 'Password is Required';
		//     error = true;
		// }
		// setErrors(errorObj);
		// if (error) {
		// 	return ;
		// }
	}


	return (
		<div className="page-wraper">
			<div className="browse-job login-style3">
				<div className="bg-img-fix overflow-hidden" style={{ background: '#fff url(' + bg6 + ')', height: "100vh" }}>
					<div className="row gx-0">
						<div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 vh-100 bg-white">
							<div id="mCSB_1" className="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside" style={{ maxHeight: "653px" }}>
								<div id="mCSB_1_container" className="mCSB_container" style={{ position: "relative", top: "0", left: "0", dir: "ltr" }}>
									<div className="login-form style-2">
										<div className="card-body">
											{/* <div className="logo-header">
												<Link to={"#"} className="logo"><img src={logo} alt="" className="width-230 mCS_img_loaded" /></Link>
											</div> */}
											<div className="nav nav-tabs border-bottom-0" >
												<div className="tab-content w-100" id="nav-tabContent">
													<div className="tab-pane fade active show" id="nav-personal">
														{props.errorMessage && (
															<div className='bg-red-300 text-red-900 border border-red-900 p-1 my-2'>
																{props.errorMessage}
															</div>
														)}
														{props.successMessage && (
															<div className='bg-green-300 text-green-900 border border-green-900 p-1 my-2'>
																{props.successMessage}
															</div>
														)}
														<form className=" dz-form pb-3" onSubmit={onLogin}>
															<h3 className="form-title m-t0">Personal Information</h3>
															<div className="dz-separator-outer m-b5">
																<div className="dz-separator bg-primary style-liner"></div>
															</div>
															<p>Enter your e-mail address and your password. </p>
															<div className="form-group mb-3">
																{/* <input name="dzName" required="" className="form-control" placeholder="User Name" type="text" /> */}
																<input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
																{errors.email && <div className="text-danger fs-12">{errors.email}</div>}
															</div>
															<div className="form-group mb-3">
																{/* <input name="dzName" required="" className="form-control " placeholder="Type Password" type="password" /> */}
																<input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
																{errors.password && <div className="text-danger fs-12">{errors.password}</div>}
															</div>
															<div className="form-group text-left mb-5">
																
																<button type="submit" className="btn btn-primary dz-xs-flex m-r5">
																	{
																		load ? (
																			<Spinner animation="border" role="status" size="sm">
																			<span className="visually-hidden">Loading...</span>
																		  </Spinner>
																		) : "login"
																	}
																</button>
																<span className="form-check d-inline-block ms-2">
																	<input type="checkbox" className="form-check-input" id="check1" name="example1" checked={true} />
																	<label className="form-check-label" htmlFor="check1">Remember me</label>
																</span>
																{/* <Link to={"#"}  className="nav-link m-auto btn tp-btn-light btn-primary">
																	Forget Password ?
																</Link> 	 */}
															</div>
															
														</form>
														<div className="text-center bottom">
															<NavLink to="/register" className="btn btn-primary button-md btn-block" >
																Create an account
															</NavLink>
														</div>
													</div>

												</div>
											</div>
										</div>
									
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login;