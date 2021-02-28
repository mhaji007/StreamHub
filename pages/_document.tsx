// Custom document component to Augment application's style tags
// Next.js will inject some style sheets into the DOM using
// this custom document

// Necessary modules from Next
// Allow pull styles from the page and render them on the app
import { ServerStyleSheets } from "@material-ui/core/styles";
import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

// Will only be able to render serverside props
// using this custom document component
class MyDocument extends Document {
  // Fetch props per document page
  static async getInitialProps(ctx) {
    // Render the app and get the context of the page with collected side effects
    const sheets = new ServerStyleSheets();
    // Reference to the render that happens on screen each time we see a UI element
    const originalRenderPage = ctx.renderPage;
    // Add some side effects to the render by calling some functions on the render page
    // and passing them into another function then
    // Provide some enhancements to the original render
    ctx.renderPage = () =>
    // Collect styles from original render on the page
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);
    // Pass down the props to client side
    return {
      ...initialProps,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
      ],
    };
  }

  // Render javascript elements
  // AS document is rendered only server-side, event handlers such as
  // onClick will not work in this context
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400:latin"
          />
        </Head>
          <body>
            <Main />
            <NextScript />
          </body>
      </Html>
    );
  }
}

export default MyDocument;
