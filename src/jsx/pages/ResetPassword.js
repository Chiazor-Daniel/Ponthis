import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import bg6 from '../../images/background/bg6.jpg';
import logo from "../../images/logo/logo-full.png";
import { BiMailSend } from "react-icons/bi";

const ResetPassword = ({ history }) => {
  const navigate = useNavigate();
  const { token } = useParams(); // Grab the token from URL parameters
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // You can make an API call here to reset the password using the token and new password
    console.log("Token:", token);
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);
    // Redirect to login page after password reset
    navigate("/"); // Navigate to login page
  };

  return (
    <div className="authincation h-100 p-meddle">
      <div className="bg-img-fix overflow-hidden col-12" style={{ background: '#fff url(' + bg6 + ')', height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className="col-lg-6 bg-white rounded" style={{padding: "20px"}}>
          <h4 className="text-center mb-4">Reset Password</h4>
          <form onSubmit={handleSubmit} className="col-8" style={{margin: "auto"}}>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                className="form-control mb-4"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control mb-4"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
