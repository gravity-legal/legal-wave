import { Head, Html, Main, NextScript } from 'next/document';

const URI_BY_ENV = {
  local: 'http://localhost:5009/index.js',
  dev: 'https://js.dev.project-david.net/hosted-fields.js',
  sandbox: 'https://js.sandbox.gravity-legal.com/hosted-fields.js',
};

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <script src='http://localhost:5009/index.js' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
