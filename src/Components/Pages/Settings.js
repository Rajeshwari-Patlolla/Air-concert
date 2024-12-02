import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Card,
  MenuItem,
  Select,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";

const SettingsPage = () => {
  useEffect(()=>{
    window.scrollTo(0,0)
},[])
  const { mode, toggleTheme } = useContext(ThemeContext); // Using ThemeContext for theme toggle
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [userData, setUserData] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);

  // Fetch user data from localStorage and set it in the state
  useEffect(() => {
    const fetchUserData = async () => {
      const userEmail = localStorage.getItem("userEmail");
      if (userEmail) {
        try {
          const response = await fetch("http://localhost:5000/users");
          if (!response.ok) throw new Error("Failed to fetch users.");
          const users = await response.json();
          const user = users.find((u) => u.email === userEmail);
          if (user) {
            setUserData(user);
            setEditedData(user);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const handleSaveChanges = () => {
    const updatedData = {
      ...editedData,
      avatar: image || userData?.avatar || "https://via.placeholder.com/150",
    };

    fetch(`http://localhost:5000/users/${userData?.id || ''}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update profile.");
        }
        return response.json();
      })
      .then(() => {
        setUserData(updatedData);
        setIsEditing(false);
        alert("Your details are changed!");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("Failed to update profile.");
      });
  };

  const handleCancelEditing = () => {
    setEditedData(userData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  if (loading) {
    return <CircularProgress sx={{ color: mode === "dark" ? "#fff" : "#000" }} />;
  }

  return (
    <Box sx={{ p: 4, backgroundColor: mode === "dark" ? "#333" : "#fff" }}>
      <Typography variant="h4" gutterBottom color={mode === "dark" ? "white" : "black"}>
        Settings
      </Typography>

      {/* Theme Settings Section */}
      <Card sx={{ p: 3, mb: 4, backgroundColor: mode === "dark" ? "#444" : "#f5f5f5" }}>
        <Typography variant="h6" gutterBottom color={mode === "dark" ? "white" : "black"}>
          Theme Settings
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <FormControlLabel
            control={<Switch checked={mode === "dark"} onChange={toggleTheme} />}
            label={mode === "light" ? "Light Mode" : "Dark Mode"}
          />
        </Box>
      </Card>

      {/* Language Settings Section */}
      <Card sx={{ p: 3, mb: 4, backgroundColor: mode === "dark" ? "#444" : "#f5f5f5" }}>
        <Typography variant="h6" gutterBottom color={mode === "dark" ? "white" : "black"}>
          Language Settings
        </Typography>
        <Select value={language} onChange={handleLanguageChange} fullWidth variant="outlined">
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="es">Spanish</MenuItem>
          <MenuItem value="fr">French</MenuItem>
        </Select>
      </Card>

      {/* Profile Settings Section */}
      <Card sx={{ p: 3, mb: 4, backgroundColor: mode === "dark" ? "#444" : "#f5f5f5" }}>
        <Typography variant="h6" gutterBottom color={mode === "dark" ? "white" : "black"}>
          Profile Settings
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar
            src={image || userData?.avatar || "https://via.placeholder.com/150"}
            alt="User Avatar"
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          {isEditing ? (
            <input type="file" onChange={handleProfileImageChange} />
          ) : null}

          {!isEditing ? (
            <>
              <Typography variant="h6" color={mode === "dark" ? "white" : "black"}>
                {userData?.username}
              </Typography>
              <Typography variant="body1" color={mode === "dark" ? "white" : "black"}>
                {userData?.email}
              </Typography>
              <Typography variant="body1" color={mode === "dark" ? "white" : "black"}>
                <strong>Musical Preferences:</strong> {userData?.musicalPreferences || "Not specified"}
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            </>
          ) : (
            <>
              <TextField
                label="Name"
                name="username"
                value={editedData.username}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Email"
                name="email"
                value={editedData.email}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Musical Preferences"
                name="preferences"
                value={editedData.preferences || ""}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, gap: 2 }}>
                <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleCancelEditing}>
                  Cancel
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Card>

      {/* Logout Button */}
      <Card sx={{ p: 3, backgroundColor: mode === "dark" ? "#444" : "#f5f5f5" }}>
        <Button variant="outlined" color="error" fullWidth onClick={handleLogout}>
          Logout
        </Button>
      </Card>
    </Box>
  );
};

export default SettingsPage;
