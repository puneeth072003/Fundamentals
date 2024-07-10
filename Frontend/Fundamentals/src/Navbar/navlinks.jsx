import React from "react";
import { Link } from "react-router-dom";
// import "../../Students/student"
// import "../../Teachers/teachers"

const Navlinks=()=>{
    return(
    <nav>
      <ul className="linksinnav">
        <a href="/class11" className="nav-link">Student</a>
        <a href="/teacher" className="nav-link">Teacher</a>
        {/* <button class="login-button" href="/login">Login</button> */}
        <a href="/login" className="nav-btn">Login</a>
      </ul>
    </nav>
    )
}

export { Navlinks };