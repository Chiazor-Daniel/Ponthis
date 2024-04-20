import React, { Fragment, useState } from "react";
import SideBar from "./SideBar";
import NavHader from "./NavHader";
import Header from "./Header";

const JobieNav = ({ title, onClick: ClickToAddEvent, onClick2, onClick3, onDarkModeChange }) => {
  const [toggle, setToggle] = useState("");
  const [dark, setDark] = useState("");

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
      <NavHader />
      <Header
          onNote={() => onClick("chatbox")}
          onNotification={() => onClick("notification")}
          onProfile={() => onClick("profile")}
          toggle={toggle}
          title={title}
          onBox={() => onClick("box")}
          onClick={() => ClickToAddEvent()}
          onThemeChange={(theme)=>handleDarkModeChange(theme)} // Pass the function to handle dark mode change
        /> 
      <SideBar />
    </Fragment>
  );
};

export default JobieNav;
