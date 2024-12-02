import React, { useState, useEffect, useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { Menu as MenuIcon, ArrowDropDown } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";

const AppNavbar = () => {
  const { mode } = useContext(ThemeContext);
  const [moreAnchorEl, setMoreAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMoreOpen = (event) => {
    setMoreAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMoreAnchorEl(null);
  };

  const handleSignout = () => {
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    navigate("/signin");
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: mode === "dark" ? "#232F3E" : "#A1C4D8", // Dark theme: #000080 (deep blue) | Light theme: #f0f0f0 (light gray)
        color: mode === "dark" ? "#fff" : "#000", // Text color based on theme
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          onClick={goToHome}
          sx={{
            fontWeight: "bold",
            cursor: "pointer",
            color: mode === "dark" ? "#bb86fc" : "#1976d2", // Dynamic color for the logo
            '&:hover': {
              color: mode === "dark" ? "#3700b3" : "#1565c0", // Color on hover for the logo
            },
          }}
        >
          Open-Air Concerts
        </Typography>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
          <Button color="inherit" component={Link} to="/" sx={{ "&:hover": { backgroundColor: mode === "dark" ? "#333" : "#ddd" } }}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/management" sx={{ "&:hover": { backgroundColor: mode === "dark" ? "#333" : "#ddd" } }}>
            Management
          </Button>
          <Button color="inherit" component={Link} to="/repertoire" sx={{ "&:hover": { backgroundColor: mode === "dark" ? "#333" : "#ddd" } }}>
            Repertoire
          </Button>
          <Button color="inherit" component={Link} to="/ticketing" sx={{ "&:hover": { backgroundColor: mode === "dark" ? "#333" : "#ddd" } }}>
            Ticketing
          </Button>
          <Button color="inherit" component={Link} to="/dashboard" sx={{ "&:hover": { backgroundColor: mode === "dark" ? "#333" : "#ddd" } }}>
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/help&support" sx={{ "&:hover": { backgroundColor: mode === "dark" ? "#333" : "#ddd" } }}>
            Help & Support
          </Button>
          <Button
            color="inherit"
            endIcon={<ArrowDropDown />}
            onClick={handleMoreOpen}
            sx={{ "&:hover": { backgroundColor: mode === "dark" ? "#333" : "#ddd" } }}
          >
            More
          </Button>
          <Menu
            anchorEl={moreAnchorEl}
            open={Boolean(moreAnchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose} component={Link} to="/progress">
              Concert Insights
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/community">
              Community
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/notifications">
              Notifications
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/collaboration">
              Collaboration
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/audio-video">
              Audio/Video Playback
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/about">
              About
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/settings">
              Settings
            </MenuItem>
          </Menu>

          {/* Authentication Buttons */}
          {isAuthenticated ? (
            <Button color="inherit" onClick={handleSignout} sx={{ "&:hover": { backgroundColor: mode === "dark" ? "#333" : "#ddd" } }}>
              Signout
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/signin" sx={{ "&:hover": { backgroundColor: mode === "dark" ? "#333" : "#ddd" } }}>
              Signin
            </Button>
          )}
        </Box>

        {/* Mobile Menu (Hamburger) */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Drawer */}
        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
          <List
            sx={{
              width: 250,
              backgroundColor: mode === "dark" ? "#000080" : "#f0f0f0", // Drawer background color: deep blue for dark, light gray for light
              color: mode === "dark" ? "#fff" : "#000", // Drawer text color based on theme
            }}
            role="presentation"
            onClick={handleMenuClose}
          >
            <ListItem button component={Link} to="/">
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/management">
              <ListItemText primary="Management" />
            </ListItem>
            <ListItem button component={Link} to="/repertoire">
              <ListItemText primary="Repertoire" />
            </ListItem>
            <ListItem button component={Link} to="/ticketing">
              <ListItemText primary="Ticketing" />
            </ListItem>
            <ListItem button component={Link} to="/dashboard">
              <ListItemText primary="Dashboard" />
            </ListItem>
            <Divider />
            <ListItem button component={Link} to="/progress">
              <ListItemText primary="Concert Insights" />
            </ListItem>
            <ListItem button component={Link} to="/community">
              <ListItemText primary="Community" />
            </ListItem>
            <ListItem button component={Link} to="/notifications">
              <ListItemText primary="Notifications" />
            </ListItem>
            <ListItem button component={Link} to="/collaboration">
              <ListItemText primary="Collaboration" />
            </ListItem>
            <ListItem button component={Link} to="/audio-video">
              <ListItemText primary="Audio/Video Playback" />
            </ListItem>
            <ListItem button component={Link} to="/about">
              <ListItemText primary="About" />
            </ListItem>
            <ListItem button component={Link} to="/settings">
              <ListItemText primary="Settings" />
            </ListItem>
            <Divider />
            {isAuthenticated ? (
              <ListItem button onClick={handleSignout}>
                <ListItemText primary="Signout" />
              </ListItem>
            ) : (
              <ListItem button component={Link} to="/signin">
                <ListItemText primary="Signin" />
              </ListItem>
            )}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default AppNavbar;
