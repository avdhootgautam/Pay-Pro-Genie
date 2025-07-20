import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import ForgotPassword from "./ForgotPassword";
import OTPtoLogin from "./OTPtoLogin";
import PasswordField from "./PasswordField";
import SignupButton from "./SignupButton";
import loginuser from "../../services/loginService";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate =useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginuser(formData);
      if (result.message==="Logged in successfully!"){
        localStorage.setItem("email",result.email)
        localStorage.setItem("fullName",result.fullName)
        localStorage.setItem("object_id",result.object_id)
        alert("This is the object_id:: "+result.object_id)
        // alert("This is the email "+result.email)
        // alert("This is the fullname "+result.fullName)
        navigate('/home');
      }
    } catch (err) {
      alert("Error while logging in: " + err.message);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 4,
        boxShadow: 3,
        backgroundColor: "black",
        // border:"2px solid #2196f3"
      }}
    >
      <Typography variant="h5" color="#f5f5f5" gutterBottom>
        Login
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          name="email"
          variant="outlined"
          label="Email"
          margin="normal"
          onChange={handleChange}
          value={formData.email}
          sx={{
            input: { color: "#f5f5f5" },
            "& .MuiInputLabel-root": { color: "#f5f5f5" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#2196f3",
              },
              "&:hover fieldset": {
                borderColor: "#64b5f6",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1976d2",
              },
            },
          }}
        />

        <PasswordField
          fullWidth
          name="password"
          label="Password"
          type="password"
          margin="normal"
          onChange={handleChange}
          value={formData.password}
          sx={{
            input: { color: "#f5f5f5" },
            "& .MuiInputLabel-root": { color: "#f5f5f5" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#2196f3",
              },
              "&:hover fieldset": {
                borderColor: "#64b5f6",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1976d2",
              },
            },
          }}
        />

        <ForgotPassword />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </form>

      <OTPtoLogin />
      <SignupButton />
    </Box>
  );
};

export default LoginForm;
