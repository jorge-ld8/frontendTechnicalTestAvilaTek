export type FormStep = 1 | 2 | 3 | 4;

export interface TravelerFormData {
  fullName: string;
  dateOfBirth: Date | null;
  documentType: string;
  documentNumber: string;
}

export interface PetsData {
  hasPets: boolean;
  quantity: number;
}

export interface LuggageData {
  hasExtraLuggage: boolean;
  quantity: number;
}

export interface Step1FormData {
  destination: string | null;
  departureDate: Date | null;
  returnDate: Date | null;
  flightClass: string | null;
  priceUSD: number;
} 

export interface Step2FormData {
  numberOfTravelers: number;
  travelers: TravelerFormData[];
  pets: PetsData;
  extraLuggage: LuggageData;
}

export interface Step3FormData {
  travelInsurance: boolean;
  preferentialSeats: boolean;
  specialAssistance: boolean;
  assistanceNotes: string;
}

export interface BookingFormData {
  step1: Step1FormData;
  step2: Step2FormData;
  step3: Step3FormData;
} 