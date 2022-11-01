import React from 'react'
import { motion } from 'framer-motion'
import Backdrop from '../Backdrop/index'
import './Modal.css'

const dropIn = {

    hidden: {

        y:"-100vh",
        opacity: 0,
        
    },
    visible: {
        y:"0",
        opacity: 1,
        transition:{
            duration: 0.1,
            type:"spring",
            damping: 25,
            stiffness: 500,
        },


    },
    exit:{
        y:"100vh",
        opacity: 0,
    },
}

const Modal2 = ({handleClose, text, title}) => {
  return (
    
    <Backdrop onClick={handleClose}>
        <motion.div
        onClick={(e)=> e.stopPropagation()}
        className="modal"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        >
        <h1>{title}</h1>
        <p>{text}</p>
        <button onClick={handleClose}>Close</button>
        </motion.div>
    </Backdrop>
  )
}

export default Modal2