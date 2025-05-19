'use client';

import {
  Box,
  TextField,
  FormControl,
  MenuItem,
  Select,
  Typography,
  InputLabel,
  Stack,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TravelerFormData } from '../../types/form.types';

interface TravelerFormProps {
  traveler: TravelerFormData;
  index: number;
  updateTraveler: (index: number, data: Partial<TravelerFormData>) => void;
}

const documentTypes = [
  { value: 'passport', label: 'Passport' },
  { value: 'id', label: 'ID Card' },
  { value: 'driverLicense', label: 'Driver License' },
];

const TravelerForm = ({ traveler, index, updateTraveler }: TravelerFormProps) => {
  const handleInputChange = (field: keyof TravelerFormData, value: string | Date | null) => {
    updateTraveler(index, { [field]: value });
  };

  return (
    <Box sx={{ py: 1, px: 2, mb: 2, bgcolor: 'background.default', borderRadius: 1 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Traveler {index + 1}
      </Typography>
      
      <Stack spacing={1}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1 }}>
          <TextField
            fullWidth
            size="small"
            label="Full Name *"
            value={traveler.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
          />
          
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date of Birth"
              value={traveler.dateOfBirth}
              onChange={(date) => handleInputChange('dateOfBirth', date)}
              disableFuture
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true
                },
              }}
            />
          </LocalizationProvider>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1 }}>
          <FormControl fullWidth size="small">
            <InputLabel id={`docType-label-${index}`}>Document Type</InputLabel>
            <Select
              labelId={`docType-label-${index}`}
              id={`docType-${index}`}
              value={traveler.documentType}
              onChange={(e) => handleInputChange('documentType', e.target.value)}
              label="Document Type"
            >
              {documentTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            fullWidth
            size="small"
            label="Document Number *"
            value={traveler.documentNumber}
            onChange={(e) => handleInputChange('documentNumber', e.target.value)}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default TravelerForm; 