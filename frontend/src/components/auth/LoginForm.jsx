import React from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import ForgotPassword from "./ForgotPassword";
import OTPtoLogin from "./OTPtoLogin";
// import {Visibility ,VisibilityOff} from "@mui/icons-material";
import { useState } from "react";
import PasswordField from "./PasswordField";
import SignupButton from "./SignupButton";
import loginuser from "../../services/loginService";
const LoginForm = () => {
  const [formData,setFormData]=useState({
    email:"",
    password:""
  })
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit= async(e)=>{
    e.preventDefault();
    try {
      const result=await loginuser(formData)
      alert(result.message||"Logged in Successfully");
      }
    catch(err){
      alert("error while logging in::",{err});
    }
  }
  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 4,
        boxShadow: 3,
        backgroundColor: "white",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth name="email" label="Email" margin="normal" onChange={handleChange} />
        <PasswordField fullWidth name="password" label="Password" type="password" margin="normal"  onChange={handleChange} autoComplete="current-password"/>
        <ForgotPassword/>
        <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }}  type="submit">
          Login
        </Button>
      </form>
      <OTPtoLogin/>
      <SignupButton/>
    </Box>
  );
};

export default LoginForm;
