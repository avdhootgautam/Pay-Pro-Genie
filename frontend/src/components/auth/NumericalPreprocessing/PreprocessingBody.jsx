import { Box , Typography} from "@mui/material"
import PreprocessingSideBar from "./PreprocessingSideBar"
import styles from "../../../styles/NumericalPreprocessing/PreprocessingBody.module.css"
import { useState, useEffect} from "react"
import { useSearchParams } from "react-router-dom";


const PreprocessingBody=()=>{
    const [open,setOpen]=useState(false)
    const [task_id,setTask_id]=useState("")
    const [preprocessingStep,setPreprocessingStep]=useState("")
    const [search_params]=useSearchParams()
    
    useEffect(()=>{
            const handleUseEffect=()=>{
                // if(!task_id || !preprocessingStep){
                //     return 
                // }
                const taskIdFromParams=search_params.get("task_id")
                const preprocessingStepFromParams=search_params.get("preprocessing_step")
                console.log("This is the preprocessing step::",preprocessingStepFromParams)
                if (taskIdFromParams){setTask_id(taskIdFromParams)}
                if (preprocessingStepFromParams){setPreprocessingStep(preprocessingStepFromParams)}
            }
            handleUseEffect()
        },[search_params])

    return (
        <Box className={styles.PreprocessingBody}>
            <PreprocessingSideBar open={open} setOpen={setOpen}/>
            <Box sx={{display:"flex",flexDirection:"column"}}>
                <Box sx={{marginLeft:"12px", color:"whitesmoke" ,height:"20px",paddingTop:"0.75rem",color:"whitesmoke",}}>
                {preprocessingStep==="1"&&<Typography sx={{fontSize:"5rem",fontFamily: "Poppins, sans-serif"}}>Image Preprocessing</Typography>}
                {preprocessingStep==="2"&&<Typography sx={{fontSize:"1.5rem",fontFamily: "Poppins, sans-serif"}}>Numerical Preprocessing</Typography>}
                {preprocessingStep==="3"&&<Typography>Text Preprocessing</Typography>}
                </Box>

                <Box>
                    <h1>Table</h1>
                </Box>
            </Box>
        </Box>

    )
}
export default PreprocessingBody;