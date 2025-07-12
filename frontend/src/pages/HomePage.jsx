import {Box} from "@mui/material";
import styles from "../styles/HomePage.module.css";
import Header from "../components/auth/Header";
import HomeBody from "../components/auth/HomeBody";
import HomeFooter from "../components/auth/HomeFooter";
const HomePage=()=>{
    return (
    <Box className={styles.container}>
        <Header/>
        <HomeBody/>
        <HomeFooter/>
    </Box>
)
}
export default HomePage;