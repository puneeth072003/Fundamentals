import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import React from "react";
import App from "../App/App";
import StudentApp from "../Sidebar/sidebar";
import TeacherComp from "../Teachers/Teacher";
import Loogin from "../Login/SignUP/Login";
import Signup from "../Login/SignUP/Signup";
import AddSection from "../AddSection/AddSection";
import AddUnits from '../AddSection/AddUnits';
import AddVideo from '../AddSection/AddVideo';
import AddQuizComp from '../AddSection/AddQuizComp';
import AddUnitTest from '../AddSection/AddUnitTest';
// import ProtectedRoute from "./ProtectedRoute";

const Content = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<App />} />
        
        {/* <ProtectedRoute path="/class11" element={<StudentApp/>} requiredRole={true}/>
        <ProtectedRoute path="/teacher" element={<TeacherComp/>} requiredRole={true}/> */}
        <Route path="/class11" element={<StudentApp/>}/>
        <Route path="/teacher" element={<TeacherComp/>}/>
        <Route path="/login" element={<Loogin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/addsection" element={<AddSection/>}/>
        <Route path="/add-units" element={<AddUnits />} />
        <Route path="/add-video-subunit" element={<AddVideo />} />
        <Route path="/add-quiz-subunit" element={<AddQuizComp />} />
        <Route path="//add-unit-test" element={<AddUnitTest />} />
      </Routes>
    </div>
  );
};

export default Content;