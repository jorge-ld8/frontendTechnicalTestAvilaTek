'use client';
import { Button } from '@mui/material';
import { useMultiStepFormContext } from '../../context/MultiStepFormContext';

interface BackButtonProps {
  isDisabled?: boolean;
  isLoading?: boolean;
}

const BackButton = ({
  isDisabled = false,
  isLoading = false,
}: BackButtonProps) => {
  const { dispatch } = useMultiStepFormContext();

  return (
    <Button
      variant="outlined"
      onClick={() => dispatch({ type: 'previous', data: {} })}
      disabled={isDisabled || isLoading}
    >
      Back
    </Button>
  );
};

export default BackButton; 