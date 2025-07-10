import SignupForm from "../components/auth/SignupForm";
import {Box} from "@mui/material"
// import SnackBarAlert from "../components/auth/SnackBarAlert";
const SignupPage=()=>{
    return(
        <Box  sx={{ backgroundColor: "black", minHeight: "100vh", py: 8 }}>
            <SignupForm/>
        </Box>
    );
};
export default SignupPage;