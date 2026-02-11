import { client } from "../.tina/__generated__/client";

function generateRssItem(post) {
  const siteUrl = "https://www.vfernandez.me";
  const postUrl = `${siteUrl}/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`;
  const pubDate = post.date ? new Date(post.date).toUTCString() : new Date().toUTCString();
  
  return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.summary || ''}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>Victor Fernandez Gayan</author>
      ${(post.tags || []).map(tag => `<category>${tag}</category>`).join('\n      ')}
    </item>`;
}

function generateRss(posts) {
  const siteUrl = "https://www.vfernandez.me";
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Victor Fernandez Gayan - Coding Blog</title>
    <link>${siteUrl}</link>
    <description>Personal blog about frontend development, React, JavaScript, and more</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts.map(generateRssItem).join('')}
  </channel>
</rss>`;
}

export async function getServerSideProps({ res }) {
  try {
    const { data } = await client.queries.page({
      relativePath: "home.json",
    });

    const posts = data.page.rows || [];
    const rss = generateRss(posts);

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    res.write(rss);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return {
      props: {},
    };
  }
}

export default function Feed() {
  return null;
}
