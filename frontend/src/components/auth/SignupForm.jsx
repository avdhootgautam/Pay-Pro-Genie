import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link as MuiLink
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import signupUser from "../../services/authService"
const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation logic
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // TODO: send formData to your backend
    try{
        const result= signupUser(formData);//Using Service
        console.log("This is the result received from the backend:: ",result)
        alert(result.message ||"Signed up Successfully")
    }
    catch(err){
        alert("Error Signing up")
    }
    console.log("Submitted:", formData);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 4,
        boxShadow: 3,
        backgroundColor: "white",
        mt: 8,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Sign Up
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Full Name"
          name="fullName"
          margin="normal"
          value={formData.fullName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="normal"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          margin="normal"
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          margin="normal"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
      </form>

      <Box textAlign="center" mt={2}>
        <Typography variant="body2">
          Already have an account?{" "}
          <MuiLink
            component={RouterLink}
            to="/login"
            underline="hover"
            sx={{ fontWeight: 500 }}
          >
            Login
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignupPage;
