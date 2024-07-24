import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import React from "react";
import App from "../App/App";
import StudentApp from "../Sidebar/sidebar";
import TeacherComp from "../Teachers/Teacher";
import Loogin from "../Login/SignUP/Login";
import Signup from "../Login/SignUP/Signup";
import UnifiedComponent from "../AddSection/UnifiedComponent"
import StudentDashboard from "../../Students/Student";

// import ProtectedRoute from "./ProtectedRoute";

const Content = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<App />} />
        
        {/* <ProtectedRoute path="/class11" element={<StudentApp/>} requiredRole={true}/>
        <ProtectedRoute path="/teacher" element={<TeacherComp/>} requiredRole={true}/> */}
        <Route path="/:className/:subject" element={<StudentApp/>}/>
        <Route path="/student" element={<StudentDashboard/>}/>
        <Route path="/teacher" element={<TeacherComp/>}/>
        <Route path="/login" element={<Loogin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/addsection" element={<UnifiedComponent/>}/>
      </Routes>
    </div>
  );
};

export default Content;