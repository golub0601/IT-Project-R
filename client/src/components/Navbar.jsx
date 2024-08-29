import React from 'react'
import Logo from "../imgs/logo.png";
import {Link} from 'react-router-dom'
import Home from "../pages/Home.jsx"
import "../style/style.scss"
import "../style/navbar.scss"


const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo"> <Link to ='/'><img src={Logo} alt="logo, link to home" /></Link></div>
        <div className='links'>
          <Link className='link-nav' to="/?cat=art">ART</Link>
          <Link className='link-nav' to="/?cat=sience">SIENCE</Link>
          <Link className='link-nav' to="/?cat=houses">HOUSES</Link>
          <Link className='link-nav' to="/?cat=appartments">APPARTMENTS</Link>
          <p>|</p>
          <Link className='link-nav' to="/">JOHN DOE</Link>
          <Link className='link-nav' to="/write">WRITE POST</Link>
          <Link className='link-nav' to="">LOG OUT</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar