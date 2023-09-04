import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  const sdkSrc =
    process.env.NEXT_PUBLIC_GL_SDK_URL ||
    'https://js.sandbox.gravity-legal.com/hosted-fields.js';

  return (
    <Html lang='en'>
      <Head>
        <script src={sdkSrc} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
