'use client';

import { Box, Container, Paper, Typography, Button } from '@mui/material';
import Link from 'next/link';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

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
            Welcome to Globetrotter
          </Typography>
          
          <Typography 
            variant="body1" 
            align="center" 
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Your journey to discover the world starts here. Book your next adventure with our easy to use system.
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Link href="/booking">
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ px: 4, py: 1.5 }}
            >
              Start Booking
            </Button>
            </Link>
          </Box>
        </Paper>
      </Container>
      
      <Footer />
    </Box>
  );
}
