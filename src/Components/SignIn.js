import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, TextField, Button, Grid, Typography, Link } from "@mui/material";
import { ThemeContext } from "./ThemeContext";

const SignInPage = () => {
  const navigate = useNavigate();
  const { mode } = useContext(ThemeContext); // Access the current theme mode
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.trim(),
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Basic validation for empty fields
      if (!formData.email || !formData.password) {
        toast.error("Please fill in all required fields.");
        return;
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email address.");
        return;
      }

      // Fetch existing users
      const response = await fetch("http://localhost:5000/users");
      const existingUsers = await response.json();

      // Match user credentials
      const user = existingUsers.find(
        (user) =>
          user.email === formData.email && user.password === formData.password
      );

      // Handle invalid credentials
      if (!user) {
        toast.error("Invalid email or password.");
        return;
      }

      // Success: Store user session and navigate to dashboard
      localStorage.setItem("userEmail", formData.email);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        padding: 2, // Reduced padding
        maxWidth: 400, // Reduced width
        margin: "0 auto",
        backgroundColor: mode === "dark" ? "#1f1f1f" : "#fff", // Form background based on mode
        borderRadius: 2,
        boxShadow: 3,
        color: mode === "dark" ? "#fff" : "#000", // Text color based on mode
      }}
    >
      <Typography
        variant="h5"
        align="center"
        sx={{ marginBottom: 3, color: mode === "dark" ? "white" : "black" }}
      >
        Sign In to Your Account
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
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
              helperText="Enter your registered email address"
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
              helperText="Enter your password"
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#0B2B53", // Custom button color
                padding: "12px",
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#083c6d", // Darker hover color
                },
              }}
            >
              Sign In
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Sign Up Link */}
      <Typography
        variant="body2"
        align="center"
        sx={{
          marginTop: 2,
          color: mode === "dark" ? "white" : "black", // Adjust color based on theme mode
        }}
      >
        Don't have an account?{" "}
        <Link href="/signup" underline="hover" color="primary">
          Sign up here
        </Link>
      </Typography>

      <ToastContainer position="top-center" />
    </Box>
  );
};

export default SignInPage;
