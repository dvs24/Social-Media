import React from 'react'
import './ProfileCard.css'
import profileImage from '../../img/img4.jpg'
import cardBackImage from '../../img/cover.jpg'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ProfileCard = () => {
    const user = useSelector((state)=>state.authReducer.authdata.user)
    const profilePage = false
    // const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="profileCard">
            <div className="cardImage">
                <div className='cardBackImage'>
                    <img src={ cardBackImage } alt="" />
                </div>
                <div className='profileImage'>
                    <img src={profileImage} alt="" />
                </div>
            </div>
            <div className="profileName">
                <span className="nameInfo">{user.firstname} {user.lastname}</span>
                <span className="jobInfo">{user.worksAt? user.worksAt: "Write About YourSelf"}</span>
            </div>
            <div className="followStatus">
                <hr />
                <div className="followNumbers">

                    <div className="followers">
                        <span>{user.followers.length}</span>
                        <span>Follwers</span>
                    </div>
                    <div className="vl"></div>
                    <div className="following"> 
                        <span>{user.following.length}</span>
                        <span>Following</span>
                    </div>
                    {profilePage && (

                        <>
                            <div className="vl"></div>
                            <div className="following">
                                <span>3</span>
                                <span>Posts</span>
                            </div>

                        </>
                    )}

                </div>
                <hr />

            </div>

            {profilePage?'':
            <span className="myProfile">
                <Link style={{textDecoration:'none', color: 'inherit'}} to = {`/profile/${user._id}`} >
                My Profile
                </Link>

            </span>
            
            }
            
          

                
            

            
        </div>
    )
}

export default ProfileCard