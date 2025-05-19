'use client';

import { Stepper, Step, StepLabel } from '@mui/material';
import { useMultiStepFormContext } from '../../context/MultiStepFormContext';

const steps = [
  'Travel Information',
  'Traveler Information',
  'Additional Services',
  'Review & Confirm'
];

const StepperComponent = () => {
  const { state } = useMultiStepFormContext();
  
  return (
    <Stepper activeStep={state.currentStep - 1} alternativeLabel sx={{ mb: 4 }}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default StepperComponent; 