// Custom document component to Augment application's style tags
// Next.js will inject some style sheets into the DOM using
// this custom document

// Necessary modules from Next
import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  // Fetch props per document page
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  // Render javascript elements
  // AS document is rendered only server-side, event handlers such as
  // onClick will not work in this context
  render () {
    return (
      <Html>
        <Head>
          <body>
            <Main/>
            <NextScript/>
          </body>
        </Head>
      </Html>
    )
  }
}

export default MyDocument;
