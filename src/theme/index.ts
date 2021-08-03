import { createTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#FF604D',
    },
    secondary: {
      main: '#242424',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 16,
  },
});

export default theme;
