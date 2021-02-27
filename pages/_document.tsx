// Custom document component to Augment application's style tags
// Next.js will inject some style sheets into the DOM using
// this custom document

// Necessary modules from Next
import Document, { Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/core";
import React from "react";

// Will only be able to render serverside props
// using this custom document component
class MyDocument extends Document {
  // Fetch props per document page
  static async getInitialProps(ctx) {
    // Render the app and get the context of the page with collected side effects
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    // Collect styles from original render on the page
    ctx.renderPage = () =>
      originalRenderPage({
        envhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
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
          <body>
            <Main />
            <NextScript />
          </body>
        </Head>
      </Html>
    );
  }
}

export default MyDocument;
