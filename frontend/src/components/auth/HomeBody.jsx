import { Typography,Box ,Button} from "@mui/material";
import styles from "../../styles/HomeBody.module.css";
import image_preprocessing_logo from "../../assets/image_preprocessing_logo.png"
import numerical_preprocessing_logo from "../../assets/numerical_preprocessing_logo.png";
import text_preprocessing_logo from "../../assets/text_preprocessing_logo.png";

const HomeBody=()=>{
    return (
    <Box className={styles.HomeBodyContainer}>
        <Box className={styles.welcome_text}>
            <Typography sx={{color:"whitesmoke",fontFamily: "Open Sans",fontSize:30}}>Welcome to DataPreprocessingHub</Typography>
        </Box>
        <Box className={styles.slogan_text}>
            <Typography sx={{color:"whitesmoke",fontFamily: "Poppins",fontSize:15}}>Your ultimate destination for data preprocessing .Explore your range of features designed to enhance you data processing workflow.</Typography>
        </Box>
        <Box className={styles.various_preprocessing_step}>
            <Box className={styles.preprocessing}>
                <img src={image_preprocessing_logo} alt="Image Preprocessing" style={{height:120,width:120}}></img>
                <Typography sx={{paddingTop:"5px",marginBottom:"5px"}}>Image Preprocessing</Typography>
                <span style={{color:"whitesmoke"}}>Process and analyze visual data with ease using our image dataset loads</span>
            </Box>
            <Box className={styles.preprocessing}>
                <img src={numerical_preprocessing_logo} alt="Numerical Preprocessing" style={{height:120,width:120}}></img>
                <Typography sx={{paddingTop:"5px",marginBottom:"5px"}}>Numerical Preprocessing</Typography>
                <span style={{color:"whitesmoke"}}>Process and analyze visual data with ease using our numerical dataset loads </span>
            </Box>
            <Box className={styles.preprocessing}>
                <img src={text_preprocessing_logo} alt="Text Preprocessing" style={{height:120,width:120}}></img>
                <Typography sx={{paddingTop:"5px",marginBottom:"5px"}}>Text Preprocessing</Typography>
                <span style={{color:"whitesmoke"}}>Process and analyze visual data with ease using our text dataset loads </span>
            </Box>
        </Box>
        <Box className={styles.visualisation_analysis_preprocessing}>
                <Button sx={{marginRight:"3px"}}>Data Visualisation</Button>
                <Button>Data Preprocessing</Button>
                <Button sx={{marginLeft:"3px"}}>Data Analysis</Button>
        </Box>
    </Box>
    )
}
export default HomeBody;