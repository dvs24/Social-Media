import * as userApi from '../api/Userrequest'

export const updateUser = (id, formData)=>async (dispatch)=>{
    dispatch({type:"UPDATING_START"})
    try {
        const {data} = await userApi.updateUser(id, formData)
        dispatch({type:"UPDATING_SUCCESS", data : data})
    } catch (error) {
        console.log(error)
        dispatch({type:"UPDATING_FAIL"})

    }
}

export const followUser = (id, data) =>async(dispatch)=>{
    dispatch({type : 'FOLLOW_USER'})
    await userApi.followUser(id, data)
}

export const unFollowUser = (id, data) =>async(dispatch)=>{
    dispatch({type : 'UNFOLLOW_USER'})
    await userApi.unFollowUser(id, data)
}

