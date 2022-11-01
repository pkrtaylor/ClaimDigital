import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { merchandise } from '../merchData'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import LogoutB from './LogoutB';
import {Helmet} from 'react-helmet'
import { Magic } from 'magic-sdk'
import Modal from './Modal'
import Modal2 from './Modal/index'
import { AnimatePresence } from 'framer-motion'
import ifUserOwnsItem from './utils/ifUserOwnsItem'
import {OAuthExtension} from '@magic-ext/oauth'

const Container = styled.div`

    width: 100%;
    height: 100vh;
    background-color: #222;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: scroll;

`

const Wrapper = styled.div`

  
   width: 700px;
   height: 700px;

`

const Top = styled.div`
    border: solid;
    border-color: white;
    color: white;
    text-align: center;
`


const Bottom = styled.div`
    border: solid;
    border-color: red;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    


`

const Image = styled.img`

    width: 200px;
    height: 250px;
    cursor: pointer;
    object-fit: cover;
    transition: all 0.5s ease;

    &:hover{
        background-color: #484848 ;
        transform: scale(1.1);
        

    }

    @media screen and (max-width: 800px)
    {
        width: 50px;
        height: 100px;
        padding: 0px 20px;
        
    }

`

const MerchWrap = styled.div`
    border: solid;
    border-color: green;
    width: 300px;
    height: 300px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color:white;
    text-align: center;

    @media screen and (max-width: 800px)
    {
        width: 150px;
        height: 150px;

        
    }
    
    


`


const Selection = () => {


    
    
    const Navigate = useNavigate()

    
    const userItemCheck = async (pID) =>{
        //api call to get records
        
        try {

            const {data: records} = await axios.get('https://api.airtable.com/v0/app1VZ3hNzOYLqm50/tblAQaotTZgFVAzeJ?api_key=keyeX0XHalTHr09Dc')
            var Records = records
            
            console.log(1)
            
            
        } catch (error) {
            console.log(error)
        }
        
        const userOwnsItem = ifUserOwnsItem(pID, Records);

        if(userOwnsItem)
        {
            Navigate(`/claimnft/${pID}`)
        
        }
        else{
            open();

        }
        
        //gets list of the productIds of users purchased items
        


        //find user and make sure product id matches with id
        //we will later send in both id and product or just the productid 
        //if owns we navigate to /claim/id or productid
    }


     //magic section 
  
    const [logoutClicked, setLogoutClicked] = useState(false) 
    const logoutClick = () =>{
        setLogoutClicked(true)
    
    }

    //MODAL section

    const [openModal, setOpenModal] = useState(false)

    const [modalOpen, setModalOpen] = useState(false)

    const close = () => setModalOpen(false)
    const open = () => setModalOpen(true)
    //<Modal open = {openModal} onClose = {()=>{ setOpenModal(false)}}/>
  return (
    <div>
        {
            logoutClicked ? (
                <Container>
                    <Helmet>
                        <script
                            src="https://auth.magic.link/pnp/logout"
                            data-magic-publishable-api-key="pk_live_B8ED3820154A68B1"
                            data-redirect-uri="/">
                        </script>
                    </Helmet>
    
            </Container>

            )
            :

            (
                <Container>
                  <AnimatePresence
                    initial={false}
                    exitBeforeEnter={true}
                    onExitComplete={()=> null}
                  >
                    {modalOpen && <Modal2 modalOpen={modalOpen} handleClose={close} 
                    title={"You do not own this item"}
                    text={"Please purchase desired item, then come back and claim it. Make sure you logged in with the same email used to make the purchase"}
                    />}
                  </AnimatePresence>
                    <LogoutB  onClick={logoutClick} />
                        <Wrapper >
                            <Top>
                                <h1>Please select the item you purchased</h1>
                            </Top>
                            <Bottom>
                            {
                                merchandise.map((merch) =>{

                                    return(
                                        <MerchWrap key={merch.id}>
                                                    <Image src={merch.img} onClick={()=>{userItemCheck(merch.productId)}}/>
                                                <h3>{merch.title}</h3>
                                        </MerchWrap>
                                    )
                                })
                            }
                            </Bottom>

                        </Wrapper>
                </Container>
            )
        }
    </div>
  )
}

export default Selection



// const userItemCheck = (productId, orderData) =>{
    //     let emailCheck = false
    //     let pIDCheck  = false
    //     console.log(orderData)
    //     let len = orderData.records.length
    //     for(let i = 0; i < len ; i++)
    //     {   
            

    //         if(orderData.records[i].fields.email !== localStorage.getItem('email'))
    //         {
    //             continue;
    //         }
    //         else{
    //             emailCheck = true
    //         }
    //         // we must account for two options, 1 order or multiple orders
    //         //the length will let us know
    //         //we get the length which is acutally the amount of lines in the string.
    //         //we seperate the string by new lines and input each line in an array thus getting line length of string
    //         //we want line length of string because 1 order only has length of 15, while more than 1 has more 
    //         let one_order = orderData.records[i].fields.ProductID.split("\n") 

    //         if(one_order.length <= 15)
    //         {   

    //             let str = one_order[2].split(':') //split string by :
    //             if(productId === str[1].trim())//there is an empty space " " next to productID ex.(" 626b4a272931fc49c7cbb47d") so we trim it  
    //             {
    //                 pIDCheck = true
    //             }
                
    //         }
    //         else{
    //             //if there is mulitple orders
    //             const record =  orderData.records[i].fields.ProductID.split("\n\n");

    //             //this goes througgh newly formed array of strings and splits each string by its new lines 
    //             for(let i = 0; i < record.length; i++)
    //             {
    //                     let temp = record[i].split(/\r?\n/) 
    //                     record[i] = temp 
    //                     let str = record[i][2].split(':')
    //                     if(productId === str[1].trim())
    //                     {
    //                         pIDCheck = true
    //                         break;
    //                     }
    //             }
                
            
    //         }
    //     }

    //     if(emailCheck && pIDCheck)
    //     {
    //         return true 
    //     }
    //     else{return false}
    //     // const pID =  orderData.records[0].fields.ProductID.split("\n") 
    //     // const pID2 =  orderData.records[1].fields.ProductID.split("\n\n");
        
    //     // for(let i = 0; i < pID2.length; i++)
    //     // {
    //     //         let temp = pID2[i].split(/\r?\n/) 
    //     //         pID2[i] = temp
    //     // }
        
    //     //console.log(pID)
    //     // console.log(pID2)
        
    //     // console.log(localStorage.getItem('email'))
    //     //const pID =  orderData.records[1].fields.ProductID.split("\n\n"); //after every order theres a empty new line, so we seperate the orders by splitting the string by every empty new line
    //     // pID.map((data) => data.split("\n")) 
    //     // const obj = []
    //     // for(let i = 0; i < pID.length; i++)
    //     // {
    //     //         let temp = pID[i].split(/\r?\n/) 
    //     //         pID[i] = temp
    //     // }
        
    //     // for(let i = 0; i < pID.length; i++)
    //     // {   
            
    //     //     let str = pID[i][2].split(':')
    //     //     obj.push(str[1].trim())

            
    //     // }
        
    //     //  console.log(obj);
    // }

    
    // orderData.length !== 0 ? (
    //     userItemCheck()
    // )
    // :
    // (
    //     console.log('no data')
    // )