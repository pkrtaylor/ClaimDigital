import React from 'react'
import {motion} from 'framer-motion'
import './Backdrop.css'

//this component will take 2 props
//children allows us to embedd additional components inbetween the tags for the backdrop
const Backdrop = ({children, onClick}) => {
  return(
    <motion.div
    className='backdrop'
    onClick={onClick}
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    >
      {children}
    </motion.div>
  ) 
  
}



export default Backdrop