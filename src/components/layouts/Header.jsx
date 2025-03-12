import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            textDecoration: 'none', // Ensures no underline appears for the link
            color: 'inherit', // Inherit the color from the parent (AppBar)
            '&:hover': {
              textDecoration: 'none', // Ensure no underline on hover
            }
          }}
          component={Link}
          to="/"
        >
          Road Checker
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{ textTransform: 'none', marginRight: 3 }}
        >
          Accueil
        </Button>
        <Button
          component={Link}
          to="/map"
          variant="contained"
          sx={{ textTransform: 'none', marginRight: 3 }}
        >
          Map
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
