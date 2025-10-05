// Here i will create the component for the missing values
import { Box , Typography,Button} from "@mui/material"
import { useEffect } from "react"
const MissingValues=({numericalPreproStep,setStrategy,strategy,columnPrepro,setColumnPrePro,finalOperation,setApplyAndSaveButton})=>{
    
        const handleApplyAndSaveButton=(operation)=>{
            setApplyAndSaveButton(operation)
        }

        const handleStrategyButton=(operation)=>{
            setStrategy(operation)
        }

        const handleColumnButton=(operation)=>{
            // console.log("This is the operation:: ",operation)
            setColumnPrePro(operation)
            
        }


        const strategyBtnStyle=(strategy)=>{
            if (strategy){
                return {
                    border: "1px solid rgba(248,250,252,0.4)",
                    color: "whitesmoke",
                    fontSize: "12px",
                    padding: "8px 32px",
                    backgroundColor: "rgba(138, 43, 226, 0.3)", // violet glassy hover
                    borderColor: "violet",
                    transform: "scale(0.95)", // 👈 zoom effect
                    boxShadow: "0px 0px 12px rgba(138,43,226,0.6)", // glowing effect
                    textTransform: "none",
                }
            }
            else{
                return {
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
            }
        }

        const columnButtonStyle=(isActive)=>{
            if(isActive){
                return {
                    border: "1px solid rgba(248,250,252,0.4)",
                    color: "whitesmoke",
                    fontSize: "12px",
                    padding: "8px 32px",
                    textTransform: "none",
                    backgroundColor:"rgba(36, 195, 219, 0.3)",
                    borderColor: "#22d3ee",
                    // transform: "scale(1.05)",
                    boxShadow: "0px 0px 10px rgba(34,211,238,0.6)",
                    transform: "scale(0.95)"
                }
            }
            else{
                // console.log("IN a column part::",isActive)
                return {
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
            }
        }

        const actionBtnStyle=(isActive)=>{
            if(isActive){
                return {
                    border: "1px solid rgba(248,250,252,0.4)",
                    color: "whitesmoke",
                    fontSize: "13px",
                    fontWeight: 500,
                    padding: "8px 36px",
                    textTransform: "none",
                    borderRadius: "8px",
                    margin: "6px 6px 0 0",
                    background: "linear-gradient(90deg, rgba(34,211,238,0.2), rgba(138,43,226,0.25))", // cyan → violet glow
                    borderColor: "#9333ea", // deep violet
                    transform: "scale(1.05)",
                    boxShadow: "0px 0px 14px rgba(138,43,226,0.6)", // glowing hover
                }
            }
            else{
                return  {
                    border: "1px solid rgba(248,250,252,0.4)",
                    color: "whitesmoke",
                    fontSize: "13px",
                    fontWeight: 500,
                    padding: "8px 36px",
                    textTransform: "none",
                    borderRadius: "8px",
                    margin: "6px 6px 0 0",
                    transition: "all 0.3s ease",

                    "&:hover": {
                        background: "linear-gradient(90deg, rgba(34,211,238,0.2), rgba(138,43,226,0.25))", // cyan → violet glow
                        borderColor: "#9333ea", // deep violet
                        transform: "scale(1.05)",
                        boxShadow: "0px 0px 14px rgba(138,43,226,0.6)", // glowing hover
                    },

                    "&:active": {
                        transform: "scale(0.95)",
                },
                };
            }
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
                        <Button sx={strategyBtnStyle(strategy==="Remove")} onClick={()=>{handleStrategyButton("Remove")}}>Remove</Button>
                        <Button sx={strategyBtnStyle(strategy==="Mean" )} onClick={()=>{handleStrategyButton("Mean")}}>Mean</Button>
                        <Button sx={strategyBtnStyle(strategy==="Median" )} onClick={()=>{handleStrategyButton("Median")}}>Median</Button>
                        <Button sx={strategyBtnStyle(strategy==="Mode" )} onClick={()=>{handleStrategyButton("Mode")}}>Mode</Button>
                    </Box>
                </Box>
                <Box sx={{display:"flex",flexDirection:"column",marginLeft:"20px"}}>
                    <Typography sx={{fontSize:"14px",fontWeight:300,color:"gray"}}>COLUMNS</Typography>
                    <Box sx={{paddingTop:"5px"}}>
                        <Button sx={columnButtonStyle(columnPrepro=="all")} onClick={()=>{handleColumnButton("all")}}>all</Button>
                        <Button sx={columnButtonStyle(columnPrepro==="numeric")} onClick={()=>{handleColumnButton("numeric")}}>numeric</Button>
                        <Button sx={columnButtonStyle(columnPrepro==="categorical")} onClick={()=>{handleColumnButton("categorical")}}>categorical</Button>
                        <Button sx={columnButtonStyle(columnPrepro==="custom")} onClick={()=>{handleColumnButton("custom")}}>custom</Button>
                    </Box>
                </Box>
            </Box>
            <Box sx={{display:"flex",flexDirection:"row",marginTop:"10px",justifyContent:"end"}}>
                <Button sx={actionBtnStyle(finalOperation==="Apply")} onClick={()=>{handleApplyAndSaveButton("Apply")}}>Apply</Button>
                <Button sx={actionBtnStyle(finalOperation==="Save")} onClick={()=>{handleApplyAndSaveButton("Save")}}>Save</Button>
            </Box>
        </Box>
    )
}
export default MissingValues;