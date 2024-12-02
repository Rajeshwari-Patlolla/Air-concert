import React, { useContext, useEffect } from "react";
import { Box, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { ThemeContext } from "./ThemeContext";

const HomePage = () => {
  useEffect(()=>{
    window.scrollTo(0,0)
},[])
  const { mode } = useContext(ThemeContext); // Get the current theme (light or dark)

  return (
    <Box sx={{ fontFamily: "Arial, sans-serif", overflowX: "hidden" }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url('https://img.freepik.com/free-photo/people-festival_1160-736.jpg?t=st=1733035401~exp=1733039001~hmac=a48d9bdfd6e0fd397e6747963aac7ed3e0d08a281447d3547bfd423495290f6c&w=996')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: mode === "dark" ? "white" : "black", // Text color based on theme
        }}
      >
        <Box
          sx={{
            backgroundColor: mode === "dark" ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.6)", // Dark background for dark mode
            padding: "2rem",
            borderRadius: "10px",
            maxWidth: "80%",
            transition: "all 0.3s ease-in-out", // Transition effect for smooth background change
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>
            Welcome to <span style={{ color: "#f39c12" }}>Open-Air Concerts</span> 🎶
          </Typography>
          <Typography variant="h5" sx={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
            Seamlessly plan and manage open-air concerts with cutting-edge tools for event organizers, performers, and venue managers.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#f39c12",
              color: mode === "dark" ? "black" : "white", // Button text color based on theme
              padding: "0.75rem 2rem",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#d35400",
                transform: "scale(1.05)", // Smooth scaling on hover
                transition: "all 0.3s ease-in-out",
              },
            }}
            href="/register"
          >
            Get Started
          </Button>
        </Box>
      </Box>

      {/* Key Features Section */}
      <Box sx={{ padding: "4rem 2rem", backgroundColor: mode === "dark" ? "#333" : "#f4f4f4", textAlign: "center" }}>
        <Typography variant="h4" sx={{ marginBottom: "2rem", color: mode === "dark" ? "white" : "black" }}>
          Key Features of the Open-Air Concerts App
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {/* Feature Cards */}
          {[{ title: "Concert Scheduling & Management", description: "Plan, manage, and track your open-air concert projects with integrated schedules, budget tools, and real-time weather updates.", imgSrc: "https://img.freepik.com/premium-photo/man-playing-trumpet-music-concert-night_1048944-4118177.jpg?w=900" }, { title: "Venue Selection & Mapping", description: "Choose and manage outdoor venues with interactive venue maps and capacity details to ensure the perfect event setup.", imgSrc: "https://img.freepik.com/free-photo/finding-out-shortest-way-back_329181-13761.jpg?t=st=1733035841~exp=1733039441~hmac=490762d21ab62992035474f09773eb6d146389938c33efd4d7c991b3cce63a32&w=900" }, { title: "Collaboration Tools", description: "Collaborate in real-time with event organizers, performers, and venue managers through shared workspaces, messaging, and video calls.", imgSrc: "https://img.freepik.com/free-photo/business-partners-meet-with-people_482257-79716.jpg?t=st=1733035710~exp=1733039310~hmac=4aafdfc1fc756a3b11632fdcb15ab44407d28072a30965c982228c2612bef665&w=900" }, { title: "Ticketing & Payments", description: "A fully integrated ticketing system for seat selection, payment processing, and easy ticket management.", imgSrc: "https://img.freepik.com/free-photo/man-using-smartphone_53876-20713.jpg?t=st=1733035645~exp=1733039245~hmac=55e1f00c8b05c732b0fa01ccdfdd4686a0ac3c8d28c6536c19344ea937cac18e&w=900" }].map((card, index) => (
            <Grid item xs={12} sm={4} md={3} key={index}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)", // Smooth hover effect
                    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                <img
                  src={card.imgSrc}
                  alt={card.title}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  }}
                />
                <CardContent sx={{ flexGrow: 1, textAlign: "center", backgroundColor: mode === "dark" ? "#444" : "#fff" }}>
                  <Typography variant="h6" sx={{ color: mode === "dark" ? "white" : "black" }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color={mode === "dark" ? "textSecondary" : "textPrimary"} sx={{ padding: "1rem 0" }}>
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Featured Events Section */}
      <Box sx={{ padding: "4rem 2rem", backgroundColor: mode === "dark" ? "#333" : "#f4f4f4", textAlign: "center" }}>
        <Typography variant="h4" sx={{ marginBottom: "2rem", color: mode === "dark" ? "white" : "black" }}>
          Featured Open-Air Concerts 🎤
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {/* Event Cards */}
          {[{ title: "International Open-Air Concert Series", description: "Join us for a global celebration of music with open-air performances featuring top musicians and composers.", imgSrc: "https://img.freepik.com/premium-photo/playing-music-party-afternoon-with-outdoor-dj-park_866797-14688.jpg?w=900" }, { title: "Sunset Music Fest", description: "An unforgettable music festival held during sunset, combining breathtaking views with great music.", imgSrc: "https://img.freepik.com/premium-photo/man-is-standing-front-dj-set-up-with-sunset-background_15008-7742.jpg?w=900" }, { title: "Jazz in the Park", description: "Celebrate jazz music under the stars with incredible performances in a beautiful park setting.", imgSrc: "https://img.freepik.com/free-photo/beautiful-romantic-girls-park-with-violin_1157-23778.jpg?t=st=1733036233~exp=1733039833~hmac=c417c0c78a1469f86a666b2a3497715b248b77466e69bc2e632ac4f1ec3fdc6f&w=900" }].map((event, index) => (
            <Grid item xs={12} sm={4} md={3} key={index}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)", // Smooth hover effect
                    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                <img
                  src={event.imgSrc}
                  alt={event.title}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  }}
                />
                <CardContent sx={{ flexGrow: 1, textAlign: "center", backgroundColor: mode === "dark" ? "#444" : "#fff" }}>
                  <Typography variant="h6" sx={{ color: mode === "dark" ? "white" : "black" }}>
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color={mode === "dark" ? "textSecondary" : "textPrimary"} sx={{ padding: "1rem 0" }}>
                    {event.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* New Upcoming Events Section */}
      <Box sx={{ padding: "4rem 2rem", backgroundColor: mode === "dark" ? "#444" : "#fff", textAlign: "center" }}>
        <Typography variant="h4" sx={{ marginBottom: "2rem", color: mode === "dark" ? "white" : "black" }}>
          Upcoming Open-Air Concerts 🔥
        </Typography>
        <Typography variant="body1" sx={{ paddingBottom: "1rem", color: mode === "dark" ? "white" : "black" }}>
          Get ready for some of the most exciting outdoor music events coming your way!
        </Typography>
        <Button variant="contained" sx={{ backgroundColor: "#f39c12", padding: "0.75rem 2rem", color: mode === "dark" ? "black" : "white" }}>
          Learn More
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
