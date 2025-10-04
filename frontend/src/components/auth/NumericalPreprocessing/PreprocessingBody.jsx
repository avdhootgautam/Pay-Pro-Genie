import { Box , Typography,Button} from "@mui/material"
import PreprocessingSideBar from "./PreprocessingSideBar"
import styles from "../../../styles/NumericalPreprocessing/PreprocessingBody.module.css"
import { useState, useEffect} from "react"
import { useSearchParams } from "react-router-dom";
import PreprocessingTable from "./PreprocessingTable";
// import SimpleListMenu from "./PreprocessingDropdown";
import LongMenu from "./PreprocessingDropdown";
import userData from "../../../services/userData";
import fetchListOfFilenames from "../../../services/fetchListOfFilenames";
import fetch_sample_data_for_table from "../../../services/fetching_sample_data_for_table";
import MissingValues from "./MissingValues";
const PreprocessingBody=()=>{
    const [open,setOpen]=useState(false)
    const [task_id,setTask_id]=useState("")
    const [preprocessingStep,setPreprocessingStep]=useState("")
    const [search_params]=useSearchParams()
    const [anchorEl, setAnchorEl] = useState(null);
    // const open_dropdown_menu = Boolean(anchorEl);
    const [open_table ,setOpenTable]=useState(false)
    const [filename,setFileName]=useState("")
    const [object_id,setObjectId]=useState("")
    const [email,setEmail]=useState("")
    const [fullName,setFullName]=useState("")
    const [filenames,setFileNames]=useState([])
    const [rows,setRows]=useState([])
    const [columns,setColumns]=useState([])
    const [numericalPreproStep,setNumericalPreproStep]=useState(null)
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
            const handleUserData=async()=>{
               
                try{
                    const user_credentials=await userData()
                    console.log("In a Preprocessing Body this is the user credentials:: ",user_credentials)
                    setObjectId(user_credentials["object_id"])
                    setFullName(user_credentials["fullName"])
                    setEmail(user_credentials["email"])
                }catch(err){
                    console.log("Error in preprocessing Body and the error is:: ",err)
                    throw err;
                }
            }
         const payload_for_filenames={
                "object_id":object_id,
                "email":email
                }
        const list_of_filenames=async(payload_for_filenames)=>{
            try{
                const response=await fetchListOfFilenames(payload_for_filenames)
                console.log("IN a Preprocessing Dropdown ::",response )
                setFileNames(response["list_of_filenames"])
                // options=response

            }catch(err){
            console.log("Error in a Preprocessing Dropdown :: ",err)
          }
      }
            handleUseEffect()
            handleUserData()
            list_of_filenames(payload_for_filenames)
        },[search_params,object_id])

    //Api for hitting the backedn with payload=>filename,object_id and email.
    // if(filename!==""){
    //     console.log("Again")
    //     const payload_for_sample_table_data={
    //         "object_id":object_id,
    //         "email":email,
    //         "filename":filename
    //     }
    //     const fetching_sample_data=async(payload_for_sample_table_data)=>{
    //         try{
    //             const response=await fetch_sample_data_for_table(payload_for_sample_table_data)
    //             console.log("This is the response :: ",response)
    //             setRows(response["rows"])
    //             setColumns(response["columns"])
    //         }catch(err){
    //             console.log("In Preprocessing Body,in fetching_sample_data,error is ::",err)
    //             throw err;
    //         }
            
    //     }
    //     fetching_sample_data(payload_for_sample_table_data)
    // }
    useEffect(
        ()=>{
            if(filename!==""){
                console.log("Again")
                const payload_for_sample_table_data={
                    "object_id":object_id,
                    "email":email,
                    "filename":filename
                }
                const fetching_sample_data=async(payload_for_sample_table_data)=>{
                    try{
                        const response=await fetch_sample_data_for_table(payload_for_sample_table_data)
                        console.log("This is the response :: ",response)
                        setRows(response["rows"])
                        setColumns(response["columns"])
                    }catch(err){
                        console.log("In Preprocessing Body,in fetching_sample_data,error is ::",err)
                        throw err;
                    }
                    
                }
                fetching_sample_data(payload_for_sample_table_data)
            }
        },[filename])
    

    return (
        <Box className={styles.PreprocessingBody}>
            <PreprocessingSideBar open={open} setOpen={setOpen} setNumericalPreproStep={setNumericalPreproStep}/>
            <Box className={styles.ViewingAndPreprocessing}>
                
                <Box sx={{marginLeft:"12px", color:"whitesmoke" ,height:"20px",paddingTop:"0.75rem",color:"whitesmoke",display:"flex",flexDirection:"row"}}>
                {preprocessingStep==="1"&&<Typography sx={{fontSize:"5rem",fontFamily: "Poppins, sans-serif"}}>Image Preprocessing</Typography>}
                {preprocessingStep==="2"&&<Typography sx={{fontSize:"1.5rem",fontFamily: "Poppins, sans-serif"}}>Numerical Preprocessing</Typography>}
                {preprocessingStep==="3"&&<Typography>Text Preprocessing</Typography>}
                <Box ><LongMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} open_table ={open_table } setOpenTable={setOpenTable} setFileName={setFileName} filenames={filenames} /></Box>
                </Box>
                {open_table && 
                <Box >
                    <PreprocessingTable rows={rows} columns={columns}/>
                    <Button  variant="contained" color="primary"
                         sx={{
                            borderRadius: "8px",
                            marginTop:"0.3rem",
                            marginLeft:"0.5rem",
                            transition: "all 0.3s ease", // smooth hover effect
                            backgroundColor: "#1976d2",  // default color
                            "&:hover": {
                            backgroundColor: "#385b83ff", // darker shade on hover
                            transform: "scale(1.05)",  // slight zoom
                            boxShadow: "0px 4px 20px rgba(0,0,0,0.3)", // subtle shadow
                            },
                            "&:active": {
                                    transform: "scale(0.95)", // small shrink on click
                                    },
                        }}
                        >Previous
                    </Button>
                </Box>
                }
                {open_table && numericalPreproStep&&
                    <Box sx={{border:"0.25px outset whitesmoke",height:"210px",width:"80%",marginLeft:'5px',borderRadius:'4px'}}>
                        {/* <Box sx={{color:"whitesmoke"}}>{numericalPreproStep}</Box> */}
                        {/* {numericalPreproStep=="Encoding"&&<Box sx={{color:"whitesmoke"}}>{numericalPreproStep}</Box>}
                        {numericalPreproStep=="Scaling and Outliers"&&<Box sx={{color:"whitesmoke"}}>{numericalPreproStep}</Box>} */}
                        {numericalPreproStep=="Missing Values"&&<MissingValues numericalPreproStep={numericalPreproStep}/>}
                    </Box>
                }  
            </Box>
        </Box>

    )
}
export default PreprocessingBody;