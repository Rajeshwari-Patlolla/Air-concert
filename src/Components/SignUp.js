import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  IconButton,
  CircularProgress,
  Link,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "./ThemeContext"; // Import ThemeContext

const SignUpPage = () => {
  const { mode, setMode } = useContext(ThemeContext); // Correctly use setMode from context
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "Musician", // Default to "Musician"
    musicalPreferences: "", // Musical preferences input
    musicalPreferencesOther: "", // Musical preferences input for 'Other'
    notificationsEnabled: true, // Default to enabled notifications
    avatar: "", // Avatar image URL or base64 data
  });

  const [image, setImage] = useState(null); // For the profile image
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Change the body background based on the selected mode
    document.body.style.backgroundColor = mode === "dark" ? "#121212" : "#f5f5f5";
  }, [mode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Set avatar image preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    // Check if email is already registered
    const existingUsersResponse = await fetch("http://localhost:5000/users");
    const existingUsers = await existingUsersResponse.json();
    const isEmailUsed = existingUsers.some((user) => user.email === formData.email);
    if (isEmailUsed) {
      toast.error("Email is already registered.");
      setLoading(false);
      return;
    }

    // Save the new user to the database
    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, avatar: image }),
    });

    if (response.ok) {
      toast.success("Registration successful! Please sign in.");
      setLoading(false);
      navigate("/signin"); // Navigate to sign-in page
    } else {
      toast.error("Failed to register. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        p: 2, // Reduced padding
        maxWidth: 400, // Reduced width
        margin: "0 auto",
        backgroundColor: mode === "dark" ? "#1f1f1f" : "#fff", // Form background based on mode
        borderRadius: 2,
        boxShadow: 3,
        color: mode === "dark" ? "#fff" : "#000", // Text color based on mode
        height: "auto", // Ensure the form doesn't stretch too much
      }}
    >
      <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
        Create Your Account
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}> {/* Reduced spacing */}
          {/* Username */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Password */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Role Selection */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <MenuItem value="Musician">Musician</MenuItem>
                <MenuItem value="Listener">Listener</MenuItem>
                <MenuItem value="Conductor">Conductor</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Musical Preferences */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Musical Preferences</InputLabel>
              <Select
                label="Musical Preferences"
                name="musicalPreferences"
                value={formData.musicalPreferences}
                onChange={handleChange}
              >
                <MenuItem value="Classical">Classical</MenuItem>
                <MenuItem value="Jazz">Jazz</MenuItem>
                <MenuItem value="Rock">Rock</MenuItem>
                <MenuItem value="Pop">Pop</MenuItem>
                <MenuItem value="Hip-Hop">Hip-Hop</MenuItem>
                <MenuItem value="Electronic">Electronic</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl> 
          </Grid>

          {/* Show 'Other' field if selected */}
          {formData.musicalPreferences === "Other" && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Please specify"
                name="musicalPreferencesOther"
                value={formData.musicalPreferencesOther}
                onChange={handleChange}
                required
              />
            </Grid>
          )}

          {/* Notification Settings */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Enable Notifications</InputLabel>
              <Select
                label="Enable Notifications"
                name="notificationsEnabled"
                value={formData.notificationsEnabled}
                onChange={handleChange}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Avatar */}
          <Grid item xs={12}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="avatar-upload"
              type="file"
              onChange={handleProfileImageChange}
            />
            <label htmlFor="avatar-upload">
              <IconButton color="primary" component="span">
                <PhotoCamera />
              </IconButton>
              {image ? (
                <Avatar src={image} sx={{ width: 56, height: 56, marginTop: 2 }} />
              ) : (
                <Typography variant="body2" sx={{ marginTop: 2 }}>
                  Choose a profile picture
                </Typography>
              )}
            </label>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#0B2B53", // Set custom button color
                "&:hover": {
                  backgroundColor: "#083c6d", // Darker hover color
                },
              }}
              type="submit"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Sign Up"}
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Link for Sign In */}
      <Box sx={{ textAlign: "center", marginTop: 2 }}>
        <Typography variant="body2">
          Already have an account?{" "}
          <Link href="/signin" sx={{ color: mode === "dark" ? "#00aaff" : "#0B2B53", textDecoration: "none" }}>
            Sign In
          </Link>
        </Typography>
      </Box>

      <ToastContainer />
    </Box>
  );
};

export default SignUpPage;
