// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3442D9', // Dark Green
    },
    secondary: {
      main: '#;FFFF00', // Yellow
    },
    background: {
      default: '#c1c5f2', 
    },
    buttonFill:{
      main: '#3442D9'
    }
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;
