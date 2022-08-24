import Document, { Html, Head, Main, NextScript } from "next/document";

class customDocument extends Document {
  render(): JSX.Element {
    console.log("document is running");

    return (
      <Html lang="ok">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap"
            rel="stylesheet"
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

export default customDocument;
