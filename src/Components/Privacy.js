import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
  Box,
  Paper,
  ThemeProvider,
  createTheme,
} from "@mui/material";

const PrivacyPolicyPage = () => {
  useEffect(()=>{
    window.scrollTo(0,0)
},[])
  const theme = createTheme({
    palette: {
      mode: "light", // Default to light theme
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Privacy & Cookies Policy
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box sx={{ my: 4 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Privacy Policy
            </Typography>
            <Typography variant="body1" gutterBottom>
              This Privacy Policy explains Symphony’s practices regarding the
              collection of personal data when you use our website. We ensure
              that your data is handled securely and in compliance with data
              protection regulations.
            </Typography>
            <Typography variant="h6" gutterBottom>
              Data Collection
            </Typography>
            <Typography variant="body2" paragraph>
              We collect data such as your name, email address, phone number,
              and usage behavior on our platform. Data is collected via
              registration forms, cookies, and other tracking mechanisms.
            </Typography>
            <Typography variant="h6" gutterBottom>
              Your Rights
            </Typography>
            <Typography variant="body2" paragraph>
              You have the right to access, correct, and delete your data. For
              further details, contact our Help Center.
            </Typography>
          </Paper>
        </Box>
        <Box sx={{ my: 4 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Cookies Policy
            </Typography>
            <Typography variant="body1" gutterBottom>
              Cookies are small text files used to improve your experience. By
              using our site, you consent to the use of cookies as described in
              this policy.
            </Typography>
            <Typography variant="h6" gutterBottom>
              Types of Cookies
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Strictly Necessary Cookies:</strong> These cookies are
              essential for site functionality. <br />
              <strong>Performance Cookies:</strong> These cookies collect
              anonymous data for analytics purposes.
            </Typography>
            <Typography variant="h6" gutterBottom>
              Managing Cookies
            </Typography>
            <Typography variant="body2" paragraph>
              You can manage your cookie preferences via your browser settings.
              Note that some features may not function properly if cookies are
              disabled.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default PrivacyPolicyPage;
