import React, { useEffect, useState } from 'react'
import './InfoCard.css'
import edit from '../../img/edit.png'
import { useParams } from 'react-router-dom'
// import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as userApi from '../../api/Userrequest.js'
import { logOut } from '../../actions/AuthAction'
import ProfileModal from '../ProfileModal/ProfileModal'


const InfoCard = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const profileUserId = params.id;
    const [modalOpened, setModalOpened] = useState(false);
    const [profileUser, setProfileUser] = useState({})

    const user = useSelector((state) => state.authReducer.authdata.user);

    const handleLogOut = () => {
        dispatch(logOut())
        localStorage.clear();
    }

    useEffect(() => {
        const fetchProfileUser = async () => {
            if (profileUserId === user._id) {
                console.log(user);
                setProfileUser(user);
            }
            else {
                const profileUser = await userApi.getUser(profileUserId);
                setProfileUser(profileUser);

            }
        }
        fetchProfileUser()
    }, [user, profileUserId])


    return (
        <div className='infoCard'>
            <div className="infoHead">
                <h4>Profile Info</h4>
                <img src={edit} alt='' onClick={() => setModalOpened(true)} />
                <ProfileModal
                    modalOpened={modalOpened}
                    setModalOpened={setModalOpened}
                    data ={user}
                />

            </div>

            <div className="info">
                <span><b>Status</b></span>
                <span> {profileUser.relationship}</span></div>
            <div className="info">
                <span><b>Lives in </b></span>
                <span> {profileUser.livesIn}</span></div>
            <div className="info">
                <span><b>Works At </b></span>
                <span>{profileUser.worksAt}</span>
            </div>

            <div className="profileBtn">
                <button onClick={handleLogOut}>
                    Log Out
                </button>
            </div>

        </div>
    )
}

export default InfoCard