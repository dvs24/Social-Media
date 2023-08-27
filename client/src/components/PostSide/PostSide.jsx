import React from 'react'
import './PostSide.css'
import ShareComponent from '../ShareComponent/ShareComponent'
import Post from '../Post/Post'

const PostSide = () => {
  return (
    <div className='postSide'>
        <ShareComponent/>
        <Post/>
    </div>
  )
}

export default PostSide