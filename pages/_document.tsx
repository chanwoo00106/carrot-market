import { Html, Head, Main, NextScript } from "next/document";

export default function MyDocument() {
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
