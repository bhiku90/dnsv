
import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import clr from "../../assets/clr.png"

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  // Toggle function for collapsing sidebar
  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar": {
          height: "100vh", 
          overflow: "hidden", 
        },
        "& .pro-sidebar-inner": {
         // transition: "width 0.6s ease-in-out",
          background: `${colors.primary[400]} !important`,
          height: "100vh", 
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="circle">
        
          <MenuItem
            onClick={handleCollapseToggle} 
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
       
              
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="180px">
                <IconButton onClick={handleCollapseToggle}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
            <Box display="flex" justifyContent="space-between" alignItems="center" ml="5px">
              <Typography variant="h2" color={colors.grey[100]} sx={{ m: "15px 0 40px 0px" }}>
                Center of <br /> Excellence In <br /> DNS Security
              </Typography>
            </Box>

           
               <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="170"
                  height="auto"
                  src={clr}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box> 
          </MenuItem>

          {/* Your existing menu items */}
          <Item title="Dashboard" to="/" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />
          <Item title="Malicious Domain" to="/bar" icon={<BarChartOutlinedIcon />} selected={selected} setSelected={setSelected} />
          <Item title="DGA Domain" to="/bardga" icon={<BarChartOutlinedIcon />} selected={selected} setSelected={setSelected} />
          <Item title="Client Queries > 1000" to="/horibar" icon={<BarChartOutlinedIcon />} selected={selected} setSelected={setSelected} />
          <Item title="NX Domains" to="/nxbar" icon={<BarChartOutlinedIcon />} selected={selected} setSelected={setSelected} />
          <Item title="Recent Salient Statistics" to="/dynamics" icon={<BarChartOutlinedIcon />} selected={selected} setSelected={setSelected} />
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
