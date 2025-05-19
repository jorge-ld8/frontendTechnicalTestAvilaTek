'use client';

import { Box, Container, Paper, Typography } from '@mui/material';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import BookingForm from '../components/form/BookingForm';

export default function Home() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      
      <Container 
        component="main" 
        maxWidth="md" 
        sx={{ 
          mt: 8, 
          mb: 8, 
          flex: '1 0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
          >
        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 3, md: 6 }, 
            width: '100%',
            borderRadius: 2,
            bgcolor: 'background.paper',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          }}
        >
          <Typography 
            component="h1" 
            variant="h4" 
            align="center" 
            gutterBottom
            sx={{ 
              fontWeight: 600,
              mb: 4,
              color: 'text.primary',
            }}
          >
            Plan Your Journey
          </Typography>
          
          <Typography 
            variant="body1" 
            align="center" 
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Welcome to Globetrotter. Complete the form below to book your next adventure.
          </Typography>
          
          <BookingForm />
        </Paper>
      </Container>
      
      <Footer />
    </Box>
  );
}
