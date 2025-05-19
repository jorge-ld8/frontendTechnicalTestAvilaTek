'use client';

import { Box, Typography, Stack, TextField } from '@mui/material';
import SwitchWrapper from '../../ui/SwitchWrapper';
import FormField from '../../ui/FormField';
import { Step3FormData } from '../../../types/form.types';

interface Step3AdditionalServicesProps {
  formData: Step3FormData;
  updateFormData: (data: Partial<Step3FormData>) => void;
}

const Step3AdditionalServices = ({ formData, updateFormData }: Step3AdditionalServicesProps) => {
  const handleSwitchChange = (field: keyof Omit<Step3FormData, 'assistanceNotes'>) => (checked: boolean) => {
    updateFormData({ [field]: checked });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateFormData({ assistanceNotes: e.target.value });
  };

  return (
    <Box sx={{ mt: 1, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Additional Services
      </Typography>

      <Stack spacing={4}>
        <SwitchWrapper
          label="Travel Insurance"
          checked={formData.travelInsurance}
          onChange={handleSwitchChange('travelInsurance')}
          description="Includes coverage for trip cancellation, medical emergencies, and baggage loss."
        />

        <SwitchWrapper
          label="Preferential Seats"
          checked={formData.preferentialSeats}
          onChange={handleSwitchChange('preferentialSeats')}
          description="Enjoy extra legroom, priority boarding, and better seat location."
        />

        <SwitchWrapper
          label="Special Assistance"
          checked={formData.specialAssistance}
          onChange={handleSwitchChange('specialAssistance')}
          description="For passengers requiring special accommodations or assistance."
        />

        {formData.specialAssistance && (
          <FormField
            id="assistance-notes"
            label="Special Assistance Details"
            required={formData.specialAssistance}
            helperText={`${formData.assistanceNotes.length}/200 characters`}
            error={formData.assistanceNotes.length > 200}
          >
            <TextField
              multiline
              rows={3}
              value={formData.assistanceNotes}
              onChange={handleTextChange}
              placeholder="Please describe the type of assistance you require."
              fullWidth
              size="small"
            />
          </FormField>
        )}
      </Stack>
    </Box>
  );
};

export default Step3AdditionalServices; 