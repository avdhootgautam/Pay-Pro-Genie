import {Box} from "@mui/material"
import styles from "../../styles/ResultPageBody.module.css"
import {useState} from "react"
const ResultPageBody=()=>{
    const [fileName,setFilename]=useState("")
    const [rowCount,setrowCount]=useState(0)
    const [columnCount,setColumnCount]=useState(0)
    const [fileSize,setFileSize]=useState("")
    const [fileType,setFileType]=useState("")
    return(
    <Box className={styles.BodyContainer}>
        
    </Box>
    )
}
export default ResultPageBody;