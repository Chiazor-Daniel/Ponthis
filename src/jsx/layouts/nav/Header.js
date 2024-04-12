import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
import LogoutPage from './Logout';
import { ThemeContext } from "../../../context/ThemeContext";
import { useContext } from "react";
import United from "../../../images/United.png";
import avatar from "../../../images/avatar/1.jpg";
import profile from "../../../images/profile/pic1.jpg";
import ReactThemeToggleButton from "../../components/toggleTheme/index.";
import ToggleTheme from "../../components/toggleTheme/index.";
import { useSelector } from "react-redux";
import { FaCircle } from "react-icons/fa6";

const NotificationBlog = ({ classChange }) => {
	return (
		<>
			<li>
				<div className="timeline-panel">
					<div className="media me-2">
						<img alt="images" width={50} src={avatar} />
					</div>
					<div className="media-body">
						<h6 className="mb-1">Dr sultads Send you Photo</h6>
						<small className="d-block">29 July 2022 - 02:26 PM</small>
					</div>
				</div>
			</li>
			<li>
				<div className="timeline-panel">
					<div className={`media me-2 ${classChange}`}>KG</div>
					<div className="media-body">
						<h6 className="mb-1">Resport created successfully</h6>
						<small className="d-block">29 July 2022 - 02:26 PM</small>
					</div>
				</div>
			</li>
			<li>
				<div className="timeline-panel">
					<div className={`media me-2 ${classChange}`}><i className="fa fa-home" /></div>
					<div className="media-body">
						<h6 className="mb-1">Reminder : Treatment Time!</h6>
						<small className="d-block">29 July 2022 - 02:26 PM</small>
					</div>
				</div>
			</li>
		</>
	)
}
const timelineData = [
	{
		id: 1,
		badgeClass: "info",
		time: "20 minutes ago",
		title: "New order placed",
		subTitle: "#XF-2356.",
		description: "Quisque a consequat ante Sit amet magna at volutapt...",
	}
];
const Header = ({ onNote }) => {
	const [rightSelect, setRightSelect] = useState('Eng');
	const { loading, userInfo, userToken, error, success } = useSelector(state => state.auth);
	const [isDark, setDark] = useState(false);
	const { changeBackground } = useContext(ThemeContext);
	const [headerFix, setheaderFix] = useState(false);
	useEffect(() => {
		console.log(userInfo.first_name)
	}, [])
	useEffect(() => {
		isDark ? changeBackground({ value: "light", label: "light" }) : changeBackground({ value: "dark", label: "dark" })
	}, [isDark])
	useEffect(() => {
		window.addEventListener("scroll", () => {
			setheaderFix(window.scrollY > 50);
		});
	}, []);

	var path = window.location.pathname.split("/");
	return (
		<div className={`header ${headerFix ? "is-fixed" : ""}`}>
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
				<ToggleTheme
					isDark={isDark}
					invertedIconLogic
					onChange={() => setDark((prev) => !prev)}
				/>
				<Dropdown as="li" className="nav-item dropdown header-profile">
					<Dropdown.Toggle variant="" as="a" className="nav-link i-false c-pointer">
						<div className="position-absolute" style={{ top: -8, right: 0 }}>
							<FaCircle color="#74E291" size={15} />
						</div>
						<img src={"https://i.guim.co.uk/img/media/70a2fd5f5acddd683b892245209974fa4c768498/324_0_1429_858/master/1429.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=e2b8991e17e7bd966a29f5c706fe2552"} width={40} alt="" />
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
						
						<LogoutPage />
					</Dropdown.Menu>
				</Dropdown>
			</div>
		</div>
	);
};

export default Header;
