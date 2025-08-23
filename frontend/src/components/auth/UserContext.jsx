import { createContext,useContext,useState } from "react";

//Create a Context
export const UserContext=createContext()

//Creatin a provider component
const UserProvider=({children})=>{
    const [user,setUser]=useState({
        email:"",
        fullName:"",
        object_id:"",
        isloggedIN:false
    })

    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;
