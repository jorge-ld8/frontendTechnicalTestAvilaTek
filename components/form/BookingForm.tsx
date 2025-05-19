'use client';

import { useState } from 'react';
import { Box, Button, Stepper, Step, StepLabel, Paper } from '@mui/material';
import Step1TravelInfo from './steps/Step1TravelInfo';
import Step2TravelerInfo from './steps/Step2TravelerInfo';
import Step3AdditionalServices from './steps/Step3AdditionalServices';
import { Step1FormData, Step2FormData, Step3FormData, FormStep } from '../../types/form.types';

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

// Initialize Step 3 data with default values
const initialStep3Data: Step3FormData = {
  travelInsurance: false,
  preferentialSeats: false,
  specialAssistance: false,
  assistanceNotes: '',
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
  const [step3Data, setStep3Data] = useState<Step3FormData>(initialStep3Data);

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

  const handleStep3Update = (data: Partial<Step3FormData>) => {
    setStep3Data(prevData => ({
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

  const isStep3Valid = () => {
    // If special assistance is enabled, notes should not be empty and under 200 characters
    if (step3Data.specialAssistance) {
      return step3Data.assistanceNotes.trim() !== '' && step3Data.assistanceNotes.length <= 200;
    }
    // Otherwise, no validation needed for step 3
    return true;
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

        {activeStep === 3 && (
          <Step3AdditionalServices
            formData={step3Data}
            updateFormData={handleStep3Update}
          />
        )}

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
                     (activeStep === 2 && !isStep2Valid()) ||
                     (activeStep === 3 && !isStep3Valid())}
          >
            {activeStep === 4 ? 'Confirm Booking' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default BookingForm; 