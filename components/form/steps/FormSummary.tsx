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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Fade
} from '@mui/material';
import { format } from 'date-fns';
import { BookingFormData } from '../../../types/form.types';
import { useState, forwardRef, ReactElement } from 'react';
import { useRouter } from 'next/navigation';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { TransitionProps } from '@mui/material/transitions';
import { INSURANCE_PRICE, LUGGAGE_PRICE, PREFERENTIAL_SEATS_PRICE, PET_PRICE } from '@/constants/formConstants';

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxWidth: 420,
            p: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            textAlign: 'center',
          }
        }}
      >
        <DialogTitle id="alert-dialog-slide-title" sx={{ pt: 3, pb: 1 }}>
          <Fade in={openDialog} timeout={700}>
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 64, mb: 1.5 }} />
          </Fade>
          <Fade in={openDialog} timeout={900} style={{ transitionDelay: openDialog ? '200ms' : '0ms' }}>
            <Typography variant="h5" component="div" fontWeight="bold" color="text.primary">
              ¡Reserva Confirmada!
            </Typography>
          </Fade>
        </DialogTitle>
        <DialogContent sx={{ pb: 1 }}>
          <Fade in={openDialog} timeout={900} style={{ transitionDelay: openDialog ? '400ms' : '0ms' }}>
            <DialogContentText id="alert-dialog-slide-description" color="text.secondary">
              Tu reserva para <b>{step1.destination || 'el destino seleccionado'}</b> ha sido confirmada exitosamente.
              <br />
              Gracias por elegir Globetrotter para tu próxima aventura.
            </DialogContentText>
          </Fade>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3, pt: 1 }}>
          <Fade in={openDialog} timeout={900} style={{ transitionDelay: openDialog ? '600ms' : '0ms' }}>
            <Button 
              onClick={handleCloseDialog}
              variant="contained" 
              color="primary" 
              autoFocus
              sx={{ 
                px: 4, 
                py: 1.25, 
                borderRadius: '50px',
                fontWeight: 'bold',
                minWidth: 160,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                }
              }}
            >
              Aceptar
            </Button>
          </Fade>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FormSummary; 