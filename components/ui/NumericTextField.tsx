'use client';

import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  TextFieldProps,
} from '@mui/material';

interface NumericTextFieldProps extends Omit<TextFieldProps, 'onChange' | 'type'> {
  value: string | number;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  step?: number;
  allowDecimals?: boolean;
  allowNegative?: boolean;
}

const NumericTextField = ({
  value,
  onChange,
  min,
  max,
  allowDecimals = false,
  allowNegative = false,
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
    />
  );
};

export default NumericTextField; 