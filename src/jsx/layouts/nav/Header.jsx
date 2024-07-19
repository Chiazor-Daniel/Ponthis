/* eslint-disable */
import React, { useState, useEffect, useContext } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import LogoutPage from './Logout';
import { ThemeContext } from "../../../redux-contexts/context/ThemeContext";
import { useSelector } from "react-redux";
import { TbDoorEnter } from "react-icons/tb";
import { FaCircle, FaEye, FaEyeSlash } from "react-icons/fa6";
import Avatar from "react-avatar";
// import ToggleTheme from "../../components/toggleTheme/index."; // Ensure this import is correct
import avatar from "../../../assets/images/avatar/1.jpg";
import { CiBellOn } from "react-icons/ci";

const Header = ({ onNote, onThemeChange, userType, superAdmin, asAdmin, setAsAdmin, setUserType }) => {
  const navigate = useNavigate();
  const [rightSelect, setRightSelect] = useState('Eng');
  const { loading, userInfo, userToken, error, success } = useSelector(state => state.auth);
  const [isDark, setDark] = useState(true);
  const [seeBal, setSeeBal] = useState(false);
  const { changeBackground } = useContext(ThemeContext);
  const [headerFix, setHeaderFix] = useState(false);

  useEffect(() => {
    isDark ? changeBackground({ value: "light", label: "light" }) : changeBackground({ value: "dark", label: "dark" });
  }, [isDark, changeBackground]);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderFix(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleThemeChange = (newTheme) => {
    setDark(newTheme);
    onThemeChange(newTheme); // Callback to pass isDark to the parent component
  };

  var path = window.location.pathname.split("/");

  return (
    <div className={`header ${headerFix ? "is-fixed" : ""}`}>
      {userType === "user" && (
        <div className="header-content">
          <nav className="navbar navbar-expand">
            <div className="collapse navbar-collapse justify-content-between">
              <div className="header-left">
                <div
                  className="dashboard_bar"
                  style={{ textTransform: "capitalize", display: "flex", alignItems: "center", gap: "20px" }}
                >
                  {userInfo.first_name + " " + userInfo.last_name}
                </div>
              </div>
            </div>
          </nav>
          {asAdmin && (
            <Button
              style={{ width: "350px", marginRight: "20px", display: "flex", alignItems: "center", gap: "20px" }}
              onClick={() => {
                setAsAdmin(false);
                navigate("/admin/admin-dashboard");
                setUserType("admin");
                sessionStorage.removeItem('userToken');
                sessionStorage.removeItem('userInfo');
              }}
            >
              <TbDoorEnter size={25} color="white" /><span>Admin Dashboard</span>
            </Button>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width:'200px' }}>
              <div>Total Balance</div>
              <div style={{ fontSize: '1.3rem', fontWeight: '400', color: 'gray', fontFamily: 'monospace', display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center' }}>
                <span>{seeBal ? "$8000" : "******"}</span>
                <div>
                  {seeBal ? <FaEyeSlash onClick={() => setSeeBal(!seeBal)} /> : <FaEye style={{ margin: 'auto', cursor: 'pointer' }} onClick={() => setSeeBal(!seeBal)} />}
                </div>
              </div>
            </div>
			<div>
											<CiBellOn size={30} />
										</div>
            <Dropdown as="li" className="nav-item dropdown header-profile">
              <Dropdown.Toggle variant="" as="a" className="nav-link i-false c-pointer">
                <div className="position-absolute" style={{ top: -8, right: 0 }}>
                  <FaCircle color="#74E291" size={15} />
                </div>
                <Avatar name={userInfo.first_name + " " + userInfo.last_name} size={50} round />
              </Dropdown.Toggle>
              <Dropdown.Menu align="right" className="dropdown-menu dropdown-menu-end">
                <Link to="/dashboard/profile" className="dropdown-item ai-icon">
                  <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary me-1" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx={12} cy={7} r={4} />
                  </svg>
                  <span className="ms-2">Profile</span>
                </Link>
                <LogoutPage userType={userType} />
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      )}
      {userType === "admin" && (
        <div className="header-content">
          <nav className="navbar navbar-expand">
            <div className="collapse navbar-collapse justify-content-between">
              <div className="header-left">
                <div
                  className="dashboard_bar"
                  style={{ textTransform: "capitalize", display: "flex", alignItems: "center", gap: "20px" }}
                >
                  {superAdmin ? "Super Admin" : "Admin"}
                </div>
              </div>
            </div>
          </nav>
          <Dropdown as="li" className="nav-item dropdown header-profile">
            <Dropdown.Toggle variant="" as="a" className="nav-link i-false c-pointer">
              <Avatar name={"A" + " " + "D"} size={50} round />
            </Dropdown.Toggle>
            <Dropdown.Menu align="right" className="dropdown-menu dropdown-menu-end">
              <Link to="/admin/admin-dashboard/profile" className="dropdown-item ai-icon">
                <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary me-1" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx={12} cy={7} r={4} />
                </svg>
                <span className="ms-2">Profile</span>
              </Link>
              <LogoutPage userType={userType} />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
    </div>
  );
};

export default Header;
