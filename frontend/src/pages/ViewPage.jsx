import {Box} from "@mui/material"
import styles from "../styles/ViewPage.module.css"
import Header from "../components/auth/Header"
import ViewPageBody from "../components/auth/ViewPageBody"
const ViewPage=()=>{
    return(
        <Box className={styles.Container}>
            <Header/>
            <ViewPageBody/>
        </Box>
    )
}
export default ViewPage;