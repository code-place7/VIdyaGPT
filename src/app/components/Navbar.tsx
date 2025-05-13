import React from "react";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="inner">
        <a href="#hero" className="logo">
          {" "}
          VidyaGpt
        </a>

        <nav className="desktop"></nav>
        <a href="#lessongenerator" className="contact-btn group">
          <div className="inner">
            <span>GET Started</span>
          </div>
        </a>
      </div>
    </header>
  );
};

export default Navbar;
