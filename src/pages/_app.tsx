import SessionProvider from '@/components/layout/SessionProvider';
import '@/styles/globals.css';
import { theme as proTheme } from '@chakra-ui/pro-theme';
import {
  ChakraProvider,
  theme as baseTheme,
  extendTheme,
} from '@chakra-ui/react';
import type { AppProps } from 'next/app';

export const theme = extendTheme(
  {
    colors: { ...baseTheme.colors, brand: baseTheme.colors.blue },
  },
  proTheme
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  );
}
