import React, {useEffect, useState}from 'react'
import styled from 'styled-components'
import gif from '../TribeHoodie.gif'
import logo from '../tribe_market_logo.png'
import { useParams } from 'react-router-dom'
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
    useDisconnect
} from "@thirdweb-dev/react";
import Spinner from './Spinner'

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

const Left =  styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const Right =  styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
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
        width: 327px;
        cursor: pointer;
        padding: 10px;
        margin-bottom: 20px;
        font-weight: bold;
        border-radius: 10px;
        background-color: #D9D9D9;

    @media screen and (max-width: 800px)
    {
        height: 55px;
        width: 300px ;
    }

`

const ItemName = styled.h1`
    
    margin: 20px;
    
`

const P = styled.p`

`


const NFCScan = () => {

    const { id } = useParams();
    const contractAddress = id.toString();
    const [visualDigitalAsset, setVisualDigitalAsset] = useState(false)

    const VDAClick = () =>{
        setVisualDigitalAsset(!visualDigitalAsset)
    }
    const contract = useNFTDrop(contractAddress) // this is the contract instance of our drop collection 
    const { data: claimedNFTs, isLoading, error } = useClaimedNFTs( contract, { start: 0, count: 100 });

    //react sdk from thrid web has a nice hook called useClaimedNFTSupply
    const {data: claimedNFTSupply} = useClaimedNFTSupply(contract)

    //unClaimedNFTSUpply count 
    const {data: unclaimedNFTSupply} = useUnclaimedNFTSupply(contract)

    //connect to meta mask 

    
    const connectMetamask = useMetamask();
    const disconnectMetamask = useDisconnect();

    const [userOwnsAsset, setUserOwnsAsset] = useState(null)
    const [isloading, setIsLoading] = useState(false)
    const address = useAddress();
    
    const itemOwned = () =>{
        
        setUserOwnsAsset(false)
        setIsLoading(true)

        let ownerA = address
        for(var i = 0; i < claimedNFTs.length; i++)
        {   
            let record = claimedNFTs[i]
            if(record.owner === ownerA)
            {
                setUserOwnsAsset(true)
                console.log(record.owner)
                break;

            } 
        }
        setIsLoading(false)

    }

 

    // useEffect(() => {

    //     var ownerA = address
        
    //     for(var i = 0; i < claimedNFTs?.length; i++)
    //     {   
    //         let record = claimedNFTs[i]
    //         if(record.owner === ownerA)
    //         {
    //             setUserOwnsAsset(true)
    //         }
    //     }

        
    //     console.log(userOwnsAsset)
    // }, [address,userOwnsAsset, claimedNFTs])

    
  return (
    <Container>
        
        <Wrapper>
        <Logo src={logo} />
            { isloading ? (<Spinner/>) :(visualDigitalAsset ? 
            (

                <>
                <Left>
                <Image src={gif}/>   
                <ItemName>Item Name</ItemName>
                <P>
                    {claimedNFTSupply?.toNumber()} / {" "}
                    {(claimedNFTSupply?.toNumber() || 0) + 
                    (unclaimedNFTSupply?.toNumber() || 0)}{" "}
                    Claimed
                </P>
            </Left>
            
            <Right>
                {   userOwnsAsset === null ? 
                (<Button 
                    className=""
                    onClick={()=>{connectMetamask(); itemOwned();}}>
                    Connect Wallet
                </Button> ) :

                (
                    userOwnsAsset ? <div>owns</div> : <div>no</div>
                )
                    
                }
            </Right>
                </>
    
            ) :

            (
                <>
                <Left>
                <Image src={gif}/>   
                <ItemName>Item Name</ItemName>
            </Left>
            
            <Right>
                <Button onClick={VDAClick}> View Digital Asset</Button>
                <Button>Trading Card AR</Button>
                <Button>Visual Try On</Button>
            </Right>
                </>
            ))
            }
        </Wrapper>
    </Container>
  )
}

export default NFCScan