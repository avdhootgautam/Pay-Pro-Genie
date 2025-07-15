import {Box, Typography,Button,LinearProgress} from "@mui/material";
import styles from "../../styles/DatasetUploadBody.module.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState,useEffect } from "react";
const DatasetUploadBody=()=>{
    const [file,setFile]=useState(null);
    const[uploading,setUploading]=useState(false);
    const [progress,setProgress]=useState(0);
    const handleFileChange=(e)=>{
        setFile(e.target.files[0]);
    }
    const handleUpload=()=>{
        setUploading(true);
        let value=0;
        const interval=setInterval(
            ()=>{
                value+=10;
                setProgress(value);
                if (value>=100){
                    clearInterval(interval);
                    setUploading(false);
                }
            }
        ,1000);
    };
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
                <label for ="fileInput">
                    <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    sx={{mt:"2rem",ml:"220px",backgroundColor:"#466e8c"}}
                    onClick={handleUpload}
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
                <Box className={styles.progress_bar}>
                    <LinearProgress variant="determinate" value={progress}/>
                </Box>
                <Box className={styles.percentage_box}>
                    <Typography >{progress}%</Typography>
                </Box>
            </Box>
            }
            <Box className={styles.progress_1}>
                
            </Box>
        </Box>
    )
}
export default DatasetUploadBody;