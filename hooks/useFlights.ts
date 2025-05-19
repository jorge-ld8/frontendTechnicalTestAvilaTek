import { useQuery } from '@tanstack/react-query';
import { fetchFlights, getDestinations, getFlightClassesAndPricesForDestination, getFlightClassesForDestination } from '../lib/flightsApi';
import { FlightResponse } from '../types/flight.types';

export const useFlightsData = () => {
  return useQuery<FlightResponse[], Error>({
    queryKey: ['flights'],
    queryFn: fetchFlights,
  });
};

export const useDestinations = () => {
  const { data: flights = [], status, error } = useFlightsData();
  
  const destinations: string[] = flights.length > 0 
    ? getDestinations(flights) as string[]
    : [];
  
  return { 
    destinations, 
    status, 
    error 
  };
};

export const useFlightClasses = (destination: string | undefined) => {
  const { data: flights = [] } = useFlightsData();
  
  if (!destination) return [];
  
  return getFlightClassesForDestination(flights, destination);
}; 

export const useFlightClassesAndPrices = (destinationName: string | null | undefined) => {
  const { data: flights = [], status } = useFlightsData();

  if (status !== 'success' || !destinationName) {
    return [];
  }

  return getFlightClassesAndPricesForDestination(flights, destinationName);
};