import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "./Registration.css";

const RegisterPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "Musician",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.trim(), // Trim input to avoid accidental spaces
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check for missing fields
      if (!formData.username || !formData.email || !formData.password) {
        toast.error("Please fill in all required fields.");
        return;
      }

      // Check for valid email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email address.");
        return;
      }

      // Fetch existing users to check for duplicate emails
      const existingUsersResponse = await fetch("http://localhost:5000/users");
      const existingUsers = await existingUsersResponse.json();
      const isEmailUsed = existingUsers.some((user) => user.email === formData.email);

      if (isEmailUsed) {
        toast.error("Email is already registered. Please use another email.");
        return;
      }

      // Save new user to db.json
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Save email to localStorage for session persistence
        localStorage.setItem("userEmail", formData.email);

        toast.success("Registration successful!");
        setFormData({
          username: "",
          email: "",
          password: "",
          role: "Musician",
          avatar: "",
        });
        navigate("/profile"); // Navigate to the Profile page
      } else {
        toast.error("Failed to register. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Create an Account</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option>Conductor</option>
            <option>Musician</option>
            <option>Event Organizer</option>
            <option>Venue Manager</option>
            <option>Audience</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="avatar">Avatar (URL)</label>
          <input
            type="text"
            id="avatar"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            placeholder="Enter avatar URL (optional)"
          />
        </div>
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
      <p className="login-link">
        Already have an account? <a href="/login">Login here</a>
      </p>

      {/* ToastContainer for displaying toasts */}
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
