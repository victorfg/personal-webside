import { TinaMarkdown } from "tinacms/dist/rich-text";
import { useTina } from "tinacms/dist/edit-state";
import { client } from "../.tina/__generated__/client";
import Head from 'next/head';
const siteMetadata = require('../siteMetadata/siteMetadata')

export const getStaticProps = async () => {
  const { data, query, variables } = await client.queries.page({
    relativePath: "home.mdx",
  });

  return {
    props: {
      data,
      query,
      variables,
      //myOtherProp: 'some-other-data',
    },
  };
};

export default function Home(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const content = data.page.body;
  return (
      <>
        <Head>
          <title>{siteMetadata.headerTitle}</title>
          <meta name="description" content="A personal blog" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="space-y-2 pt-6 pb-8 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              {/*Blog*/}
            </h1>
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              {/*siteMetadata.description*/}
            </p>
          </div>
        </div>
        <section>
          <ul>
            {/*allPostsData.map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
            ))*/}
          </ul>
        </section>
        <TinaMarkdown content={content} />
      </>
  );
}