'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Stack,
  FormControlLabel,
  Switch,
  FormControl,
  FormLabel,
  Paper,
  Divider,
  IconButton,
  OutlinedInput,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TravelerForm from '../TravelerForm';
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
  // Local state to track cost calculations
  const [petsCost, setPetsCost] = useState(0);
  const [luggageCost, setLuggageCost] = useState(0);

  // Handle number of travelers changes
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

  // For direct input changes
  const handleTravelersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (isNaN(value)) return;
    
    const numTravelers = Math.max(MIN_TRAVELERS, Math.min(value, MAX_TRAVELERS));
    const currentTravelers = [...formData.travelers];
    
    // Add or remove travelers as needed
    if (numTravelers > currentTravelers.length) {
      // Need to add more travelers
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

  // Handler for updating specific traveler data
  const updateTraveler = (index: number, data: Partial<TravelerFormData>) => {
    const updatedTravelers = [...formData.travelers];
    updatedTravelers[index] = { ...updatedTravelers[index], ...data };
    
    updateFormData({
      travelers: updatedTravelers,
    });
  };

  // Handlers for pets
  const handlePetsToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hasPets = event.target.checked;
    
    updateFormData({
      pets: {
        ...formData.pets,
        hasPets,
        quantity: hasPets ? formData.pets.quantity || 1 : 0,
      },
    });
  };

  const handlePetsQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(event.target.value);
    if (isNaN(quantity) || quantity < 0) return;
    
    updateFormData({
      pets: {
        ...formData.pets,
        quantity,
      },
    });
  };

  // Handlers for luggage
  const handleLuggageToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hasExtraLuggage = event.target.checked;
    
    updateFormData({
      extraLuggage: {
        ...formData.extraLuggage,
        hasExtraLuggage,
        quantity: hasExtraLuggage ? formData.extraLuggage.quantity || 1 : 0,
      },
    });
  };

  const handleLuggageQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(event.target.value);
    if (isNaN(quantity) || quantity < 0) return;
    
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
        <FormControl fullWidth>
          <FormLabel htmlFor="numTravelers" sx={{ fontWeight: 500, mb: 1 }}>
            Number of Travelers
          </FormLabel>
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
              id="numTravelers"
              type="number"
              value={formData.numberOfTravelers}
              onChange={handleTravelersChange}
              size="small"
              sx={{ 
                mx: 1, 
                width: '80px', 
                '& input': { textAlign: 'center' } 
              }}
              required
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
        </FormControl>

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
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.pets.hasPets}
                      onChange={handlePetsToggle}
                      size="small"
                    />
                  }
                  label="I'm traveling with pets"
                />

                {formData.pets.hasPets && (
                  <FormControl fullWidth>
                    <FormLabel htmlFor="petsQuantity" sx={{ fontSize: '0.875rem' }}>
                      Number of Pets ($100 each)
                    </FormLabel>
                    <TextField
                      id="petsQuantity"
                      type="number"
                      value={formData.pets.quantity}
                      onChange={handlePetsQuantityChange}
                      size="small"
                      required={formData.pets.hasPets}
                    />
                  </FormControl>
                )}
              </Stack>
            </Paper>

            {/* Extra Luggage */}
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1, flex: 1 }}>
              <Stack spacing={1}>
                <Typography variant="subtitle2">Extra Luggage</Typography>
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.extraLuggage.hasExtraLuggage}
                      onChange={handleLuggageToggle}
                      size="small"
                    />
                  }
                  label="I need extra luggage"
                />

                {formData.extraLuggage.hasExtraLuggage && (
                  <FormControl fullWidth>
                    <FormLabel htmlFor="luggageQuantity" sx={{ fontSize: '0.875rem' }}>
                      Number of Extra Bags ($50 each)
                    </FormLabel>
                    <TextField
                      id="luggageQuantity"
                      type="number"
                      value={formData.extraLuggage.quantity}
                      onChange={handleLuggageQuantityChange}
                      size="small"
                      required={formData.extraLuggage.hasExtraLuggage}
                    />
                  </FormControl>
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