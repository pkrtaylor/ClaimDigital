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
    <div className="">
      <div className="">
        <div className="">
          <h1 className="">
            {contractMetadata?.name}
          </h1>
          <p className="">
            {contractMetadata?.description}
          </p>
        </div>

        <div className="">
          <div className="">
            <div className="">
              <img className="" src={contractMetadata?.image} />
            </div>

            <div className="">
              <p>Total Minted</p>
              <p>
                {claimedNFTSupply?.toNumber()} / {" "}
                {(claimedNFTSupply?.toNumber() || 0) + 
                (unclaimedNFTSupply?.toNumber() || 0)} 
                </p>
            </div>

            <div className="">
              { address? <button 
              className=""
              onClick={disconnectMetamask}>
                Disconnect Wallet
              </button> 
              :
              <button 
              className=""
              onClick={connectMetamask}>
                Connect Wallet
              </button>
                
              }
            </div>

            <div className="">
              { address && <button 
              className=""
              onClick={claim}>
                Mint
              </button> 
                
              }
            </div>
            
          </div>
        </div>
      </div>
      
    </div>
  );
   
}

export default ClaimNFT