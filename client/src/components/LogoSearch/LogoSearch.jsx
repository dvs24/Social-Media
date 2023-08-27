import React from 'react'
import './LogoSearch.css'
import logo from '../../img/logo.png'
import searchIcon from '../../img/searchIcon.png'

const LogoSearch = () => {
  return (
    <div className="logoSearch">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="search">
        <input type="text" name="" id="" placeholder='#Explore' />
        <img src={searchIcon} alt=""  />
      </div>
    </div>
  )
}

export default LogoSearch