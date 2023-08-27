import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, unFollowUser } from '../../actions/UserActon'

const User = ({person}) => {
    const dispatch = useDispatch()
    const user = useSelector((state)=>state.authReducer.authdata.user)
    const [follow, setFollow] = useState(person.followers.includes(user._id))
    const handleFollow= () =>{
        follow ? 
        dispatch(unFollowUser(person._id, user))

        :dispatch(followUser(person._id, user))
        setFollow((prev)=> !prev)
    }
    return (
        <div className="followersInfo">
            <img src={person.img} className='follwerImg' alt="" />
            <div className="followerName">
                <span><b>{person.firstname} {person.lastname}</b></span>
                <span>@{person.username}</span>
            </div>
            <button className='followBtn' onClick={handleFollow}>{follow ? 'Unfollow': 'Follow '}</button>

        </div>
    )
}

export default User