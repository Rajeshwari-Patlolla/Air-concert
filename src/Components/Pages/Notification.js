// src/components/NotificationPage.js
import React, { useEffect } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Typography,
  Paper,
} from '@mui/material';
import { CalendarToday, NotificationImportant } from '@mui/icons-material';

const NotificationPage = ({ reminders = [] }) => {
  useEffect(()=>{
    window.scrollTo(0,0)
},[])
  // Dummy reminder data if no reminders are passed
  const dummyReminder = {
    title: "Upcoming Rehearsal",
    message: "Your rehearsal for the upcoming concert is tomorrow at 4:00 PM",
    timestamp: "12/01/2024"
  };

  // If no reminders are passed, we use the dummy reminder
  const finalReminders = reminders.length > 0 ? reminders : [dummyReminder];

  return (
    <Box sx={{ padding: 4, backgroundColor: 'background.default' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        Notifications & Reminders
      </Typography>

      {/* Reminders Section */}
      <Paper sx={{ padding: 3, boxShadow: 2, mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: '600', mb: 2 }}>
          Reminders
        </Typography>

        <List>
          {finalReminders.map((reminder, index) => (
            <div key={index}>
              <ListItem>
                <IconButton edge="start">
                  <CalendarToday />
                </IconButton>
                <ListItemText
                  primary={reminder.title}
                  secondary={`${reminder.message} - ${reminder.timestamp}`}
                />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Paper>

      {/* Other Notifications Section */}
      <Paper sx={{ padding: 3, boxShadow: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: '600', mb: 2 }}>
          Other Notifications
        </Typography>

        <List>
          {/* Example notifications */}
          <ListItem>
            <IconButton edge="start">
              <NotificationImportant />
            </IconButton>
            <ListItemText
              primary="New Milestone"
              secondary="You have reached a new milestone in your project!"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <IconButton edge="start">
              <NotificationImportant />
            </IconButton>
            <ListItemText
              primary="Community Interaction"
              secondary="Someone commented on your shared concert!"
            />
          </ListItem>
          <Divider />
        </List>
      </Paper>
    </Box>
  );
};

export default NotificationPage;
