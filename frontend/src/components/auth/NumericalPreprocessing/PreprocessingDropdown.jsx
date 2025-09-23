import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect,useState } from 'react';
import fetchListOfFilenames from '../../../services/fetchListOfFilenames';
// const options = [
//   'None',
//   'test_1.csv',
//   'train_1.csv'
// ];

const ITEM_HEIGHT = 48;

export default function LongMenu({anchorEl,setAnchorEl,setOpenTable,setFileName,filenames}) {
  
  const open = Boolean(anchorEl);
  // options=filenames
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    // console.log("This is the chosen target:: ",event.currentTarget)
  };
  const handleClose = (option) => {
    if (option["_targetInst"]!==null){
    setOpenTable(true);
    setFileName(option);
    console.log('This is the chosen option ',option)
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon sx={{color:"whitesmoke"}}/>
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          },
          list: {
            'aria-labelledby': 'long-button',
          },
        }}
      >
        {filenames.map((option) => (
            // Here option ==="Pyxis" is used as an unique identifier,there are many mor esuch as ["Pyxis", "Canis", "Lyra"]
          <MenuItem key={option} selected={option ==='Pyxis'} onClick={()=>{handleClose(option)}}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}