import React from 'react'
import './Spinner.css'

const Spinner = ({name}) => {
  return (

    <div className="loading">{name}
    <span></span>
    </div>
    
  )
}

export default Spinner