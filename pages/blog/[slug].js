import { useRouter } from "next/router";
import { useEffect } from "react";
import { client } from "../../.tina/__generated__/client";
import { CodeblockCustom } from "../../components/CodeblockCustom";
import { DateCustomComponent } from "../../components/DateCustomComponent";
import Labels from "../../components/Labels";
import { Layout } from "../../components/Layout";
import { MetaComponent } from "../../components/MetaComponent";
import { getItemFromArray } from "../../components/Utils";

// Enhanced TinaMarkdown renderer for TinaCMS 2.x
const TinaMarkdown = ({ content, components }) => {
  if (!content) return null;
  
  const renderNode = (node, index = 0) => {
    if (!node) return null;
    
    // Handle text nodes
    if (node.type === 'text' || typeof node === 'string') {
      const text = node.text || node;
      let element = text;
      
      // Apply text formatting
      if (node.bold) element = <strong key={index}>{element}</strong>;
      if (node.italic) element = <em key={index}>{element}</em>;
      if (node.underline) element = <u key={index}>{element}</u>;
      if (node.code) element = <code key={index}>{element}</code>;
      
      return element;
    }
    
    // Handle children
    const children = node.children ? node.children.map((child, i) => renderNode(child, i)) : null;
    
    // Handle different node types
    switch (node.type) {
      case 'p':
        return <p key={index}>{children}</p>;
      
      case 'h1':
        return <h1 key={index}>{children}</h1>;
      
      case 'h2':
        return <h2 key={index}>{children}</h2>;
      
      case 'h3':
        return <h3 key={index}>{children}</h3>;
      
      case 'h4':
        return <h4 key={index}>{children}</h4>;
      
      case 'h5':
        return <h5 key={index}>{children}</h5>;
      
      case 'h6':
        return <h6 key={index}>{children}</h6>;
      
      case 'blockquote':
        return <blockquote key={index}>{children}</blockquote>;
      
      case 'ul':
        return <ul key={index}>{children}</ul>;
      
      case 'ol':
        return <ol key={index}>{children}</ol>;
      
      case 'li':
        return <li key={index}>{children}</li>;
      
      case 'lic':
        return <>{children}</>;
      
      case 'a':
        return <a key={index} href={node.url} target="_blank" rel="noopener noreferrer">{children}</a>;
      
      case 'img':
        return <img key={index} src={node.url} alt={node.alt || ''} />;
      
      case 'code_block':
        return <pre key={index}><code>{node.value || children}</code></pre>;
      
      case 'hr':
        return <hr key={index} />;
      
      case 'br':
        return <br key={index} />;
      
      case 'html':
        // Handle CodeBlock from HTML
        if (node.value?.includes('CodeBlock')) {
          const CodeBlock = components?.CodeBlock;
          if (CodeBlock) {
            // Extract children content from the HTML value
            const match = node.value.match(/children="([^"]*)"/);
            const childrenContent = match ? match[1].replace(/\\n/g, '\n') : '';
            return <CodeBlock key={index} children={childrenContent} />;
          }
        }
        return null;
      
      default:
        // Handle custom components like CodeBlock
        if (node.name === 'CodeBlock' || node.type === 'CodeBlock') {
          const CodeBlock = components?.CodeBlock;
          if (CodeBlock) {
            return <CodeBlock key={index} {...node} />;
          }
        }
        
        // If we have children, render them
        if (children) {
          return <div key={index}>{children}</div>;
        }
        
        return null;
    }
  };
  
  // Handle root level
  if (content.children) {
    return <>{content.children.map((child, i) => renderNode(child, i))}</>;
  }
  
  return renderNode(content);
};

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

  // For TinaCMS 2.x local mode, use data directly
  const data = props.data;
  const isLoading = false;

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
