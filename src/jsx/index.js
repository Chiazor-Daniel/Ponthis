import React, { useContext, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import "./index.css";
import "./chart.css";
import "./step.css";
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
import { ThemeContext } from "../context/ThemeContext";

export function MainLayout({ children }) {
  const { menuToggle } = useContext(ThemeContext);
  const [theme, setTheme] = useState("");

  return (
    <div id="main-wrapper" className={`show ${menuToggle ? "menu-toggle" : ""}`}>
      <Nav onDarkModeChange={(newTheme) => setTheme(newTheme)} />
      <div className="content-body" style={{ minHeight: window.screen.height - 45 }}>
        <div className="container-fluid">
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, { theme: theme });
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
