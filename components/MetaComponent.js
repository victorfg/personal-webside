import Head from "next/head";
export const MetaComponent = ({ titleMeta, description, keyword }) => {
  return (
    <Head>
      <title>{`${titleMeta} | Victor Fernandez Gayan`}</title>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
      />
      <meta name="description" content={description} />
      <meta name="og:title" content={description} />
      <meta name="keywords" content={keyword} />
      <meta name="author" content="Víctor Fernandez Gayan" />
      <meta name="robots" content="index, follow" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
