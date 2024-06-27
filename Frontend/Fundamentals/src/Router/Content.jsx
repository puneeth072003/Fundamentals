import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import React from "react";
import App from "../App/App";

const Content = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </div>
  );
};

export default Content;