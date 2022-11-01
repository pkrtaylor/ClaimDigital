import React, {useEffect, useState, useContext} from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import axios from 'axios'
import MagicUserContext from '../MagicUserContext'

const Container = styled.div`
    background-color: #222;
    width: 100%;
    height: 100vh;
`






const Login = (props) =>{

    
    const {getTableData} = useContext(MagicUserContext)

    useEffect(()=>{

        async function getRecords(){

            try {
               const {data: records} = await axios.get('https://api.airtable.com/v0/app1VZ3hNzOYLqm50/tblAQaotTZgFVAzeJ?api_key=keyeX0XHalTHr09Dc')
               getTableData(records)
               console.log(records)
            } catch (error) {
               console.log(error)
            }
        }

        getRecords();
 })
       
 
    

//   props.isLoggedIn === null ? console.log('') : 

//   (props.isLoggedIn ? console.log('logged in') : console.log('not logged in'))
    return(

    
       <Container>
                <Helmet>
                        <script
                    src="https://auth.magic.link/pnp/login"
                    data-magic-publishable-api-key="pk_live_B8ED3820154A68B1"
                    data-redirect-uri="/selection">
                    
                        </script>
                 </Helmet>
        </Container>

    )
}

export default Login