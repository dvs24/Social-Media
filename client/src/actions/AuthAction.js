import * as AuthApi from '../api/AuthRequest'

export const logIn = (FormData)=> async(dispatch)=>{
    dispatch({type: 'AUTH_START'})
    try {
        const {data, status} = await AuthApi.logIn(FormData)
        dispatch({type : "AUTH_SUCCESS", data:data})
        return status
        
    } catch (error) {
        console.log(error)
        dispatch({type : 'AUTH_FAIL'})
    }
}       


export const signUp = (FormData)=> async(dispatch)=>{
    dispatch({type: 'AUTH_START'})

    try {
        const {data, status} = await AuthApi.signUp(FormData)
        dispatch({type : "AUTH_SUCCESS", data:data})
        return status;
    } catch (error) {
        console.log(error)
        dispatch({type : 'AUTH_FAIL'})
        
    }
}

export const logOut = ()=>async(dispatch)=>{
    dispatch({type: 'LOG_OUT'})
}