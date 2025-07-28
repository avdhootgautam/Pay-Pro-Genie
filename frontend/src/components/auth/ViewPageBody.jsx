import { Box ,Button, IconButton, Typography} from "@mui/material";
import styles from "../../styles/ViewPageBody.module.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import DatasetUploadPage from "../../pages/DatasetUploadPage";
import file_icon from "../../assets/file_icon.png"
import reload_icon from "../../assets/reload_icon_1.png"
import download_icon from "../../assets/download_icon_3.png"
import ViewPageTable  from "./ViewPageTable";
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
                        <IconButton onClick={NavigateToDatasetUploadPage} sx={{
                            "&:hover":{
                                backgroundColor:"#4b4b4b",
                                transition: "background-color 0.3s ease-in-out", // smooth transition
                            },
                        }}>
                            <ArrowBackIcon sx={{ color:"whitesmoke" }}/>
                        </IconButton>
                    </Box>
                    <Box className={styles.title}>
                        <Typography sx={{color:"whitesmoke", fontSize:"20px",fontFamily:"Georgia" }}>Dataset Viewer</Typography>
                        <Box className={styles.details_of_file}>
                            <Box className={styles.filename}>
                                <img src={file_icon} alt="File Logo" style={{ height: 13, paddingLeft:"5px"}}/>
                                <span style={{ color: "whitesmoke" ,fontSize:"14px",marginLeft:"5px",fontFamily:"Georgia"}}>train.csv</span>
                            </Box>
                            <Box className={styles.filename}>
                                <Typography sx={{color: "whitesmoke",fontSize:"14px",fontFamily:"sans-serif",fontFamily:"Georgia",marginLeft:"5px" }}>
                                    <span style={{ color: "whitesmoke" ,fontFamily:"None",marginRight:"5px"}}>100</span>rows
                                </Typography>
                            </Box>
                            <Box className={styles.filename}>
                                <Typography sx={{color: "whitesmoke",fontSize:"14px",fontFamily:"sans-serif",fontFamily:"Georgia" }}>
                                    <span style={{marginLeft:"5px", color: "whitesmoke",fontFamily:"None"}}>8</span> columns
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box className={styles.ViewPageFirstSectionSecondSubSection}>
                    <Box className={styles.Reload}>
                        <Button>
                            <img src={reload_icon} alt="Reload Button" />
                        </Button>
                    </Box>
                    <Box className={styles.Download}>
                        <Button >
                            <img src={download_icon} alt="Download Button"/>
                            <Typography sx={{fontFamily:"Georgia",fontSize:"14px" ,color:"whitesmoke"}}>Download</Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box className={styles.SecondSection}>
                <ViewPageTable/>
            </Box>
        </Box>
    )
}
export default ViewPageBody;