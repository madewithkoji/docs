import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

import { BLUE } from './constants/colors';

// A custom theme for this app
const theme = createMuiTheme({
  props: {
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: BLUE,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
