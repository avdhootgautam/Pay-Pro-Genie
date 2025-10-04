import styles from "../../../styles/NumericalPreprocessing/PreprocessingSideBar.module.css"
import { Box, AppBar, Toolbar, IconButton, Drawer, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"; // Missing Values
import StraightenIcon from "@mui/icons-material/Straighten";   // Scaling
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot"; // Handling outliers

const PreprocessingSideBar = ({ open, setOpen ,setNumericalPreproStep}) => {
  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };

  const DrawerList = () => (
    <Box
      sx={{
        width: 250,
        height: "100%",
        background: "linear-gradient(180deg, #2e2121ff 0%, #1e1e1e 100%)",
        color: "whitesmoke",
      }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
    >
      <List>
        {[
          { text: "Missing Values", icon: <HelpOutlineIcon /> },
          { text: "Encoding", icon: <StraightenIcon /> },
          { text: "Scaling and Outliers", icon: <ScatterPlotIcon /> },
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              sx={{
                "&:hover": {
                  backgroundColor: "#2c2c2c",
                  transform: "scale(1.02)",
                  transition: "all 0.2s ease-in-out",
                },
              }}
              onClick={()=>{setNumericalPreproStep(item.text)}}
            >
              <ListItemIcon sx={{ color: "#90caf9" }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ fontSize: "15px", fontWeight: 500 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />
    </Box>
  );

  return (
    <Box className={styles.PreprocessingSideBar}>
      <AppBar position="static" sx={{ backgroundColor: "linear-gradient(180deg, #2e2121ff 0%, #1e1e1e 100%)", width: "50px" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => toggleDrawer(true)}>
            <MenuIcon sx={{ width: "25px" }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer open={open} onClose={() => toggleDrawer(false)}>
        <DrawerList />
      </Drawer>
    </Box>
  );
};

export default PreprocessingSideBar;
