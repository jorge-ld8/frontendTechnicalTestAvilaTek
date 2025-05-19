'use client';

import React from 'react';
import { Box, Button, CircularProgress } from '@mui/material';

interface FormNavigationProps {
  onBack?: () => void;
  onNext?: () => void;
  isBackDisabled?: boolean;
  isNextDisabled?: boolean;
  nextButtonText?: string;
  isLastStep?: boolean; // To change "Next" to "Finish" or similar
  isLoading?: boolean; // For async operations on next/submit
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  onBack,
  onNext,
  isBackDisabled = false,
  isNextDisabled = false,
  nextButtonText = 'Next',
  isLastStep = false,
  isLoading = false,
}) => {
  const finalNextButtonText = isLastStep ? 'Confirm Reservation' : nextButtonText;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
      <Button
        variant="outlined"
        onClick={onBack}
        disabled={isBackDisabled || isLoading}
      >
        Back
      </Button>
      <Button
        variant="contained"
        onClick={onNext}
        disabled={isNextDisabled || isLoading}
        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
      >
        {isLoading ? 'Processing...' : finalNextButtonText}
      </Button>
    </Box>
  );
};

export default FormNavigation; 