import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  Modal,
  TextField,
  Alert,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  List,
  ListItem,
  ListItemText,
  FormControl,
} from "@mui/material";

import QRCode from "react-qr-code";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { ThemeContext } from "../ThemeContext";

const TicketingPage = () => {
  useEffect(()=>{
    window.scrollTo(0,0)
},[])
  const { mode } = useContext(ThemeContext); // Access the current theme mode (light/dark)
  const isLightTheme = mode === "light";  // Check if the theme is light

  const [state, setState] = useState({
    selectedSeat: "",
    ticketCount: 1,
    paymentDetails: "",
    showQR: false,
    openModal: false,
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    paymentStatus: "",
    purchaseHistory: [],
    specialOffer: null,
  });

  const [seatPrice, setSeatPrice] = useState(0);
  const seatPrices = {
    A1: 500,
    A2: 450,
    B1: 350,
    B2: 300,
  };

  const handleStateChange = (field, value) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSeatSelection = (seat) => {
    handleStateChange("selectedSeat", seat);
    setSeatPrice(seatPrices[seat]);
  };

  const handlePayment = () => {
    const { selectedSeat, ticketCount, cardNumber, expiryDate, cvv, purchaseHistory } = state;

    if (selectedSeat && cardNumber && expiryDate && cvv) {
      const totalPrice = seatPrice * ticketCount;

      const ticketInfo = `Seat: ${selectedSeat}, Tickets: ${ticketCount} - Total Price: $${totalPrice} - Concert Ticket Confirmed`;
      handleStateChange("paymentDetails", ticketInfo);
      handleStateChange("showQR", true);
      handleStateChange("paymentStatus", "Payment Successful");
      handleStateChange("openModal", false);

      handleStateChange("purchaseHistory", [
        ...purchaseHistory,
        { seat: selectedSeat, ticketCount, totalPrice, paymentStatus: "Confirmed" },
      ]);

      if (purchaseHistory.length + 1 >= 3) {
        handleStateChange("specialOffer", "You qualify for a 10% discount!");
      }
    } else {
      handleStateChange("paymentStatus", "Payment Failed. Please fill all required details.");
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 3, sm: 4 },
        minHeight: "100vh",
        backgroundColor: isLightTheme ? "#f5f5f5" : "#121212",  // Background color based on theme
        color: isLightTheme ? "#000" : "#fff",  // Text color based on theme
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          mb: 4,
          color: isLightTheme ? "#049A9E" : "#f0f0f0",  // Heading color for light and dark theme
        }}
      >
        Ticketing System
      </Typography>

      {state.specialOffer && <Alert severity="info" sx={{ mb: 2 }}>{state.specialOffer}</Alert>}

      {state.paymentStatus && <Alert severity={state.paymentStatus.includes("Failed") ? "error" : "success"} sx={{ mb: 2 }}>{state.paymentStatus}</Alert>}

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 3, borderRadius: "12px", backgroundColor: isLightTheme ? "#fff" : "#1f1f1f" }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>Select Your Seat</Typography>
            <Grid container spacing={1}>
              {Object.keys(seatPrices).map((seat) => (
                <Grid item xs={6} key={seat}>
                  <Button
                    variant={state.selectedSeat === seat ? "contained" : "outlined"}
                    color="primary"
                    fullWidth
                    onClick={() => handleSeatSelection(seat)}
                  >
                    {seat}
                  </Button>
                </Grid>
              ))}
            </Grid>

            <Typography variant="h6" sx={{ mt: 2 }}>Select Number of Tickets</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              value={state.ticketCount}
              onChange={(e) => handleStateChange("ticketCount", e.target.value)}
              sx={{ mb: 2 }}
              inputProps={{ min: 1 }}
            />

            {state.selectedSeat && <Typography variant="h6" sx={{ mt: 2 }}>Price per ticket: ${seatPrice} | Total Price: ${seatPrice * state.ticketCount}</Typography>}

            <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={() => handleStateChange("openModal", true)} disabled={!state.selectedSeat}>
              Proceed to Payment
            </Button>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, textAlign: "center", boxShadow: 3, borderRadius: "12px", backgroundColor: isLightTheme ? "#fff" : "#1f1f1f" }}>
            {state.showQR ? (
              <>
                <Typography variant="h5" sx={{ mb: 2 }}>Your Ticket</Typography>
                <QRCode value={`Concert Ticket - ${state.paymentDetails}`} size={150} />
                <Typography sx={{ mt: 2 }}>{state.paymentDetails}</Typography>
                <IconButton sx={{ mt: 2 }} onClick={() => window.print()}>
                  <QrCodeIcon color="primary" />
                </IconButton>
                <Typography sx={{ mt: 2 }}>Enjoy your concert!</Typography>
              </>
            ) : (
              <Typography variant="h6" color="textSecondary">Your QR code will appear here after payment.</Typography>
            )}
          </Card>
        </Grid>
      </Grid>

      <Modal open={state.openModal} onClose={() => handleStateChange("openModal", false)}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: { xs: 300, sm: 400 }, backgroundColor: isLightTheme ? "#fff" : "#333", boxShadow: 24, p: 4, borderRadius: "12px" }}>
          <Typography variant="h6" sx={{ mb: 3, color: isLightTheme ? "#0B2B53" : "#f0f0f0" }}>Payment Details</Typography>

          <FormControl component="fieldset">
            <RadioGroup row value={state.paymentMethod} onChange={(e) => handleStateChange("paymentMethod", e.target.value)}>
              <FormControlLabel value="card" control={<Radio />} label="Debit/Credit Card" />
            </RadioGroup>
          </FormControl>

          <TextField fullWidth variant="outlined" label="Card Number" sx={{ mb: 2 }} value={state.cardNumber} onChange={(e) => handleStateChange("cardNumber", e.target.value)} />
          <TextField fullWidth variant="outlined" label="Expiry Date" sx={{ mb: 2 }} value={state.expiryDate} onChange={(e) => handleStateChange("expiryDate", e.target.value)} />
          <TextField fullWidth variant="outlined" label="CVV" sx={{ mb: 2 }} value={state.cvv} onChange={(e) => handleStateChange("cvv", e.target.value)} type="password" />

          <Button variant="contained" color="primary" fullWidth onClick={handlePayment}>
            Pay & Generate QR
          </Button>
        </Box>
      </Modal>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Your Purchase History</Typography>
        <List>
          {state.purchaseHistory.length > 0 ? (
            state.purchaseHistory.map((purchase, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Seat: ${purchase.seat} | Tickets: ${purchase.ticketCount} | Total: $${purchase.totalPrice}`}
                  secondary={`Status: ${purchase.paymentStatus}`}
                />
              </ListItem>
            ))
          ) : (
            <Typography>No purchases yet.</Typography>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default TicketingPage;
