import styles from "../../styles/Header.module.css";
import {Box, Button} from "@mui/material"
import logo from "../../assets/logo.png"
import { useNavigate } from "react-router-dom";
const Header=()=>{
    const Navigate=useNavigate();
    const handleHomeButton=()=>{
        Navigate('/home');
    }
    const handleDatasetUploadButton=()=>{
        Navigate('/upload-dataset')
    }
    return(
        <Box className={styles.header}>
            <Box className={styles.logo_with_title}>
                <img src={logo} alt="App Logo" style={{ height: 40, marginRight: 10 }}/>
                <span style={{ color: "white"}}>Data Preprocesing Hub</span>
            </Box>
            <Box className={styles.navBar} component="nav">
                <Button onClick={handleHomeButton}>Home</Button>
                <Button onClick={handleDatasetUploadButton}>Dataset Upload</Button>
                <Button>Results</Button>
                <Button>Documentation</Button>
                <Button>Profile</Button>
            </Box>
        </Box>
    )
}
export default Header;