import {Box, useColorScheme} from "@mui/material"
import styles from "../../styles/ResultPageBody.module.css"
import {useState,useEffect, useContext} from "react"
import fetch_details_of_file from "../../services/fetch_details_of_file_service"
import FileCard from "./FileCard"
import userData from "../../services/userData"
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
    // const {user}=useContext(UserContext)
    
    useEffect(()=>{

        const fetchUser=async()=>{
            const data =await userData() 
            console.log("In DatasetUploadBody,this is the data :: ",data)
            // const localemail=data?.email||"";
            // const localobejct_id=data?.object_id||""
            // const localfullName=data?.fullName||"";

            setEmail(data?.email);
            setObject_id(data?.object_id);
            console.log("This is the object id :: ",data?.object_id)
            setFullName(data?.fullName);

            }

        fetchUser()
    }
    ,[])

    useEffect(()=>{
        if (!email ||!fullName ||!object_id){
            return 
        }//Wait until the value are set
        const data_from_local_storage={
                "email":email,"fullName":fullName,"object_id":object_id
            }
        const fetch_details=async(data_from_local_storage)=>{
            
            try{
                console.log("IN A fetch_details,this is the data_from_local_storage:: ",data_from_local_storage)
            const response=await fetch_details_of_file(data_from_local_storage)
                //Here i will set the "data" dictionary because while ,mapping it will creating the dictionary corresponding to values
                setFileInfo(response?.data||{})
                console.log("This is the response cam from the databasse:: "+ response['data'])
            }
            catch(err){
                alert("error in ResultPageBody:: "+err)
            }
        }
        fetch_details(data_from_local_storage)
    },[email,fullName,object_id])

    return(
    <Box className={styles.BodyContainer}>
        <Box sx={{
            display:"flex",flexDirection:"row",flexWrap:"wrap",gap:2,paddingTop:4,paddingLeft:2
        }}
        >
            {/* We can use map if dealing with the multiple data of same type,example is below */}
            {Object.entries(fileInfo).map(([key,file])=>{
                // console.log("This is the file:: "+file.data)
                //Here key is not using as a prop,its for React internal use as helps in tracking which file changed,
                return <FileCard key={key} file={file}/>
            })}
        </Box>
    </Box>
    )
}
export default ResultPageBody;