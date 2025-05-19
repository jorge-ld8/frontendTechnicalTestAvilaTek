'use client';

import { 
  Box, 
  Typography, 
  Divider, 
  Paper, 
  Chip,
  List,
  ListItem,
  ListItemText,
  Stack,
  Button
} from '@mui/material';
import { format } from 'date-fns';
import { BookingFormData } from '../../../types/form.types';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SuccessDialog from '../../ui/SuccessDialog';
import { INSURANCE_PRICE, LUGGAGE_PRICE, PREFERENTIAL_SEATS_PRICE, PET_PRICE } from '@/constants/formConstants';

interface FormSummaryProps {
  formData: BookingFormData;
}

const FormSummary = ({ formData }: FormSummaryProps) => {
  const { step1, step2, step3 } = formData;
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();

  const formatDate = (date: Date | null) => {
    if (!date) return 'Not specified';
    return format(date, 'MMMM d, yyyy');
  };

  // Calculate total cost
  const calculateTotal = () => {
    const NUM_TRAVELERS = step2.numberOfTravelers;
    let total = step1.priceUSD*NUM_TRAVELERS || 0;
    
    if (step2.pets.hasPets) {
      total += step2.pets.quantity * PET_PRICE; 
    }
    
    if (step2.extraLuggage.hasExtraLuggage) {
      total += step2.extraLuggage.quantity * LUGGAGE_PRICE; 
    }
    
    if (step3.travelInsurance) {
      total += INSURANCE_PRICE * NUM_TRAVELERS;
    }
    
    if (step3.preferentialSeats) {
      total += PREFERENTIAL_SEATS_PRICE * NUM_TRAVELERS; 
    }
    
    return total;
  };

  const handleConfirmReservation = () => {
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
    router.push('/');
  };

  return (
    <Box sx={{ mt: 2, mb: 4 }}>
      <Typography variant="h6" gutterBottom align="center">
        Reservation Summary
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom align="center" sx={{ mb: 3 }}>
        Please review your booking details before confirming.
      </Typography>

      <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: 'background.default', borderRadius: 2 }}>
        <Typography variant="subtitle1" gutterBottom fontWeight={600}>
          Travel Details
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <Box sx={{ width: { xs: '100%', md: '50%' }, mb: 2, pr: { md: 2 } }}>
            <Typography variant="body2" color="text.secondary">Destination</Typography>
            <Typography variant="body1">{step1.destination || 'Not specified'}</Typography>
          </Box>
          <Box sx={{ width: { xs: '100%', md: '50%' }, mb: 2, pl: { md: 2 } }}>
            <Typography variant="body2" color="text.secondary">Flight Class</Typography>
            <Typography variant="body1">{step1.flightClass || 'Not specified'}</Typography>
          </Box>
          <Box sx={{ width: { xs: '100%', md: '50%' }, mb: 2, pr: { md: 2 } }}>
            <Typography variant="body2" color="text.secondary">Departure Date</Typography>
            <Typography variant="body1">{formatDate(step1.departureDate)}</Typography>
          </Box>
          <Box sx={{ width: { xs: '100%', md: '50%' }, mb: 2, pl: { md: 2 } }}>
            <Typography variant="body2" color="text.secondary">Return Date</Typography>
            <Typography variant="body1">{formatDate(step1.returnDate)}</Typography>
          </Box>
        </Box>
      </Paper>

      <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: 'background.default', borderRadius: 2 }}>
        <Typography variant="subtitle1" gutterBottom fontWeight={600}>
          Traveler Information
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Number of Travelers: {step2.numberOfTravelers}
        </Typography>
        
        <List disablePadding>
          {step2.travelers.map((traveler, index) => (
            <ListItem key={index} sx={{ px: 0, py: 1 }}>
              <ListItemText
                primary={traveler.fullName}
                secondary={
                  <Typography variant="body2" color="text.secondary" component="span">
                    DOB: {formatDate(traveler.dateOfBirth)} • {traveler.documentType}: {traveler.documentNumber}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
        
        {step2.pets.hasPets && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" component="span">
              Traveling with {step2.pets.quantity} pet{step2.pets.quantity !== 1 ? 's' : ''}
              <Chip 
                size="small" 
                label={`$${step2.pets.quantity * 100}`} 
                color="primary" 
                variant="outlined" 
                sx={{ ml: 1 }} 
              />
            </Typography>
          </Box>
        )}
        
        {step2.extraLuggage.hasExtraLuggage && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" component="span">
              {step2.extraLuggage.quantity} extra luggage item{step2.extraLuggage.quantity !== 1 ? 's' : ''}
              <Chip 
                size="small" 
                label={`$${step2.extraLuggage.quantity * 50}`} 
                color="primary" 
                variant="outlined" 
                sx={{ ml: 1 }} 
              />
            </Typography>
          </Box>
        )}
      </Paper>

      <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: 'background.default', borderRadius: 2 }}>
        <Typography variant="subtitle1" gutterBottom fontWeight={600}>
          Additional Services
        </Typography>
        <Stack spacing={2}>
          <Box>
            <Typography variant="body2" component="span">
              Travel Insurance: {step3.travelInsurance ? 'Yes' : 'No'}
              {step3.travelInsurance && (
                <Chip size="small" label={`$${INSURANCE_PRICE}`} color="primary" variant="outlined" sx={{ ml: 1 }} />
              )}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" component="span">
              Preferential Seats: {step3.preferentialSeats ? 'Yes' : 'No'}
              {step3.preferentialSeats && (
                <Chip 
                  size="small" 
                  label={`$${PREFERENTIAL_SEATS_PRICE * step2.numberOfTravelers}`} 
                  color="primary" 
                  variant="outlined" 
                  sx={{ ml: 1 }} 
                />
              )}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" component="span">
              Special Assistance: {step3.specialAssistance ? 'Yes' : 'No'}
            </Typography>
            {step3.specialAssistance && step3.assistanceNotes && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
                &ldquo;{step3.assistanceNotes}&rdquo;
              </Typography>
            )}
          </Box>
        </Stack>
      </Paper>

      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1">
          Destination Price:
        </Typography>
        <Typography variant="subtitle1">
          ${step1.priceUSD || 0}
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, mb: 4 }}>
        <Typography variant="h6" fontWeight="bold">
          Total:
        </Typography>
        <Typography variant="h6" fontWeight="bold" color="primary.main">
          ${calculateTotal()}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button 
          variant="contained" 
          size="large" 
          color="primary" 
          onClick={handleConfirmReservation}
          sx={{ 
            px: 4, 
            py: 1.5, 
            borderRadius: 2,
            fontWeight: 'bold'
          }}
        >
          Confirm Reservation
        </Button>
      </Box>

      <SuccessDialog
        open={openDialog}
        onClose={handleCloseDialog}
        title="¡Reserva Confirmada!"
        destinationName={step1.destination || ''}
        showConfetti={true}
        confettiDuration={6000}
      />
    </Box>
  );
};

export default FormSummary; 