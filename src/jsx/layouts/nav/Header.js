/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import LogoutPage from './Logout';
import { ThemeContext } from "../../../context/ThemeContext";
import { useContext } from "react";
import avatar from "../../../images/avatar/1.jpg";
import ToggleTheme from "../../components/toggleTheme/index.";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCircle } from "react-icons/fa6";
import Avatar from "react-avatar";
import { BsMagic } from "react-icons/bs";
import MyTheme from "../../components/myTheme";

const Header = ({ onNote, onThemeChange, userType, superAdmin, asAdmin, setAsAdmin, setUserType }) => {
	console.log(userType)
	const navigate= useNavigate()
	const [rightSelect, setRightSelect] = useState('Eng');
	const { loading, userInfo, userToken, error, success } = useSelector(state => state.auth);
	const [isDark, setDark] = useState(true);
	const { changeBackground } = useContext(ThemeContext);
	const [headerFix, setheaderFix] = useState(false);
	useEffect(() => {
		isDark ? changeBackground({ value: "light", label: "light" }) : changeBackground({ value: "dark", label: "dark" })
	}, [isDark])
	useEffect(() => {
		window.addEventListener("scroll", () => {
			setheaderFix(window.scrollY > 50);
		});
	}, []);
	const handleThemeChange = (newTheme) => {
		setDark(newTheme);
		onThemeChange(newTheme); // Callback to pass isDark to the parent component
	};

	var path = window.location.pathname.split("/");
	return (
		<div className={`header ${headerFix ? "is-fixed" : ""}`}>
			{
				userType === "user" && (
					<div className="header-content" >
						<nav className="navbar navbar-expand">
							<div className="collapse navbar-collapse justify-content-between">
								<div className="header-left">
									<div
										className="dashboard_bar"
										style={{ textTransform: "capitalize", display: "flex", alignItems: "center", gap: "10px", gap: "20px" }}
									>
										{userInfo.first_name + " " + userInfo.last_name}
									</div>
								</div>
							</div>
						</nav>
						{
							asAdmin && (
								<Button style={{width: "auto", marginRight: "20px"}} onClick={()=>{setAsAdmin(false); navigate("/admin/admin-dashboard"); setUserType("admin")}}>Admin Dashboard</Button>

							)
						}

						<MyTheme />

						<ToggleTheme
							isDark={isDark}
							invertedIconLogic
							onChange={() => { setDark((prev) => !prev); onThemeChange(isDark) }}
						/>

						<Dropdown as="li" className="nav-item dropdown header-profile">
							<Dropdown.Toggle variant="" as="a" className="nav-link i-false c-pointer">
								<div className="position-absolute" style={{ top: -8, right: 0 }}>
									<FaCircle color="#74E291" size={15} />
								</div>
								<Avatar name={userInfo.first_name + " " + userInfo.last_name} size={50} round />
							</Dropdown.Toggle>
							<Dropdown.Menu align="right" className="dropdown-menu dropdown-menu-end">
								<Link to="/dashboard/profile" className="dropdown-item ai-icon">
									<svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary me-1" width={18} height={18} viewBox="0 0 24 24" fill="none"
										stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
									>
										<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
										<circle cx={12} cy={7} r={4} />
									</svg>
									<span className="ms-2">Profile</span>
								</Link>

								<LogoutPage userType={userType}/>
							</Dropdown.Menu>
						</Dropdown>
					</div>
				)
			}
			{
				userType == "admin" && (
					<div className="header-content" >
						<nav className="navbar navbar-expand">
							<div className="collapse navbar-collapse justify-content-between">
								<div className="header-left">
									<div
										className="dashboard_bar"
										style={{ textTransform: "capitalize", display: "flex", alignItems: "center", gap: "10px", gap: "20px" }}
									>
										{
											superAdmin ? "Super Admin" : "Admin"
										}
									</div>
								</div>
							</div>
						</nav>
						
					
						<MyTheme />
						<ToggleTheme
							isDark={isDark}
							invertedIconLogic
							onChange={() => { setDark((prev) => !prev); onThemeChange(isDark) }}
						/>
						<Dropdown as="li" className="nav-item dropdown header-profile">
							<Dropdown.Toggle variant="" as="a" className="nav-link i-false c-pointer">
								<Avatar name={"A" + " " + "D"} size={50} round />
							</Dropdown.Toggle>
							<Dropdown.Menu align="right" className="dropdown-menu dropdown-menu-end">
								<Link to="" className="dropdown-item ai-icon">
									<svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary me-1" width={18} height={18} viewBox="0 0 24 24" fill="none"
										stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
									>
										<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
										<circle cx={12} cy={7} r={4} />
									</svg>
									<span className="ms-2">Profile</span>
								</Link>
								<LogoutPage userType={userType}/>
							</Dropdown.Menu>
						</Dropdown>
					</div>
				)
			}
		</div>
	);
};

export default Header;
