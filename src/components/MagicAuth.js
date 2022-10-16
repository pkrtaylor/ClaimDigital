import React, {useState, useEffect} from 'react'
import { Magic } from 'magic-sdk';
import Spinner from './Spinner';
import styled from 'styled-components'
import logo from '../tribe_market_logo.png'
import { useNavigate } from 'react-router-dom';


const Container = styled.div`

    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
    background-color: #080710;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    
    

`

const Wrapper = styled.div`
    height: 520px;
    width: 350px;
    display: flex;
    flex-direction: column;
    align-items:center;
    border-style: solid;
    background-color: rgba(255,255,255,0.13);
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255,255,255,0.1);
    box-shadow: 0 0 40px rgba(8,7,16,0.6);
    padding: 50px 35px;
    

    @media screen and (max-width: 800px){
        
        width: 250px;
        flex-direction: column;
        
    }
    
`

const Title = styled.h1`
    font-size: 32px;
    font-weight: 500;
    line-height: 42px;
    @media screen and (max-width: 800px){
        
        font-size: 26px;
        
    }
`

const Input = styled.input`
    
    height: 50px;
    width: 100%;
    background-color: rgba(255,255,255,0.07);
    border-radius: 3px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
    color: #ffffff;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
    text-indent: 3mm;
    

`
const Label = styled.label`
    align-self: flex-start;
    margin-top: 30px;
    font-size: 17px;
    font-weight: bold;
    letter-spacing: .75px;

`
const Button = styled.button`
    margin-top: 50px;
    width: 100%;
    background-color: #ffffff;
    color: #080710;
    padding: 15px 0px;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
`

const Logo = styled.img`
        height: 100px;
        width: 150px;
        margin-bottom: 20px;

        @media screen and (max-width: 800px){
        
        height: 50px;
        width: 100px;
        
    }
        
`



const magic = new Magic('pk_live_7B9EF38C534AB44E'); // ✨

const MagicAuth = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const [buttonCLicked, setButtonClicked] = useState(false)
    const [logoutClicked, setLogoutClicked] = useState(false)
    const [email, setEmail] = useState("")
    const onChange = (e) =>{
        setEmail(e.target.value)
    }
    console.log(email)
    useEffect(()=>{
        
        async function getMagicValues(){
            try {
                const isLoggedIn = await magic.user.isLoggedIn();
                setIsLoggedIn(isLoggedIn)
                console.log(1)
            } catch (error) {
                setIsLoggedIn(isLoggedIn)
            }
            
        }
        
        getMagicValues();

        if(buttonCLicked)
        {   console.log(2)
            const handleLogin = async () => {
                
                const redirectURI = `${window.location.origin}/claimnft/0x6C1a0D05529A66F0E740E545155F70D0b09F3A68`; // 👈 This will be our callback URI
                if (email) {
                  /* One-liner login 🤯 */
                  try {
                    
                    await magic.auth.loginWithMagicLink({ email, redirectURI }); // 👈 Notice the additional parameter!
                  } catch (error) {
                    setButtonClicked(false) //so that buttonClicked remains false until the right value is in the input -incorrect email 
                  } 
                  
                }
                else{setButtonClicked(false)} //so that buttonClicked remains false until the right value is in the input - empty value
                
              };
              handleLogin();
              console.log(3)
              
        }

        if(logoutClicked)
        {
            console.log(4)
            async function handlelogout(){
                await magic.user.logout();
            }
            handlelogout();
            console.log(5)
        }

       
    }, [isLoggedIn, buttonCLicked, logoutClicked])


    const clicked = () =>{
        setButtonClicked(!buttonCLicked)
    }
    
    const clicked2 = () =>{
        setLogoutClicked(!logoutClicked)
    }
    
    console.log(buttonCLicked)
    

    // /* 4. Implement Login Handler */
    // const handleLogin = async e => {
    //     e.preventDefault();
    //     const email = new FormData(e.target).get('email');
    //     const redirectURI = `${window.location.origin}/claimnft/0x6C1a0D05529A66F0E740E545155F70D0b09F3A68`; // 👈 This will be our callback URI
    //     if (email) {
    //       /* One-liner login 🤯 */
    //       await magic.auth.loginWithMagicLink({ email, redirectURI }); // 👈 Notice the additional parameter!
          
    //     }
        
    //   };


      /* 5. Implement Logout Handler */
      const handleLogout = async () => {
        await magic.user.logout();
        
      };
  return (
    <div>
        { isLoggedIn === null ? 
        
        <Container>
            <Spinner name='loading' style={{top:'0', left:'0'}}/>
        </Container> : 

        (
            isLoggedIn ? 
            (
                navigate('/claimnft/0x6C1a0D05529A66F0E740E545155F70D0b09F3A68')
               
            ) :

            (   
                <Container>
                    <Wrapper>
                        <Logo src={logo}/>
                        <Title>Signup/Login Here</Title>
                        <Label>Email</Label>
                        <Input type="email" name="email" required="required" placeholder="Enter your email" onChange={onChange}/>
                        <Button type="submit" onClick={clicked}>Sign Up</Button>
                        {/* <h1>Please sign up or login</h1>
                
                        <input type="email" name="email" required="required" placeholder="Enter your email" onChange={onChange}/>
                        <button type="submit" onClick={clicked}>Send</button> */}
                    </Wrapper>
                </Container>
                
            )
        )
        }
    </div>
  )
}

export default MagicAuth