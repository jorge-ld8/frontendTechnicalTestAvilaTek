'use client';

import { ReactNode } from 'react';
import {
  FormControlLabel,
  Switch,
  SwitchProps,
  FormGroup,
  Typography,
  Box,
  SxProps,
  Theme,
} from '@mui/material';

interface SwitchWrapperProps extends Omit<SwitchProps, 'onChange'> {
  label: string | ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
  helperText?: string;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
  labelSx?: SxProps<Theme>;
  switchSx?: SxProps<Theme>;
  color?: 'primary' | 'secondary' | 'default' | 'error' | 'info' | 'success' | 'warning';
  size?: 'small' | 'medium';
}

const SwitchWrapper = ({
  label,
  checked,
  onChange,
  description,
  helperText,
  labelPlacement = 'end',
  fullWidth = false,
  disabled = false,
  sx,
  labelSx,
  switchSx,
  color = 'primary',
  size = 'small',
  ...restProps
}: SwitchWrapperProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <FormGroup sx={{ width: fullWidth ? '100%' : 'auto', ...sx }}>
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            color={color}
            size={size}
            sx={{ 
              '& .MuiSwitch-thumb': {
                boxShadow: 'none',
              },
              '& .MuiSwitch-track': {
                opacity: 0.3,
              },
              ...switchSx
            }}
            {...restProps}
          />
        }
        label={
          <Box>
            {typeof label === 'string' ? (
              <Typography variant="body1" sx={labelSx}>
                {label}
              </Typography>
            ) : (
              label
            )}
            {description && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {description}
              </Typography>
            )}
          </Box>
        }
        labelPlacement={labelPlacement}
        disabled={disabled}
      />
      {helperText && (
        <Typography
          variant="caption"
          color={disabled ? 'text.disabled' : 'text.secondary'}
          sx={{ mt: 0.5, ml: labelPlacement === 'start' ? 0 : 2 }}
        >
          {helperText}
        </Typography>
      )}
    </FormGroup>
  );
};

export default SwitchWrapper; 