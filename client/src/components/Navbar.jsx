import React, { useContext, useEffect, useState, useRef } from 'react';
import Logo from "../imgs/logo.png";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "../style/navbar.scss";
import { AuthContext} from '../context/authContext.jsx';

const Navbar = () => {
  const { currUser, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);  
  const hamburgerRef = useRef(null);
  const linksHamRef = useRef(null);
  const location = useLocation();
  const navigate  = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const cat = queryParams.get('cat'); // Extract the 'cat' parameter value
  
  const handleClickOnLinkInHamburger = () => {
    setMenuOpen(false);
  }

  const navigateHome = async () => {
    
    try{
      await logout();
      navigate('../posts/home')
    }catch(err){
      console.log(err);
      console.log('Error in navbar -> navigateHome for logout')
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {

      if (menuOpen && !hamburgerRef.current.contains(event.target) && !linksHamRef.current.contains(event.target)){
        // console.log("clicked!");
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

        <div className={`links ${menuOpen ? 'show' : ''}`} ref={linksHamRef}>
          <Link className={`link-nav ${cat=='loots' ? 'active' : ''}`} to="/posts/home?cat=loots" onClick={handleClickOnLinkInHamburger}>LOOTS</Link>
          <Link className={`link-nav ${cat=='houses' ? 'active' : ''}`} to="/posts/home?cat=houses" onClick={handleClickOnLinkInHamburger}>HOUSES</Link>
          <Link className={`link-nav ${cat=='appartments' ? 'active' : ''}`} to="/posts/home?cat=appartments" onClick={handleClickOnLinkInHamburger}>APPARTMENTS</Link>
          <p className='separator-line'>|</p>
          <span className="separator-h-line"></span>
          {currUser ? (
            <>
              <span>{currUser.name.toUpperCase()} {currUser.surname?.toUpperCase()}</span>
              <Link className='link-nav write-btn' to="/posts/write">WRITE NEW POST</Link>
              {currUser?.role > 1000 && <Link className='link-nav write-btn' to="/admin">ADMIN PAGE</Link>}
              <button className='link-nav logout-btn' onClick={navigateHome}>LOG OUT</button>
              
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
