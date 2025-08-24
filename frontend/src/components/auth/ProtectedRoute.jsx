import { useContext } from "react"
import { UserContext } from "./UserContext"
// import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const ProtectedRoute=({children})=>{
    const {user}= useContext(UserContext)
    //I cannot use useNavigatic as it is used for the programmatic navigation such as inside event handlers, effects, etc
    // const Navigate=useNavigate()
    const isloggedIN=user.isloggedIN

    console.log("This is the value of the logged in:: ",isloggedIN)
    if(!isloggedIN){
        console.log("This is the value of the logged in:: ",isloggedIN)
        return <Navigate to="/login" replace/>
    }
    return children
}
export default ProtectedRoute;