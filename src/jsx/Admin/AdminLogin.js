import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { adminLoginStart, adminLoginSuccess, adminLoginFailure } from '../../redux/features/auth/admin-authSlice';
import axios from 'axios';
import bg6 from '../../images/background/bg6.jpg';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../images/logo/logo-full.png';
import { BASE_URL } from '../../api';

function AdminLogin(props) {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('oargap@nekosan.uk');
  const [password, setPassword] = useState('string');
  const dispatch = useDispatch();

  const loginUser = (email, password) => {
    setLoad(true);
    console.log("Login Start...");
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
        console.log(response.data);
        if (response.status === 200) {
          const accessToken = response.data.access_token;
          console.log(accessToken);
          sessionStorage.setItem("adminToken", accessToken);

          axios.get(`${BASE_URL}/user/profile/users/`, {
            headers: {
              "x-token": accessToken
            }
          })
            .then(user => {
              console.log("user", user)
              sessionStorage.setItem("adminInfo", JSON.stringify(user.data));
              dispatch(adminLoginSuccess({ adminInfo: user.data, adminToken: accessToken }));
			        console.log([user, accessToken])
              setLoad(false);
              toast.success("Login successful!", {
                autoClose: 1000,
                position: toast.POSITION.TOP_CENTER,
                onClose: () => {
                  navigate("/admin/admin-dashboard");
                  props.setUserType("admin");
                  if(user.data.user_type === "super_admin"){
                    props.setSuperAdmin( true)
                  }else{
                    props.setSuperAdmin(false)
                  }
                }
              });
              console.log("from state",  props.superAdmin)
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
                      <form className=" dz-form pb-3" onSubmit={onLogin}>
                        <h3 className="form-title m-t0">ADMIN LOGIN</h3>
                        <div className="dz-separator-outer m-b5">
                          <div className="dz-separator bg-primary style-liner"></div>
                        </div>
                        <p>Enter your e-mail address and your password. </p>
                        <div className="form-group mb-3">
                          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group mb-3">
                          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
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
                            <input type="checkbox" className="form-check-input" id="check1" name="example1" />
                            <label className="form-check-label" htmlFor="check1">Remember me</label>
                          </span>
                          <div className='row' style={{ padding: "10px" }}>
                            <Link to="/forgot-password">
                              Forgot password ?
                            </Link>
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
