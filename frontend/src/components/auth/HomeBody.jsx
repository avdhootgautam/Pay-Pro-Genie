import { Typography,Box ,Button} from "@mui/material";
import styles from "../../styles/HomeBody.module.css";
import image_preprocessing_logo from "../../assets/image_preprocessing_logo.png"
import numerical_preprocessing_logo from "../../assets/numerical_preprocessing_logo.png";
import text_preprocessing_logo from "../../assets/text_preprocessing_logo.png";
import { useState } from "react";
import { Scale } from "@mui/icons-material";

const HomeBody=()=>{
    const [vpaButton,setVpaButton]=useState(true)
    const [preprocessingStep,setPreprocessingStep]=useState(0)

    const handleClickBox=(step)=>{
        setPreprocessingStep(step)
        setVpaButton(false)
        // console.log("This is the preprocessing step chosen:",preprocessingStep)
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

            <Box className={styles.preprocessing} onClick={()=>{handleClickBox(2)}}sx={getBoxStyles(2)}>
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
                }}}>Data Preprocessing</Button>
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