import React, { useContext } from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { ThemeContext } from "./ThemeContext";

const AboutPage = () => {
  const { mode } = useContext(ThemeContext); // Get the current theme mode (light/dark)

  return (
    <Box
      className="about-page"
      sx={{
        p: 3,
        backgroundColor: mode === "light" ? "#f5f5f5" : "#121212", // Light/Dark background color
        color: mode === "light" ? "#000" : "#fff", // Text color for light/dark theme
        fontFamily: "'Poppins', sans-serif", // Add a sleek font for a music concert vibe
      }}
    >
      {/* About Header Section */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            letterSpacing: "2px",
            fontSize: "4rem",
            textTransform: "uppercase", // Bold and clear heading
            color: mode === "light" ? "#000" : "#fff",
            textShadow: mode === "light" ? "none" : "2px 2px 5px rgba(255, 255, 255, 0.3)", // Subtle shadow for dark theme
          }}
        >
          About OpenAir Concerts
        </Typography>
        <Typography variant="h5" sx={{ fontStyle: 'italic', mt: 1, fontSize: "1.5rem" }}>
          Bringing unforgettable open-air concert experiences to life!
        </Typography>
      </Box>

      {/* About Content Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" sx={{ fontWeight: 600, fontSize: "1.75rem" }}>
            Our Mission
          </Typography>
          <Typography paragraph>
            At OpenAir Concerts, we are dedicated to creating world-class outdoor musical events
            that bring together talented performers and passionate audiences. Our mission is to provide
            a platform where music lovers can experience breathtaking performances under the open sky.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, fontSize: "1.75rem" }}>
            Our Vision
          </Typography>
          <Typography paragraph>
            Our vision is to become the premier destination for open-air concerts globally. We aim to offer diverse
            performances, from classical symphonies to modern live music, all set against stunning outdoor backdrops.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} sx={{ textAlign: 'center' }}>
          <img
            src="https://img.freepik.com/free-photo/rear-view-excited-fans-having-fun-music-festival-taking-pictures-stage-with-their-smart-phones-copy-space_637285-607.jpg?t=st=1732706418~exp=1732710018~hmac=63ffbcf7ae70890a02b2f6d1fafbd0645d91ab2ebb67a0294b2f29f0ecdc0ce5&w=1380"
            alt="Concert"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
              boxShadow: mode === "light" ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "0 4px 8px rgba(255, 255, 255, 0.1)", // Adjust box shadow for dark theme
            }}
          />
        </Grid>
      </Grid>

      {/* Team Section */}
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, fontSize: "2.5rem" }}>
          Meet Our Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {/* Team Member 1 */}
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                boxShadow: 3,
                height: "400px",
                backgroundColor: mode === "light" ? "#fff" : "#424242", // Card background color
                transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition
                "&:hover": {
                  transform: "scale(1.05)", // Scale effect on hover
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)", // Deep shadow on hover
                },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "250px", // Increased height to better display the image
                  overflow: "hidden",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                }}
              >
                <img
                  src="https://img.freepik.com/free-photo/guitar-music-outdoors_23-2148079155.jpg?t=st=1732703370~exp=1732706970~hmac=74667da928d10b05c44d5c3945fda6bf17be4f6ddf65f8b56b72dd86f657b6a3&w=740"
                  alt="John Doe"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ color: mode === "light" ? "#000" : "#fff" }}>John Doe</Typography>
                <Typography variant="body2" color={mode === "light" ? "textSecondary" : "text.primary"}>
                  Founder & CEO
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Team Member 2 */}
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                boxShadow: 3,
                height: "400px",
                backgroundColor: mode === "light" ? "#fff" : "#424242", // Card background color
                transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition
                "&:hover": {
                  transform: "scale(1.05)", // Scale effect on hover
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)", // Deep shadow on hover
                },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "250px", // Increased height to better display the image
                  overflow: "hidden",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                }}
              >
                <img
                  src="https://img.freepik.com/free-photo/elegant-man-with-folded-arms_1262-727.jpg?t=st=1732796214~exp=1732799814~hmac=c2ecaf6c322f38d302fe00a26e19d4c0311bd78f8878241ffb83c5674812610f&w=996"
                  alt="Jane Smith"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ color: mode === "light" ? "#000" : "#fff" }}>Jane Smith</Typography>
                <Typography variant="body2" color={mode === "light" ? "textSecondary" : "text.primary"}>
                  Music Director
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Team Member 3 */}
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                boxShadow: 3,
                height: "400px",
                backgroundColor: mode === "light" ? "#fff" : "#424242", // Card background color
                transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition
                "&:hover": {
                  transform: "scale(1.05)", // Scale effect on hover
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)", // Deep shadow on hover
                },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "250px", // Increased height to better display the image
                  overflow: "hidden",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                }}
              >
                <img
                  src="https://img.freepik.com/free-photo/front-view-cute-japanese-girl-tokyo_23-2148665360.jpg?t=st=1733037986~exp=1733041586~hmac=00b14b7374a60d2323538d3880ad0aa4603b4e842a4d413fbc2a6ac50269ef51&w=900"
                  alt="Sam Lee"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ color: mode === "light" ? "#000" : "#fff" }}>Sam Lee</Typography>
                <Typography variant="body2" color={mode === "light" ? "textSecondary" : "text.primary"}>
                  Event Coordinator
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AboutPage;
