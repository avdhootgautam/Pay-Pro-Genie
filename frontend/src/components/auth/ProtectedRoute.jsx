import { useContext } from "react"
import { UserContext } from "./UserContext"
import { useNavigate } from "react-router-dom";

const ProtectedRoute=({children})=>{
    const {user}= useContext(UserContext)
    const Navigate=useNavigate()
    const isloggedIN=user.isloggedIN

    console.log("This is the value of the logged in:: ",isloggedIN)
    if(!isloggedIN){
        console.log("This is the value of the logged in:: ",isloggedIN)
        Navigate("/login",{replace:true})
    }
    return children
}
export default ProtectedRoute;