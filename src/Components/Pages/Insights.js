import React, { useEffect } from 'react';
import { Box, Typography, Grid, Card, LinearProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const MoreInsightsPage = () => {
  useEffect(()=>{
    window.scrollTo(0,0)
},[])
  const theme = useTheme();

  // Example data for detailed insights
  const ticketSalesData = [
    { date: '2024-12-01', sales: 50 },
    { date: '2024-12-02', sales: 75 },
    { date: '2024-12-03', sales: 100 },
    { date: '2024-12-04', sales: 125 },
  ];

  return (
    <Box sx={{ p: 4, backgroundColor: theme.palette.background.paper, minHeight: '100vh' }}>
      <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4 }}>
        More Insights
      </Typography>

      <Grid container spacing={4}>
        {/* Ticket Sales Insights */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 3, borderRadius: '12px', backgroundColor: theme.palette.background.default }}>
            <Typography variant="h5" sx={{ fontWeight: '600', mb: 2 }}>
              Ticket Sales History
            </Typography>
            <Grid container spacing={2}>
              {ticketSalesData.map((data, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Typography variant="body1">{data.date}: {data.sales} tickets sold</Typography>
                  <LinearProgress variant="determinate" value={(data.sales / 150) * 100} sx={{ height: 10, mb: 2 }} />
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>

        {/* Add more insights sections here */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 3, borderRadius: '12px', backgroundColor: theme.palette.background.default }}>
            <Typography variant="h5" sx={{ fontWeight: '600', mb: 2 }}>
              Rehearsal Details
            </Typography>
            {/* You can add detailed graphs, logs, or data related to rehearsals here */}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MoreInsightsPage;
