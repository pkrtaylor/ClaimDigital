import React from 'react'
import './Modal.css'

const Modal = ({open, onClose}) => {

    if(!open){return null}
  return (
    <div className='overlay'>
        <div className='modalContainer'>
            <p style={{cursor:"pointer"}} onClick={onClose} className='closeBtn'>X</p>
            <div className='modalContent'>
                <h1>You do not own this item</h1>
                <p>Please purchase desired item, then come back and claim it</p>
                <p>Make sure you logged in with the same email used to make the purchase</p>
            </div>
        </div>
    </div>
  )
}

export default Modal