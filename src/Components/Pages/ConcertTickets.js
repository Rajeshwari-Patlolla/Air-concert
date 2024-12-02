import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';

const TicketDetailsPage = () => {
  useEffect(()=>{
    window.scrollTo(0,0)
},[])
  const { concertId } = useParams();

  // Fetch concert details based on the concertId (you can use state or fetch data)
  const concertDetails = {
    id: concertId,
    name: 'Beethoven’s 5th',
    totalTickets: 500,
    soldTickets: 250,
    price: '$50',
    availableTickets: 250
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#fff' }}>
      <Typography variant="h4" sx={{ fontWeight: '600' }}>
        {concertDetails.name} - Ticket Details
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Total Tickets: {concertDetails.totalTickets}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Tickets Sold: {concertDetails.soldTickets}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Price per Ticket: {concertDetails.price}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Available Tickets: {concertDetails.availableTickets}
      </Typography>
      <Button variant="contained" color="primary">
        Manage Ticket Inventory
      </Button>
    </Box>
  );
};

export default TicketDetailsPage;
