import React, {useEffect, useState} from 'react'

import { 
    useClaimedNFTs,
    useUnclaimedNFTs,
    useClaimedNFTSupply, 
    useContract, 
    useUnclaimedNFTSupply,
    useAddress, // use addresss allows us to see if th euser is connected to the application 
    useMetamask, // allows user to connect to metamask wallet
    useDisconnect,
    useNetworkMismatch,
    useNetwork,
    ChainId
} from "@thirdweb-dev/react";
import logo from '../tribe_market_logo.png'
import styled, { useTheme } from 'styled-components'
import gif from '../TribeHoodie.gif'
import {useParams, useNavigate,} from "react-router-dom" 
import Spinner from './Spinner'
import LogoutB from './LogoutB';
import { Magic } from 'magic-sdk'
import Helmet from 'react-helmet';
import MagicUserContext from '../MagicUserContext';
import { useContext } from 'react';
import { merchandise } from '../merchData';
import ifUserOwnsItem from './utils/ifUserOwnsItem';
import axios from 'axios'

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

const Wrapper = styled.div`
    height: 40rem;
    width: 70rem;
    position: relative;
    
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 800px){
        
        width: 350px;
        flex-direction: column;
        
    }

    
    
`

const Top =  styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const Bottom =  styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Logo = styled.img`
    position: absolute;
    width: 116px;
    height: 77px;
    left: 22.3rem;
    top: -80px; 
    

    @media screen and (max-width: 800px)
    {
        width: 86px;
        height: 47px;
        left: 22px;
        top: -52px;
        
    }


`

const Image = styled.img`

    height: 400px;
    width: 400x;
    

    @media screen and (max-width: 800px)
    {
        height: 300px;
        width: 300px;
    }
`

const Button = styled.button`
        height: 66px;
        width: 200px;
        cursor: pointer;
        padding: 10px;
        margin-bottom: 20px;
        font-weight: bold;
        border-radius: 10px;
        background-color: #D9D9D9;

    @media screen and (max-width: 800px)
    {
        height: 55px;
        width: 150px ;
    }

`

const ItemName = styled.h1`
    
    margin: 20px;
    
`

const P = styled.p`

    margin: 20px;
`


const LP = styled.button`

    align-self: flex-end;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    padding: 10px;
  
`














  const magic = new Magic('pk_live_B8ED3820154A68B1');
  
 
  const ClaimNFT = (props) => {
   
    const {tableData} = useContext(MagicUserContext)
    console.log(tableData)
    if(props.userEmail)
    {
      console.log(props.userEmail)
    }





   
  
  //magic section 
  
  const [logoutClicked, setLogoutClicked] = useState(false) 
  const { id } = useParams();



  const logoutClick = () =>{
    setLogoutClicked(!logoutClicked)
  }

  
  

  
  props.isLoggedIn === null ? console.log('') : 

  (props.isLoggedIn ? console.log('logged in') : console.log('not logged in'))
  


  
  console.log(id)
  const product = merchandise.filter((product) =>{
    return product.productId === id.toString()
  })
  const Navigate = useNavigate();
  const contractAddress = product[0]?.contractAddress
  //new development once we get the params we import merchnadise and use id to get contractAddress
  const address = useAddress();
  //const disconnectMetamask = useDisconnect();
  const connectMetamask = useMetamask();
  const {contract} = useContract(contractAddress) // this is the contract instance of our drop collection 
  //one thing we also need is the meta data  of thecontract
  
  const [metaData, setMetadata] = useState(false)
  
  useEffect(()=>{
    if(contract)
    {
        contract.metadata.get().then(metadata => setMetadata(metadata) )
    }
  }, [contract])
 
  
  
  
  const { data: unclaimedNfts} = useUnclaimedNFTs(contract, { start: 0, count: 100 });
  const { data: claimedNFTs, isLoading, error } = useClaimedNFTs( contract, { start: 0, count: 100 });
  // this returns a data attribute 

  //react sdk from thrid web has a nice hook called useClaimedNFTSupply
  const {data: claimedNFTSupply} = useClaimedNFTSupply(contract)

  //unClaimedNFTSUpply count 
  const {data: unclaimedNFTSupply} = useUnclaimedNFTSupply(contract)

  //third web hook that checks if user is connected to the wrong network
  const isWrongNetwork = useNetworkMismatch();
  //the useNetwork() has a feature called switchNetwork
  //switchNetwork is a function that allows you change to the selectd network
  const {switchNetwork} = useNetwork();
  const [claiming, setClaiming] = useState(false)
  const [assetClaimed, setAssetClaimed] = useState(null)
  const [auth, setAuth] = useState(null)

  useEffect(() =>{
    async function userItemCheck(){
        //api call to get records
    
        try {
            
            const {data: records} = await axios.get('https://api.airtable.com/v0/app1VZ3hNzOYLqm50/tblAQaotTZgFVAzeJ?api_key=keyeX0XHalTHr09Dc')
            var Records = records
            
            console.log(1)
            
            
        } catch (error) {
            console.log(error)
        }
        
        const userOwnsItem = ifUserOwnsItem(id, Records);
        setAuth(userOwnsItem)
    }

    userItemCheck();
    
  }, [id] )

  console.log(auth)











  // claim function
  const claim = async () => {

    //checking if user has connected
    
    if(!address)
    {
        connectMetamask();
        return;
    }

    // checking if user is on the right network

    if(isWrongNetwork)
    {   //switchNetwork could be undefined so we check before we run the fucntion
       switchNetwork && switchNetwork(ChainId.Mumbai())
       return;
    }

    setClaiming(true)
    

    try {
        await contract?.claim(1)
        setClaiming(false)
        setAssetClaimed(true)
    } catch (error) {
        console.log(error)
        setClaiming(false)
        setAssetClaimed(false)
    }
    
  }
  

  const backClick =()=>{

    Navigate('/selection')
  }

//   const nftCollection = useNFTCollection(contractAddress)
//   const getNFTs = async () => {
//     const nfts = await nftCollection.getAll()
//     console.log(nfts)    
// }

  if(!contract || !metaData || !claimedNFTs || auth === null)
  {
    return(
    <Container>
        <Spinner style={{top:'0', left:'0'}} name="Loading"/>
    </Container>
    )
  }
  

  return (

    <div>
        {
            

           ( logoutClicked ? (
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
                <LogoutB onClick={logoutClick} />
                <Wrapper>
                <Logo src={logo} />
                <Top>
                        <Image src={metaData.image}/>   
                        <ItemName>{metaData.name}</ItemName>
                        <P>
                            {claimedNFTSupply?.toNumber()} / {" "}
                            {(claimedNFTSupply?.toNumber() || 0) + 
                            (unclaimedNFTSupply?.toNumber() || 0)}{" "}
                            Claimed
                        </P>
                        {
                            assetClaimed === null ? <></> : 
                            (assetClaimed ? 
                                (<P style={{color:"green"}}>You have successfully claimed this digital asset</P>) 
                                :
                                (<P style={{color: "red"}}>Error! Try again.</P>)
                            
                            )
                        }
                    </Top>
                    
                    <Bottom>
                        { address && 
                        
                        (claiming ? <Spinner name="Claiming"/> :
                        
                        (
                            assetClaimed === null ? 
                            (
                                <Button onClick={claim} disabled={claiming}>
                                    Claim Asset    
                                </Button>
                            ) :
            
                            (assetClaimed ? 
                                
                            (
                                <Button>View Now</Button>
                            ) :
            
                            (
                                <Button>Claim Now</Button>
                            )
                            )
                        )
                            
                        )
            
                        }
            
                        {!address && 
            
                            <>
                            <Button 
                                className=""
                                onClick={connectMetamask}>
                                Connect Wallet
                            </Button>
                            </>
            
                        }
            
                       
                    
                    </Bottom>
                    <LP onClick={()=>{backClick();}}>Selection page</LP>
                </Wrapper>
            </Container>
            ) 
           )
        
        }
    </div>
    
   




  );
   
}

export default ClaimNFT




{/* <div>
        {
            auth ? 

           ( logoutClicked ? (
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
                <LogoutB onClick={logoutClick} />
                <Wrapper>
                <Logo src={logo} />
                <Top>
                        <Image src={metaData.image}/>   
                        <ItemName>{metaData.name}</ItemName>
                        <P>
                            {claimedNFTSupply?.toNumber()} / {" "}
                            {(claimedNFTSupply?.toNumber() || 0) + 
                            (unclaimedNFTSupply?.toNumber() || 0)}{" "}
                            Claimed
                        </P>
                        {
                            assetClaimed === null ? <></> : 
                            (assetClaimed ? 
                                (<P style={{color:"green"}}>You have successfully claimed this digital asset</P>) 
                                :
                                (<P style={{color: "red"}}>Error! Try again.</P>)
                            
                            )
                        }
                    </Top>
                    
                    <Bottom>
                        { address && 
                        
                        (claiming ? <Spinner name="Claiming"/> :
                        
                        (
                            assetClaimed === null ? 
                            (
                                <Button onClick={claim} disabled={claiming}>
                                    Claim Asset    
                                </Button>
                            ) :
            
                            (assetClaimed ? 
                                
                            (
                                <Button>View Now</Button>
                            ) :
            
                            (
                                <Button>Claim Now</Button>
                            )
                            )
                        )
                            
                        )
            
                        }
            
                        {!address && 
            
                            <>
                            <Button 
                                className=""
                                onClick={connectMetamask}>
                                Connect Wallet
                            </Button>
                            </>
            
                        }
            
                       
                    
                    </Bottom>
                    <LP onClick={()=>{backClick();}}>Selection page</LP>
                </Wrapper>
            </Container>
            ) 
           )
            :

            (
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
        }
    </div> */}