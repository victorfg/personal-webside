import TinaProvider from '../.tina/components/TinaDynamicProvider'
import LayoutWrapper from '../components/LayoutWrapper'
import Script from 'next/script'
import '../styles/tailwind.css'
import '../styles/custom.css'

import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
const siteMetadata = require('../siteMetadata/siteMetadata')

const App = ({ Component, pageProps }) => {
  return (
    <>

    <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-XC7CR2VRDF"/>
    <Script
        id='google-analytics'
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-XC7CR2VRDF');
        `,
        }}
    />

    <ThemeProvider attribute='class' defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content='width=device-width, initial-scale=1' name='viewport' />
      </Head>
      <TinaProvider>
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </TinaProvider>
    </ThemeProvider>
    </>
  )
}

export default App
