import Header from "../components/auth/Header";
import {Box} from "@mui/material";
import styles from "../styles/DatasetUploadPage.module.css";
const DatasetUploadPage=()=>{
    return (
        <Box className={styles.DatasetUpload}>
            <Header/>
            <DatasstUploadbody/>
            
        </Box>
    )
}
export default DatasetUploadPage;