import { createTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#FF604D',
      dark: '#FD5642',
    },
    secondary: {
      main: '#242424',
    },
    text: {
      secondary: '#fff',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 16,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          margin: 0,
        },
      },
    },
  },
});

export default theme;
