import React, { useState, useEffect } from 'react';
import './App.css';
import { Container, Typography, Box, Button, useMediaQuery, AppBar, Toolbar } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme'; // Import both themes
import { Brightness4, Brightness7 } from '@mui/icons-material'; // Import Material UI icons
import TaskList from './components/TaskList';
import OnboardingGuide from './components/OnboardingGuide';

function App() {
  const savedTheme = localStorage.getItem('theme');
  const [isDarkMode, setIsDarkMode] = useState(savedTheme === 'dark');
  const isMobile = useMediaQuery('(max-width:600px)'); // Media query for mobile screens

  useEffect(() => {
    // Save theme preference in localStorage when it changes
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      {/* AppBar Section */}
      <AppBar position="fixed" sx={{ backgroundColor: isDarkMode ? '#0D47A1' : '#2196F3', top: 0 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Title aligned to the left */}
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontFamily: '"Roboto", sans-serif', // Using the Roboto font
              fontWeight: 'bold',
              color: '#FFFFFF', // Text color is always white on AppBar
              fontSize: '1.5rem',
              marginLeft: isMobile ? 0 : 2, // Adjust left margin based on screen size
            }}
          >
            Your Task Manager
          </Typography>

          {/* Button aligned to the right */}
          <Button
            variant="contained"
            onClick={toggleTheme}
            sx={{
              backgroundColor: isDarkMode ? '#2196F3' : '#0D47A1', // Blue background depending on mode
              color: '#FFFFFF',
              padding: '10px 20px',
              borderRadius: '8px',
              boxShadow: 3,
              '&:hover': {
                backgroundColor: isDarkMode ? '#1976D2' : '#0B3C8C', // Hover effect
              },
            }}
            startIcon={isDarkMode ? <Brightness7 /> : <Brightness4 />} // Icon for switching themes
          >
            {/* Display the name and icon conditionally */}
            {!isMobile && `Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content Container with top padding to account for the fixed AppBar */}
      <Container
        maxWidth={false} // No max-width to avoid default margin
        sx={{
          paddingTop: '40px', // Adding padding to prevent content from being hidden behind the AppBar
          paddingLeft: isMobile ? 2 : 2, // Adjust left padding based on screen size
          paddingRight: isMobile ? 2 : 2, // Adjust right padding based on screen size
          width: '100%', // Make sure the container spans full width
        }}
      >
        {/* Onboarding Guide and Task List */}
        <OnboardingGuide />
        <TaskList />
      </Container>
    </ThemeProvider>
  );
}

export default App;
