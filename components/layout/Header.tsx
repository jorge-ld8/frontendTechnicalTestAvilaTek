'use client';

import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { useTheme } from '@mui/material/styles';

const Header = () => {
  const theme = useTheme();

  return (
    <AppBar position="static" elevation={0} color="transparent">
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FlightLandIcon 
              sx={{ 
                mr: 1, 
                color: theme.palette.primary.main,
                fontSize: '2rem' 
              }} 
            />
            <Typography
              variant="h4"
              noWrap
              component="a"
              href="/"
              sx={{
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: theme.palette.text.primary,
                textDecoration: 'none',
              }}
            >
              Globetrotter
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 