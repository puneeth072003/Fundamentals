import React from "react";
import { Link } from "react-router-dom";
// import "../../Students/student"
// import "../../Teachers/teachers"

const Navlinks=()=>{
    return(
    <nav>
      <ul className="linksinnav">
        <a href="/class11" className="nav-link">Student</a>
        <a href="/class11" className="nav-link">Teacher</a>
        {/* <button class="login-button">Login</button> */}
      </ul>
    </nav>
    )
}

export { Navlinks };