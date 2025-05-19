
export interface FlightClass {
  name: string;
}

export interface Flight {
  id: string;
  destination: DestinationOption;
  class: FlightClass;
  priceUSD: number;
}

export interface FlightResponse{
    destination: string;
    class: string;
    priceUSD: number;
}

export interface FlightClassWithPrice {
  class: string;
  priceUSD: number;
}

export interface DestinationOption {
  label: string;
  id: string;
}

export interface Step1FormData {
  destination: string | null;
  departureDate: Date | null;
  returnDate: Date | null;
  flightClass: string | null;
  priceUSD: number;
} 