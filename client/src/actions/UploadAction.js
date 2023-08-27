import * as uploadAPI from '../api/UploadRequest.js'
export const uploadImage = (data)=> async(dispatch)=>{
    try {
       const response = await uploadAPI.uploadImage(data)
       return response.data;
    } catch (error) {
        console.log(error)
    }
}  

export const uploadPost = (data)=> async(dispatch)=>{
    dispatch({type : 'UPLOAD_START'})
    try {
        const newPost = await uploadAPI.uploadPost(data);
        dispatch({type:'UPLOAD_SUCCESS', data : newPost.data})
    } catch (error) {
        console.log(error)
        dispatch({type: 'UPLOAD_FAIL'})
    }
}