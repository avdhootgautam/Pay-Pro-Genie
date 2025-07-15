import Header from "../components/auth/Header";
import {Box} from "@mui/material";
import styles from "../styles/DatasetUploadPage.module.css";
import DatasetUploadBody from "../components/auth/DatasetUploadBody";
const DatasetUploadPage=()=>{
    return (
        <Box className={styles.dataset_upload}>
            <Header/>
            <DatasetUploadBody/>
        </Box>
    )
}
export default DatasetUploadPage;