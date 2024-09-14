import React from 'react'
import Logo from "../imgs/logo.png";
import "../style/footer.scss"
import "../style/style.scss"

const Footer = () => {
  return (
    <div className='footer'>
      <img className='logo' src={Logo} alt="" />
      <span className='slogan'>Made with heart and <b>ambition</b></span>
    </div>
  )
}

export default Footer