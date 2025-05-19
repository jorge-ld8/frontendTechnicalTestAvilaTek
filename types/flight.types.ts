export interface FlightResponse{
    destination: string;
    class: string;
    priceUSD: number;
}

export interface FlightClassWithPrice {
  class: string;
  priceUSD: number;
}

export interface Step1FormData {
  destination: string | null;
  departureDate: Date | null;
  returnDate: Date | null;
  flightClass: string | null;
  priceUSD: number;
} 