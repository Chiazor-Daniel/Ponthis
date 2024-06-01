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
import close from "../assets/close.png"
import { IoIosSend } from "react-icons/io";
import { useMainLayoutFunctions } from '../customHooks/layout/useLayoutFunctions';
import { TawkToScript } from './components/chat';
export function MainLayout({ children, userType, superAdmin, asAdmin, setAsAdmin, setUserType }) {
  const navigate = useNavigate();
  const { menuToggle } = useContext(ThemeContext);
  const { fetchDataAndDispatch, showVerifyConfirmation } = useMainLayoutFunctions();
  const [theme, setTheme] = useState('');
  const { userInfo } = useSelector((state) => state.auth);
  const [yes, setYes] = useState(false);
  const [openChat, setOpenChat] = useState(false)
  const [amount, setAmount] = useState("")
  const [usd, setusd] = useState('')
  const handleVerify = () => {
    showVerifyConfirmation();
  };

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { fetchDataAndDispatch, userType, superAdmin, asAdmin, setAsAdmin });
    }
    return child;
  });

  return (
    <div id="main-wrapper" className={`show ${menuToggle ? 'menu-toggle' : ''}`} style={{
      background: '#C9D6FF',
      position: 'relative',
      background: '-webkit-linear-gradient(to right, #E2E2E2, #C9D6FF)',
      background: 'linear-gradient(to right, #E2E2E2, #C9D6FF)'


    }}>
      <Nav onDarkModeChange={(newTheme) => setTheme(newTheme)} userType={userType} superAdmin={superAdmin} setAsAdmin={setAsAdmin} asAdmin={asAdmin} setUserType={setUserType} />
          <TawkToScript />
      <div className="content-body" style={{ minHeight: window.screen.height - 45 }}>
        <div className="container-fluid">
          {/* <div
            onClick={() => setOpenChat(!openChat)}
            style={{
              position: 'fixed',
              bottom: "20px",
              right: "20px",
              backgroundColor: 'white',
              padding: '20px',
              zIndex: 100000,
              borderRadius: '50%',
              cursor: 'pointer',
              transition: 'transform 0.3s ease' // Add transition for smooth rotation
            }}
          >
            {
              openChat && (
                <div
                  className='card'
                  style={{
                    padding: '20px',
                    position: 'absolute',
                    bottom: '90px',
                    right: '0px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    width: '400px',
                    height: '500px',
                    animation: 'slideInRight 1s ease' // Slide in animation when openChat is true
                  }}
                >
                  <p style={{ fontSize: '1.5rem', textAlign: 'center' }}>Customer Support</p>
                  <div style={{ alignSelf: '', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <MdEmojiEmotions size={30} />
                    <Form.Control
                      type="text"
                      placeholder="Type your message..."
                     
                    />
                    <div style={{ display: 'flex', alignItems: 'center', padding: '10px', backgroundColor: '#7E8EF1', borderRadius: '50%' }}>
                      <IoIosSend size={25} color='white' />
                    </div>
                  </div>
                </div>
              )
            }
            <img
              src={openChat ? close : chat}
              style={{
                width: '40px',
                zIndex: 99999,
                transform: openChat && 'rotate(360deg)', // Rotate the image when openChat changes
                transition: openChat ? 'transform 1s ease' : 'transform 0.3s ease' // Animate the rotation when openChat is true
              }}
            />
          </div> */}


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
          )}
          {childrenWithProps}
        </div>
      </div>
      <Footer />
    </div>
  );
}
