import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bg6 from '../../images/background/bg6.jpg';
import logo from "../../images/logo/logo-full.png";
import { BiMailSend } from "react-icons/bi";

const ForgotPassword = ({ history }) => {
  const navigate = useNavigate();
  const [sentEmail, setSentEmail] = useState(false);
  const [verificationCode, setVerificationCode] = useState(''); // Change to a single string

  const handleChange = (index, value) => {
    const updatedCode = verificationCode.substring(0, index) + value + verificationCode.substring(index + 1);
    setVerificationCode(updatedCode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Verification Code:", verificationCode);
    // You can handle the verification code here
    navigate("/");
  };

  return (
    <div className="authincation h-100 p-meddle">
      <div className="bg-img-fix overflow-hidden col-12" style={{ background: '#fff url(' + bg6 + ')', height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className="col-lg-6 bg-white rounded">
          {!sentEmail ? (
            <div className="auth-form">
              <div className="text-center mb-3">
                <Link to="/dashboard">
                  <img src={logo} alt="" />
                </Link>
              </div>
              <h4 className="text-center mb-4">Forgot Password</h4>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="">
                    <strong>Email</strong>
                  </label>
                  <input
                    type="email"
                    className="form-control mb-4"
                    defaultValue="hello@example.com"
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    onClick={() => setSentEmail(true)}
                    className="btn btn-primary btn-block"
                  >
                    SUBMIT
                  </button>
                  <div style={{ padding: "8px" }}>
                    <Link to="/" >Go to Login</Link>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div className="auth-form">
              <div className="text-center mb-3">
                <Link to="/dashboard">
                  <img src={logo} alt="" />
                </Link>
              </div>
              <h4 className="text-center">Reset Password</h4>
              <div style={{ margin: "auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <BiMailSend size={50} className="text-center" />
              </div>
              <p className="text-center">Check mailbox for verification link</p>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  {/* <div className="row justify-content-center">
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className="col-2">
                        <input
                          type="text"
                          className="form-control mb-4"
                          value={verificationCode[index] || ''} // Use the character at the specified index
                          style={{ textAlign: "center", fontSize: "1.5rem", borderWidth: 2 }}
                          maxLength={1} // Limit input to a single character
                          onChange={(e) => handleChange(index, e.target.value)}
                        />
                      </div>
                    ))}
                  </div> */}
                </div>
                <div className="text-center">
                  {/* <button type="submit" className="btn btn-primary btn-block" onClick={() => setSentEmail(!sentEmail)}>SUBMIT</button> */}
                  <div style={{ padding: "8px" }}>
                    <Link to="/" className="btn btn-primary" >Go to Login</Link>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
