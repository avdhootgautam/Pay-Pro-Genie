import LoginForm from "../components/auth/LoginForm";
import {Box} from "@mui/material"
const LoginPage=()=>{
    return(
        <Box  sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", py: 8 }}>
            <LoginForm/>
        </Box>
    );
};
export default LoginPage;