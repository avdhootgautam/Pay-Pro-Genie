// Here i will create the component for the missing values
import { Box , Typography,Button} from "@mui/material"
const MissingValues=({numericalPreproStep})=>{
        const strategyBtnStyle = {
        border: "1px solid rgba(248,250,252,0.4)",
        color: "whitesmoke",
        fontSize: "12px",
        padding: "8px 32px",
        textTransform: "none",
        transition: "all 0.3s ease", // 👈 smooth animation,
        marginLeft:"3px",
        "&:hover": {
        backgroundColor: "rgba(138, 43, 226, 0.3)", // violet glassy hover
        borderColor: "violet",
        transform: "scale(1.05)", // 👈 zoom effect
        boxShadow: "0px 0px 12px rgba(138,43,226,0.6)", // glowing effect
        },
        "&:active": {
        transform: "scale(0.95)", // small shrink on click
        },
  };

        const columnButtonStyle={
        border: "1px solid rgba(248,250,252,0.4)",
        color: "whitesmoke",
        fontSize: "12px",
        padding: "8px 32px",
        textTransform: "none",
        transition: "all 0.3s ease", // 👈 smooth animation
        marginLeft:"3px",
        "&:hover": {
        backgroundColor:"rgba(36, 195, 219, 0.3)",
        borderColor: "#22d3ee",
        transform: "scale(1.05)",
        boxShadow: "0px 0px 10px rgba(34,211,238,0.6)",
        },
        "&:active": {
        transform: "scale(0.95)", // small shrink on click
        },
        }
    return (
        <Box  sx={{color:"whitesmoke",paddingTop:"2px",paddingLeft:"10px",display:"flex",flexDirection:"column"}}>
            <Box sx={{display:"flex",flexDirection:"column"}}>
                <Box sx={{height:"40px"}}><h3>{numericalPreproStep}</h3></Box>
                <Box sx={{paddingBottom:"5px"}}><Typography sx={{fontSize:"14px",fontWeight:300,color:'gray'}}>Remove Rows or fill NaNs with Mean ,Median or Mode for selected columns.</Typography></Box>
            </Box>
            <Box sx={{display:"flex",flexDirection:"row",paddingTop:"5px"}}>
                <Box sx={{display:"flex",flexDirection:"column"}}>
                    <Typography sx={{fontSize:"14px",fontWeight:300,color:'gray'}}>STRATEGY</Typography>
                    <Box sx={{paddingTop:"5px"}}>
                        <Button sx={strategyBtnStyle}>Remove</Button>
                        <Button sx={strategyBtnStyle}>Mean</Button>
                        <Button sx={strategyBtnStyle}>Median</Button>
                        <Button sx={strategyBtnStyle}>Mode</Button>
                    </Box>
                </Box>
                <Box sx={{display:"flex",flexDirection:"column",marginLeft:"20px"}}>
                    <Typography sx={{fontSize:"14px",fontWeight:300,color:"gray"}}>COLUMNS</Typography>
                    <Box sx={{paddingTop:"5px"}}>
                        <Button sx={columnButtonStyle}>all</Button>
                        <Button sx={columnButtonStyle}>numeric</Button>
                        <Button sx={columnButtonStyle}>categorical</Button>
                        <Button sx={columnButtonStyle}>custom</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
export default MissingValues;