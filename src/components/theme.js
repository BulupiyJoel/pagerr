import { createTheme } from "@mui/material";
// Création d'un thème personnalisé avec la couleur verte
const theme = createTheme({
  typography: {
    fontFamily: 'Poppins,sans-serif'
  },
  palette: {
    background :{ default : "#212121" },
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#FFFFFF',
    },
    
  },
});

export default theme