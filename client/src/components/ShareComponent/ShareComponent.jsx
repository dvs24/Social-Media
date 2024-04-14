import React, { useEffect } from 'react'
import './ShareComponent.css'
import profile from '../../img/img4.jpg'
import photos from '../../img/photos.png'
import location from '../../img/location.png'
import videos from '../../img/video.png'
import schedule from '../../img/schedule.png'
import close from '../../img/close.png'

import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadImage, uploadPost } from '../../actions/UploadAction'

const ShareComponent = () => {
    const loading = useSelector((state)=>state.postReducer.uploading)
    const user = useSelector((state)=>state.authReducer.authdata.user)
    const [image, setimage] = useState(null);
    const dispatch = useDispatch();
    const imageRef = useRef();
    const desc = useRef();
    const onImageChange = (event) =>{
        if(event.target.files && event.target.files[0]){
            let img = event.target.files[0];
            if(img){
                const reader = new FileReader();
                reader.onload = (e) => {
                    const result = e.target.result;
                    setimage(result)
                }
                reader.readAsDataURL(img);
            }
            
        }
    }

    const reset = ()=>{
        setimage(null)
        desc.current.value = ''
    }

    const handleSubmit= async(e)=>{
        e.preventDefault()
        const newPost = {
            userId : user?user._id : null,
            desc : desc.current.value
        }

        if(image){
            const data = new FormData();
            const fileName = Date.now() + image.name
            data.append('name', fileName)
            data.append('file', image)
            newPost.image = image;
            try { 
               await dispatch(uploadImage(data));
               dispatch(uploadPost(newPost))
               reset(); 
                 
            } catch (error) {
                console.log(error)
            }
        }
        else{
            dispatch(uploadPost(newPost));
            reset();
        }
    }

    useEffect(() => {
        console.log(image)
    },[image])


  return (
    <div className='shareComponent'>
        <div className="shareSearch">
            <img src={profile} alt="" />
            <input type="text" placeholder="What's Happening?" ref = {desc} required/>
        </div>
        <div className="postOptions">
            <div className="option">
                <img src={photos} alt="" onClick={()=> imageRef.current.click()} />
                <span>photos</span>
            </div>
            <div className="option">
                <img src={videos} alt="" />
                <span>videos</span>
            </div>
            <div className="option">
                <img src={location} alt="" />
                <span>location</span>
            </div>
            <div className="option">
                <img src={schedule} alt="" />
                <span>schedule</span>
            </div>

            <button className='shareBtn' onClick={handleSubmit}>{loading?"Uploading" : "Share"}</button>
            <div className="inputFile" style={{display : 'none'}}>
            <input type="file" name='myFile' ref={imageRef} onChange={onImageChange} />
            </div>
        

        </div>
        {image && (
                <div className="previewImage">
                    <img src={close} className='closeImage' alt="" onClick={()=> setimage(null)}/>
                    <img src={image} className='photoImage' alt="" />
                </div>

            )}
    </div>
  )
}

export default ShareComponent