import CustomButton from "../components/auth/CustomButton";
import {Box,Typography} from "@mui/material"
import { useNavigate } from "react-router-dom";
const WelcomePage=()=>{
    const navigate=useNavigate();
    const handleStart=()=>{
        navigate("/login")
    }
    return(
        <Box
        sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
            padding: 4,
        }}
        >
            <Typography variant="h4" color="#f5f5f5" gutterBottom>
                DataPrePro
            </Typography>
            <Typography variant="body1" color="#f5f5f5" gutterBottom>
                Efficiently preprocess your Datasets!
            </Typography>
            <CustomButton
            text="Get Started"
            color="secondary"
            onClick={handleStart}
            />
        </Box>

    )
}
export default WelcomePage;