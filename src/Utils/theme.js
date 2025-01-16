import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: {
      main: "#06aee9",
      dark: "#b0e9fa",
      light: "#06aee9",
    },
    secondary: {
      main: "#b0e9fa",
      contrastText: "#06aee9",
    },
    button: {
      main: "#b0e9fa",
    },
    description: {
      primary: "#637580",
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
