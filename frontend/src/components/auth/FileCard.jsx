import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DeleteFileCardComponent from "../../services/deleteFileCardComponent";
import DialogDeleteFileCard from "./DialogueBox/DialogueDeleteFileCard";
import { useState } from "react";
import SnackBarAlert from "./SnackBarAlert";
const FileCard = ({ file ,object_id}) => {
    // console.log("This is the file :: "+file+" and type fo te file is "+"")
    const [open,setOpen]=useState(false)
    const [open1,setOpen1]=useState(false)//For Snackbar alert
    const [message,setMessage]=useState("")
    const file_name=encodeURIComponent(file.file_name)
    console.log('In a file card,filename is :: ',file_name)
    const Navigate=useNavigate();
    const handleViewPage=()=>{
      //encodeURIComponent helps in decoding the language such as "sales file" or sales$file.csv then it will safely handle it while encoding and decoding
      Navigate(`/view-page/?file_name=${file_name}`)
    }
    
    //here i am writing the function for deleting the file
      const deleteFileCard=async()=>{
        const payload={
          "object_id":object_id,
          "file_name":file_name
        }
        try
        {
          const response=await DeleteFileCardComponent(payload);
          if (response.message==="Successfully received the data"){
            setMessage(response.message)
            console.log("In a File Card,This is the message ",message)
            setOpen(false)
            setOpen1(true)
            setMessage("File Deleted")
            setTimeout(()=>{
              window.location.reload();
            },2000)
            // window.location.reload();
            // console.log()
          }
          // alert("File Deleted:: ",response.message)
          // setMessage(response.message)
          
        }catch(err){
          console.error("IN A File Card,error in deleteFileCard is ",err)
        }

      }

  return (
    <Card
      sx={{
        width: 300,
        borderRadius: 4,
        boxShadow: 3,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#161616",
        color: "white",
      }}
    >
      <Box display="flex" alignItems="center" mb={2}>
        {/* <FileText size={24} style={{ marginRight: 8 }} /> */}
        <Typography variant="h6" noWrap title={file?.file_name}>
            {/* file?.file_name -> This is used so that it gives  the value else show undefined rather than showing the error */}
          {file?.file_name || "Unnamed File"}
        </Typography>
      </Box>

      <CardContent sx={{ padding: 0 }}>
        <Typography variant="body2" color="whitesmoke">
          📏 Size: {file?.file_size || "N/A"}
        </Typography>

        <Typography variant="body2" color="whitesmoke">
          📄 Rows: {file?.number_of_rows || 0}
        </Typography>

        <Typography variant="body2" color="whitesmoke">
          📊 Columns: {file?.number_of_columns || 0}
        </Typography>
      </CardContent>

      <Box mt={2} display="flex" justifyContent="space-between">
        <Button size="small" variant="outlined" color="primary" onClick={handleViewPage}>
          Preview
        </Button>
        {/* <Button size="small" variant="outlined" color="error" onClick={deleteFileCard}>
          Delete
        </Button> */}
        <Button size="small" variant="outlined" color="error" onClick={()=>{setOpen(true)}}>
          Delete
        </Button>
        <DialogDeleteFileCard  open={open} onClose={()=>{setOpen(false)}} onConfirm={deleteFileCard}/>
        <SnackBarAlert open={open1} message={message} severity="error" onClose={()=>{setOpen1(false)}}/>
      </Box>
    </Card>
  );
};

export default FileCard;
