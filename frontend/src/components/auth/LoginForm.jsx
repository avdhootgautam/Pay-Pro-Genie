import React from "react";
import {useState} from React;
import {Box,TextField,Typography,Button,Link} from "@mui/material"
import PasswordField from "./PasswordField"
import {loginUser} from "../../services/authService"
const LoginForm=()=>{
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    return (
        <Box
            component="form"
            onSubmit={handleLogin}
            //Basically sx is used for inline css in a mui
            sx={{
                maxWidth:400,
                mx:"auto",
                mt:8,
                p:4,
                boxShadow:3,
                borderRadius:2,
                backgroundColor:"#fff"
            }}
            >
                <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
                    Login to your Account
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
                     Welcome back! Please enter your credentials to access your account.
                </Typography>
            <TextField
                fullWidth
                margin="normal"
                type="email"
                label="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
            />
            </Box>

    )
}