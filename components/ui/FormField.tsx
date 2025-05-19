'use client';

import React, { ReactNode, cloneElement, isValidElement, ReactElement } from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Box,
  SxProps,
  Theme,
} from '@mui/material';

interface InputElementProps {
  id?: string;
  'aria-labelledby'?: string;
  required?: boolean;
  error?: boolean;
  disabled?: boolean;
}

interface FormFieldProps {
  id?: string;
  label: string;
  children: ReactNode;
  required?: boolean;
  fullWidth?: boolean;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  className?: string;
  sx?: SxProps<Theme>;
  labelSx?: SxProps<Theme>;
}

const FormField = ({
  id,
  label,
  children,
  required = false,
  fullWidth = true,
  helperText,
  error = false,
  disabled = false,
  className,
  sx,
  labelSx,
}: FormFieldProps) => {
  const fieldId = id || `field-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <FormControl
      fullWidth={fullWidth}
      required={required}
      error={error}
      disabled={disabled}
      className={className}
      sx={sx}
    >
      {label && (
        <FormLabel
          htmlFor={fieldId}
          sx={{
            mb: 1,
            fontWeight: 500,
            ...labelSx,
          }}
        >
          {label}
        </FormLabel>
      )}
      
      <Box>
        {/* Render the child element, trying to pass down relevant props safely */}
        {isValidElement(children) ? (
          // Use a type that has the common input element props
          cloneElement(children as ReactElement<InputElementProps>, {
            id: fieldId,
            'aria-labelledby': `${fieldId}-label`,
            ...(required && { required }),
            ...(error && { error }),
            ...(disabled && { disabled }),
          })
        ) : (
          children
        )}
      </Box>
      
      {helperText && (
        <FormHelperText error={error}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default FormField; 