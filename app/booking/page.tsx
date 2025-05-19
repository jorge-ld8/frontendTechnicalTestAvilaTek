'use client';

import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useMultiStepFormContext } from '../../context/MultiStepFormContext';
import Step1TravelInfo from '../../components/form/steps/Step1TravelInfo';
import Step2TravelerInfo from '../../components/form/steps/Step2TravelerInfo';
import Step3AdditionalServices from '../../components/form/steps/Step3AdditionalServices';
import FormSummary from '../../components/form/steps/FormSummary';
import { initialStep1Data, initialStep2Data, initialStep3Data } from '../../constants/formConstants';
import BackButton from '../../components/form/BackButton';
import NextButton from '../../components/form/NextButton';
import { Step1FormData, Step2FormData, Step3FormData } from '../../types/form.types';
import { validateStep1Data, validateStep2Data, validateStep3Data } from '../../lib/formValidation';

export default function BookingPage() {
  const { state, dispatch } = useMultiStepFormContext();
  const { currentStep, data } = state;

  useEffect(() => {
    dispatch({ type: 'set_step', step: 1 });
  }, [dispatch]);

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1TravelInfo 
            formData={data.step1 || initialStep1Data} 
            updateFormData={(stepData: Partial<Step1FormData>) => {
              dispatch({ 
                type: 'set_data', 
                data: { step1: stepData } 
              });
            }} 
          />
        );
      case 2:
        return (
          <Step2TravelerInfo 
            formData={data.step2 || initialStep2Data} 
            updateFormData={(stepData: Partial<Step2FormData>) => {
              dispatch({ 
                type: 'set_data', 
                data: { step2: stepData } 
              });
            }} 
          />
        );
      case 3:
        return (
          <Step3AdditionalServices
            formData={data.step3 || initialStep3Data} 
            updateFormData={(stepData: Partial<Step3FormData>) => {
              dispatch({ 
                type: 'set_data', 
                data: { step3: stepData } 
              });
            }} 
          />
        );
      case 4:
        return <FormSummary formData={data} />;
      default:
        return null;
    }
  };

  // Check if current step is valid
  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1: return validateStep1Data(data.step1);
      case 2: return validateStep2Data(data.step2);
      case 3: return validateStep3Data(data.step3);
      case 4: return true;
      default: return false;
    }
  };

  // Handle moving to next step
  return (
    <Box sx={{ width: '100%' }}>
      {renderFormStep()}
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        {currentStep > 1 && (
          <BackButton/>
        )}

        {currentStep === 1 && <Box />} 
        
        { currentStep < 4 && (
          <NextButton
            isDisabled={!isCurrentStepValid()}
          />
        )}

        {currentStep === 4 && <Box />}
      </Box>
    </Box>
  );
} 