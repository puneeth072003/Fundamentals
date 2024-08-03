import React from "react";

const Contact = () => {
  return (
    <div>
      <div>
        <div className="links-cnt">
          <h3 className="contact">Contact us</h3>
          <div className="footer-icons">
            <a href="mailto:pyd773@gmail.com" className="footer-icon">
              <i className="fa-solid fa-envelope"></i>
              <span className="message">Mail</span>
            </a>
            <a
              href="https://github.com/puneeth072003/fundamentals"
              className="footer-icon"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              href="https://github.com/puneeth072003/fundamentals/issues/new"
              className="footer-icon"
            >
              <i className="fa-solid fa-bug"></i>
            </a>
          </div>
        </div>
        <p className="final">
            Fundamentals.v1 @2024
            <br />
            Developed by Puneeth Y and Modak V
        </p>
      </div>
    </div>
  );
};

export { Contact };