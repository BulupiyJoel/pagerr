import React, { useState } from 'react';
import { AppBar, Button, Container, CssBaseline, Grid, Typography, Toolbar } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

// Customized
import theme from './theme';
import { Link } from 'react-router-dom';
import Wrapper from './Wrapper';

const HomePage = () => {
  // Local state to track initialization status
  const [initStatus, setInitStatus] = useState('');

  const initializeRq = async (event) => {
    event.preventDefault(); // Prevent the default action
    event.stopPropagation(); // Stop the event from bubbling up

    try {
      // Send the request to initialize the system
      const response = await axios.get("/api/setCoords.php");

      // Log the response to check if it succeeded
      console.info(response.data);

      // Set success message if successful
      setInitStatus('Système initialisé avec succès!');
    } catch (error) {
      // Handle error and update the status
      console.error(error);
      setInitStatus('Erreur lors de l\'initialisation du système.');
    }
  };

  const checkInitializeRq = async (event) => {
    event.preventDefault(); // Prevent the default action
    event.stopPropagation(); // Stop the event from bubbling up

    try {
      // Send the request to initialize the system
      const response = await axios.get("/api/getCoords.php");

      // Log the response to check if it succeeded
      console.log(response.data);

      // Set success message if successful
      setInitStatus(`Donneer : `);
    } catch (error) {
      // Handle error and update the status
      console.error(error);
      setInitStatus('Erreur lors de l\'initialisation du système.');
    }
  };

  return <>
    <Wrapper>
      <Grid container spacing={3}>
        {/* Section Carte */}
        <Grid>
          <Typography variant="h4" gutterBottom color='secondary'>
            Carte
          </Typography>
          <Typography variant="body2" paragraph color='secondary'>
            Explorez la carte pour voir la qualité des routes dans différentes zones.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            href="/map"
            sx={{ padding: 2 }}
          >
            Voir la Carte
          </Button>
        </Grid>
      </Grid>
    </Wrapper>
  </>
};

export default HomePage;
