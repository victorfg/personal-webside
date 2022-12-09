import Head from 'next/head'
export const MetaComponent = ({data}) => {
    return (
        <Head>
          <title>Personal Blog about frontend development</title>
          <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
          <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"/>
          <meta name='description' content='Personal Blog about frontend development' />
          <meta name='og:title' content='Personal Blog about frontend development' />
          <meta name="keywords" content="react, frontend development"/>
          <link rel='icon' href='/favicon.ico' />
        </Head>
    )
}