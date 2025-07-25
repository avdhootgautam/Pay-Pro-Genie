import { Box ,Button, IconButton} from "@mui/material";
import styles from "../../styles/ViewPageBody.module.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import DatasetUploadPage from "../../pages/DatasetUploadPage";
const ViewPageBody=()=>{
    const Navigate=useNavigate();
    const NavigateToDatasetUploadPage=()=>{
        Navigate('/upload-dataset')
    }
    return (
        <Box className={styles.ViewPageBody}>
            <Box className={styles.ViewPageFirstSection}>
                <Box className={styles.ViewPageFirstSectionFirstSubSection}>
                    <Box className={styles.back_button}>
                        <IconButton onClick={NavigateToDatasetUploadPage}>
                            <ArrowBackIcon/>
                        </IconButton>
                    </Box>
                </Box>
                <Box className={styles.ViewPageFirstSectionSecondSubSection}></Box>
            </Box>
        </Box>
    )
}
export default ViewPageBody;