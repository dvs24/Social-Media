import React from 'react'
import './RightSide.css'
import RightSideIcons from '../RightSideIcons/RightSideIcons'
import TrendDataBox from '../TrendDataBox/TrendDataBox'

const RightSide = () => {
  return (
    <div className='rightSide'>
        <RightSideIcons/>
        <TrendDataBox/>
    </div>
  )
}

export default RightSide