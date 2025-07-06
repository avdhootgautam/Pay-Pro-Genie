import {Link as RouterLink} from "react-router-dom";
import {Link as MuiLink} from "@mui/material";
import {Box} from "@mui/material"

    const OTPtoLogin=()=>{
    return(
        <Box textAlign="center" mt={2}>
        <MuiLink
        component={RouterLink}
        to="/otp-login"
        variant="body2"
        underline="hover"
        sx={{"curesor":"pointer"}}
        >
            Use OTP to login
        </MuiLink>
        </Box>
    )
    }

export default OTPtoLogin;