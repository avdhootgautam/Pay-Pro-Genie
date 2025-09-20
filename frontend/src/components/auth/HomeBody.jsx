import { Typography,Box ,Button} from "@mui/material";
import styles from "../../styles/HomeBody.module.css";
import image_preprocessing_logo from "../../assets/image_preprocessing_logo.png"
import numerical_preprocessing_logo from "../../assets/numerical_preprocessing_logo.png";
import text_preprocessing_logo from "../../assets/text_preprocessing_logo.png";
import { useState } from "react";
import { Scale } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import userData from "../../services/userData";
import create_empty_preprocessing_arrays from "../../services/createEmptyPreprocessingArrays";
import generateUniqueID from "../../services/generateUniqueID";

const HomeBody=()=>{
    const [vpaButton,setVpaButton]=useState(true)
    const [preprocessingStep,setPreprocessingStep]=useState(0)
    const [object_id,setObject_id]=useState("")
    const [task_id,setTask_id]=useState("")
    const Navigate=useNavigate();
    
    useEffect(()=>{
        const fetch_data=async()=>{
        try{
        const result=await userData();
        console.log("In HomeBody ,User Details is:: ",result)
        setObject_id(result?.object_id)
        }catch(err){
            console.log("In HomeBody ,unable to fetch the user details:: ",err)
            throw err
        }
        }

        fetch_data()
        },[])
    
    //Here only i will call one function in useEffect for cinserting an arrays for Numerical,Image and Text
    useEffect(()=>{
        if(!object_id){
            return 
        }
        console.log("In HomeBody,This is the object id:: ",object_id)
        //Here only i will hit the api for inserting an arrays
        const json_data={
            "object_id":object_id
        }
        const creation_of_arrays=async(json_data)=>{
            try{
                const response=await create_empty_preprocessing_arrays(json_data)
                console.log(response?.message)
            }catch(err){
                console.log("In Homebody creation_of_arrays:: ",err)
            }
        }

        creation_of_arrays(json_data)
    },[object_id])

    const handleClickBox=(step)=>{
        setPreprocessingStep(step)
        setVpaButton(false)
        // console.log("This is the preprocessing step chosen:",preprocessingStep)
    }

    const handlePreprocessing=(preprocessingStep)=>{
        console.log("In a preprocessing for a naviagtion ",preprocessingStep)
        if (preprocessingStep===1){
            // <Navigate to="/image-preprocessing" replace/>
            Navigate(`/image-preprocessing`)
        }
        else if(preprocessingStep===2){
            // <Navigate to="/numerical-preprocessing" replace/>
            Navigate(`/numerical-preprocessing?task_id=${task_id}&preprocessing_step=${preprocessingStep}`)
        }
        else if (preprocessingStep===3){
            // <Navigate to="/text-preprocessing" replace/>
            Navigate(`/text-preprocessing`)
        }
    }
    //Here i will set the disability state for the three boxes
    const getBoxStyles=(step)=>{
        if (preprocessingStep===0){
            return {cursor:"pointer"}
        }
        
        if (preprocessingStep===step){
            //Selected one =>highlight
            console.log("This is the preprocessing step:: ",preprocessingStep)
            return {
            border: "1px solid #00ffcc",
            boxShadow: "0px 0px 12px rgba(0, 255, 200, 0.6)",
            cursor: "pointer",
        };
        }
        return {
        opacity: 0.4,
        pointerEvents: "none", // prevent clicking
        }; 
    }
    const generatetaskID=async()=>{
            try{
                const result= await generateUniqueID()
                setTask_id(result?.data)
                console.log("In HomeBody,this is the generated id with success message:: ",result)
            }
            catch (err){
                console.log("In HomeBody,failed to fetch the uniqued id generated at the backend:: ",err)
            }
    }
    return (
    <Box className={styles.HomeBodyContainer}>
        <Box className={styles.welcome_text}>
            <Typography sx={{color:"whitesmoke",fontFamily: "Open Sans",fontSize:"30"}}>Welcome to DataPreprocessingHub</Typography>
        </Box>
        <Box className={styles.slogan_text}>
            <Typography sx={{color:"whitesmoke",fontFamily: "Poppins",fontSize:15}}>Your ultimate destination for data preprocessing .Explore your range of features designed to enhance you data processing workflow.</Typography>
        </Box>
        <Box className={styles.various_preprocessing_step} >

            <Box className={styles.preprocessing} onClick={()=>{handleClickBox(1)}}sx={getBoxStyles(1)}>
                <img src={image_preprocessing_logo} alt="Image Preprocessing" style={{height:120,width:120}}></img>
                <Typography sx={{paddingTop:"5px",marginBottom:"5px"}}>Image Preprocessing</Typography>
                <span style={{color:"whitesmoke"}}>Process and analyze visual data with ease using our image dataset loads</span>
            </Box>

            <Box className={styles.preprocessing} onClick={()=>{
                handleClickBox(2);
                generatetaskID();
            }}sx={getBoxStyles(2)}>
                <img src={numerical_preprocessing_logo} alt="Numerical Preprocessing" style={{height:120,width:120}}></img>
                <Typography sx={{paddingTop:"5px",marginBottom:"5px"}}>Numerical Preprocessing</Typography>
                <span style={{color:"whitesmoke"}}>Process and analyze visual data with ease using our numerical dataset loads </span>
            </Box>

            <Box className={styles.preprocessing} onClick={()=>{handleClickBox(3)}}sx={getBoxStyles(3)}>
                <img src={text_preprocessing_logo} alt="Text Preprocessing" style={{height:120,width:120}}></img>
                <Typography sx={{paddingTop:"5px",marginBottom:"5px"}}>Text Preprocessing</Typography>
                <span style={{color:"whitesmoke"}}>Process and analyze visual data with ease using our text dataset loads </span>
            </Box>

        </Box>
        <Box className={styles.visualisation_analysis_preprocessing}>
            
            {vpaButton?
                <div>
                <Button sx={{marginRight:"3px", "&:disabled": {
                    backgroundColor:"#414141 !important",
                    boxShadow: "0px 0px 8px rgba(255, 255, 255, 0.15)", // glowing shadowish effect
                    }}} disabled >Data Visualisation</Button>
                <Button disabled sx={{"&:disabled": {
                    backgroundColor:"#414141 !important",
                    boxShadow: "0px 0px 8px rgba(255, 255, 255, 0.15)", // glowing shadowish effect
                    }}}>Data Preprocessing</Button>
                <Button sx={{marginLeft:"3px","&:disabled": {
                    backgroundColor:"#414141 !important",
                    boxShadow: "0px 0px 8px rgba(255, 255, 255, 0.15)", // glowing shadowish effect
                    }}} disabled>Data Analysis</Button>
                </div>:
                <div>
                <Button sx={{marginRight:"3px","&:hover":{
                    transform:"scale(1.06)",transition:"0.5s ease-in-out"
                }}}  >Data Visualisation</Button>
                <Button sx={{"&:hover":{
                    transform:"scale(1.06)",transition:"0.5s ease-in-out"
                }}} onClick={()=>{handlePreprocessing(preprocessingStep)}}>Data Preprocessing</Button>
                <Button sx={{marginLeft:"3px","&:hover":{
                    transform:"scale(1.06)",transition:"0.3s ease-in-out"
                }}}>Data Analysis</Button>
                </div>
            }
        </Box>
    </Box>
    )
}
export default HomeBody;