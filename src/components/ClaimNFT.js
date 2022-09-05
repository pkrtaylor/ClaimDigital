import React from 'react'
import { 
    
    useNFTCollection,
    useClaimedNFTSupply, 
    useContractMetadata, 
    useNFTDrop, 
    useUnclaimedNFTSupply,
    useAddress, // use addresss allows us to see if th euser is connected to the application 
    useMetamask, // allows user to connect to metamask wallet
    useDisconnect
} from "@thirdweb-dev/react";
import styled from 'styled-components'
import gif from '../TribeHoodie.gif'


const Container =  styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
    background-color: black;
    justify-content: center;
    align-items: center;
    color: white;

`

const Wrapper = styled.div`

    height: 40rem;
    width: 70rem;
    background-color: #222;
    display: flex;
    

`

const Left = styled.div`

    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin: 0px 10rem;
`

const Title = styled.h1`
     margin-bottom: 3rem;
`
const Desc =  styled.p`

`

const Right = styled.div`

    flex: 1;
    display: flex;
    flex-direction:column;
    align-items: center ;
`

const RTop =  styled.div`
    flex: .75;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const Image = styled.img`
        height: 350px;
        width: 350px;

`

const RMiddle = styled.div`

        
        padding: 10px;
        display: flex;
        justify-content: space-between;
        
        
`
const P = styled.p`

    

`

const RBottom = styled.div`
        flex: .25;
        padding: 10px;
`
const Button = styled.button`

` 

const Gif =  styled.img`


`















const contractAddress = '0x6C1a0D05529A66F0E740E545155F70D0b09F3A68'

const ClaimNFT = () => {
  const address = useAddress();
  const disconnectMetamask = useDisconnect();
  const connectMetamask = useMetamask();
  const contract = useNFTDrop(contractAddress) // this is the contract instance of our drop collection 
  //one thing we also need is the meta data  of thecontract
  const {data: contractMetadata}= useContractMetadata(contractAddress)
  // this returns a data attribute 

  //react sdk from thrid web has a nice hook called useClaimedNFTSupply
  const {data: claimedNFTSupply} = useClaimedNFTSupply(contract)

  //unClaimedNFTSUpply count 
  const {data: unclaimedNFTSupply} = useUnclaimedNFTSupply(contract)

  const claim = async () => {

    try {
        await contract?.claim(1)
        alert("Minted Successfully")
    } catch (error) {
        alert(error)
    }
    
  }

//   const nftCollection = useNFTCollection(contractAddress)
//   const getNFTs = async () => {
//     const nfts = await nftCollection.getAll()
//     console.log(nfts)    
// }
  return (

        <Container>
            <Wrapper>
                <Left>
                    <Title>Wano</Title>
                    <Desc>Luffy and his crew has just landed on Onigashima and are ready to start the war with the beast pirates. All the strawhats are ready to go all out and risk their lives in this fight against Yonko Kaido. Theres no turning back!!!</Desc>
                </Left>
                <Right>
                    <RTop>
                        <Image src={gif}/>
                        <RMiddle>
                        <P>Total Minted</P>
                        <P>
                        {claimedNFTSupply?.toNumber()} / {" "}
                        {(claimedNFTSupply?.toNumber() || 0) + 
                        (unclaimedNFTSupply?.toNumber() || 0)}
                        </P>
                    </RMiddle>
                    </RTop>
                    
                    <RBottom>
                    { address? <Button 
                        className=""
                        onClick={disconnectMetamask}>
                            Disconnect Wallet
                        </Button> 
                        :
                        <Button 
                        className=""
                        onClick={connectMetamask}>
                            Connect Wallet
                        </Button>
                
                    }
                    { address && <Button 
                        className=""
                        onClick={claim}>
                            Mint
                        </Button> 
                
                    }
                    
                    </RBottom>
                </Right>
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