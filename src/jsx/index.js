import React, { useContext } from "react";
import {  Routes, Route, Outlet  } from "react-router-dom";
import "./index.css";
import "./chart.css";
import "./step.css";
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
import { ThemeContext } from "../context/ThemeContext";

export function MainLayout({children}){
  const { menuToggle } = useContext(ThemeContext);
  return (
    <div id="main-wrapper" className={`show ${ menuToggle ? "menu-toggle" : ""}`}>  
      <Nav />
      <div className="content-body" style={{ minHeight: window.screen.height - 45 }}>
          <div className="container-fluid">
            {children}
          </div>
      </div>
      <Footer />
    </div>
  )
};
