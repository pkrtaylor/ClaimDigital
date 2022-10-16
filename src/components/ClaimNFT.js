import React, {useEffect, useState} from 'react'

import { 
    useClaimedNFTs,
    useUnclaimedNFTs,
    useNFTCollection,
    useClaimedNFTSupply, 
    useContractMetadata, 
    useNFTDrop, 
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
import {useParams, useNavigate} from "react-router-dom" 
import Spinner from './Spinner'
import LogoutB from './LogoutB';
import { Magic } from 'magic-sdk'


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

















  const magic = new Magic('pk_live_7B9EF38C534AB44E');

  const ClaimNFT = () => {
  const navigate = useNavigate();   
  //magic section 
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [logoutClicked, setLogoutClicked] = useState(false) 
  useEffect(()=>{
    async function getMagicValues(){
        try {
            const isLoggedIn = await magic.user.isLoggedIn();
            setIsLoggedIn(isLoggedIn)
            console.log(1)
        } catch (error) {
            setIsLoggedIn(isLoggedIn)
        }

        if(isLoggedIn === false)
        {
            navigate('/');
        }
        
    }
    
    getMagicValues();

    if(logoutClicked)
    {
        console.log(4)
        async function handlelogout(){
            await magic.user.logout();
            navigate('/');
        }
        handlelogout();
        console.log(5)

    }
  },[isLoggedIn, logoutClicked])

  const logoutClick = () =>{
    setLogoutClicked(!logoutClicked)
  }

  
  if(isLoggedIn)
  {
    console.log("Logged in")
  }
  else{
    console.log("not logged in")
  }

  console.log(logoutClicked)


  const { id } = useParams();
  const contractAddress = id.toString();
  const address = useAddress();
  const disconnectMetamask = useDisconnect();
  const connectMetamask = useMetamask();
  const contract = useNFTDrop(contractAddress) // this is the contract instance of our drop collection 
  //one thing we also need is the meta data  of thecontract
  const {data: contractMetadata}= useContractMetadata(contractAddress)
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
  

//   const nftCollection = useNFTCollection(contractAddress)
//   const getNFTs = async () => {
//     const nfts = await nftCollection.getAll()
//     console.log(nfts)    
// }

  if(!contract || !contractMetadata || !claimedNFTs)
  {
    return(
    <Container>
        <Spinner style={{top:'0', left:'0'}} name="Loading"/>
    </Container>
    )
  }

  return (

    <Container>
    <LogoutB onClick={logoutClick} />
    <Wrapper>
    <Logo src={logo} />
    <Top>
            <Image src={gif}/>   
            <ItemName>Item Name</ItemName>
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
                <Button>
                    Claim Asset    
                </Button>
                </>

            }

           
        
        </Bottom>
    </Wrapper>
</Container>



    // <div className="">
    //   <div className="">
    //     <div className="">
    //       <h1 className="">
    //         {contractMetadata?.name}
    //       </h1>
    //       <p className="">
    //         {contractMetadata?.description}
    //       </p>
    //     </div>

    //     <div className="">
    //       <div className="">
    //         <div className="">
    //           <img className="" src={contractMetadata?.image} />
    //         </div>

    //         <div className="">
    //           <p>Total Minted</p>
    //           <p>
    //             {claimedNFTSupply?.toNumber()} / {" "}
    //             {(claimedNFTSupply?.toNumber() || 0) + 
    //             (unclaimedNFTSupply?.toNumber() || 0)} 
    //             </p>
    //         </div>

    //         <div className="">
            //   { address? <button 
            //   className=""
            //   onClick={disconnectMetamask}>
            //     Disconnect Wallet
            //   </button> 
            //   :
            //   <button 
            //   className=""
            //   onClick={connectMetamask}>
            //     Connect Wallet
            //   </button>
                
            //   }
    //         </div>

    //         <div className="">
            //   { address && <button 
            //   className=""
            //   onClick={claim}>
            //     Mint
            //   </button> 
                
            //   }
    //         </div>
            
    //       </div>
    //     </div>
    //   </div>
      
    // </div>
  );
   
}

export default ClaimNFT