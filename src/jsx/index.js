import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import "./index.css";
import "./chart.css";
import "./step.css";
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
import { IoIosWarning } from "react-icons/io";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import ReactDOMServer from 'react-dom/server'; // Import ReactDOMServer
import { RingLoader } from "react-spinners";
import axios from "axios";
import { useSelector } from "react-redux";
import { useGetUserAccountQuery } from "../redux/services/account";
import { setUserAccount } from "../redux/features/account/accountSlice";
import { useDispatch } from 'react-redux';

export function MainLayout({ children }) {
  const navigate = useNavigate();
  const { userToken, userInfo } = useSelector(state => state.auth);
  const { menuToggle } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const [theme, setTheme] = useState("");
  const [yes, setYes] = useState(false);

  const handleVerify = () => {
    showVerifyConfirmation();
  };

  const { data, refetch } = useGetUserAccountQuery(userToken);

  const fetchDataAndDispatch = () => {
    refetch();
    if (data) {
      dispatch(setUserAccount(data));
    }
  };

  const showProcessingLoader = () => {
    const processingElement = (
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: "column", alignItems: "center" }}>
        <RingLoader />
        <p>Requesting Verification Email..</p>
      </div>
    );
  
    const processingString = ReactDOMServer.renderToString(processingElement);
  
    swal({
      title: "Processing",
      content: {
        element: 'div',
        attributes: {
          innerHTML: processingString,
        },
      },
      buttons: false,
      closeOnClickOutside: false,
      closeOnEsc: false,
    });
  };

  const showVerificationEmailSent = () => {
    swal({
      title: `Verification Email Sent to ${userInfo.email}`,
      text: "",
      icon: "info",
    });
  };
  
  const showVerifyConfirmation = () => {
    swal({
      title: "Verify Account",
      text: "Do you want to verify your account?",
      icon: "info",
      buttons: ["No", "Yes"],
    }).then((value) => {
      if (value) {
        showProcessingLoader();
        axios.post('https://trader-app.onrender.com/user/verify-and-reset/send-verification-email/', null, {
          headers: {
            'x-token': userToken
          }
        })
        .then(response => {
          console.log(response)
          if (response.data.status === "success") {
            showVerificationEmailSent();
            setYes(true);
          } else {
            // Request failed, show error swal
            swal("Error", "Failed to send verification email. Please try again later.", "error");
          }
        })
        .catch(error => {
          // Request failed, show error swal
          swal("Error", "Failed to send verification email. Please try again later.", "error");
        });
      }
    });
  };
  
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { fetchDataAndDispatch: fetchDataAndDispatch });
    }
    return child;
  });

  return (
    <div id="main-wrapper" className={`show ${menuToggle ? "menu-toggle" : ""}`}>
      <Nav onDarkModeChange={(newTheme) => setTheme(newTheme)} />
      <div className="content-body" style={{ minHeight: window.screen.height - 45 }}>
        <div className="container-fluid">
          {
            !userInfo.verified && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ color: 'red' }}>
                <IoIosWarning style={{ verticalAlign: 'middle' }} />
                {' '} Account is not verified.{' '}
                <span
                  style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                  onClick={handleVerify}
                >
                  Click to verify
                </span>
              </p>
              
              {" "}
              {
                yes && (
                  <p> .You may want to login again.</p>
                )
              }
            </div>

            )
          }

          {childrenWithProps}

        </div>
      </div>
      <Footer />
    </div>
  );
}
