'use client';

import { SyntheticEvent } from 'react';
import { 
  Autocomplete, 
  Box, 
  FormControl, 
  FormLabel, 
  TextField, 
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  Alert,
  Stack
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Step1FormData, FlightClassWithPrice } from '../../../types/flight.types';
import { useDestinations, useFlightClasses, useFlightClassesAndPrices } from '../../../hooks/useFlights';

interface Step1TravelInfoProps {
  formData: Step1FormData;
  updateFormData: (data: Partial<Step1FormData>) => void;
}

const Step1TravelInfo = ({ formData, updateFormData }: Step1TravelInfoProps) => {
  // Using custom hooks instead of useEffect
  const { destinations, status, error } = useDestinations();
  const flightClasses = useFlightClasses(formData.destination || '');

  const classesAndPrices: FlightClassWithPrice[] = useFlightClassesAndPrices(formData.destination);
  
  const handleDestinationChange = (_: SyntheticEvent, value: string | null) => {
    updateFormData({ 
      destination: value,
      flightClass: null 
    });
  };

  // Validate that return date is after departure date
  const isReturnDateValid = (date: Date | null) => {
    if (!date || !formData.departureDate) return true;
    return date >= formData.departureDate;
  };

  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Travel Information
      </Typography>

      {status === 'pending' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Failed to load flight data. Please try again later.
        </Alert>
      )}

      {status === 'success' && (
        <Stack spacing={3}>
          <FormControl fullWidth>
            <FormLabel 
              htmlFor="destination"
              sx={{ mb: 1, fontWeight: 500 }}
            >
              Destination
            </FormLabel>
            <Autocomplete
              id="destination"
              options={destinations}
              value={formData.destination}
              onChange={handleDestinationChange}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  placeholder="Select your destination" 
                  required
                />
              )}
              isOptionEqualToValue={(option, value) => option === value}
            />
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <FormControl fullWidth>
                <FormLabel 
                  htmlFor="departure-date"
                  sx={{ mb: 1, fontWeight: 500 }}
                >
                  Departure Date
                </FormLabel>
                <DatePicker
                  value={formData.departureDate}
                  onChange={(date) => updateFormData({ departureDate: date })}
                  disablePast
                  slotProps={{
                    textField: { 
                      required: true,
                      id: "departure-date"
                    }
                  }}
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel 
                  htmlFor="return-date"
                  sx={{ mb: 1, fontWeight: 500 }}
                >
                  Return Date
                </FormLabel>
                <DatePicker
                  value={formData.returnDate}
                  onChange={(date) => updateFormData({ returnDate: date })}
                  disablePast
                  minDate={formData.departureDate || undefined}
                  slotProps={{
                    textField: { 
                      required: true,
                      id: "return-date",
                      error: formData.returnDate ? !isReturnDateValid(formData.returnDate) : false,
                      helperText: formData.returnDate && !isReturnDateValid(formData.returnDate) 
                        ? "Return date must be after departure date" 
                        : ""
                    }
                  }}
                />
              </FormControl>
            </Stack>
          </LocalizationProvider>

          {formData.destination && flightClasses.length > 0 && (
            <FormControl component="fieldset">
              <FormLabel 
                component="legend"
                sx={{ mb: 1, fontWeight: 500 }}
              >
                Flight Class
              </FormLabel>
              <RadioGroup
                name="flight-class"
                value={formData.flightClass || ''}
                onChange={(e) => updateFormData({ flightClass: e.target.value, priceUSD: classesAndPrices.find(cls => cls.class === e.target.value)?.priceUSD || 0 })}
                row
              >
                {classesAndPrices.map((cls: FlightClassWithPrice) => (
                  <FormControlLabel
                    key={cls.class}
                    value={cls.class}
                    control={<Radio />}
                    label={`${cls.class} - $${cls.priceUSD}`}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}
        </Stack>
      )}
    </Box>
  );
};

export default Step1TravelInfo; 