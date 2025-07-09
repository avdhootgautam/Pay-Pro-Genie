import React from "react";
import {Button} from "@mui/material"
const CustomButton=({
    text="Click Me",
    variant="contained",
    color="primary",
    onClick,
    sx={},
    ...props
})=>{
return(
    <Button
    variant={variant}
    color={color}
    sx={{mt:2,...sx}}
    onClick={onClick}
    >{text}</Button>
)
}
export default CustomButton;