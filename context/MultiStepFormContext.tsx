'use client';

import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { Step1FormData, Step2FormData, Step3FormData, FormStep } from '../types/form.types';
import { initialStep1Data, initialStep2Data, initialStep3Data } from '@/constants/formConstants';
import { formReducer } from '@/reducers/formReducer';
import { FormAction } from '@/reducers/formReducer';

export interface CombinedFormData {
  step1: Step1FormData;
  step2: Step2FormData;
  step3: Step3FormData;
}

export interface FormState {
  currentStep: FormStep;
  data: CombinedFormData;
}

export interface PartialFormData {
  step1?: Partial<Step1FormData>;
  step2?: Partial<Step2FormData>;
  step3?: Partial<Step3FormData>;
}



// Create the context
interface MultiStepFormContextType {
  state: FormState;
  dispatch: Dispatch<FormAction>;
  isStep1Valid: () => boolean;
  isStep2Valid: () => boolean;
  isStep3Valid: () => boolean;
  totalSteps: number;
}

const MultiStepFormContext = createContext<MultiStepFormContextType | null>(null);

// Create a hook to use the context
export function useMultiStepFormContext() {
  const context = useContext(MultiStepFormContext);
  if (context === null) {
    throw new Error('useMultiStepFormContext must be used within a MultiStepFormProvider');
  }
  return context;
}

// Initial state
const initialState: FormState = {
  currentStep: 1,
  data: {
    step1: initialStep1Data,
    step2: initialStep2Data,
    step3: initialStep3Data,
  }
};

export function MultiStepFormProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  // Validation functions for each step
  const isStep1Valid = () => {
    const step1 = state.data.step1;
    return !!(
      step1 &&
      step1.destination &&
      step1.departureDate &&
      step1.returnDate &&
      step1.flightClass
    );
  };

  const isStep2Valid = () => {
    const step2 = state.data.step2;
    if (!step2) return false;
    
    return (
      step2.numberOfTravelers > 0 &&
      step2.travelers.length > 0 &&
      step2.travelers.every(traveler =>
        traveler.fullName.trim() !== '' &&
        traveler.dateOfBirth !== null &&
        traveler.documentType !== '' &&
        traveler.documentNumber.trim() !== ''
      )
    );
  };

  const isStep3Valid = () => {
    const step3 = state.data.step3;
    if (!step3) return false;
    
    if (step3.specialAssistance) {
      return step3.assistanceNotes.trim() !== '' && step3.assistanceNotes.length <= 200;
    }
    
    return true;
  };

  const value = {
    state,
    dispatch,
    isStep1Valid,
    isStep2Valid,
    isStep3Valid,
    totalSteps: 4, 
  };

  return (
    <MultiStepFormContext.Provider value={value}>
      {children}
    </MultiStepFormContext.Provider>
  );
}
