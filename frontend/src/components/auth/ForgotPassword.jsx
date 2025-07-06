import {Link as RouterLink} from "react-router-dom";
import {Link as MuiLink} from "@mui/material";
import {Box} from "@mui/material"
const ForgotPassword=()=>{
return (
    <Box textAlign="right" mt={1} mb={2}>
        <MuiLink
        component={RouterLink}
        to="/forgot-password"
        variant="body2"
        underline="hover"
        sx={{cursor:"pointer"}}
        >
            Forgot Password?
        </MuiLink>
      </Box>
)
}
export default ForgotPassword;
