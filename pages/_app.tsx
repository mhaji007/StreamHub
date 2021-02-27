// Handles global page props

import App from "next/app";
import React from "react";

export default ({Component, pageProps}) => (
  <Component {...pageProps}/>
)
