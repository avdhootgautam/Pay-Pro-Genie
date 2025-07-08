import { Snackbar,Alert } from "@mui/material";
// import { useState } from "react";
const SnackBarAlert=({open,message,severity="info",onClose})=>{
    return (
    <Snackbar
    open={open}
    autoHideDuration={4000}
    onClose={onClose}
    anchorOrigin={{vertical:"bottom",horizontal:"center"}}
    >
        <Alert
        onClose={onClose}
        severity={severity}
        sx={{width:"100%"}}
        variant="filled">
            {message}
        </Alert>
    </Snackbar>
    );
};
export default SnackBarAlert;