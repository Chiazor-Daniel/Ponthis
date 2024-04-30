/* eslint-disable */
import React, { Fragment, useEffect, useState } from "react";
import SideBar from "./SideBar";
import { useContext } from "react";
import NavHader from "./NavHader";
import Header from "./Header";
import { ThemeContext } from "../../../context/ThemeContext";

const JobieNav = ({ title, onClick: ClickToAddEvent, onClick2, onClick3, onDarkModeChange, userType }) => {
  const [toggle, setToggle] = useState("");
  const [dark, setDark] = useState("");
  const { setDemoTheme } = useContext(ThemeContext);
  // Function to handle changes to the dark state
  const handleDarkModeChange = (theme) => {
    setDark(theme); // Update the dark state
    // Pass the updated dark state to the parent component
    if (onDarkModeChange) {
      onDarkModeChange(theme);
    }
  };

  const onClick = (name) => setToggle(toggle === name ? "" : name);

  return (
    <Fragment>
      <NavHader userType={userType}/>
      <Header
          onNote={() => onClick("chatbox")}
          onNotification={() => onClick("notification")}
          onProfile={() => onClick("profile")}
          toggle={toggle}
          title={title}
          userType={userType}
          onBox={() => onClick("box")}
          onClick={() => ClickToAddEvent()}
          onThemeChange={(theme)=>handleDarkModeChange(theme)} // Pass the function to handle dark mode change
        /> 
      <SideBar userType={userType} />
    </Fragment>
  );
};

export default JobieNav;
