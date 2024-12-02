import React, { useEffect, useState } from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, TextField, Button, Box, Grid, Paper, List, ListItem, ListItemText, Divider, InputAdornment, CircularProgress, Alert } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom'; // For adding navigation links (if you're using React Router)

const HelpAndSupportPage = () => {
  useEffect(()=>{
    window.scrollTo(0,0)
},[])
  const [feedback, setFeedback] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState('');

  // Sample data for filtering (Tutorials and FAQs)
  const tutorials = [
    { title: 'Getting Started with OpenAir', description: 'Learn how to create an account, set up your profile, and navigate the OpenAir dashboard.' },
    { title: 'Event Creation and Management', description: 'Step-by-step guide to creating, managing, and customizing your events, including artist lineup and scheduling.' },
    { title: 'Ticketing and Event Registration', description: 'How to set up ticket sales, offer different ticket types, and manage attendee registrations.' },
    { title: 'Artist Management and Scheduling', description: 'Learn how to manage artists, assign performance times, and handle backstage requirements.' }
  ];

  const faqs = [
    { question: 'How do I create an event?', answer: 'To create an event, go to the "Events" tab, click "Create New Event", and enter all event details such as date, location, and artist lineup.' },
    { question: 'How can I sell tickets for my event?', answer: 'In the event creation process, you can configure ticket types and prices. You can also enable online payment and set ticket limits.' },
    { question: 'How do I add an artist to my event?', answer: 'Go to the "Artists" tab, select "Add Artist", and enter their details such as name, genre, and performance schedule.' },
    { question: 'What should I do if I forget my login credentials?', answer: 'Click "Forgot Password" on the login page, and follow the steps to reset your password.' }
  ];

  // Filter content based on the search query
  const filteredTutorials = tutorials.filter(tutorial => tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) || tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredFAQs = faqs.filter(faq => faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleFeedbackChange = (e) => setFeedback(e.target.value);

  const handleSubmitFeedback = () => {
    setIsSubmittingFeedback(true);
    setFeedbackStatus('');

    // Simulate submitting feedback (e.g., to a backend)
    setTimeout(() => {
      setIsSubmittingFeedback(false);
      setFeedbackStatus('Feedback Submitted! Thank you for your input.');
      setFeedback('');
    }, 1500); // Simulated delay
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" align="center" gutterBottom>
        Help and Support - OpenAir Concert App
      </Typography>

      {/* Search Bar for Filtering */}
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Search Tutorials or FAQs"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </Box>

      {/* Tutorials Section */}
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          1. Tutorials
        </Typography>
        {filteredTutorials.length > 0 ? (
          filteredTutorials.map((tutorial, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${tutorial.title}-content`} id={`${tutorial.title}-header`}>
                <Typography variant="h6">{tutorial.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">{tutorial.description}</Typography>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Typography variant="body1">No results found. Try refining your search.</Typography>
        )}
      </Paper>

      {/* FAQs Section */}
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          2. Frequently Asked Questions (FAQs)
        </Typography>
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq, index) => (
            <List key={index}>
              <ListItem>
                <ListItemText primary={faq.question} secondary={faq.answer} />
              </ListItem>
              <Divider />
            </List>
          ))
        ) : (
          <Typography variant="body1">No results found. Try refining your search.</Typography>
        )}
      </Paper>

      {/* Contact Support Section */}
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          3. Contact Support
        </Typography>
        <Typography variant="body1" paragraph>
          If you need further assistance, contact us through the following methods:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Live Chat Support" secondary="Click the chat icon in the bottom-right corner for real-time assistance." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Email Support" secondary="Email us at support@openairconcertapp.com. We will respond within 24-48 hours." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Phone Support" secondary="Call +1-800-555-1234 for direct assistance with your account or event details." />
          </ListItem>
        </List>
      </Paper>

      {/* Feedback Section */}
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h5" gutterBottom>
          4. Feedback and Suggestions
        </Typography>
        <Typography variant="body1" paragraph>
          We value your feedback! Please share your thoughts or report any issues you've encountered with the OpenAir app.
        </Typography>
        <TextField
          label="Enter Your Feedback"
          multiline
          rows={4}
          fullWidth
          value={feedback}
          onChange={handleFeedbackChange}
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitFeedback}
          disabled={isSubmittingFeedback}
        >
          {isSubmittingFeedback ? <CircularProgress size={24} color="inherit" /> : 'Submit Feedback'}
        </Button>

        {feedbackStatus && (
          <Alert sx={{ marginTop: 2 }} severity="success">
            {feedbackStatus}
          </Alert>
        )}
      </Paper>

      {/* Footer Link */}
      <Box sx={{ marginTop: 4, textAlign: 'center' }}>
        <Link to="/help" style={{ textDecoration: 'none', color: '#3f51b5' }}>
          OpenAir Help and Support
        </Link>
      </Box>
    </Container>
  );
};

export default HelpAndSupportPage;
