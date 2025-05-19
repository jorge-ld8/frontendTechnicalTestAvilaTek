'use client';

import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  TextFieldProps,
  InputAdornment,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface NumericTextFieldProps extends Omit<TextFieldProps, 'onChange' | 'type'> {
  value: string | number;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  step?: number;
  allowDecimals?: boolean;
  allowNegative?: boolean;
  showStepper?: boolean;
  adornment?: React.ReactNode;
  adornmentPosition?: 'start' | 'end';
}

/**
 * A reusable numeric text field component that accepts only valid numeric input
 * and provides additional features like step buttons, min/max validation, etc.
 */
const NumericTextField = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  allowDecimals = false,
  allowNegative = false,
  showStepper = false,
  adornment,
  adornmentPosition = 'start',
  onBlur,
  error,
  helperText,
  size = 'small',
  ...rest
}: NumericTextFieldProps) => {
  const [localValue, setLocalValue] = useState<string>(value.toString());
  const [localError, setLocalError] = useState<string | null>(null);

  // Update local value when prop value changes
  useEffect(() => {
    setLocalValue(value.toString());
  }, [value]);

  // Validate and handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Empty value is always allowed
    if (inputValue === '') {
      setLocalValue('');
      onChange('');
      setLocalError(null);
      return;
    }

    // Define the regex pattern based on props
    const pattern = allowDecimals
      ? allowNegative 
        ? /^-?\d*\.?\d*$/ // Negative with decimals
        : /^\d*\.?\d*$/   // Positive with decimals
      : allowNegative
        ? /^-?\d*$/       // Negative integers only
        : /^\d*$/;        // Positive integers only

    // Validate input against the pattern
    if (!pattern.test(inputValue)) {
      return; // Don't update if invalid
    }

    setLocalValue(inputValue);
    onChange(inputValue);

    // Validate min/max after valid input
    const numValue = allowDecimals ? parseFloat(inputValue) : parseInt(inputValue, 10);
    
    if (!isNaN(numValue)) {
      let errorMessage = null;
      
      if (min !== undefined && numValue < min) {
        errorMessage = `Value must be at least ${min}`;
      }
      
      if (max !== undefined && numValue > max) {
        errorMessage = `Value must be at most ${max}`;
      }
      
      setLocalError(errorMessage);
    } else {
      setLocalError(null);
    }
  };

  // Handle value incrementing/decrementing
  const handleStep = (direction: 'up' | 'down') => {
    // Get numeric value or default to 0
    const numValue = allowDecimals 
      ? parseFloat(localValue || '0') 
      : parseInt(localValue || '0', 10);

    if (isNaN(numValue)) return;

    let newValue = direction === 'up' ? numValue + step : numValue - step;
    
    // Respect min/max boundaries
    if (min !== undefined) newValue = Math.max(min, newValue);
    if (max !== undefined) newValue = Math.min(max, newValue);
    
    // Format the new value
    const formattedValue = allowDecimals ? newValue.toString() : Math.floor(newValue).toString();
    
    setLocalValue(formattedValue);
    onChange(formattedValue);
    setLocalError(null);
  };

  // Custom blur handling to normalize value
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // If empty, set to min or 0
    if (localValue === '') {
      const defaultValue = min !== undefined ? min.toString() : '0';
      setLocalValue(defaultValue);
      onChange(defaultValue);
    }
    
    // Call the original onBlur handler if provided
    if (onBlur) {
      onBlur(e);
    }
  };

  // Configure input adornments
  const startAdornment = adornmentPosition === 'start' && adornment ? (
    <InputAdornment position="start">{adornment}</InputAdornment>
  ) : undefined;

  const endAdornment = (
    <InputAdornment position="end">
      {showStepper && (
        <>
          <IconButton 
            size="small" 
            onClick={() => handleStep('down')}
            disabled={min !== undefined && (localValue === '' || parseFloat(localValue) <= min)}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={() => handleStep('up')}
            disabled={max !== undefined && (localValue !== '' && parseFloat(localValue) >= max)}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </>
      )}
      {adornmentPosition === 'end' && adornment ? adornment : null}
    </InputAdornment>
  );

  return (
    <TextField
      {...rest}
      type="text"
      value={localValue}
      onChange={handleInputChange}
      onBlur={handleBlur}
      error={error || !!localError}
      helperText={localError || helperText}
      size={size}
      InputProps={{
        startAdornment,
        endAdornment: (showStepper || (adornmentPosition === 'end' && adornment)) ? endAdornment : undefined,
        ...rest.InputProps,
      }}
      inputProps={{
        inputMode: 'numeric',
        ...rest.inputProps,
      }}
    />
  );
};

export default NumericTextField; 