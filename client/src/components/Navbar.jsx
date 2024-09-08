import React, { useContext, useEffect, useState, useRef } from 'react';
import Logo from "../imgs/logo.png";
import { Link } from 'react-router-dom';
import "../style/style.scss";
import "../style/navbar.scss";
import { AuthContext } from '../context/authContext.jsx';

const Navbar = () => {
  const { currUser, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);  // State to handle the hamburger menu
  const hamburgerRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      // console.log(menuOpen);
      if (menuOpen && !hamburgerRef.current.contains(event.target)){
        console.log("clicked!");
        setMenuOpen(false); 
      }
    };

    // Add event listener for clicks on the whole document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);
  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <Link to='/posts/home'>
            <img src={Logo} alt="logo, link to home" />
          </Link>
        </div>

        <div className={`links ${menuOpen ? 'show' : ''}`}>
          <Link className='link-nav' to="/posts/home?cat=loots">LOOTS</Link>
          <Link className='link-nav' to="/posts/home?cat=houses">HOUSES</Link>
          <Link className='link-nav' to="/posts/home?cat=appartments">APPARTMENTS</Link>
          <p className='separator-line'>|</p>
          <span className="separator-h-line"></span>
          {currUser ? (
            <>
              <span>{currUser.name.toUpperCase()} {currUser.surname?.toUpperCase()}</span>
              <Link className='link-nav write-btn' to="/posts/write">WRITE NEW POST</Link>
              <button className='link-nav logout-btn' onClick={logout}>LOG OUT</button>
            </>
          ) : (
            <>
              <Link className='link-nav' to="/login">LOGIN</Link>
              <Link className='link-nav' to="/register">REGISTER</Link>
            </>
          )}
        </div>

        {/* Hamburger menu icon for mobile */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)} ref={hamburgerRef}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
