// Handles global page props

import App from "next/app";
import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import { themeDark, themeLight } from "lib/theme";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={false ? themeDark : themeLight}>
      {/* Style normalization */}
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
