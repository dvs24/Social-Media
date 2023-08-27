import React, { useEffect, useState } from 'react'
import './FollowersCard.css'
// import { followers } from '../Data/FollowersData'
import { getAllUser } from '../../api/Userrequest.js'
import { useSelector } from 'react-redux'
import User from '../User/User'
const FollowersCard = () => {
    const [persons, setPersons] = useState([])
    const user = useSelector((state) => state.authReducer.authdata.user)

    useEffect(() => {
        const fetchAllPerson = async () => {
            const {data} = await getAllUser();
            setPersons(data);
        }
        fetchAllPerson();
    }, [])

    return (
        <div className="followersCard">
            <h3>Who is following you</h3>

            {persons.map((person, id) => {
                if (person._id !== user._id) {
                    return <div>
                        <User person={person} key={id}/>
                    </div>
                }
                else {
                    return null
                }
            })}
        </div>
    )
}

export default FollowersCard