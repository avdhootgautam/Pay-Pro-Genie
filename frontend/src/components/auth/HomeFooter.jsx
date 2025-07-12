import styles from "../../styles/HomeFooter.module.css";
import {Link as MuiLink, Typography}  from "@mui/material"
import {Box,IconButton} from "@mui/material"
import {GitHub,LinkedIn,Instagram} from "@mui/icons-material"
const HomeFooter=()=>{
return (
    <Box className={styles.HomeFooter}>
        <Box className={styles.useful_legal_links}>
            <Typography sx={{fontFamily:"Poppins",color:"whitesmoke"}}>Legal Links</Typography>
            <Box className={styles.legal_links}>
                <MuiLink href="/privacy-policy" underline="hover" sx={{marginRight:"10px", color:"whitesmoke"}} >Privacy Policy</MuiLink>
                <MuiLink href="/terms-of-service" underline="hover" sx={{marginRight:"10px", color:"whitesmoke"}} >Terms of Service</MuiLink>
                <MuiLink href="/contact-us" underline="hover"sx={{ color:"whitesmoke"}} >Contact Us</MuiLink>
            </Box>
        </Box>
        <Box className ={styles.social_media_links}>
        <IconButton color="inherit" href="https://github.com/avdhootgautam/Numerical_Preprocessing_on_dataset">
          <GitHub />
        </IconButton>
        <IconButton color="inherit" href="https://linkedin.com/in/avdhoot-gautam-6887ba34a/">
          <LinkedIn />
        </IconButton>
        <IconButton color="inherit" href="">
          <Instagram />
        </IconButton>
        </Box>
    </Box>
)
}
export default HomeFooter;