import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#DC2626', // אדום GustaPizza
      light: '#EF4444',
      dark: '#991B1B',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FCD34D', // זהב GustaPizza
      light: '#FDE68A',
      dark: '#F59E0B',
      contrastText: '#7C2D12',
    },
    background: {
      default: '#FFF7ED',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#7C2D12',
      secondary: '#92400E',
    },
    error: {
      main: '#DC2626',
    },
    success: {
      main: '#059669',
    },
  },
  typography: {
    fontFamily: "'Rubik', 'Roboto', sans-serif",
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      color: '#7C2D12',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#7C2D12',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '12px 28px',
          fontSize: '1.1rem',
          fontWeight: 600,
          boxShadow: '0 4px 6px rgba(220, 38, 38, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 12px rgba(220, 38, 38, 0.15)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #B91C1C 0%, #991B1B 100%)',
          },
        },
        containedSecondary: {
          color: '#7C2D12',
          '&:hover': {
            backgroundColor: '#FBBF24',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(124, 45, 18, 0.08)',
          transition: 'all 0.3s ease',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 28px rgba(124, 45, 18, 0.12)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
});

export default theme;