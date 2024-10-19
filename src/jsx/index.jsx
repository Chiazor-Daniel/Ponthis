import React, { useContext, useState } from 'react';
import './index.css';
import './step.css';
import Nav from './layouts/nav';
import Footer from './layouts/Footer';
import { IoIosWarning } from 'react-icons/io';
import { ThemeContext } from '../redux-contexts/context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import chat from "../assets/chat.png"
import { Form } from 'react-bootstrap';
import { MdEmojiEmotions } from "react-icons/md";
import { useResponsive } from '../redux-contexts/context/responsive';
import close from "../assets/close.png"
import { IoIosSend } from "react-icons/io";
import { useMainLayoutFunctions } from '../customHooks/layout/useLayoutFunctions';
import { TawkToScript } from './components/chat';
import Loan from '../AllUsers/User/loan';
export function MainLayout({ children, userType, superAdmin, asAdmin, setAsAdmin, setUserType, userToken }) {
  const { isMobile } = useResponsive()
  const navigate = useNavigate();
  const { menuToggle } = useContext(ThemeContext);
  const { fetchDataAndDispatch, showVerifyConfirmation } = useMainLayoutFunctions();
  const [theme, setTheme] = useState('');
  const { userInfo } = useSelector((state) => state.auth);
  const [yes, setYes] = useState(false);
  const [openChat, setOpenChat] = useState(false)
  const [amount, setAmount] = useState("")
  const [usd, setusd] = useState('')
  const [currency, setCurrency] = useState({
    curr: userInfo?.preferred_currency ? userInfo?.preferred_currency?.toUpperCase() : 'USD',
    symbol: userInfo?.preferred_currency === "usd"
      ? "$"
      : userInfo?.preferred_currency === "gbp"
        ? "£"
        : userInfo?.preferred_currency === "eur"
          ? "€"
          : "$",
  });
  const [loanApp, setLoanApp] = useState(false)
  const handleVerify = () => {
    showVerifyConfirmation();
  };

  const handleLoan = (l) => {
    setLoanApp(l)
  }

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { fetchDataAndDispatch, userType, superAdmin, asAdmin, setAsAdmin, currency, handleLoan });
    }
    return child;
  });

  return (
    <div id="main-wrapper" className={`show ${menuToggle ? 'menu-toggle' : ''}`} style={{
      backgroundColor: '#1a1a1a',
      position: 'relative',
      // background: '-webkit-linear-gradient(to right, #E2E2E2, #C9D6FF)',
      // background: 'linear-gradient(to right, #E2E2E2, #C9D6FF)'


    }}>
      <Nav onDarkModeChange={(newTheme) => setTheme(newTheme)} userType={userType} superAdmin={superAdmin} setAsAdmin={setAsAdmin} asAdmin={asAdmin} setUserType={setUserType} />
      <div style={{
        position: 'fixed',
        top: '0px',
        right: '20px',
        zIndex: 1000
      }}>
        {/* <TawkToScript /> */}
      </div>
      {
        loanApp && (
          <Loan handleLoan={handleLoan} userToken={userToken} show={loanApp}/>
        )
      }
      <div className="content-body" style={{background: '', flex: 1, minHeight: window.screen.height - 45, marginLeft: isMobile ? '0px' : '', paddingBottom: isMobile ? '100px' : '' }}>
        <div className="container-fluid">


          {/* 
          {(!userInfo?.verified && userType === 'user') && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p style={{ color: 'red' }}>
                <IoIosWarning style={{ verticalAlign: 'middle' }} />
                {' '} Account is not verified.{' '}
                <span
                  style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                  onClick={handleVerify}
                >
                  Click to verify email
                </span>
              </p>
              {' '}
              {yes && (<p> .You may want to login again.</p>)}
            </div>
          )} */}
          {childrenWithProps}
        </div>
      </div>
      <Footer />
    </div>
  );
}
