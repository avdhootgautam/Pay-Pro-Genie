import React from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import ForgotPassword from "./ForgotPassword";
import OTPtoLogin from "./OTPtoLogin";
// import {Visibility ,VisibilityOff} from "@mui/icons-material";
import PasswordField from "./PasswordField";
import SignupButton from "./SignupButton";
const LoginForm = () => {
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
      <TextField fullWidth label="Email" margin="normal" />
      <PasswordField fullWidth label="Password" type="password" margin="normal" />
      <ForgotPassword/>
      <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
        Login
      </Button>
      <OTPtoLogin/>
      <SignupButton/>
    </Box>
  );
};

export default LoginForm;
