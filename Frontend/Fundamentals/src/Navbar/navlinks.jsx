import React from "react";
import { Link } from "react-router-dom";
// import "../../Students/student"
// import "../../Teachers/teachers"

const Navlinks=()=>{
    return(
    <nav>
      <ul className="links">
        <select>
          <option value="">Class 11</option>
          <option value="">Class 12</option>
        </select>
        <li>
          Teachers
        </li>
        <li>
          Studnets
        </li>
        <button>Login</button>
      </ul>
    </nav>
    )
}

export { Navlinks };