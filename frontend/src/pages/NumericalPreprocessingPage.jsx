import {Box} from "@mui/material"
import Header from "../components/auth/Header"
import styles from "../styles/NumericalPreprocessingPage.module.css"
import PreprocessingBody from "../components/auth/NumericalPreprocessing/PreprocessingBody";
const NumericalPreprocessingPage=()=>{
    return (
        <Box className={styles.Container}>
            <Header/>
            <PreprocessingBody/>
        </Box>
    )
}
export default NumericalPreprocessingPage;