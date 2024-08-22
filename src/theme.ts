'use client';

import { createTheme } from "@mui/material";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

const { fontFamily } = poppins.style;

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0773f7",
    },
  },
  typography: {
    fontFamily,
    h4: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});