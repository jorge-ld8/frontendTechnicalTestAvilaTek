'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Stack,
  Paper,
  Divider,
  IconButton,
  OutlinedInput,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TravelerForm from '../TravelerForm';
import FormField from '../../ui/FormField';
import SwitchWrapper from '../../ui/SwitchWrapper';
import NumericTextField from '../../ui/NumericTextField';
import { Step2FormData, TravelerFormData } from '../../../types/form.types';
import { MIN_TRAVELERS, MAX_TRAVELERS, PET_PRICE, LUGGAGE_PRICE } from '../../../constants/formConstants';

const createDefaultTraveler = (): TravelerFormData => ({
  fullName: '',
  dateOfBirth: null,
  documentType: 'passport',
  documentNumber: '',
});

interface Step2TravelerInfoProps {
  formData: Step2FormData;
  updateFormData: (data: Partial<Step2FormData>) => void;
}

const Step2TravelerInfo = ({ formData, updateFormData }: Step2TravelerInfoProps) => {
  const [petsCost, setPetsCost] = useState(0);
  const [luggageCost, setLuggageCost] = useState(0);

  const handleIncreaseTravelers = () => {
    if (formData.numberOfTravelers >= MAX_TRAVELERS) return;
    
    const newTravelersCount = formData.numberOfTravelers + 1;
    const currentTravelers = [...formData.travelers];
    
    // Add a new traveler
    updateFormData({
      numberOfTravelers: newTravelersCount,
      travelers: [...currentTravelers, createDefaultTraveler()],
    });
  };

  const handleDecreaseTravelers = () => {
    if (formData.numberOfTravelers <= MIN_TRAVELERS) return;
    
    const newTravelersCount = formData.numberOfTravelers - 1;
    const currentTravelers = [...formData.travelers];
    
    // Remove the last traveler
    updateFormData({
      numberOfTravelers: newTravelersCount,
      travelers: currentTravelers.slice(0, newTravelersCount),
    });
  };

  const handleTravelersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (isNaN(value)) return;
    
    const numTravelers = Math.max(MIN_TRAVELERS, Math.min(value, MAX_TRAVELERS));
    const currentTravelers = [...formData.travelers];
    
    if (numTravelers > currentTravelers.length) {
      const newTravelers = Array(numTravelers - currentTravelers.length)
        .fill(null)
        .map(() => createDefaultTraveler());
      
      updateFormData({
        numberOfTravelers: numTravelers,
        travelers: [...currentTravelers, ...newTravelers],
      });
    } else if (numTravelers < currentTravelers.length) {
      updateFormData({
        numberOfTravelers: numTravelers,
        travelers: currentTravelers.slice(0, numTravelers),
      });
    } else {
      updateFormData({
        numberOfTravelers: numTravelers,
      });
    }
  };

  const updateTraveler = (index: number, data: Partial<TravelerFormData>) => {
    const updatedTravelers = [...formData.travelers];
    updatedTravelers[index] = { ...updatedTravelers[index], ...data };
    
    updateFormData({
      travelers: updatedTravelers,
    });
  };

  const handlePetsToggle = (hasPets: boolean) => {
    updateFormData({
      pets: {
        ...formData.pets,
        hasPets,
        quantity: hasPets ? formData.pets.quantity || 1 : 0,
      },
    });
  };

  const handlePetsQuantityChange = (value: string) => {
    const quantity = parseInt(value || '0', 10);
    if (isNaN(quantity)) return;
    
    updateFormData({
      pets: {
        ...formData.pets,
        quantity,
      },
    });
  };

  const handleLuggageToggle = (hasExtraLuggage: boolean) => {
    updateFormData({
      extraLuggage: {
        ...formData.extraLuggage,
        hasExtraLuggage,
        quantity: hasExtraLuggage ? formData.extraLuggage.quantity || 1 : 0,
      },
    });
  };

  const handleLuggageQuantityChange = (value: string) => {
    const quantity = parseInt(value || '0', 10);
    if (isNaN(quantity)) return;
    
    updateFormData({
      extraLuggage: {
        ...formData.extraLuggage,
        quantity,
      },
    });
  };

  useEffect(() => {
    const newPetsCost = formData.pets.hasPets ? formData.pets.quantity * PET_PRICE : 0;
    setPetsCost(newPetsCost);
    
    const newLuggageCost = formData.extraLuggage.hasExtraLuggage 
      ? formData.extraLuggage.quantity * LUGGAGE_PRICE 
      : 0;
    setLuggageCost(newLuggageCost);
  }, [formData.pets, formData.extraLuggage]);

  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Traveler Information
      </Typography>

      <Stack spacing={2}>
        <FormField
          id="numTravelers"
          label="Number of Travelers"
          required
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton 
              size="small" 
              onClick={handleDecreaseTravelers} 
              disabled={formData.numberOfTravelers <= MIN_TRAVELERS}
              sx={{ bgcolor: 'background.default' }}
            >
              <RemoveIcon />
            </IconButton>
            
            <OutlinedInput
              type="number"
              value={formData.numberOfTravelers}
              onChange={handleTravelersChange}
              size="small"
              sx={{ 
                mx: 1, 
                width: '80px', 
                '& input': { textAlign: 'center' } 
              }}
            />
            
            <IconButton 
              size="small" 
              onClick={handleIncreaseTravelers} 
              disabled={formData.numberOfTravelers >= MAX_TRAVELERS}
              sx={{ bgcolor: 'background.default' }}
            >
              <AddIcon />
            </IconButton>
            
            <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
              {`(Min: ${MIN_TRAVELERS}, Max: ${MAX_TRAVELERS})`}
            </Typography>
          </Box>
        </FormField>

        {/* Traveler Forms - Compact collection */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Traveler Details
          </Typography>
          <Stack spacing={1}>
            {formData.travelers.map((traveler, index) => (
              <TravelerForm
                key={index}
                traveler={traveler}
                index={index}
                updateTraveler={updateTraveler}
              />
            ))}
          </Stack>
        </Box>

        {/* Options Section with Pets and Luggage */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Additional Options
          </Typography>
          
          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            spacing={2} 
            divider={<Divider orientation="vertical" flexItem />}
          >
            {/* Pets */}
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1, flex: 1 }}>
              <Stack spacing={1}>
                <Typography variant="subtitle2">Travel with Pets</Typography>
                
                <SwitchWrapper
                  checked={formData.pets.hasPets}
                  onChange={handlePetsToggle}
                  label="I'm traveling with pets"
                />

                {formData.pets.hasPets && (
                  <FormField
                    id="petsQuantity"
                    label="Number of Pets ($100 each)"
                    required={formData.pets.hasPets}
                    labelSx={{ fontSize: '0.875rem' }}
                  >
                    <NumericTextField
                      value={formData.pets.quantity}
                      onChange={handlePetsQuantityChange}
                      min={1}
                      step={1}
                      allowDecimals={false}
                      allowNegative={false}
                      fullWidth
                    />
                  </FormField>
                )}
              </Stack>
            </Paper>

            {/* Extra Luggage */}
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1, flex: 1 }}>
              <Stack spacing={1}>
                <Typography variant="subtitle2">Extra Luggage</Typography>
                
                <SwitchWrapper
                  checked={formData.extraLuggage.hasExtraLuggage}
                  onChange={handleLuggageToggle}
                  label="I need extra luggage"
                />

                {formData.extraLuggage.hasExtraLuggage && (
                  <FormField
                    id="luggageQuantity"
                    label="Number of Extra Bags ($50 each)"
                    required={formData.extraLuggage.hasExtraLuggage}
                    labelSx={{ fontSize: '0.875rem' }}
                  >
                    <NumericTextField
                      value={formData.extraLuggage.quantity}
                      onChange={handleLuggageQuantityChange}
                      min={1}
                      step={1}
                      allowDecimals={false}
                      allowNegative={false}
                      fullWidth
                    />
                  </FormField>
                )}
              </Stack>
            </Paper>
          </Stack>
        </Box>

        {/* Total Additional Costs */}
        {(petsCost > 0 || luggageCost > 0) && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Additional Costs: ${petsCost + luggageCost}
            </Typography>
            {petsCost > 0 && (
              <Typography variant="body2">
                Pets: ${petsCost}
              </Typography>
            )}
            {luggageCost > 0 && (
              <Typography variant="body2">
                Extra Luggage: ${luggageCost}
              </Typography>
            )}
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default Step2TravelerInfo;