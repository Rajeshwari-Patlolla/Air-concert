import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Box,
  Snackbar,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Alert } from "@mui/material";

// RepertoirePage component
const RepertoirePage = () => {
  useEffect(()=>{
    window.scrollTo(0,0)
},[])
  const [file, setFile] = useState(null);
  const [annotations, setAnnotations] = useState("");
  const [repertoireDetails, setRepertoireDetails] = useState({
    title: "",
    composer: "",
    version: "",
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Handle file upload
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && (uploadedFile.type === "application/pdf" || uploadedFile.type.startsWith("image/"))) {
      setFile(URL.createObjectURL(uploadedFile)); // Preview uploaded file
    } else {
      alert("Please upload a valid PDF or image file.");
    }
  };

  // Handle annotation change
  const handleAnnotationChange = (e) => {
    setAnnotations(e.target.value);
  };

  // Handle repertoire metadata change
  const handleMetadataChange = (e) => {
    const { name, value } = e.target;
    setRepertoireDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Clear file and annotations
  const clearFileAndAnnotations = () => {
    setFile(null);
    setAnnotations("");
    setRepertoireDetails({ title: "", composer: "", version: "" });
  };

  // Save the repertoire details (simulated save action)
  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000); // Hide the success message after 3 seconds
  };

  const theme = useTheme(); // Get the current theme from context
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen size is mobile

  // Effect to set the body background color based on the theme
  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.mode === "light" ? "#ffffff" : "#121212";
  }, [theme]);

  return (
    <Container maxWidth="lg" sx={{ padding: "20px" }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Grid container spacing={3}>
          {/* Header Section */}
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom align="center">
              Repertoire Management
            </Typography>
          </Grid>

          {/* Repertoire Metadata Section */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              name="title"
              value={repertoireDetails.title}
              onChange={handleMetadataChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Composer"
              variant="outlined"
              fullWidth
              name="composer"
              value={repertoireDetails.composer}
              onChange={handleMetadataChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Version"
              variant="outlined"
              fullWidth
              name="version"
              value={repertoireDetails.version}
              onChange={handleMetadataChange}
            />
          </Grid>

          {/* File Upload Section */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Upload Sheet Music
            </Typography>
            <Button variant="contained" component="label">
              Choose File
              <input
                type="file"
                hidden
                accept="image/*,.pdf"
                onChange={handleFileChange}
              />
            </Button>
            {file && (
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="body1">Uploaded File:</Typography>
                <embed
                  src={file}
                  type="application/pdf"
                  width="100%"
                  height={isMobile ? "300px" : "500px"}
                />
              </Box>
            )}
          </Grid>

          {/* Annotations Section */}
          <Grid item xs={12}>
            <TextField
              label="Add Annotations"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={annotations}
              onChange={handleAnnotationChange}
            />
          </Grid>

          {/* Action Buttons Section */}
          <Grid item xs={12} display="flex" justifyContent="center" spacing={2}>
            <Box sx={{ marginRight: 2 }}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save Repertoire
              </Button>
            </Box>
            <Button variant="outlined" color="secondary" onClick={clearFileAndAnnotations}>
              Clear All
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Success Snackbar */}
      <Snackbar open={saveSuccess} autoHideDuration={3000}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Your preference is saved!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RepertoirePage;
