import { Step1FormData, Step2FormData, Step3FormData } from '../types/form.types';

export const MIN_TRAVELERS = 1;
export const MAX_TRAVELERS = 10;
export const PET_PRICE = 100;
export const LUGGAGE_PRICE = 50; 

export const initialStep1Data: Step1FormData = {
    destination: null,
    departureDate: null,
    returnDate: null,
    flightClass: null,
    priceUSD: 0
}

export const initialStep2Data: Step2FormData = {
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

export const initialStep3Data: Step3FormData = {
    travelInsurance: false,
    preferentialSeats: false,
    specialAssistance: false,
    assistanceNotes: '',
};

export const steps = [
    'Travel Information',
    'Traveler Information',
    'Additional Services',
    'Review & Confirm'
];
  
  