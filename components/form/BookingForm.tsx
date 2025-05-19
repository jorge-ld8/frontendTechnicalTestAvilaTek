'use client';

import { useState } from 'react';
import { Box, Button, Stepper, Step, StepLabel, Paper } from '@mui/material';
import Step1TravelInfo from './steps/Step1TravelInfo';
import Step2TravelerInfo from './steps/Step2TravelerInfo';
import { Step1FormData, Step2FormData, FormStep } from '../../types/form.types';

// Initialize with empty default values
const initialStep1Data: Step1FormData = {
  destination: null,
  departureDate: null,
  returnDate: null,
  flightClass: null,
  priceUSD: 0
};

// Initialize Step 2 data with default values
const initialStep2Data: Step2FormData = {
  numberOfTravelers: 1,
  travelers: [
    {
      fullName: '',
      dateOfBirth: null,
      documentType: 'passport',
      documentNumber: '',
    },
  ],
  pets: {
    hasPets: false,
    quantity: 0,
  },
  extraLuggage: {
    hasExtraLuggage: false,
    quantity: 0,
  },
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
  const [step2Data, setStep2Data] = useState<Step2FormData>(initialStep2Data);

  const handleStep1Update = (data: Partial<Step1FormData>) => {
    setStep1Data(prevData => ({
      ...prevData,
      ...data
    }));
  };

  const handleStep2Update = (data: Partial<Step2FormData>) => {
    setStep2Data(prevData => ({
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

  const isStep2Valid = () => {
    // Basic validation - ensure we have at least one traveler with all fields filled
    return (
      step2Data.numberOfTravelers > 0 &&
      step2Data.travelers.length > 0 &&
      step2Data.travelers.every(traveler => 
        traveler.fullName.trim() !== '' && 
        traveler.dateOfBirth !== null && 
        traveler.documentType !== '' && 
        traveler.documentNumber.trim() !== ''
      )
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

        {activeStep === 2 && (
          <Step2TravelerInfo 
            formData={step2Data} 
            updateFormData={handleStep2Update} 
          />
        )}

        {/* Step 3 will be added later */}
        {/* Step 4 (Summary) will be added later */}
        
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
            disabled={(activeStep === 1 && !isStep1Valid()) || 
                     (activeStep === 2 && !isStep2Valid())}
          >
            {activeStep === 4 ? 'Confirm Booking' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default BookingForm; 