import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Modal,
  IconButton,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { useMediaQuery, useTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const CollaborationPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);

  // Handle adding a new task
  const handleAddTask = () => {
    if (taskInput.trim() && selectedDate && selectedTime) {
      const newTask = {
        task: taskInput,
        date: selectedDate.format("YYYY-MM-DD"),
        time: selectedTime.format("HH:mm"),
      };
      setTasks([...tasks, newTask]);
      setTaskInput("");
      setSelectedDate(null);
      setSelectedTime(null);
    }
  };

  // Handle sending a message in the chat
  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        user: "User", // Replace this with the actual user
        text: messageInput,
      };
      setMessages([...messages, newMessage]);
      setMessageInput(""); // Clear the input after sending
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          padding: isSmallScreen ? 2 : 4,
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
        }}
      >
        {/* Title */}
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            mb: 4,
            color: theme.palette.mode === "dark" ? "#fff" : "#000",
          }}
        >
          Collaboration and Communication
        </Typography>

        <Grid container spacing={4}>
          {/* Real-time Chat Section */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                p: 3,
                boxShadow: 3,
                borderRadius: "12px",
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "600", mb: 2 }}>
                Real-Time Chat
              </Typography>
              {/* Chat Display */}
              <Box sx={{ maxHeight: 300, overflowY: "auto", mb: 2 }}>
                <List>
                  {messages.map((message, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`${message.user}: ${message.text}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
              {/* Chat Input */}
              <TextField
                fullWidth
                variant="outlined"
                label="Type your message"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSendMessage}
                fullWidth
                endIcon={<SendIcon />}
              >
                Send
              </Button>
            </Card>
          </Grid>

          {/* Task List and Project Progress Section */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                p: 3,
                boxShadow: 3,
                borderRadius: "12px",
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "600", mb: 2 }}>
                Task List and Project Progress
              </Typography>
              <List>
                {/* Example of ongoing tasks */}
                <ListItem>
                  <ListItemText
                    primary="Rehearsal Planning - In Progress"
                    secondary="50% Completed"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Stage Setup - Pending" />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Musician Coordination - Completed"
                    secondary="100% Completed"
                  />
                </ListItem>
              </List>
            </Card>
          </Grid>

          {/* Task Scheduling Section */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                p: 3,
                boxShadow: 3,
                borderRadius: "12px",
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "600", mb: 2 }}>
                Schedule New Task
              </Typography>

              <TextField
                fullWidth
                variant="outlined"
                label="Enter Task"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                sx={{ mb: 2 }}
              />

              <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={(newDate) => setSelectedDate(newDate)}
                renderInput={(params) => <TextField {...params} fullWidth />}
                sx={{ mb: 2 }}
              />

              <TimePicker
                label="Select Time"
                value={selectedTime}
                onChange={(newTime) => setSelectedTime(newTime)}
                renderInput={(params) => <TextField {...params} fullWidth />}
                sx={{ mb: 2 }}
              />

              <Button
                variant="contained"
                color="primary"
                onClick={handleAddTask}
                fullWidth
              >
                Add Task and Schedule
              </Button>

              {/* Display Scheduled Tasks */}
              {tasks.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Scheduled Tasks:
                  </Typography>
                  {tasks.map((task, index) => (
                    <List key={index}>
                      <ListItem>
                        <ListItemText
                          primary={task.task}
                          secondary={`Date: ${task.date}, Time: ${task.time}`}
                        />
                      </ListItem>
                    </List>
                  ))}
                </Box>
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default CollaborationPage;
