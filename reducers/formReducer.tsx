import { initialStep3Data } from "@/constants/formConstants";
import { initialStep2Data } from "@/constants/formConstants";
import { FormState, CombinedFormData, PartialFormData } from "@/context/MultiStepFormContext";
import { FormStep } from "@/types/form.types";


export type FormAction = 
  | { type: 'next'; data: Partial<CombinedFormData> }
  | { type: 'previous'; data: Partial<CombinedFormData> }
  | { type: 'set_step'; step: FormStep }
  | { type: 'set_data'; data: PartialFormData };
  
// Reducer function to handle state changes
export const formReducer = (state: FormState, action: FormAction): FormState => {
    switch (action.type) {
      case 'next':
        return {
          ...state,
          currentStep: state.currentStep < 4 ? (state.currentStep + 1) as FormStep : state.currentStep,
          data: { ...state.data, ...action.data },
        };
      case 'previous':
        const newCurrentStep = state.currentStep > 1 ? (state.currentStep - 1) as FormStep : state.currentStep;
        let newData = { ...state.data };

        if (newCurrentStep === 1) {
          newData = {
            ...newData,
            step2: initialStep2Data,
            step3: initialStep3Data,
          };
        } else if (newCurrentStep === 2) {
          newData = {
            ...newData,
            step3: initialStep3Data,
          };
        }

        return {
          ...state,
          currentStep: newCurrentStep,
          data: newData,
        };
      case 'set_step': {
        const targetStep = action.step;
        let newData = { ...state.data };

        if (targetStep < state.currentStep) {
          if (targetStep === 1) {
            newData = {
              ...state.data, // Keep current step1 data if any was being set simultaneously
              step2: initialStep2Data,
              step3: initialStep3Data,
            };
          } else if (targetStep === 2) {
            newData = {
              ...state.data, // Keep current step1, step2 data
              step3: initialStep3Data,
            };
          }
        }
        
        return {
          ...state,
          currentStep: targetStep,
          data: newData,
        };
      }
      case 'set_data':
        return {
          ...state,
          data: {
            ...state.data,
            step1: action.data.step1 ? { ...state.data.step1, ...action.data.step1 } : state.data.step1,
            step2: action.data.step2 ? { ...state.data.step2, ...action.data.step2 } : state.data.step2,
            step3: action.data.step3 ? { ...state.data.step3, ...action.data.step3 } : state.data.step3,
          },
        };
      default:
        return state;
    }
  }