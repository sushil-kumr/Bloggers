/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import { CSSTransition } from "react-transition-group";

export default function Header() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  return (
    <header className="Header">
    <div className="Logo"> 
    <h3><Link to="/">Bloggers</Link></h3>
    </div>
     
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit>
        <nav className="Nav">
          <Link to="/">Home</Link>
          <Link to="/post">Add Post</Link>
          <Link to="/payment">Payment</Link>
        </nav>
      </CSSTransition>
      <button onClick={toggleNav} className="MenuIcon"> <div className="fa fa-bars"/>
      </button>
    </header>
  );
}
