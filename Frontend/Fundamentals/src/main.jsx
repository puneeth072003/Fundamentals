import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route } from "react-router-dom";
import Content from "./Router/Content.jsx";
import { Navbar } from "./Navbar/Navbar.jsx";
import "./index.css";
import "./Navbar/navbar.css";
import { Support } from "./Support/Support.jsx";
import { UserProvider } from "./redux/user-context.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <div>
    <UserProvider>
      <Navbar />
      <BrowserRouter>
        <Content />
      </BrowserRouter>
      <Support />
    </UserProvider>
  </div>
);
