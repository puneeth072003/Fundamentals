import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import React from "react";
import App from "../App/App";
import Sidebar from "../Sidebar/sidebar";
import StudentApp from "../Sidebar/sidebar";
import TeacherComp from "../Teachers/Teacher";
import Loogin from "../Login/SignUP/Login";
import Signup from "../Login/SignUP/Signup";

const Content = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/class11"element={<StudentApp/>}/>
        <Route path="/teacher"element={<TeacherComp/>}/>
        <Route path="/login" element={<Loogin/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </div>
  );
};

export default Content;