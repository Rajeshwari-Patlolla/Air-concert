import { Box, Button, Card, CircularProgress, Grid, LinearProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import AddChartIcon from '@mui/icons-material/Addchart';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useTheme } from '@mui/material/styles';

const ProgressTrackingPage = () => {
  useEffect(()=>{
    window.scrollTo(0,0)
},[])
  const [eventProgress, setEventProgress] = useState(80); // Event tasks progress (rehearsals, setup)
  const [rehearsalProgress, setRehearsalProgress] = useState(60); // Example rehearsal hours progress
  const [ticketSales, setTicketSales] = useState(350); // Example ticket sales (out of a target)
  const [musicianParticipation, setMusicianParticipation] = useState(85); // Musician participation rate
  const [weatherCondition, setWeatherCondition] = useState('Clear'); // Example weather condition
  const [resourcesAllocated, setResourcesAllocated] = useState(40); // Resource allocation percentage
  const navigate = useNavigate();
  
  // Accessing theme
  const theme = useTheme();

  // Performance Analytics Pie Chart Data
  const performanceData = [
    { name: "Completed", value: 80 },
    { name: "Pending", value: 20 },
  ];

  return (
    <Box
      sx={{
        p: { xs: 3, sm: 4 },
        backgroundColor: theme.palette.background.paper, 
        minHeight: "100vh",
      }}
    >
      <Typography variant="h3" sx={{ textAlign: "center", fontWeight: "bold", mb: 4 }}>
        Concert Insights
      </Typography>

      <Grid container spacing={4}>
        {/* Event Progress Tracking */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 3, borderRadius: "12px", backgroundColor: theme.palette.background.default }}>
            <Typography variant="h5" sx={{ fontWeight: "600", mb: 2 }}>
              Event Progress
            </Typography>
            <LinearProgress variant="determinate" value={eventProgress} sx={{ height: 10, mb: 2 }} />
            <Typography variant="body1" color="textSecondary" sx={{ textAlign: "center" }}>
              {eventProgress}% of event preparation tasks completed
            </Typography>
          </Card>
        </Grid>

        {/* Rehearsal Hours Progress */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 3, borderRadius: "12px", backgroundColor: theme.palette.background.default }}>
            <Typography variant="h5" sx={{ fontWeight: "600", mb: 2 }}>
              Rehearsal Progress
            </Typography>
            <LinearProgress variant="determinate" value={rehearsalProgress} sx={{ height: 10, mb: 2 }} />
            <Typography variant="body1" color="textSecondary" sx={{ textAlign: "center" }}>
              {rehearsalProgress}% of rehearsal hours completed
            </Typography>
          </Card>
        </Grid>

        {/* Ticket Sales Progress */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 3, borderRadius: "12px", backgroundColor: theme.palette.background.default }}>
            <Typography variant="h5" sx={{ fontWeight: "600", mb: 2 }}>
              Ticket Sales
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Total Tickets Sold: {ticketSales}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(ticketSales / 1000) * 100} // Assuming a goal of 1000 tickets
              sx={{ height: 10, mb: 2 }}
            />
            <Typography variant="body1" color="textSecondary" sx={{ textAlign: "center" }}>
              {((ticketSales / 1000) * 100).toFixed(2)}% of ticket sales goal achieved
            </Typography>
          </Card>
        </Grid>

        {/* Musician Participation */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 3, borderRadius: "12px", backgroundColor: theme.palette.background.default }}>
            <Typography variant="h5" sx={{ fontWeight: "600", mb: 2 }}>
              Musician Participation
            </Typography>
            <CircularProgress variant="determinate" value={musicianParticipation} size={100} sx={{ mb: 2 }} />
            <Typography variant="body1" color="textSecondary" sx={{ textAlign: "center" }}>
              {musicianParticipation}% participation rate
            </Typography>
          </Card>
        </Grid>

        {/* Resource Allocation (Pie Chart) */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 3, borderRadius: "12px", backgroundColor: theme.palette.background.default }}>
            <Typography variant="h5" sx={{ fontWeight: "600", mb: 2 }}>
              Resource Allocation
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={performanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell key="1" fill="#0088FE" />
                  <Cell key="2" fill="#FF8042" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <Typography variant="body1" color="textSecondary" sx={{ textAlign: "center" }}>
              Resource usage: {resourcesAllocated}%
            </Typography>
          </Card>
        </Grid>

        {/* Weather Condition */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 3, borderRadius: "12px", backgroundColor: theme.palette.background.default }}>
            <Typography variant="h5" sx={{ fontWeight: "600", mb: 2 }}>
              Weather Conditions
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Current Weather: {weatherCondition}
            </Typography>
            {/* Weather can be visualized with more interactive charts or icons if needed */}
            <Typography variant="body1" color="textSecondary" sx={{ textAlign: "center" }}>
              Keep an eye on the weather for outdoor events!
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Add more insights or customizable dashboard for roles */}
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate("/dashboard")}
            startIcon={<AddChartIcon />}
          >
            Create Custom Dashboard
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => navigate("/more-insights")}
            startIcon={<MoreHorizIcon />}
          >
            More Insights
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProgressTrackingPage;
