import SignupForm from "../components/auth/SignupForm";
import {Box} from "@mui/material"
const SignupPage=()=>{
    return(
        <Box  sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", py: 8 }}>
            <SignupForm/>
        </Box>
    );
};
export default SignupPage;