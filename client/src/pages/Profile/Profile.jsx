import React from 'react'
import PostSide from '../../components/PostSide/PostSide.jsx';
import ProfileCard from '../../components/ProfileCard/ProfileCard.jsx';
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft.jsx';
import RightSideIcons from '../../components/RightSideIcons/RightSideIcons.jsx';
import TrendDataBox from '../../components/TrendDataBox/TrendDataBox.jsx';
import './Profile.css'

const Profile = () => {
  return (
    <div className='Profile'>
      <ProfileLeft />

      <div className="profileCentre">
      <ProfileCard/>
      <PostSide/>
      </div>

      <div className="profileRight">
        <RightSideIcons/>
        <TrendDataBox/>
      </div>
    </div>
  )
}

export default Profile