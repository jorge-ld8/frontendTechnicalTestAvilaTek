import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const baseTheme = createTheme({
  palette: {
    primary: {
      main: '#3498db', 
      light: '#5dade2',
      dark: '#2471a3',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#2ecc71', 
      light: '#58d68d',
      dark: '#239b56',
      contrastText: '#ffffff',
    },
    error: {
      main: '#e74c3c', 
      light: '#ec7063',
      dark: '#c0392b',
    },
    warning: {
      main: '#f39c12', 
      light: '#f5b041',
      dark: '#d35400',
    },
    info: {
      main: '#3498db', 
      light: '#5dade2',
      dark: '#2471a3',
    },
    success: {
      main: '#2ecc71', 
      light: '#58d68d',
      dark: '#239b56',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#7f8c8d',
      disabled: '#bdc3c7',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 500,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '16px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
          borderRadius: '12px',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          // Apply globally for all typography
          '@media (max-width:600px)': {
            lineHeight: 1.4,
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const theme = responsiveFontSizes(baseTheme, { factor: 0.8 });

export default theme; 