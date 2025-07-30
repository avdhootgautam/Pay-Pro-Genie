import {Box} from "@mui/material"
import styles from "../styles/ResultPage.module.css"
import Header from "../components/auth/Header"
import ResultPageBody from "../components/auth/ResultPageBody"
// import ViewFileCardBdy from "../components/auth/ViewFileCardBody"
const ResultPage=()=>{
    return(
        <Box className={styles.Container}>
            <Header/>
            <ResultPageBody/>
        </Box>
    )
}
export default ResultPage;