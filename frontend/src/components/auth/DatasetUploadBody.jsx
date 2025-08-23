import {Box, Typography,Button,LinearProgress} from "@mui/material";
import styles from "../../styles/DatasetUploadBody.module.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState,useEffect ,useContext} from "react";
import upload_dataset from "../../services/uploadDatasetService";
import save_file_from_backend from "../../services/saveFileFromBackend"
import check_file_exists from "../../services/checkFileExistsService";
import { replace, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const DatasetUploadBody=()=>{

    const Navigate=useNavigate()
    const {user}=useContext(UserContext)

    const [file,setFile]=useState(null);
    const[uploading,setUploading]=useState(false);
    const [progress,setProgress]=useState(0);

    //Here i will declare the useStae for the localStorage itme as it will be use throught every function
    const [email,setEmail]=useState("")
    const [fullName,setFullName]=useState("")
    const [object_id,setObject_id]=useState("")
    const location=useLocation()
    
    useEffect(()=>{
        // console.log(user.email+" "+user.fullName+" "+user.object_id)
        setEmail(user.email|| "");
        setFullName(user.fullName||"")
        setObject_id(user.object_id||"")
    },[])

    const handleFileChange=async(e)=>{
        e.preventDefault();
        try{
            const selected_file=e.target.files[0];
            alert("This is the selected file:: "+selected_file)
            // alert("File Selected")
            setUploading(true);
            setFile(selected_file);
            setProgress("100");
            const formData=new FormData();
            formData.append("file",selected_file)
            // const object_id_1=localStorage.getItem("object_id")
            formData.append("object_id",object_id)
            const result=await upload_dataset(formData)
            alert("Got the result::"+result.message)
            }
            catch(err){
                alert("Got the error:: "+err)
            }
    };


    const saveFile=async(e)=>{
        e.preventDefault();
        // let email=localStorage.getItem("email")
        // // alert("This is the email got from the local storage:: "+email)
        // let fullName=localStorage.getItem("fullName")
        // let object_id=localStorage.getItem("object_id")
        // alert("This is the fullName got from the local storage:: "+fullName)
        const data_from_local_storage={
            "email":email,"fullName":fullName,"object_id":object_id
        }
        alert("This is the Data :: "+data_from_local_storage)
        try{
        const response =await save_file_from_backend(data_from_local_storage);
        if (response.message==="file saved successfully!"){
            alert("file has been saved successfully!")
        }
        else{
            alert("file has not been saved successfully!")
        }
        }catch(err){
            alert("Error in saving the file:: "+err)
        }
    }

    //Here i will write one api to hit the backend for checking whether any file exists in a databse or not
    const resultPage=async(e)=>{
        e.preventDefault();
        const data_from_local_storage={
            "email":email,"fullName":fullName,"object_id":object_id
        }
        try{
            const response =await check_file_exists(data_from_local_storage)
            if (response.message==="File Exist"){
                if(location.pathname!="/result")
               { Navigate("/result",{ replace: true })}
            }
            else{
                alert("No file has been uploaded yet!!")
            }
        }catch(err){
            alert("Error in check_file_exists")
        }
    }

    return(
        <Box className={styles.dataset_upload_body}>
            <Typography sx={{color:"whitesmoke",fontFamily:"Poppins",fontSize:"1.25rem",mt:"10px",ml:"15px",paddingTop:"10px;"}}>Upload Your Dataset</Typography>
            <Box className={styles.upload_files}>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
                <label htmlFor ="fileInput">
                    <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    sx={{mt:"2rem",ml:"220px",backgroundColor:"#466e8c"}}
                    >
                    Browse File
                    </Button>
                </label>
                <Typography sx={{color:"whitesmoke",ml:"180px",mt:"20px"}}>Drag and Drop your files here</Typography>
            </Box>
            <Typography sx={{color:"whitesmoke",fontFamily:"Poppins",fontSize:"1.25rem",mt:"10px",ml:"15px",paddingTop:"10px;"}}>Upload Progress</Typography>
            {uploading&&
            <Box className={styles.progress_1}>
                <Box className={styles.FileName}>
                    <Typography>{file ?file.name:"No file uploaded"}</Typography>
                </Box>
                {/* <Box className={styles.progress_bar}>
                    <LinearProgress variant="determinate" value={progress}/>
                </Box> */}
                <Box className={styles.percentage_box}>
                    <Typography >{progress}%</Typography>
                </Box>
            </Box>
            }
            {/* <Box className={styles.progress_1}>
            </Box> */}
            <Box className={styles.crud_buttons}>
                <Button sx={{mt:"2rem",backgroundColor:"#466e8c",color:"whitesmoke"}} onClick={resultPage}>VIEW </Button>
                {uploading&&
                <Box className={styles.delete_save_buttons}>
                    <Button sx={{mt:"2rem",backgroundColor:"#466e8c",color:"whitesmoke"}}>DELETE</Button>
                    <Button sx={{mt:"2rem",ml:1,backgroundColor:"#466e8c",color:"whitesmoke"}} onClick={saveFile}>SAVE</Button>
                </Box>
                }
            </Box>
        </Box>
    )
}
export default DatasetUploadBody;