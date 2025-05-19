'use client';

import { useState } from 'react';
import { Box, Button, Stepper, Step, StepLabel, Paper } from '@mui/material';
import Step1TravelInfo from './steps/Step1TravelInfo';
import { Step1FormData } from '../../types/form.types';
import { FormStep } from '../../types/form.types';

// Initialize with empty default values
const initialStep1Data: Step1FormData = {
  destination: null,
  departureDate: null,
  returnDate: null,
  flightClass: null,
  priceUSD: 0
};

const steps = [
  'Travel Information',
  'Traveler Information',
  'Additional Services',
  'Review & Confirm'
];

const BookingForm = () => {
  const [activeStep, setActiveStep] = useState<FormStep>(1);
  const [step1Data, setStep1Data] = useState<Step1FormData>(initialStep1Data);

  const handleStep1Update = (data: Partial<Step1FormData>) => {
    setStep1Data(prevData => ({
      ...prevData,
      ...data
    }));
  };

  const handleNext = () => {
    setActiveStep(prev => (prev < 4 ? (prev + 1) as FormStep : prev));
  };

  const handleBack = () => {
    setActiveStep(prev => (prev > 1 ? (prev - 1) as FormStep : prev));
  };

  const isStep1Valid = () => {
    return (
      step1Data.destination !== null &&
      step1Data.departureDate !== null &&
      step1Data.returnDate !== null &&
      step1Data.flightClass !== null
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep - 1} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          backgroundColor: 'background.default',
          borderRadius: 2 
        }}
      >
        {activeStep === 1 && (
          <Step1TravelInfo 
            formData={step1Data} 
            updateFormData={handleStep1Update} 
          />
        )}

        {/* More steps will be added later */}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 1}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={activeStep === 1 && !isStep1Valid()}
          >
            {activeStep === 4 ? 'Confirm Booking' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default BookingForm; 