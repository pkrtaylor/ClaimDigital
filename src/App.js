import ClaimNFT from './components/ClaimNFT';
import NFCScan from './components/NFCScan';
import {
  BrowserRouter as Router, 
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from './components/Login';
import { Magic } from 'magic-sdk'
import React, {useEffect, useState} from 'react'
import Spinner from './components/Spinner';
import styled from 'styled-components';
import { MagicUserProvider } from './MagicUserContext';
import MagicUserContext from './MagicUserContext';
import { useContext } from 'react';
import {OAuthExtension} from '@magic-ext/oauth'
import Selection from './components/Selection';


const Container = styled.div`

    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
    background-color: black;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    

`

//const magic = new Magic('pk_live_B8ED3820154A68B1');

const magic = new Magic(
  'pk_live_B8ED3820154A68B1',
  {
    extensions: [new OAuthExtension()],
  }
);
function App() {

 
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [userEmail, setUserEmail] = useState("")
  
  useEffect(()=>{

    async function getUser(){
      console.log(1)
    try {

      
      await magic.oauth.getRedirectResult();
      const res = await magic.user.getMetadata();
      console.log(res)
      console.log(res.email)
      setUserEmail(res?.email)
      res && localStorage.setItem('email', res.email)
      
      
    } catch (error) {
      console.log(error)
    }
  }

    async function getAuth(){
      try {
        const isLoggedIn = await magic.user.isLoggedIn();
        setIsLoggedIn(isLoggedIn)
        console.log(0)
    } catch (error) {
        setIsLoggedIn(isLoggedIn)
    }
        getUser();
    }

    getAuth();

    

    
  }, [isLoggedIn, userEmail])

 
  


  return (
    
    <MagicUserProvider>
      <Router>
      <Routes>
        <Route path = "/" element={<Login isLoggedIn={isLoggedIn}/>}/>
        <Route path = "/nfcscan/:id" element={<NFCScan/>}/>
        <Route path = "/claimnft/:id" 
          element={<ClaimNFT isLoggedIn={isLoggedIn} userEmail = {userEmail}/> }/>
          <Route path= "/selection" element={<Selection/>}/>
      </Routes>
    </Router>
    </MagicUserProvider>
  );
}

export default App;



{/* <Route path = "/claimnft/:id" 
          element={isLoggedIn === null ?
          (<Container>
            <Spinner style={{top:'0', left:'0'}} name="Loading"/>
          </Container>) 
          :
          (isLoggedIn ? <ClaimNFT isLoggedIn={isLoggedIn} userEmail = {userEmail}/> : <Navigate to="/" />)  }/> */}