import {Link as RouterLink} from "react-router-dom";
import {Link as MuiLink, Typography} from "@mui/material";
import {Box} from "@mui/material"

const SignupButton=()=>{
    return(
        <Box textAlign="center" mt={3}>
            <Typography
            variant="body2" sx={{fontSize:"14px"}}>
                Don't have an account?{" "}
                <MuiLink
                    component={RouterLink}
                    to="/signup"
                    underline="hover"
                    sx={{fontWeight:500,fontSize:"14px",cursor:"pointer"}}>
                        Sign up
                    </MuiLink>
                    {/* We can use useNavigate also over here  */}
            </Typography>
        </Box>
    )
}
export default SignupButton;