import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Card, Avatar } from "@mui/material";

const GamificationSection = () => {
  const [badges, setBadges] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [progress, setProgress] = useState(0);
  useEffect(()=>{
    window.scrollTo(0,0)
},[])

  useEffect(() => {
    
    // Fetch badges and leaderboard (mock data)
    const fetchGamificationData = async () => {
      // Here you can make API calls to your backend to fetch real-time user progress and badges.
      setBadges([{ title: "Master Conductor", imageUrl: "badge1.png" }]);
      setLeaderboard([
        { name: "John Doe", score: 120 },
        { name: "Jane Smith", score: 110 },
      ]);
      setProgress(85); // User progress in percentage
    };

    fetchGamificationData();
  }, []);

  return (
    <Box sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Gamification
      </Typography>

      <Card sx={{ p: 3, mb: 2 }}>
        <Typography variant="h6">Achievements</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {badges.map((badge, index) => (
            <Box key={index} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Avatar src={badge.imageUrl} sx={{ width: 60, height: 60, mb: 1 }} />
              <Typography variant="body2">{badge.title}</Typography>
            </Box>
          ))}
        </Box>
      </Card>

      <Card sx={{ p: 3, mb: 2 }}>
        <Typography variant="h6">Leaderboard</Typography>
        {leaderboard.map((user, index) => (
          <Box key={index} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body1">{user.name}</Typography>
            <Typography variant="body1">{user.score} points</Typography>
          </Box>
        ))}
      </Card>

      <Card sx={{ p: 3 }}>
        <Typography variant="h6">Progress</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1" sx={{ mr: 2 }}>Progress: {progress}%</Typography>
          <Box sx={{ width: "100%", height: 10, backgroundColor: "#ccc" }}>
            <Box sx={{ width: `${progress}%`, height: "100%", backgroundColor: "#4caf50" }} />
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default GamificationSection;
