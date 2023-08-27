import React from 'react'
import { TrendData } from '../Data/TrendData'
import './TrendDataBox.css'

const TrendDataBox = () => {
  return (
    <>
      <div className='trendDataBox'>
        <h3>Trends For You</h3>
        {TrendData.map((trend) => {
          return (
            <div className="trend">
              <span><b>#{trend.name}</b></span>
              <span>{trend.shares}k shares</span>
            </div>
          )
        })}


      </div>

        <div className="rightShareBtn">
          <button>Share</button>
        </div>
    </>
  )
}

export default TrendDataBox