// Handles global page props

import { useEffect } from "react";
import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import { themeDark, themeLight } from "lib/theme";

// Custom app component with a custom theme
export default function MyApp({ Component, pageProps }) {
  // Remove the server-side injected CSS
  useEffect(() => {
    // Once the client is rehydrated it adds any new styles that are needed for that view,
    // however any previously printed styles are not removed and the following lines are simply removing them,
    // User lands on Page A - SSR for Page A maybe rendered inline for performance purposes.
    // User transitions to or moves to Page B, it has conflicting CSS from previous SSR rendering
    // and may cause side effects or simply does not need the style object
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={false ? themeDark : themeLight}>
      {/* Style normalization */}
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
