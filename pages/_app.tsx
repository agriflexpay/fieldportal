import type { AppProps } from 'next/app';
import { ReactElement, ReactNode, Suspense } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
    return (
        <SessionProvider session={pageProps.session}>
                <Head>
                    <title>AGRIFLEXPAY</title>
                    <meta charSet="UTF-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/favicon.png" />
                </Head>
                <Suspense fallback="loading">
                    {Component.getLayout ? Component.getLayout(<Component {...pageProps} />) : <Component {...pageProps} />}
                </Suspense>
        </SessionProvider>
    );
};
export default App