import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { loginStart, loginFailure, loginSuccess } from '../../redux/features/auth/authSlice';
import axios from 'axios';
import bg6 from '../../images/background/bg6.jpg';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../images/logo/logo-full.png'

function Login(props) {
	const [load, setLoad] = useState(false)
	const navigate = useNavigate();
	const [email, setEmail] = useState('john@example.com');
	let errorsObj = { email: '', password: '' };
	const [errors, setErrors] = useState(errorsObj);
	const [password, setPassword] = useState('default123');
	const dispatch = useDispatch();

	const loginUser = (email, password) => {
		setLoad(true);
		console.log("Login Start...");

		const token = sessionStorage.getItem("token"); // Using sessionStorage
		const userInfo = JSON.parse(sessionStorage.getItem("userInfo")); // Using sessionStorage

		if (token && userInfo) {
			dispatch(loginSuccess({ userInfo, userToken: token }));
			toast.success("Logged in successfully!", {
				autoClose: 1000,
				position: toast.POSITION.TOP_CENTER,
				onClose: () => {
					navigate("/dashboard");
				}
			});
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
					if (response.status === 200) {
						const accessToken = response.data.access_token;
						sessionStorage.setItem("token", accessToken); // Using sessionStorage

						// Setting expiration time for token (24 hours)
						const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
						sessionStorage.setItem("tokenExpiration", expirationTime);

						axios.get("https://trader-app.onrender.com/user/profile/users/", {
							headers: {
								"x-token": accessToken
							}
						})
							.then(user => {
								sessionStorage.setItem("userInfo", JSON.stringify(user.data)); // Using sessionStorage
								dispatch(loginSuccess({ userInfo: user.data, userToken: accessToken }));

								if (user) {
									setLoad(false);
									toast.success("Login successful!", {
										autoClose: 1000,
										position: toast.POSITION.TOP_CENTER,
										onClose: () => {
											navigate("/dashboard");
										}
									});
								}
							})
							.catch(error => {
								console.error("Error fetching user data:", error);
								dispatch(loginFailure(error.message));
								setLoad(false);
							});
					} else {
						console.error("Invalid response status:", response.status);
						dispatch(loginFailure("Invalid response status"));
						setLoad(false);
					}
				})
				.catch(error => {
					console.error("Error logging in:", error);
					dispatch(loginFailure(error.message));
					setLoad(false);
					toast.error("Incorrect email or password");
				});
		}
	};



	function onLogin(e) {
		e.preventDefault();
		loginUser(email, password);
		let error = false;
		const errorObj = { ...errorsObj };
		if (email === '') {
			errorObj.email = 'Email is Required';
			error = true;
		}
		if (password === '') {
			errorObj.password = 'Password is Required';
			error = true;
		}
		setErrors(errorObj);
		if (error) {
			return;
		}
	}
	const [rememberMe, setRememberMe] = useState(true);

	return (
		<div className="page-wraper">
			<ToastContainer />
			<div className="browse-job login-style3">
				<div className="bg-img-fix overflow-hidden" style={{ background: '#fff url(' + bg6 + ')', height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
					<div className="row col-6 rounded bg-white">
						<div className="col-12">
							<div className="card-body">
								<div className="logo-header">
									<Link to={"#"} className="logo"><img src={logo} alt="" className="width-230 mCS_img_loaded" /></Link>
								</div>
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
													<input type="text" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
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
													<input type="checkbox" className="form-check-input" id="check1" name="example1" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
														<label className="form-check-label" htmlFor="check1">Remember me</label>
													</span>
													{/* <Link to={"#"}  className="nav-link m-auto btn tp-btn-light btn-primary">
																	Forget Password ?
																</Link> 	 */}
													<div className='row' style={{ padding: "10px" }}>
														<Link to="/forgot-password">
															Forgot password ?
														</Link>
													</div>
												</div>
											</form>
											<div className="text-center">
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
	)
}

export default Login;