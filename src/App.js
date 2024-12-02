import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing Pages/Components
import ProfilePage from "./Components/Profile/Profile";
import TicketingPage from "./Components/Pages/TicketingPage";
import UserDashboard from "./Components/Pages/DashBoard";
import ProgressTrackingPage from "./Components/Pages/Progress";
import CollaborationPage from "./Components/Pages/Colloboration";
import SettingsPage from "./Components/Pages/Settings";
import NotificationsPage from "./Components/Pages/Notification";
import AudioVideoRecording from "./Components/Pages/Recording";
import GamificationSection from "./Components/Pages/Gamification";
import { ThemeProviderWrapper } from "./Components/ThemeContext";
import HomePage from "./Components/HomePage";
import ManagementPage from "./Components/Management";
import AboutPage from "./Components/About";
import CommunitySharingPage from "./Components/Community";
import AppNavbar from "./Components/Navbar";
import SignUpPage from "./Components/SignUp";
import SignInPage from "./Components/SignIn";
import RepertoirePage from "./Components/Pages/RepertoirePage";
import HelpAndSupportPage from "./Components/Support";
import Footer from "./Components/Footer";
import TermsAndConditions from "./Components/Conditions";
import PrivacyPolicyPage from "./Components/Privacy";
import MoreInsightsPage from "./Components/Pages/Insights";
import TicketDetailsPage from "./Components/Pages/ConcertTickets";
import ViewConcertSchedulePage from "./Components/Pages/ViewSchedule";

const App = () => {
  // State to manage reminders
  const [reminders, setReminders] = useState([]);

  // Function to add reminder when a task is scheduled
  const addReminder = (task) => {
    const newReminder = {
      title: task.task,
      message: `This task is scheduled for ${task.date} at ${task.time}.`,
      timestamp: `${task.date} ${task.time}`,
    };
    setReminders((prevReminders) => [...prevReminders, newReminder]);
  };

  // State for pathname
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Effect hook to update the path whenever it changes
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Listen for location changes
    window.addEventListener("popstate", handleLocationChange);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  // Array of routes where footer should not be shown
  const noFooterRoutes = ["/signin", "/signup"];

  return (
    <ThemeProviderWrapper>  
      <Router>
        <AppNavbar />
       
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/management" element={<ManagementPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/community" element={<CommunitySharingPage />} />
          <Route path="/repertoire" element={<RepertoirePage />} />
          <Route path="/ticketing" element={<TicketingPage />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/progress" element={<ProgressTrackingPage />} />
          
          {/* Pass addReminder function to CollaborationPage */}
          <Route path="/collaboration" element={<CollaborationPage addReminder={addReminder} />} />
          
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/audio-video" element={<AudioVideoRecording />} />
          <Route path="/gamification" element={<GamificationSection />} />
          
          {/* Pass reminders to NotificationsPage */}
          <Route path="/notifications" element={<NotificationsPage reminders={reminders} />} />
          <Route path="/help&support" element={<HelpAndSupportPage />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/more-insights" element={<MoreInsightsPage/>} />
          
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/concert-tickets" element={<TicketDetailsPage/>}/>
          <Route path="/view-concert" element={<ViewConcertSchedulePage/>} />
        </Routes>

        {/* Conditionally render Footer */}
        {!noFooterRoutes.includes(currentPath) && <Footer />}
      </Router>
    </ThemeProviderWrapper>
  );
}

export default App;
