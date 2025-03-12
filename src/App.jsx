import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'leaflet/dist/leaflet.css';
import HomePage from "./components/Home";
// Importe le composant pour la page Carte et Visualisation des Données
import MapPage from "./components/MapPage"; // Remplace par ton composant de carte
import SystemData from "./components/DataPage";
import './assets/App.css'
import { ThemeProvider } from "@emotion/react";
import theme from "./components/theme";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Route pour la page d'accueil */}
          <Route path="/" element={<HomePage />} />

          {/* Route pour la page de la carte */}
          <Route path="/map" element={<MapPage />} />

          {/* Init System Page*/}
          <Route path="/sys-data" element={<SystemData />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
