  import React, { useEffect } from 'react'
  import './PostInfo.css'
  import notLike from '../../img/notlike.png'
  import like from '../../img/like.png'
  import comment from '../../img/comment.png'
  import share from '../../img/share.png'
  import { useSelector } from 'react-redux'
  import { useState } from 'react'
  import {likePost} from '../../api/PostRequest'


  const PostInfo = ({data}) => {
    const user = useSelector((state)=>state.authReducer.authdata.user)
    const [liked , setLiked]=useState(data.likes.includes(user._id))
    const [likes,setLikes]= useState(data.likes.length);
    const [postImage, setPostImage] = useState();
    const handleLike = ()=>{
      setLiked((prev)=>!prev)
      liked? setLikes((prev)=>prev-1) : setLikes((prev)=>prev+1)
      likePost(data._id, user._id)

    }

  

    return (
      <div className='postInfo'>
          <img src={data.image} alt="" className='postImg' />

          <div className="postIcons">
            
              <img src={liked?like:notLike} alt=""  onClick={handleLike}/>
              <img src={comment} alt="" />
              <img src={share} alt="" className='shareIcon'/>
            
          </div>
          <div className="postDesc">
            <span>
            <b>{likes}</b> likes 
            </span>
            <div>
              <b>{data.name}</b> {data.desc}
            </div>
          </div>
      </div>
    )
  }

  export default PostInfo