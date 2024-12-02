import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ShareIcon from "@mui/icons-material/Share";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { ThemeContext } from "../ThemeContext";

const AudioVideoRecording = () => {
  const [audioBlobUrl, setAudioBlobUrl] = useState(null);
  const [videoBlobUrl, setVideoBlobUrl] = useState(null);
  const [audioRecorder, setAudioRecorder] = useState(null);
  const [videoRecorder, setVideoRecorder] = useState(null);
  const [isAudioRecording, setIsAudioRecording] = useState(false);
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const [audioElement, setAudioElement] = useState(null);
  const [videoElement, setVideoElement] = useState(null);
  const [volume, setVolume] = useState(1);
  const [loop, setLoop] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const { mode } = useContext(ThemeContext); // Access the current theme mode (light or dark)

  useEffect(() => {
    if (audioBlobUrl) {
      const audio = new Audio(audioBlobUrl);
      setAudioElement(audio);
    }
    if (videoBlobUrl) {
      const video = document.createElement("video");
      video.src = videoBlobUrl;
      setVideoElement(video);
    }
  }, [audioBlobUrl, videoBlobUrl]);

  const startAudioRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        const chunks = [];
        recorder.ondataavailable = (event) => chunks.push(event.data);
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: "audio/wav" });
          const url = URL.createObjectURL(blob);
          setAudioBlobUrl(url);
        };
        recorder.start();
        setAudioRecorder(recorder);
        setIsAudioRecording(true);
      })
      .catch((err) => console.error("Error accessing audio:", err));
  };

  const stopAudioRecording = () => {
    audioRecorder.stop();
    setIsAudioRecording(false);
  };

  const startVideoRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        const chunks = [];
        recorder.ondataavailable = (event) => chunks.push(event.data);
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: "video/webm" });
          const url = URL.createObjectURL(blob);
          setVideoBlobUrl(url);
        };
        recorder.start();
        setVideoRecorder(recorder);
        setIsVideoRecording(true);
      })
      .catch((err) => console.error("Error accessing video:", err));
  };

  const stopVideoRecording = () => {
    videoRecorder.stop();
    setIsVideoRecording(false);
  };

  const playMedia = (type) => {
    if (type === "audio" && audioElement) {
      audioElement.volume = volume;
      audioElement.loop = loop;
      audioElement.play();
    } else if (type === "video" && videoElement) {
      videoElement.play();
    }
  };

  const pauseMedia = (type) => {
    if (type === "audio" && audioElement) {
      audioElement.pause();
    } else if (type === "video" && videoElement) {
      videoElement.pause();
    }
  };

  const handleExport = (type) => {
    const url = type === "audio" ? audioBlobUrl : videoBlobUrl;
    const link = document.createElement("a");
    link.href = url;
    link.download = type === "audio" ? "recording.wav" : "recording.webm";
    link.click();
  };

  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleShareClose = () => {
    setAnchorEl(null);
  };

  // Share via Email
  const handleShareEmail = () => {
    window.location.href = `mailto:?subject=Check out my recording&body=Here is a link to my audio/video recording: ${audioBlobUrl || videoBlobUrl}`;
  };
  useEffect(()=>{
    window.scrollTo(0,0)
},[])
  // Share via Social Media
  const handleShareSocial = (platform) => {
    let shareUrl = "";
    if (platform === "twitter") {
      shareUrl = `https://twitter.com/intent/tweet?text=Check out my recording!&url=${audioBlobUrl || videoBlobUrl}`;
    } else if (platform === "facebook") {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${audioBlobUrl || videoBlobUrl}`;
    } else if (platform === "linkedin") {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${audioBlobUrl || videoBlobUrl}`;
    }
    window.open(shareUrl, "_blank");
  };

  return (
    <Box sx={{ p: 3, backgroundColor: mode === "dark" ? "background.default" : "background.paper" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: mode === "dark" ? "text.primary" : "text.secondary", // Adjust heading color for dark mode
          marginBottom: 3, // Add margin for spacing
        }}
      >
        Audio & Video Recording
      </Typography>

      {/* Audio Recording Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: mode === "dark" ? "text.primary" : "text.secondary", // Adjust heading color for dark mode
            marginBottom: 2, // Add margin for spacing
          }}
        >
          Audio Recording (Songs)
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          {!isAudioRecording ? (
            <Button
              variant="contained"
              onClick={startAudioRecording}
              color={mode === "light" ? "primary" : "secondary"} // Adjust button color based on theme
            >
              Start Audio Recording
            </Button>
          ) : (
            <Button variant="contained" color="secondary" onClick={stopAudioRecording}>
              Stop Audio Recording
            </Button>
          )}
        </Box>

        {audioBlobUrl && (
          <Box sx={{ borderRadius: 1, p: 2, backgroundColor: mode === "dark" ? "#333" : "#f7f7f7", mb: 4 }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: mode === "dark" ? "text.primary" : "text.secondary", // Adjust subtitle color for dark mode
              }}
            >
              Playback
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <IconButton color="primary" onClick={() => playMedia("audio")}>
                <PlayCircleFilledIcon />
              </IconButton>
              <IconButton color="secondary" onClick={() => pauseMedia("audio")}>
                <PauseCircleFilledIcon />
              </IconButton>
              <IconButton color="default" onClick={() => handleExport("audio")}>
                <FileDownloadIcon />
              </IconButton>
              <IconButton color="primary" onClick={handleShareClick}>
                <ShareIcon />
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>

      {/* Video Recording Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: mode === "dark" ? "text.primary" : "text.secondary", // Adjust heading color for dark mode
            marginBottom: 2, // Add margin for spacing
          }}
        >
          Video Recording (Live)
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          {!isVideoRecording ? (
            <Button
              variant="contained"
              startIcon={<VideoCallIcon />}
              onClick={startVideoRecording}
              color={mode === "light" ? "primary" : "secondary"} // Adjust button color based on theme
            >
              Start Video Recording
            </Button>
          ) : (
            <Button variant="contained" color="secondary" onClick={stopVideoRecording}>
              Stop Video Recording
            </Button>
          )}
        </Box>

        {videoBlobUrl && (
          <Box sx={{ borderRadius: 1, p: 2, backgroundColor: mode === "dark" ? "#333" : "#f7f7f7", mb: 4 }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: mode === "dark" ? "text.primary" : "text.secondary", // Adjust subtitle color for dark mode
              }}
            >
              Playback
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <IconButton color="primary" onClick={() => playMedia("video")}>
                <PlayCircleFilledIcon />
              </IconButton>
              <IconButton color="secondary" onClick={() => pauseMedia("video")}>
                <PauseCircleFilledIcon />
              </IconButton>
              <IconButton color="default" onClick={() => handleExport("video")}>
                <FileDownloadIcon />
              </IconButton>
              <IconButton color="primary" onClick={handleShareClick}>
                <ShareIcon />
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>

      {/* Footer Message */}
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography
          variant="body2"
          sx={{
            color: mode === "dark" ? "text.primary" : "text.secondary", // Adjust footer text color for dark mode
          }}
        >
          You can record and play audio or video. Enjoy recording your moments and share them with your friends!
        </Typography>
      </Box>

      {/* Share Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleShareClose}
      >
        <MenuItem onClick={handleShareEmail}>Share via Email</MenuItem>
        <MenuItem onClick={() => handleShareSocial("twitter")}>Share on Twitter</MenuItem>
        <MenuItem onClick={() => handleShareSocial("facebook")}>Share on Facebook</MenuItem>
        <MenuItem onClick={() => handleShareSocial("linkedin")}>Share on LinkedIn</MenuItem>
      </Menu>
    </Box>
  );
};

export default AudioVideoRecording;
