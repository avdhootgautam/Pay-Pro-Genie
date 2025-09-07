import React, { useState } from "react";
import { Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,Button } from "@mui/material";

const DialogDeleteFileCard=({open,onClose,onConfirm})=>{
    return(
        <Dialog open={open} onClose={onClose}
        >
            <DialogTitle 
            sx={{backgroundColor:"#100c08",
                color:"whitesmoke"
            }}
            >Delete File</DialogTitle>
            <DialogContent
            sx={{backgroundColor:"#100c08"
            }}
            >
                <DialogContentText
                sx={{
                color:"whitesmoke"
            }}
                >
                    Are you sure you want to delete this file?
                </DialogContentText>
            </DialogContent>
            <DialogActions
                sx={{
                    backgroundColor:"#100c08"
                }}
            >
                <Button onClick={onClose} variant="outlined">
                    Cancel
                </Button>
                <Button onClick={onConfirm} variant="outlined">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default DialogDeleteFileCard;