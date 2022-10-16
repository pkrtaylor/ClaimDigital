import React from 'react'
import './Spinner.css'

const Spinner = ({style, name}) => {
  return (

    <div style={style} className="loading">{name}
    <span></span>
    </div>
    
  )
}

export default Spinner