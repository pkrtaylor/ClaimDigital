import { createContext, useState } from "react";

const MagicUserContext = createContext();

export function MagicUserProvider({children}){
   
   
   const [userData, setUserData] = useState("")
   const [tableData, setTableData] = useState([])
   const getData = (data) => {

        setUserData(data)
   }
   
   const getTableData = (data) =>{
    setTableData( )
   }
    return(
        <MagicUserContext.Provider
        value={{userData, getData, tableData, getTableData}}
        >
        {children}
        </MagicUserContext.Provider>
    )
}


export default MagicUserContext