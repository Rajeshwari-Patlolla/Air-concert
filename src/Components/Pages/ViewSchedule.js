import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ViewConcertSchedulePage = () => {
  const theme = useTheme();

  // Simulated concert schedule data
  const [concerts, setConcerts] = useState([
    { id: 1, name: 'Beethoven’s 5th', date: '2024-12-05', location: 'Central Park' },
    { id: 2, name: 'Mozart in the Park', date: '2024-12-12', location: 'City Arena' },
    { id: 3, name: 'Summer Jazz Fest', date: '2024-12-19', location: 'Beachfront Stage' },
  ]);

  useEffect(() => {
    
      window.scrollTo(0,0)
  
    // Simulate fetching concert schedule data
    // In a real-world scenario, this would come from an API
  }, []);

  return (
    <Box sx={{ p: 4, minHeight: '100vh', backgroundColor: theme.palette.background.paper }}>
      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
        Concert Schedule
      </Typography>
      <Grid container spacing={4}>
        {concerts.map((concert) => (
          <Grid item xs={12} md={6} key={concert.id}>
            <Card sx={{ p: 3, boxShadow: 3, borderRadius: '12px', backgroundColor: theme.palette.background.default }}>
              <Typography variant="h5" sx={{ fontWeight: '600' }}>
                {concert.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Date: {concert.date}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Location: {concert.location}
              </Typography>
              <Button fullWidth variant="outlined">
                View Details
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ViewConcertSchedulePage;
