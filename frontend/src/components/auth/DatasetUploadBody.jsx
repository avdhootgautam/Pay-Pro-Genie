import {Box, Typography,Button,LinearProgress} from "@mui/material";
import styles from "../../styles/DatasetUploadBody.module.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState,useEffect } from "react";
import upload_dataset from "../../services/uploadDatasetService";
import save_file_from_backend from "../../services/saveFileFromBackend"
const DatasetUploadBody=()=>{
    const [file,setFile]=useState(null);
    const[uploading,setUploading]=useState(false);
    const [progress,setProgress]=useState(0);
    // user_email=localStorage.getItem("email")

    // const handleFileChange=(e)=>{
    //     setFile(e.target.files[0]);
    // }
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
            const result=await upload_dataset(formData)
            alert("Got the result::"+result.message)

            }
            catch(err){
                alert("Got the error:: "+err)
            }
    };
    const saveFile=async(e)=>{
        e.preventDefault();
        let email=localStorage.getItem("email")
        // alert("This is the email got from the local storage:: "+email)
        let fullName=localStorage.getItem("fullName")
        // alert("This is the fullName got from the local storage:: "+fullName)
        const data_from_local_storage={
            "email":email,"fullName":fullName
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
                <Button sx={{mt:"2rem",backgroundColor:"#466e8c",color:"whitesmoke"}}>VIEW </Button>
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