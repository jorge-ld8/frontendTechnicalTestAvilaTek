import { FlightResponse, FlightClassWithPrice } from '../types/flight.types';

const FLIGHTS_API_URL = 'https://raw.githubusercontent.com/Lstanislao/cities-permalink/main/flights.json';

export const fetchFlights = async (): Promise<FlightResponse[]> => {
  try {
    const response = await fetch(FLIGHTS_API_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch flights: ${response.status} ${response.statusText}`);
    }
    const data: FlightResponse[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching flights:', error);
    return [];
  }
};

export const getDestinations = (flights: FlightResponse[]) => {
  const uniqueLabels = new Set<string>();
  flights.forEach(record => {
    uniqueLabels.add(record.destination);
  });
  return Array.from(uniqueLabels);
};

export const getFlightClassesForDestination = (flights: FlightResponse[], destination: string) => {
  const uniqueFlightClasses = new Set<string>();

  flights.forEach(flight => {
    if (flight.destination === destination) {
      uniqueFlightClasses.add(flight.class);
    }
  });
  return Array.from(uniqueFlightClasses);
}; 

export const getFlightClassesAndPricesForDestination = (
  flights: FlightResponse[],
  selectedDestination: string
): FlightClassWithPrice[] => {
  if (!selectedDestination) return [];

  return flights
    .filter(flight => flight.destination === selectedDestination)
    .map(flight => ({
      class: flight.class,
      priceUSD: flight.priceUSD,
    }));
};