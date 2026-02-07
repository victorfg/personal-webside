import TinaProvider from "../.tina/components/TinaDynamicProvider";
import { MetaComponent } from "../components/MetaComponent";
import NextNProgress from "nextjs-progressbar";
import LayoutWrapper from "../components/LayoutWrapper";
import { Footer } from "../components/Footer";
import Script from "next/script";
import "../styles/tailwind.css";
import "../styles/custom.css";
import { useRouter } from "next/router";

import { ThemeProvider } from "next-themes";
const siteMetadata = require("../siteMetadata/siteMetadata");

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  
  // Render admin page without layout
  if (router.pathname === '/admin') {
    return (
      <>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-XC7CR2VRDF"
        />
        <Script
          id="google-analytics"
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
        <Component {...pageProps} />
      </>
    );
  }
  
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-XC7CR2VRDF"
      />
      <Script
        id="google-analytics"
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

      <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
        <TinaProvider>
          <div className="sm:flex sm:flex-col sm:min-h-screen max-w-3xl mx-auto sm:px-6 xl:max-w-5xl xl:px-4 min-h-full" style={{marginTop: 0, paddingTop: 0}}>
            <LayoutWrapper>
              <NextNProgress 
                color="#6366f1"
                startPosition={0.3}
                stopDelayMs={200}
                height={3}
                showOnShallow={true}
                options={{
                  showSpinner: false,
                  easing: 'ease',
                  speed: 500,
                  trickleSpeed: 200,
                }}
              />
              <MetaComponent
                titleMeta={"CodingPosts"}
                description={"Personal Blog about frontend development"}
                keywords={"react, frontend development"}
              />
              <Component {...pageProps} />
            </LayoutWrapper>
            <Footer />
          </div>
        </TinaProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
