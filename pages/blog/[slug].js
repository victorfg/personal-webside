import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTina } from "tinacms/dist/edit-state";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../../.tina/__generated__/client";
import { CodeblockCustom } from "../../components/CodeblockCustom";
import { DateCustomComponent } from "../../components/DateCustomComponent";
import Labels from "../../components/Labels";
import { Layout } from "../../components/Layout";
import { MetaComponent } from "../../components/MetaComponent";
import { getItemFromArray } from "../../components/Utils";

const pageComponents = {
  CodeBlock: (props) => {
    return (
      <CodeblockCustom content={props.children} language={props.language} />
    );
  },
};

export default function Home(props) {
  let getBlogItem = null;
  let currentIndex = null;
  let previousPost = null;
  let nextPost = null;

  const { data, isLoading } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const router = useRouter();


  useEffect(() => {
    const slug = router.query.slug.replace(/-/g, " ");
    const isValidSlug = data.page.rows.some(
      (row) => row.title.toLowerCase() === slug.toLowerCase()
    );
    if (!isValidSlug) {
      router.push("/404");
    }
  }, [router.query.slug, data.page.rows]);

  if (typeof window !== "undefined") {
    getBlogItem = getItemFromArray(window.location.pathname, data.page.rows);
    currentIndex = data.page.rows.findIndex(
      (row) => row.title.toLowerCase() === getBlogItem.title.toLowerCase()
    );
    previousPost = currentIndex > 0 ? data.page.rows[currentIndex - 1] : null;
    nextPost =
      currentIndex < data.page.rows.length - 1
        ? data.page.rows[currentIndex + 1]
        : null;
  }

  if (isLoading && !getBlogItem) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <MetaComponent
          titleMeta={getBlogItem?.title}
          description={getBlogItem?.title}
          keywords={getBlogItem?.tags}
        />

        <Layout previousPost={previousPost} nextPost={nextPost}>
          <article>
            <header>
              <h1 className="mb-3 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                {getBlogItem?.title}
              </h1>
              {getBlogItem?.date && (
                <time dateTime={getBlogItem.date}>
                  <DateCustomComponent data={getBlogItem.date} />
                </time>
              )}
              <div className="mt-1">
                {(getBlogItem?.tags || []).map((tagItem, i) => (
                  <span
                    key={tagItem + "_" + i}
                    className="inline-block cursor-pointer mt-1 ml-2"
                  >
                    <Labels tagItem={tagItem} index={i} />
                  </span>
                ))}
              </div>
            </header>
            <div className="prose max-w-none pb-4 dark:prose-dark text-justify">
              {(getBlogItem?.blocks || []).map((block, i) => (
                <section key={"contePost_" + i}>
                  <TinaMarkdown
                    components={pageComponents}
                    content={block.block}
                  />
                </section>
              ))}
            </div>
          </article>
          {/*DEBUG*/}
          {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
        </Layout>
      </>
    );
  }
}

export const getStaticPaths = async () => {
  const { data } = await client.queries.page({
    relativePath: "home.json",
  });

  const paths = data.page.rows.map((x) => {
    return { params: { slug: x.title } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async () => {
  const { data, query, variables } = await client.queries.page({
    relativePath: "home.json",
  });

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};
