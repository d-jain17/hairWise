import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineSmsFailed } from "react-icons/md";
function Fail() {
  return (
    <div className='quiz-container'>
      <div className='quiz-parent'>
        <center>
        <MdOutlineSmsFailed size={'4rem'} />
        <h2>OOPS! There was a failure!</h2>
        <Link to="/">
        <button>TRY AGAIN</button>
        </Link>
        </center>
      </div>
    </div>
  )
}

export default Fail