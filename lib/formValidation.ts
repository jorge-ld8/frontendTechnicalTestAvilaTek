import { Step1FormData, Step2FormData, Step3FormData } from '../types/form.types';

// Validation function for Step 1
export const validateStep1Data = (data: Step1FormData | undefined): boolean => {
  if (!data) return false;
  
  return !!(
    data.destination && 
    data.departureDate && 
    data.returnDate && 
    data.flightClass
  );
};

// Validation function for Step 2
export const validateStep2Data = (data: Step2FormData | undefined): boolean => {
  if (!data) return false;
  
  if (data.numberOfTravelers < 1 || data.numberOfTravelers > 10) return false;
  
  if (data.travelers.length !== data.numberOfTravelers) return false;
  
  // Validate each traveler's information
  const allTravelersValid = data.travelers.every(traveler => 
    traveler.fullName.trim() !== '' && 
    traveler.dateOfBirth !== null && 
    traveler.documentType !== '' && 
    traveler.documentNumber.trim() !== ''
  );
  if (!allTravelersValid) return false;
  
  if (data.pets.hasPets && (data.pets.quantity < 1)) return false;
  
  if (data.extraLuggage.hasExtraLuggage && (data.extraLuggage.quantity < 1)) return false;
  
  return true;
};

// Validation function for Step 3
export const validateStep3Data = (data: Step3FormData | undefined): boolean => {
  if (!data) return false;
  
  if (data.specialAssistance) {
    if (data.assistanceNotes.trim() === '') return false;
    if (data.assistanceNotes.length > 200) return false;
  }
  
  return true;
}; 