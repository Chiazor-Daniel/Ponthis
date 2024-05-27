import React, { useContext, useState } from 'react';
import './index.css';
import './step.css';
import Nav from './layouts/nav';
import Footer from './layouts/Footer';
import { IoIosWarning } from 'react-icons/io';
import { ThemeContext } from '../redux-contexts/context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMainLayoutFunctions } from '../customHooks/layout/useLayoutFunctions';

export function MainLayout({ children, userType, superAdmin, asAdmin, setAsAdmin, setUserType }) {
  const navigate = useNavigate();
  const { menuToggle } = useContext(ThemeContext);
  const { fetchDataAndDispatch, showVerifyConfirmation } = useMainLayoutFunctions();
  const [theme, setTheme] = useState('');
  const { userInfo } = useSelector((state) => state.auth);
  const [yes, setYes] = useState(false);

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
    <div id="main-wrapper" className={`show ${menuToggle ? 'menu-toggle' : ''}`}  style={{
      // background: '#C9D6FF',
      // background: '-webkit-linear-gradient(to right, #E2E2E2, #C9D6FF)',
      // background: 'linear-gradient(to right, #E2E2E2, #C9D6FF)' 
      backgroundImage: 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(197,213,184,0.4) 42%, rgba(225,237,204,0.1) 93.6% )'


    }}>
      <Nav onDarkModeChange={(newTheme) => setTheme(newTheme)} userType={userType} superAdmin={superAdmin} setAsAdmin={setAsAdmin} asAdmin={asAdmin} setUserType={setUserType}/>
      <div className="content-body" style={{ minHeight: window.screen.height - 45 }}>
        <div className="container-fluid">
          {(!userInfo?.verified && userType === 'user') && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
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
