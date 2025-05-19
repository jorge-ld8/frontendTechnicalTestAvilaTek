'use client';

import { ReactElement, forwardRef } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  Typography,
  Slide,
  Paper
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  destinationName: string;
  buttonText?: string;
  showConfetti?: boolean;
  confettiDuration?: number;
}

const SuccessDialog = ({
  open,
  onClose,
  title,
  destinationName,
  buttonText = 'Aceptar',
}: SuccessDialogProps) => {
  
  
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="success-dialog-title"
        aria-describedby="success-dialog-description"
        slots={{
          backdrop: undefined,
          transition: Transition,
          paper: Paper
        }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 2,
              maxWidth: 420,
              p: 2,
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              textAlign: 'center',
            }
          },
          backdrop: {},
          transition: {
            direction: 'up',
            appear: true
          }
        }}
      >
        <DialogTitle id="success-dialog-title" sx={{ pt: 3, pb: 1 }}>
          <Fade in={open} timeout={700}>
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 64, mb: 1.5 }} />
          </Fade>
          <Fade in={open} timeout={900} style={{ transitionDelay: open ? '200ms' : '0ms' }}>
            <Typography variant="h5" component="div" fontWeight="bold" color="text.primary">
              {title}
            </Typography>
          </Fade>
        </DialogTitle>
        <DialogContent sx={{ pb: 1 }}>
          <Fade in={open} timeout={900} style={{ transitionDelay: open ? '400ms' : '0ms' }}>
            <DialogContentText id="success-dialog-description" color="text.secondary">
              Tu reserva para <b>{destinationName || 'el destino seleccionado'}</b> ha sido confirmada exitosamente.
              <br />
              Gracias por elegir Globetrotter para tu próxima aventura.
            </DialogContentText>
          </Fade>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3, pt: 1 }}>
          <Fade in={open} timeout={900} style={{ transitionDelay: open ? '600ms' : '0ms' }}>
            <Button 
              onClick={onClose}
              variant="contained" 
              color="primary" 
              autoFocus
              sx={{ 
                px: 4, 
                py: 1.25, 
                borderRadius: '50px',
                fontWeight: 'bold',
                minWidth: 160,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                }
              }}
            >
              {buttonText}
            </Button>
          </Fade>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SuccessDialog; 