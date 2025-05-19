'use client';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextFieldProps } from '@mui/material/TextField';
import { Theme } from '@mui/material/styles';

export interface DatePickerWrapperProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  label: string;
  id?: string;
  required?: boolean;
  helperText?: string;
  error?: boolean;
  disablePast?: boolean;
  disableFuture?: boolean;
  minDate?: Date;
  maxDate?: Date;
  textFieldProps?: Partial<TextFieldProps>;
  fullWidth?: boolean;
  size?: 'small' | 'medium';
  margin?: 'none' | 'dense' | 'normal';
  name?: string;
  readOnly?: boolean;
  disabled?: boolean;
}

const DatePickerWrapper = ({
  value,
  onChange,
  label,
  id,
  required,
  helperText,
  error,
  disablePast,
  disableFuture,
  minDate,
  maxDate,
  textFieldProps,
  fullWidth = true,
  size = 'small',
  margin = 'dense',
  name,
  readOnly,
  disabled,
}: DatePickerWrapperProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        disablePast={disablePast}
        disableFuture={disableFuture}
        minDate={minDate}
        maxDate={maxDate}
        readOnly={readOnly}
        disabled={disabled}
        sx={{
          '& .MuiInputBase-root': {
            borderRadius: '8px',
            borderColor: (theme: Theme) => theme.palette.grey[400],
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: (theme: Theme) => theme.palette.grey[500],
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: (theme: Theme) => theme.palette.primary.main,
              borderWidth: '1px',
            },
          },
          '& .MuiSvgIcon-root': {
            color: (theme: Theme) => theme.palette.grey[600],
            fontSize: '1.25rem'
          },
        }}
        slotProps={{
          textField: {
            id: id,
            name: name,
            required: required,
            fullWidth: fullWidth,
            size: size,
            margin: margin,
            helperText: helperText,
            error: error,
            ...textFieldProps,
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerWrapper; 