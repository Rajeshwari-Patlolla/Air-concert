import React, { useState, useContext, useEffect } from "react";
import { TextField, Button, Grid, Typography, Box, List, ListItem, ListItemText, Card, CardContent, Snackbar } from "@mui/material";
import { ThemeContext } from "./ThemeContext"; // Import your ThemeContext
import { v4 as uuidv4 } from "uuid"; // For generating unique concert IDs

const ManagementPage = () => {
  useEffect(()=>{
    window.scrollTo(0,0)
},[])
  const { mode } = useContext(ThemeContext); // Get current theme mode (dark or light)

  const [concertTitle, setConcertTitle] = useState("");
  const [concertDate, setConcertDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [resources, setResources] = useState([]);
  const [budget, setBudget] = useState("");

  // Rehearsal Scheduling State
  const [rehearsals, setRehearsals] = useState([]);
  const [rehearsalTime, setRehearsalTime] = useState("");
  const [rehearsalLocation, setRehearsalLocation] = useState("");
  const [rehearsalParticipants, setRehearsalParticipants] = useState("");
  const [rehearsalReminder, setRehearsalReminder] = useState("");

  // Toggle for showing concert and rehearsal details
  const [showConcertDetails, setShowConcertDetails] = useState(false);

  // Snackbar state for success message
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Add Rehearsal
  const handleAddRehearsal = () => {
    if (rehearsalTime && rehearsalLocation && rehearsalParticipants) {
      setRehearsals([
        ...rehearsals,
        {
          time: rehearsalTime,
          location: rehearsalLocation,
          participants: rehearsalParticipants,
          reminder: rehearsalReminder,
        },
      ]);
      setRehearsalTime("");
      setRehearsalLocation("");
      setRehearsalParticipants("");
      setRehearsalReminder("");
    }
  };

  // Save Concert to db.json (simulating a backend call)
  const saveConcert = () => {
    const concertData = {
      id: uuidv4(), // Generating a unique ID for the concert
      title: concertTitle,
      date: concertDate,
      tasks: tasks,
      resources: resources,
      budget: budget,
      rehearsals: rehearsals,
    };

    // Simulate saving concert data (This would be a backend call in a real app)
    console.log("Concert Data Saved:", concertData);

    // Simulating a save by updating db.json
    // Here you would typically send the data to an API or update a backend file.
    // For now, just simulate success by opening the snackbar.
    setOpenSnackbar(true);

    // Optionally clear the form after saving:
    setConcertTitle("");
    setConcertDate("");
    setTasks([]);
    setResources([]);
    setBudget("");
    setRehearsals([]);
    setShowConcertDetails(true); // Show concert details after saving
  };

  // Handle Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    saveConcert(); // Call the function to save the concert
  };

  return (
    <Box
      className="management-container"
      sx={{
        padding: { xs: "16px", sm: "32px" },
        backgroundColor: mode === "dark" ? "#121212" : "#ffffff", // Set background color based on theme
        color: mode === "dark" ? "#ffffff" : "#000000", // Text color based on theme
        display: "flex",
        flexDirection: "column",
        gap: "32px", // Space between sections
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: mode === "dark" ? "white" : "black", fontWeight: "bold" }}>
        Manage Your Concert
      </Typography>

      <form onSubmit={handleSubmit} className="concert-form">
        {/* Concert Scheduling Section */}
        <Card sx={{ backgroundColor: mode === "dark" ? "#333" : "#f5f5f5", padding: "24px", borderRadius: "8px" }}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ color: mode === "dark" ? "white" : "black", fontWeight: "bold" }}>
              Concert Scheduling
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Concert Title"
                  variant="outlined"
                  fullWidth
                  value={concertTitle}
                  onChange={(e) => setConcertTitle(e.target.value)}
                  required
                  sx={{
                    backgroundColor: mode === "dark" ? "#444" : "#fff",
                    color: mode === "dark" ? "white" : "black",
                    borderRadius: "8px",
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Concert Date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  value={concertDate}
                  onChange={(e) => setConcertDate(e.target.value)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    backgroundColor: mode === "dark" ? "#444" : "#fff",
                    color: mode === "dark" ? "white" : "black",
                    borderRadius: "8px",
                  }}
                />
              </Grid>

              {/* Task Management */}
              <Grid item xs={12}>
                <TextField
                  label="Add Task"
                  variant="outlined"
                  fullWidth
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.target.value.trim()) {
                      setTasks([...tasks, e.target.value]);
                      e.target.value = "";
                    }
                  }}
                  sx={{
                    backgroundColor: mode === "dark" ? "#444" : "#fff",
                    color: mode === "dark" ? "white" : "black",
                    borderRadius: "8px",
                  }}
                />
                <List sx={{ marginTop: "16px", color: mode === "dark" ? "white" : "black" }}>
                  {tasks.map((task, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={task} sx={{ color: mode === "dark" ? "white" : "black" }} />
                    </ListItem>
                  ))}
                </List>
              </Grid>

              {/* Resource Management */}
              <Grid item xs={12}>
                <TextField
                  label="Add Resource"
                  variant="outlined"
                  fullWidth
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.target.value.trim()) {
                      setResources([...resources, e.target.value]);
                      e.target.value = "";
                    }
                  }}
                  sx={{
                    backgroundColor: mode === "dark" ? "#444" : "#fff",
                    color: mode === "dark" ? "white" : "black",
                    borderRadius: "8px",
                  }}
                />
                <List sx={{ marginTop: "16px", color: mode === "dark" ? "white" : "black" }}>
                  {resources.map((resource, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={resource} sx={{ color: mode === "dark" ? "white" : "black" }} />
                    </ListItem>
                  ))}
                </List>
              </Grid>

              {/* Budget */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Budget"
                  type="number"
                  variant="outlined"
                  fullWidth
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  required
                  sx={{
                    backgroundColor: mode === "dark" ? "#444" : "#fff",
                    color: mode === "dark" ? "white" : "black",
                    borderRadius: "8px",
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Save Concert Button */}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            marginTop: "32px",
            backgroundColor: mode === "dark" ? "#f39c12" : "#3f51b5",
          }}
          fullWidth
        >
          Save Concert
        </Button>
      </form>

      {/* Rehearsal Scheduling Section */}
      <Card sx={{ backgroundColor: mode === "dark" ? "#333" : "#f5f5f5", padding: "24px", borderRadius: "8px", marginTop: "32px" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ color: mode === "dark" ? "white" : "black", fontWeight: "bold" }}>
            Rehearsal Scheduling
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Rehearsal Time"
                type="datetime-local"
                variant="outlined"
                fullWidth
                value={rehearsalTime}
                onChange={(e) => setRehearsalTime(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  backgroundColor: mode === "dark" ? "#444" : "#fff",
                  color: mode === "dark" ? "white" : "black",
                  borderRadius: "8px",
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Rehearsal Location"
                variant="outlined"
                fullWidth
                value={rehearsalLocation}
                onChange={(e) => setRehearsalLocation(e.target.value)}
                sx={{
                  backgroundColor: mode === "dark" ? "#444" : "#fff",
                  color: mode === "dark" ? "white" : "black",
                  borderRadius: "8px",
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Participants"
                variant="outlined"
                fullWidth
                value={rehearsalParticipants}
                onChange={(e) => setRehearsalParticipants(e.target.value)}
                sx={{
                  backgroundColor: mode === "dark" ? "#444" : "#fff",
                  color: mode === "dark" ? "white" : "black",
                  borderRadius: "8px",
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Set Reminder"
                type="datetime-local"
                variant="outlined"
                fullWidth
                value={rehearsalReminder}
                onChange={(e) => setRehearsalReminder(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  backgroundColor: mode === "dark" ? "#444" : "#fff",
                  color: mode === "dark" ? "white" : "black",
                  borderRadius: "8px",
                }}
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            sx={{
              marginTop: "16px",
              backgroundColor: mode === "dark" ? "#f39c12" : "#3f51b5",
            }}
            onClick={handleAddRehearsal}
            fullWidth
          >
            Add Rehearsal
          </Button>
        </CardContent>
      </Card>

      {/* Show Concert Details */}
      {showConcertDetails && concertTitle && (
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>
            Concert Details:
          </Typography>
          <Typography>Title: {concertTitle}</Typography>
          <Typography>Date: {concertDate}</Typography>
          <Typography>Budget: ${budget}</Typography>
          <Typography>Tasks: {tasks.join(", ")}</Typography>
          <Typography>Resources: {resources.join(", ")}</Typography>
          <Typography>
            Rehearsals: {rehearsals.length > 0 ? rehearsals.map((r, index) => `Rehearsal ${index + 1}: ${r.time} at ${r.location}`).join(", ") : "None"}
          </Typography>
        </Box>
      )}

      {/* Snackbar for Success Confirmation */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message="Your concert has been scheduled successfully!"
      />
    </Box>
  );
};

export default ManagementPage;
