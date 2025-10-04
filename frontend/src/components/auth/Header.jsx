import styles from "../../styles/Header.module.css";
import {Box, Button} from "@mui/material"
import logo from "../../assets/logo.png"
import { useNavigate,useLocation } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography } from "@mui/material";
import { useState } from "react";
const Header=()=>{
    const Navigate=useNavigate();
    const [open,setOpen]=useState(false);
    const handleOpen=()=>setOpen(true);
    const handleClose=()=>setOpen(false);
    const location=useLocation();
    const handleHomeButton=()=>{
        if(location.pathname!="/home")
        {Navigate('/home', { replace: true });}
    }

    const handleDatasetUploadButton=(e)=>{
        e.preventDefault()
        //here { replace: true } is preventing in stacking the browser with same link .
        if(location.pathname!="/upload-dataset")
        {Navigate('/upload-dataset', { replace: true })}
        //Use of useLocation => This replaces the current entry in history ,preventing it from stacking up like:-/home → /upload_dataset → /home → /upload_dataset → /home...
    }

    const handleResultButton=(e)=>{
        if(location.pathname!="/result")
        {Navigate('/result', { replace: true })}
    }
    // const NavBarStyling={transition: "all 0.3s ease","&:hover":{transform:"scale(2.05)"},"&:active": {transform: "scale(0.95)"}}
    const NavBarStyling = {
            color: "white",
            fontSize: "14px",
            fontWeight: 500,
            textTransform: "none",
            marginLeft: "10px",
            padding: "6px 16px",
            borderRadius: "6px",
            transition: "all 0.3s ease",
            "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)", // subtle glassy hover
                transform: "scale(1.35)",                 // zoom effect
            },
            "&:active": {
                transform: "scale(0.95)",                 // shrink on click
            },
        };
    return(
        <Box className={styles.header}>
            <Box className={styles.logo_with_title}>
                <img src={logo} alt="App Logo" style={{ height: 40, marginRight: 10 }}/>
                <span style={{ color: "white"}}>Data Preprocesing Hub</span>
            </Box>
            <Box className={styles.navBar} component="nav">
                <Button onClick={handleHomeButton} sx={NavBarStyling}>Home</Button>
                <Button onClick={handleDatasetUploadButton}sx={NavBarStyling}>Dataset Upload</Button>
                <Button onClick={handleResultButton}sx={NavBarStyling}>Results</Button>
                <Button sx={NavBarStyling}>Documentation</Button>
                <Button onClick={handleOpen}sx={NavBarStyling}>Profile</Button>
            </Box>
        </Box>
    )
}
export default Header;