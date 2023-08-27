import React from 'react'
import './RightSideIcons.css'
import home from '../../img/home.png'
import comment from '../../img/comment.png'
import noti from '../../img/noti.png'
import setting from '../../img/setting.png'
import { Link } from 'react-router-dom'

const RightSideIcons = () => {
  return (
    <div className='rightSideIcons'>
      <Link to='/home'>
        <img src={home} alt="" />
      </Link>
        <img src={comment} alt="" />
        <img src={noti} alt="" />
        <img src={setting} alt="" />
    </div>
  )
}

export default RightSideIcons