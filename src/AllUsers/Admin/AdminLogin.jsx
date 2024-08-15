/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { adminLoginStart, adminLoginSuccess, adminLoginFailure } from '../../redux-contexts/redux/features/auth/admin-authSlice';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../api';
import bg6 from '../../assets/real.jpg';
import SetLogo from '../../setLogo';

function AdminLogin(props) {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const loginUser = (email, password) => {
    setLoad(true);
    axios.post(`${BASE_URL}/user/auth/login/`, {
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
        if (response.status === 200) {
          const accessToken = response.data.access_token;
          sessionStorage.setItem("adminToken", accessToken);

          axios.get(`${BASE_URL}/user/profile/users/`, {
            headers: {
              "x-token": accessToken
            }
          })
            .then(user => {
              sessionStorage.setItem("adminInfo", JSON.stringify(user.data));
              dispatch(adminLoginSuccess({ adminInfo: user.data, adminToken: accessToken }));
              setLoad(false);
              toast.success("Login successful!", {
                autoClose: 1000,
                position: 'top-center',
                onClose: () => {
                  navigate("/admin/admin-dashboard");
                  props.setUserType("admin");
                  if(user.data.user_type === "super_admin"){
                    props.setSuperAdmin(true)
                  }else{
                    props.setSuperAdmin(false)
                  }
                }
              });
            })
            .catch(error => {
              console.error("Error fetching user data:", error);
              dispatch(adminLoginFailure(error.message));
              setLoad(false);
            });
        } else {
          console.error("Invalid response status:", response.status);
          dispatch(adminLoginFailure("Invalid response status"));
          setLoad(false);
        }
      })
      .catch(error => {
        console.error("Error logging in:", error);
        dispatch(adminLoginFailure(error.message));
        setLoad(false);
        toast.error("Incorrect email or password");
      });
  };

  function onLogin(e) {
    e.preventDefault();
    loginUser(email, password);
  }

  return (
    <div className="page-wraper">
      <ToastContainer />
      <div className="browse-job login-style3">
      <div className="bg-img-fix overflow-hidden" style={{
                    background: `url(${bg6})`,
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    objectFit: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100%',
                    backgroundBlendMode: 'multiply',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)' // Add this line
                }}>
                    <div className="row col-lg-6 col-11 rounded card" style={{ height: "auto" }} >
            <div className="col-12">
              <div className="card-body">
              <div className="logo-header" style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Link to={"#"} className="logo" style={{display: 'flex', alignItems: 'center', gap: '20px',}}>
              <img src='/apexlogo2.png' style={{ width: '400px', margin: 'auto' }} />
                                     
                                    </Link>
                                </div>
                <div className="nav nav-tabs border-bottom-0" >
                  <div className="tab-content w-100" id="nav-tabContent">
                    <div className="tab-pane fade active show" id="nav-personal">
                      <form className=" dz-form pb-3" onSubmit={onLogin}>
                        <h3 className="form-title m-t0">ADMIN LOGIN</h3>
                        <div className="dz-separator-outer m-b5">
                          <div className="dz-separator bg-primary style-liner"></div>
                        </div>
                        <p>Enter your e-mail address and your password. </p>
                        <div className="form-group mb-3">
                          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email Address'/>
                        </div>
                        <div className="form-group mb-3">
                          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password'/>
                        </div>
                        <div className="form-group text-left mb-5">
                          <button type="submit" className="btn btn-primary dz-xs-flex m-r5">
                            {load ? (
                              <Spinner animation="border" role="status" size="sm">
                                <span className="visually-hidden">Loading...</span>
                              </Spinner>
                            ) : "Login"}
                          </button>
                          <span className="form-check d-inline-block ms-2">
                            {/* <input type="checkbox" className="form-check-input" id="check1" name="example1" /> */}
                            {/* <label className="form-check-label" htmlFor="check1">Remember me</label> */}
                          </span>
                          <div className='row' style={{ padding: "10px" }}>
                            {/* <Link to="/forgot-password">
                              Forgot password ?
                            </Link> */}
                          </div>
                        </div>
                      </form>
                      <div className="text-center">
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
  );
}

export default AdminLogin;