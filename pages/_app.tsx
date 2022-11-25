import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import useUser from '@libs/client/useUser';
import { NextComponentType } from 'next';

interface AppPropsWithAuth extends AppProps {
  Component: NextComponentType & { isPublic?: boolean };
}

function MyApp({ Component, pageProps }: AppPropsWithAuth) {
  useUser(Component.isPublic);
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <div className="w-full max-w-xl mx-auto">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
