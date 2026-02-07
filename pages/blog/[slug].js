import { useRouter } from "next/router";
import { useEffect } from "react";
import { client } from "../../.tina/__generated__/client";
import { CodeblockCustom } from "../../components/CodeblockCustom";
import { DateCustomComponent } from "../../components/DateCustomComponent";
import Labels from "../../components/Labels";
import { Layout } from "../../components/Layout";
import { MetaComponent } from "../../components/MetaComponent";
import { ReadingTime } from "../../components/ReadingTime";
import { getItemFromArray } from "../../components/Utils";

// Enhanced TinaMarkdown renderer for TinaCMS 2.x
const TinaMarkdown = ({ content, components }) => {
  if (!content) return null;
  
  const renderNode = (node, index = 0) => {
    if (!node) return null;
    
    // Handle primitive types (string, number, boolean)
    if (typeof node === 'string') {
      return node;
    }
    
    if (typeof node === 'number' || typeof node === 'boolean') {
      return String(node);
    }
    
    // Ensure node is an object
    if (typeof node !== 'object') {
      return null;
    }
    
    // Handle text nodes
    if (node.type === 'text') {
      const text = node.text || '';
      let element = text;
      
      // Apply text formatting - ensure we wrap in React elements
      if (node.bold) element = <strong key={`bold-${index}`}>{element}</strong>;
      if (node.italic) element = <em key={`italic-${index}`}>{element}</em>;
      if (node.underline) element = <u key={`underline-${index}`}>{element}</u>;
      if (node.code) element = <code key={`code-${index}`}>{element}</code>;
      
      return element;
    }
    
    // Handle children recursively
    const children = node.children 
      ? node.children.map((child, i) => {
          const rendered = renderNode(child, `${index}-${i}`);
          // Ensure we never return plain objects
          if (rendered && typeof rendered === 'object' && !rendered.$$typeof) {
            console.warn('Invalid child detected:', child);
            return null;
          }
          return rendered;
        }).filter(Boolean)
      : null;
    
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
        return <span key={index}>{children}</span>;
      
      case 'a':
        return <a key={index} href={node.url} target="_blank" rel="noopener noreferrer">{children}</a>;
      
      case 'img':
        return <img key={index} src={node.url} alt={node.alt || ''} />;
      
      case 'code_block':
        // Use the custom CodeBlock component for consistent rendering
        const CodeBlockComponent = components?.CodeBlock;
        if (CodeBlockComponent && node.value) {
          return <CodeBlockComponent key={index} language={node.lang || 'plaintext'}>{node.value}</CodeBlockComponent>;
        }
        return <pre key={index}><code>{node.value || children}</code></pre>;
      
      case 'hr':
        return <hr key={index} />;
      
      case 'br':
        return <br key={index} />;
      
      case 'html':
      case 'html_inline':
        // Handle CodeBlock components embedded as HTML
        const htmlValue = node.value || '';
        if (htmlValue.includes('CodeBlock')) {
          const CodeBlock = components?.CodeBlock;
          if (CodeBlock) {
            // Extract children and language from the HTML value
            const childrenMatch = htmlValue.match(/children="([^"]*)"/);
            const languageMatch = htmlValue.match(/language="([^"]*)"/);
            if (childrenMatch) {
              const childrenContent = childrenMatch[1].replace(/\\n/g, '\n');
              const language = languageMatch ? languageMatch[1] : 'javascript';
              return <CodeBlock key={index} language={language}>{childrenContent}</CodeBlock>;
            }
          }
        }
        // For other HTML, safely ignore
        return null;
      
      default:
        // Handle custom components like CodeBlock
        if (node.name === 'CodeBlock' || node.type === 'CodeBlock') {
          const CodeBlock = components?.CodeBlock;
          if (CodeBlock) {
            return <CodeBlock key={index} language={node.language || 'javascript'}>{node.children}</CodeBlock>;
          }
        }
        
        // If we have children, render them wrapped in a div
        if (children && children.length > 0) {
          return <div key={index}>{children}</div>;
        }
        
        // Unknown node type - return null instead of logging in production
        return null;
    }
  };
  
  // Ensure content is valid
  if (typeof content === 'string') {
    return <span>{content}</span>;
  }
  
  if (typeof content !== 'object') {
    return null;
  }
  
  // Handle root level
  if (content.children && Array.isArray(content.children)) {
    const rendered = content.children.map((child, i) => renderNode(child, i)).filter(Boolean);
    return <>{rendered}</>;
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
  // For TinaCMS 2.x local mode, use data directly
  const data = props.data;
  const router = useRouter();

  // Get slug from router (available on both server and client)
  const slug = router.query.slug ? router.query.slug.replace(/-/g, " ") : "";
  
  // Find the blog item based on slug (consistent on server and client)
  const getBlogItem = data.page.rows.find(
    (row) => row.title.toLowerCase() === slug.toLowerCase()
  );

  const currentIndex = data.page.rows.findIndex(
    (row) => row.title.toLowerCase() === slug.toLowerCase()
  );
  
  const previousPost = currentIndex > 0 ? data.page.rows[currentIndex - 1] : null;
  const nextPost = currentIndex < data.page.rows.length - 1 
    ? data.page.rows[currentIndex + 1] 
    : null;

  useEffect(() => {
    if (slug && !getBlogItem) {
      router.push("/404");
    }
  }, [slug, getBlogItem, router]);

  if (!getBlogItem) {
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
              <div className="flex items-center gap-3 font-light text-xs text-gray-600 dark:text-gray-400">
                {getBlogItem?.date && (
                  <time dateTime={getBlogItem.date}>
                    <DateCustomComponent data={getBlogItem.date} />
                  </time>
                )}
                <ReadingTime 
                  content={getBlogItem?.blocks?.map(b => b.block) || []} 
                />
              </div>
              <div className="flex items-center flex-wrap gap-2 mt-2">
                {(getBlogItem?.tags || []).map((tagItem, i) => (
                  <Labels key={tagItem + "_" + i} tagItem={tagItem} index={i} />
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
