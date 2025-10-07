// In your theme.js or theme setup file
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    h3: {
      fontSize: "2.5rem",
      "@media (max-width:600px)": {
        fontSize: "1.8rem",
      },
    },
    h5: {
      fontSize: "1.6rem",
      "@media (max-width:600px)": {
        fontSize: "1.2rem",
      },
    },
    body2: {
      fontSize: "1rem",
      "@media (max-width:600px)": {
        fontSize: "0.9rem",
      },
    },
  },
});

export default theme;
