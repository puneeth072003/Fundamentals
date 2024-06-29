import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import React from "react";
import App from "../App/App";
import Sidebar from "../Sidebar/sidebar";

const Content = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/student"element={<Sidebar/>}/>
      </Routes>
    </div>
  );
};

export default Content;