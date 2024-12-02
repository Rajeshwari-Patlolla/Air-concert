import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { ThemeContext } from "./ThemeContext";


const Footer = () => {
  const { mode } = useContext(ThemeContext); // Get the mode from the ThemeContext

  return (
    <Box sx={{
      backgroundColor: mode === "dark" ? "#222" : "#f5f5f5", // Light or dark background
      color: mode === "dark" ? "#fff" : "#333", // Light or dark text color
      padding: "2rem 1rem",
    }}>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        alignItems: "center",
      }}>
        <Box sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem",
          justifyContent: "center",
        }}>
          <Typography variant="body2" component="a" href="/about" sx={{
            color: mode === "dark" ? "#f39c12" : "#1976d2", // Light theme uses blue, dark theme uses yellow
            fontWeight: "bold"
          }}>
            About Us
          </Typography>
          <Typography variant="body2" component="a" href="/help&support" sx={{
            color: mode === "dark" ? "#f39c12" : "#1976d2", // Same as above
            fontWeight: "bold"
          }}>
            Help & Support
          </Typography>
          <Typography variant="body2" component="a" href="/terms" sx={{
            color: mode === "dark" ? "#f39c12" : "#1976d2", // Same as above
            fontWeight: "bold"
          }}>
            Terms & Conditions
          </Typography>
          <Typography variant="body2" component="a" href="/privacy" sx={{
            color: mode === "dark" ? "#f39c12" : "#1976d2", // Same as above
            fontWeight: "bold"
          }}>
            Cookies & Privacy
          </Typography>
        </Box>

        {/* Social Media Icons */}
        <Box sx={{
          display: "flex",
          gap: "1rem",
        }}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="social-icon" style={{
              fontSize: "1.5rem",
              color: mode === "dark" ? "#f39c12" : "#1976d2", // Icon color changes with theme
            }} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" style={{
              fontSize: "1.5rem",
              color: mode === "dark" ? "#f39c12" : "#1976d2", // Icon color changes with theme
            }} />
          </a>
        </Box>

        <Typography variant="body2" sx={{
          textAlign: "center",
          marginTop: "1rem",
          color: mode === "dark" ? "#bbb" : "#333", // Footer text color changes with theme
        }}>
          © 2024 Symphonic Concerts - All Rights Reserved | Hyderabad
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
