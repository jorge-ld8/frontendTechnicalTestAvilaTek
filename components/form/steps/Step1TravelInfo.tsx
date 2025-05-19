'use client';

import { SyntheticEvent } from 'react';
import { 
  Autocomplete, 
  Box, 
  TextField, 
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  Alert,
  Stack
} from '@mui/material';
import DatePickerWrapper from '../../ui/DatePickerWrapper';
import FormField from '../../ui/FormField';
import { FlightClassWithPrice } from '../../../types/flight.types';
import { useDestinations, useFlightClasses, useFlightClassesAndPrices } from '../../../hooks/useFlights';
import { Step1FormData } from '../../../types/form.types';

interface Step1TravelInfoProps {
  formData: Step1FormData;
  updateFormData: (data: Partial<Step1FormData>) => void;
}

const Step1TravelInfo = ({ formData, updateFormData }: Step1TravelInfoProps) => {
  const { destinations, status, error } = useDestinations();
  const flightClasses = useFlightClasses(formData.destination || '');
  const classesAndPrices: FlightClassWithPrice[] = useFlightClassesAndPrices(formData.destination);
  
  const handleDestinationChange = (_: SyntheticEvent, value: string | null) => {
    updateFormData({ 
      destination: value,
      flightClass: null 
    });
  };

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
          <FormField
            id="destination"
            label="Destination"
            required
          >
            <Autocomplete
              options={destinations}
              value={formData.destination}
              onChange={handleDestinationChange}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  placeholder="Select your destination" 
                  size="small"
                  margin="dense"
                />
              )}
              isOptionEqualToValue={(option, value) => option === value}
            />
          </FormField>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <FormField
              id="departure-date"
              label="Departure Date"
              required
            >
              <DatePickerWrapper
                label=""
                value={formData.departureDate}
                onChange={(date) => updateFormData({ departureDate: date })}
                disablePast
              />
            </FormField>

            <FormField
              id="return-date"
              label="Return Date"
              required
              error={formData.returnDate ? !isReturnDateValid(formData.returnDate) : false}
              helperText={formData.returnDate && !isReturnDateValid(formData.returnDate) 
                ? "Return date must be after departure date" 
                : ""}
            >
              <DatePickerWrapper
                label=""
                value={formData.returnDate}
                onChange={(date) => updateFormData({ returnDate: date })}
                disablePast
                minDate={formData.departureDate || undefined}
              />
            </FormField>
          </Stack>

          {formData.destination && flightClasses.length > 0 && (
            <FormField
              id="flight-class"
              label="Flight Class"
            >
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
                    control={<Radio size="small" />}
                    label={`${cls.class} - $${cls.priceUSD}`}
                  />
                ))}
              </RadioGroup>
            </FormField>
          )}
        </Stack>
      )}
    </Box>
  );
};

export default Step1TravelInfo; 