import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegThumbsUp } from "react-icons/fa";
function Success() {
  return (
    <div className='quiz-container'>
      <div className='quiz-parent'>
        <center>
        < FaRegThumbsUp  size={'4rem'} />
        <h2>The routine has been sent successfully!</h2>
        <button>EXPLORE MORE</button>
        </center>
      </div>
    </div>
  )
}

export default Success