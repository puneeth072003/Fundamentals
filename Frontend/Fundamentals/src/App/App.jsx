import './App.css'
import React from 'react'
import { useEffect } from 'react';
import Login from "../Login/SignUP/Login"

function App() {
  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      localStorage.clear();
    });
  }, []);
  return (
    <>
      <div className="fundamentals-page">
      <header className="page-header">
        <h1>Welcome to Fundamentals Tutorials</h1>
        <p>Master the essentials of web development with our comprehensive tutorials.</p>
      </header>
      <main className="page-content">
        <section className="tutorial-section">
          <h2>HTML Basics</h2>
          <a href="https://developer.mozilla.org/en-US/docs/Web/HTML">Learn the foundational elements of HTML and how to structure web pages.</a>
        </section>
        <section className="tutorial-section">
          <h2>CSS Fundamentals</h2>
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS">Explore the basics of CSS, including styling, layout, and responsiveness.</a>
        </section>
        <section className="tutorial-section">
          <h2>JavaScript Essentials</h2>
          <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">Understand key concepts in JavaScript for interactive web development.</a>
        </section>
        <section className="tutorial-section">
          <h2>ReactJS Introduction</h2>
          <a href="https://legacy.reactjs.org/docs/getting-started.html">Get started with ReactJS, the popular JavaScript library for building user interfaces.</a>
        </section>
        {/* <button className='submit-btn' onClick={ Login }>Get Started</button> */}
        <a href='/login' className='start-btn'>Get Started</a>
      </main>
      <footer className="page-footer">
        <p>&copy; 2024 Fundamentals Tutorials. All rights reserved.</p>
      </footer>
    </div>
    </>
  )
}

export default App
