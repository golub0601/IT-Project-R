import React, { useContext } from 'react'
import Logo from "../imgs/logo.png";
import {Link} from 'react-router-dom'
import Home from "../pages/Home.jsx"
import "../style/style.scss"
import "../style/navbar.scss"
import { AuthContext } from '../context/authContext.jsx';


const Navbar = () => {


  const {currUser, logout} = useContext(AuthContext);
  
  
  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo"> <Link to ='/'><img src={Logo} alt="logo, link to home" /></Link></div>
        <div className='links'>
          <Link className='link-nav' to="/?cat=loots">LOOTS</Link>
          <Link className='link-nav' to="/?cat=houses">HOUSES</Link>
          <Link className='link-nav' to="/?cat=appartments">APPARTMENTS</Link>
          <p>|</p>
          {currUser ? (
            <>
              <span>{currUser.name.toUpperCase()} {currUser.surname?.toUpperCase()}</span>
              <Link className='link-nav write-btn' to="/write">WRITE NEW POST</Link>
              <button className='link-nav logout-btn' onClick={logout}>LOG OUT</button>
            </>
          ) : (
            <>
              <Link className='link-nav' to="/login">LOGIN</Link>
              <Link className='link-nav' to="/register">REGISTER</Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar