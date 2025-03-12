import React, { useEffect, useState } from "react";
import { Box, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Wrapper from "./Wrapper";
import BadgeRow from "./layouts/BadgeRow";

// Fonction pour déterminer la couleur du cercle selon le ratio de vibration
const getChipColor = (avg_vibration) => {
  
  const SEUIL_BONNE = 2.5
  const SEUIL_MOYENNE = 5.0
  const SEUIL_MAUVAISE = 8.0


  if (avg_vibration > SEUIL_MAUVAISE) return "red";  // Critique : rouge
  if (avg_vibration > SEUIL_MOYENNE) return "orange"; // Mauvais : orange
  if (avg_vibration > SEUIL_BONNE) return "yellow";  // Moyen : jaune
  return "green"; // Bon : vert
};

const MapPage = () => {
  const [locationData, setLocationData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [newLatitude, setNewLatitude] = useState("");
  const [newLongitude, setNewLongitude] = useState("");

  useEffect(() => {
    const fetchRq = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'road_data'));
        const dataArr = querySnapshot.docs
          .map(doc => ({ ...doc.data(), id: doc.id })) // Include id in each location
          .filter(location => !isNaN(location.latitude) && !isNaN(location.longitude)); // Filter out NaN latitude/longitude
        
        setLocationData(dataArr);
        console.log(dataArr);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRq();
  }, []);

  const handleOpenDialog = (location) => {
    setSelectedLocation(location);
    setNewLatitude(location.latitude);
    setNewLongitude(location.longitude);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedLocation(null);
  };

  const handleUpdateLocation = async () => {
    if (selectedLocation) {
      const locationRef = doc(db, "road_data", selectedLocation.id);
      try {
        await updateDoc(locationRef, {
          latitude: parseFloat(newLatitude),
          longitude: parseFloat(newLongitude),
        });

        const updatedData = locationData.map((loc) =>
          loc.id === selectedLocation.id ? { ...loc, latitude: newLatitude, longitude: newLongitude } : loc
        );
        setLocationData(updatedData);
        handleCloseDialog();
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la localisation :", error);
      }
    }
  };

  return (
    <Wrapper marginY={0}>
      <Box>
        <Typography variant="h5" gutterBottom marginTop={3} marginBottom={2} color="secondary">
          Carte des Routes
        </Typography>
        <BadgeRow />

        {/* Conteneur de la carte Leaflet */}
        <Box sx={{ height: 'calc(100vh - 200px)', width: '100%' }}>
          <MapContainer
            center={[-4.336617, 15.300682]} // Centré par défaut sur Paris
            zoom={15}
            style={{ height: "100%", width: "100%" }} // Dynamically adjusts the map's height
            scrollWheelZoom={true} // Allow zooming with mouse wheel
            maxZoom={16} // Max zoom is +5 from current zoom level
          >
            {/* Tuiles de la carte (ici on utilise OpenStreetMap) */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Affichage des marqueurs sous forme de cercles colorés */}
            {locationData.map((location, index) => (
              <CircleMarker
                key={index}
                center={[location.latitude, location.longitude]} // Position du cercle
                radius={3} // Taille du cercle
                color={getChipColor(location.vibration)} // Couleur du cercle
                fillColor={getChipColor(location.vibration)} // Couleur de remplissage
                fillOpacity={0.8} // Opacité du remplissage
              >
              </CircleMarker>
            ))}
          </MapContainer>
        </Box>

        {/* Modal pour mettre à jour la latitude et la longitude */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Mettre à jour la localisation</DialogTitle>
          <DialogContent>
            <TextField
              label="Latitude"
              value={newLatitude}
              onChange={(e) => setNewLatitude(e.target.value)}
              fullWidth
              margin="normal"
              type="number"
            />
            <TextField
              label="Longitude"
              value={newLongitude}
              onChange={(e) => setNewLongitude(e.target.value)}
              fullWidth
              margin="normal"
              type="number"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Annuler
            </Button>
            <Button onClick={handleUpdateLocation} color="primary">
              Mettre à jour
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Wrapper>
  );
};

export default MapPage;
