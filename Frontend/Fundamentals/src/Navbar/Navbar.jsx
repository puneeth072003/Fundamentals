import React from "react";
import { Navlinks } from "./navlinks.jsx";
import Logo from "../assets/plainlogo.png";
import "./navbar.css"; // Import your CSS file for Navbar styling

const Navbar = () => {
  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <img src={Logo} className="logo" alt="Fundamentals_logo" />
          <span className="logo-text">FUNDAMENTALS</span>
        </div>
        <Navlinks />
      </div>
    </nav>
  );
};

export { Navbar };