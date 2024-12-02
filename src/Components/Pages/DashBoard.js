import React, { useState, useContext, useEffect } from 'react';
import { Box, Typography, Grid, Card, Button, List, ListItem, ListItemText, Divider, Avatar, TextField, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress } from '@mui/material';
import { EventNote, LocationOn, AccessTime, Cloud } from '@mui/icons-material';
import { ThemeContext } from '../ThemeContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  useEffect(()=>{
    window.scrollTo(0,0)
},[])
  const { mode } = useContext(ThemeContext);
  const navigate = useNavigate();
  
  const [concerts, setConcerts] = useState([]);
  const [weather, setWeather] = useState({ temperature: 'N/A', condition: 'Fetching...', forecast: 'N/A' });
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Rehearsal for Beethoven's 5th scheduled tomorrow at 4:00 PM." },
    { id: 2, message: "New weather update: Rain expected tomorrow!" }
  ]);
  const [progress, setProgress] = useState(50);
  const [openModal, setOpenModal] = useState(false);
  const [newConcert, setNewConcert] = useState({ name: '', date: '', location: '' });

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleAddConcert = () => {
    if (newConcert.name && newConcert.date && newConcert.location) {
      setConcerts((prevConcerts) => [...prevConcerts, newConcert]);
      setNewConcert({ name: '', date: '', location: '' });
      handleCloseModal();
    }
  };

  const handleViewAllNotifications = () => {
    navigate('/notifications');
  };

  const handleViewConcertSchedule = () => {
    navigate('/concerts');
  };

  // Simulating fetching weather data for open-air concerts
  const fetchWeatherData = () => {
    // Mock weather data (would typically fetch from an API)
    setWeather({ temperature: '22°C', condition: 'Clear skies', forecast: 'Sunny' });
  };

  // Call weather fetch on load
  React.useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <Box sx={{ p: 4, minHeight: '100vh', backgroundColor: mode === 'light' ? '#fafafa' : '#121212', color: mode === 'light' ? '#212121' : '#e0e0e0' }}>
      {/* Dashboard Header */}
      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center', color: mode === 'light' ? '#333' : '#fff' }}>
        Open-Air Concert Dashboard
      </Typography>

      {/* Dashboard Content */}
      <Grid container spacing={4}>
        {/* Quick Access Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ p: 3, boxShadow: 3, backgroundColor: mode === 'light' ? '#ffffff' : '#424242', color: mode === 'light' ? '#000' : '#fff' }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: '600' }}>Quick Actions</Typography>
            <Button fullWidth variant="contained" color="primary" sx={{ mb: 1 }} onClick={handleOpenModal}>
              Create New Concert
            </Button>
            <Button fullWidth variant="contained" color="secondary" sx={{ mb: 1 }} onClick={()=>navigate("/view-concert")}>
              View Concert Schedule
            </Button>
            <Button fullWidth variant="outlined" color="primary" sx={{ mb: 1 }} onClick={() => navigate('/concert-tickets')}>
              Manage Tickets
            </Button>
            <Button fullWidth variant="outlined" color="secondary" sx={{ mb: 1 }} onClick={() => navigate('/venues')}>
              Manage Venues
            </Button>
          </Card>
        </Grid>

        {/* Upcoming Concerts Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ p: 3, boxShadow: 3, backgroundColor: mode === 'light' ? '#ffffff' : '#424242', color: mode === 'light' ? '#000' : '#fff' }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: '600' }}>Upcoming Concerts</Typography>
            <List>
              {concerts.map((concert, index) => (
                <ListItem key={index}>
                  <ListItemText primary={concert.name} secondary={`Date: ${concert.date} - Location: ${concert.location}`} />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>

        {/* Weather Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ p: 3, boxShadow: 3, backgroundColor: mode === 'light' ? '#ffffff' : '#424242', color: mode === 'light' ? '#000' : '#fff' }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: '600' }}>Weather Forecast</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {weather.condition === 'Fetching...' ? (
                <CircularProgress size={24} sx={{ mr: 2 }} />
              ) : (
                <Cloud sx={{ fontSize: 32, color: 'skyblue', mr: 2 }} />
              )}
              <Box>
                <Typography variant="body1">{weather.temperature}</Typography>
                <Typography variant="body2">{weather.condition}</Typography>
                <Typography variant="body2">{weather.forecast}</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Notifications Section */}
        <Grid item xs={12}>
          <Card sx={{ p: 3, boxShadow: 3, backgroundColor: mode === 'light' ? '#ffffff' : '#424242', color: mode === 'light' ? '#000' : '#fff' }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: '600' }}>Notifications</Typography>
            <List>
              {notifications.slice(0, 3).map((notification) => (
                <ListItem key={notification.id}>
                  <Avatar sx={{ backgroundColor: 'primary.main', mr: 2 }}>
                    <EventNote sx={{ color: mode === 'light' ? '#fff' : '#000' }} />
                  </Avatar>
                  <ListItemText primary={notification.message} />
                </ListItem>
              ))}
            </List>
            <Button onClick={handleViewAllNotifications}>View More Notifications</Button>
          </Card>
        </Grid>
        
        {/* Progress Tracking Section */}
        <Grid item xs={12}>
          <Card sx={{ p: 3, boxShadow: 3, backgroundColor: mode === 'light' ? '#ffffff' : '#424242', color: mode === 'light' ? '#000' : '#fff' }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: '600' }}>Project Progress</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CircularProgress variant="determinate" value={progress} sx={{ mr: 2 }} />
              <Typography variant="body1">Concert preparation: {progress}% complete</Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Add Concert Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Add New Concert</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Concert Name" value={newConcert.name} onChange={(e) => setNewConcert({ ...newConcert, name: e.target.value })} sx={{ mb: 2 }} />
          <TextField fullWidth label="Date" type="date" value={newConcert.date} onChange={(e) => setNewConcert({ ...newConcert, date: e.target.value })} sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />
          <TextField fullWidth label="Location" value={newConcert.location} onChange={(e) => setNewConcert({ ...newConcert, location: e.target.value })} sx={{ mb: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleAddConcert}>Add Concert</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
