import TinaProvider from "../.tina/components/TinaDynamicProvider";
import LayoutWrapper from '../components/LayoutWrapper'
import '../styles/tailwind.css'

import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
const siteMetadata = require('../siteMetadata/siteMetadata')

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <TinaProvider>
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </TinaProvider>
    </ThemeProvider>
  );
};

export default App;