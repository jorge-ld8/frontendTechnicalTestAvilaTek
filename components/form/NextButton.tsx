'use client';

import { Button, CircularProgress } from '@mui/material';
import { useMultiStepFormContext } from '../../context/MultiStepFormContext';

interface NextButtonProps {
  isDisabled?: boolean;
  buttonText?: string;
  isLoading?: boolean;
}

const NextButton = ({
  isDisabled = false,
  buttonText = 'Next',
  isLoading = false,
}: NextButtonProps) => {
  const { dispatch } = useMultiStepFormContext();
  
  return (
    <Button
      variant="contained"
      onClick={()=>dispatch({ type: 'next', data: {} })}
      disabled={isDisabled || isLoading}
      startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
    >
      {isLoading ? 'Processing...' : buttonText}
    </Button>
  );
};

export default NextButton; 