import React, { useEffect } from 'react'
import './Post.css'
import PostInfo from '../PostInfo/PostInfo'
import { useDispatch, useSelector } from 'react-redux'
import { getTimelinePosts } from '../../actions/PostAction'
import { useParams } from 'react-router-dom'

const Post = () => {
  const params = useParams()
  const dispatch = useDispatch();
  const user = useSelector((state)=> state.authReducer.authdata.user);
  const {posts, loading} = useSelector((state)=>state.postReducer)

  if(!posts) return 'No Posts'
  if(params.id) posts.filter((post)=>post.userId === params.id)


  useEffect(()=>{ 
    if(user){

      dispatch(getTimelinePosts(user._id))
    }
  },[dispatch, user])

  return (
    <div className='post'>
      {loading ? 'Fetching Posts'
      :
      posts.map((post,id)=>{
          return(
              <PostInfo data ={post} id={id}/>

          )
      })
          }

    </div>
  )
}

export default Post