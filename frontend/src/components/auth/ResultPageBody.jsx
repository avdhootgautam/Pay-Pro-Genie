import {Box, useColorScheme} from "@mui/material"
import styles from "../../styles/ResultPageBody.module.css"
import {useState,useEffect, useContext} from "react"
import fetch_details_of_file from "../../services/fetch_details_of_file_service"
import FileCard from "./FileCard"
import { UserContext } from "./UserContext"
const ResultPageBody=()=>{
    // const [fileName,setFilename]=useState("")
    // const [rowCount,setrowCount]=useState(0)
    // const [columnCount,setColumnCount]=useState(0)
    // const [fileSize,setFileSize]=useState("")
    // const [fileType,setFileType]=useState("")
    const [fileInfo,setFileInfo]=useState({})
    //below are the data for local storage
    const [email,setEmail]=useState("")
    const [object_id,setObject_id]=useState("")
    const [fullName,setFullName]=useState("")
    const {user}=useContext(UserContext)
    
    useEffect(()=>{
        const localemail=user.email||"";
        const localobejct_id=user.object_id||""
        const localfullName=user.fullName||"";

        setEmail(localemail);
        setObject_id(localobejct_id);
        setFullName(localfullName);

        const data_from_local_storage={
                "email":localemail,"fullName":localfullName,"object_id":localobejct_id
            }

        console.log("This is the data from the local storage:: "+data_from_local_storage["email"]+" "+data_from_local_storage["fullName"])
        //Here i will write one more api hitting at the backend and getting the information of the file
        const fetching_file_info=async(data_from_local_storage)=>{
            try{
                const response=await fetch_details_of_file(data_from_local_storage)
                //Here i will set the "data" dictionary because while ,mapping it will creating the dictionary corresponding to values
                setFileInfo(response?.data||{})
                console.log("This is the response cam from the databse:: "+ response['data'])
            }
            catch(err){
                alert("error in ResultPageBody:: "+err)
            }
        }

        fetching_file_info(data_from_local_storage)
    }
    ,[])


    return(
    <Box className={styles.BodyContainer}>
        <Box sx={{
            display:"flex",flexDirection:"row",flexWrap:"wrap",gap:2,paddingTop:4,paddingLeft:2
        }}
        >
            {/* We can use map if dealing with the multiple data of same type,example is below */}
            {Object.entries(fileInfo).map(([key,file])=>{
                // console.log("This is the file:: "+file.data)
                //Here key is not using as a prop,its for React internal use as helps in tracking which fierel changed,
                return <FileCard key={key} file={file}/>
            })}
        </Box>
    </Box>
    )
}
export default ResultPageBody;