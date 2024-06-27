import React from "react";
import { Navlinks } from "./navlinks.jsx";
import "./navbar.css";
import Logo from "../assets/plainlogo.png";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <img src={Logo} className="logo" alt="Fundamentals_logo" />
        </div>
        <Navlinks />
      </div>
    </nav>
  );
};

export { Navbar };