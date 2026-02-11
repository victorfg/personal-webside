import Head from "next/head";

export const MetaComponent = ({ 
  titleMeta, 
  description, 
  keyword, 
  image = "https://www.vfernandez.me/favicon.ico",
  type = "article",
  url
}) => {
  const fullTitle = `${titleMeta} | Victor Fernandez Gayan`;
  const siteUrl = "https://www.vfernandez.me";
  const pageUrl = url ? `${siteUrl}${url}` : siteUrl;
  
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
      
      {/* Basic Meta Tags */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keyword} />
      <meta name="author" content="Víctor Fernandez Gayan" />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Victor Fernandez Gayan - Blog" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@victorfg" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      
      {/* RSS Feed */}
      <link rel="alternate" type="application/rss+xml" title="RSS Feed for Victor Fernandez Gayan Blog" href="/feed.xml" />
    </Head>
  );
};
