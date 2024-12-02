import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
          console.error("No user is logged in.");
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:5000/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }

        const users = await response.json();
        const user = users.find((u) => u.email === userEmail);

        if (!user) {
          console.error("User not found.");
          setLoading(false);
          return;
        }

        setUserData(user);
        setEditedData(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      });

      if (response.ok) {
        setUserData(editedData); // Update the UI with the saved data
        setIsEditing(false); // Exit editing mode
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCancelEditing = () => {
    setEditedData(userData); // Reset changes
    setIsEditing(false); // Exit editing mode
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (!userData) {
    return <p>User data not found. Please log in again.</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={userData.avatar || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="profile-avatar"
          />
          {!isEditing ? (
            <h2 className="profile-name">{userData.username}</h2>
          ) : (
            <input
              type="text"
              name="username"
              value={editedData.username}
              onChange={handleChange}
              className="profile-input"
              placeholder="Enter your name"
            />
          )}
          <p className="profile-role">{userData.role}</p>
        </div>

        <div className="profile-details">
          <h3 className="profile-section-title">Profile Details</h3>
          {!isEditing ? (
            <>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Musical Preferences:</strong>{" "}
                {userData.preferences || "Not specified"}
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Email:</strong>
                <input
                  type="email"
                  name="email"
                  value={editedData.email}
                  onChange={handleChange}
                  className="profile-input"
                  placeholder="Enter your email"
                />
              </p>
              <p>
                <strong>Musical Preferences:</strong>
                <input
                  type="text"
                  name="preferences"
                  value={editedData.preferences || ""}
                  onChange={handleChange}
                  className="profile-input"
                  placeholder="Enter your preferences"
                />
              </p>
            </>
          )}
        </div>

        <div className="profile-actions">
          {!isEditing ? (
            <button
              className="action-button edit-button"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                className="action-button save-button"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
              <button
                className="action-button cancel-button"
                onClick={handleCancelEditing}
              >
                Cancel
              </button>
            </>
          )}
          <button className="action-button logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
