import styles from "../../styles/Header.module.css";
import {Box, Button} from "@mui/material"
import logo from "../../assets/logo.png"
const Header=()=>{
    return(
        <Box className={styles.header}>
            <Box className={styles.logo_with_title}>
                <img src={logo} alt="App Logo" style={{ height: 40, marginRight: 10 }}/>
                <span style={{ color: "white"}}>Data Preprocesing Hub</span>
            </Box>
            <Box className={styles.navBar} component="nav">
                <Button>Home</Button>
                <Button>Dataset Upload</Button>
                <Button>Results</Button>
                <Button>Documentation</Button>
                <Button>Profile</Button>
            </Box>
        </Box>
    )
}
export default Header;