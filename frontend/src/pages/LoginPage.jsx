import LoginForm from "../components/auth/LoginForm";
import {Box} from "@mui/material"
const LoginPage=()=>{
    return(
        <Box  sx={{ backgroundColor: "black", minHeight: "100vh", py: 8}}>
            <LoginForm/>
        </Box>
    );
};
export default LoginPage;