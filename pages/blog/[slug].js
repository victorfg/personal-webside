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
import { TableOfContents } from "../../components/TableOfContents";
import Comments from "../../components/Comments";

// Enhanced TinaMarkdown renderer for TinaCMS 2.x
const TinaMarkdown = ({ content, components }) => {
  if (!content) return null;
  
  // Use a counter for consistent keys
  let keyCounter = 0;
  const getKey = () => `node-${keyCounter++}`;
  
  const renderNode = (node, parentKey = '') => {
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
    
    const nodeKey = getKey();
    
    // Handle text nodes
    if (node.type === 'text') {
      const text = node.text || '';
      let element = text;
      
      // Apply text formatting - ensure we wrap in React elements
      if (node.bold) element = <strong key={nodeKey}>{element}</strong>;
      if (node.italic) element = <em key={nodeKey}>{element}</em>;
      if (node.underline) element = <u key={nodeKey}>{element}</u>;
      if (node.code) element = <code key={nodeKey}>{element}</code>;
      
      return element;
    }
    
    // Handle children recursively
    const children = node.children 
      ? node.children.map((child, i) => {
          const childKey = `${nodeKey}-${i}`;
          const rendered = renderNode(child, childKey);
          // Ensure we never return plain objects
          if (rendered && typeof rendered === 'object' && !rendered.$$typeof) {
            return null;
          }
          return rendered;
        }).filter(Boolean)
      : null;
    
    // Handle different node types
    switch (node.type) {
      case 'p':
        return <p key={nodeKey}>{children}</p>;
      
      case 'h1':
        return <h1 key={nodeKey}>{children}</h1>;
      
      case 'h2':
      case 'h3':
      case 'h4': {
        // Generate ID from heading text for TOC
        const headingText = node.children
          ?.filter(child => child.type === 'text' || typeof child === 'string')
          .map(child => typeof child === 'string' ? child : child.text)
          .join('') || '';
        const headingId = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const HeadingTag = node.type;
        return <HeadingTag key={nodeKey} id={headingId}>{children}</HeadingTag>;
      }
      
      case 'h5':
        return <h5 key={nodeKey}>{children}</h5>;
      
      case 'h6':
        return <h6 key={nodeKey}>{children}</h6>;
      
      case 'blockquote':
        return <blockquote key={nodeKey}>{children}</blockquote>;
      
      case 'ul':
        return <ul key={nodeKey}>{children}</ul>;
      
      case 'ol':
        return <ol key={nodeKey}>{children}</ol>;
      
      case 'li':
        return <li key={nodeKey}>{children}</li>;
      
      case 'lic':
        return <span key={nodeKey}>{children}</span>;
      
      case 'table': {
        // Ensure all tr elements are wrapped in thead or tbody
        // Group children into thead and tbody
        const tableChildren = children || [];
        const hasTheadOrTbody = tableChildren.some(child => 
          child?.type?.toString().includes('thead') || 
          child?.type?.toString().includes('tbody')
        );
        
        // If already has thead/tbody, use as is
        if (hasTheadOrTbody) {
          return <table key={nodeKey}>{children}</table>;
        }
        
        // Otherwise, wrap all tr in tbody
        return <table key={nodeKey}><tbody>{children}</tbody></table>;
      }
      
      case 'thead':
        return <thead key={nodeKey}>{children}</thead>;
      
      case 'tbody':
        return <tbody key={nodeKey}>{children}</tbody>;
      
      case 'tr':
        return <tr key={nodeKey}>{children}</tr>;
      
      case 'th':
        return <th key={nodeKey}>{children}</th>;
      
      case 'td':
        return <td key={nodeKey}>{children}</td>;
      
      case 'a':
        return <a key={nodeKey} href={node.url} target="_blank" rel="noopener noreferrer">{children}</a>;
      
      case 'img':
        return <img key={nodeKey} src={node.url} alt={node.alt || ''} />;
      
      case 'code_block':
        // Use the custom CodeBlock component for consistent rendering
        const CodeBlockComponent = components?.CodeBlock;
        if (CodeBlockComponent && node.value) {
          return <CodeBlockComponent key={nodeKey} language={node.lang || 'plaintext'}>{node.value}</CodeBlockComponent>;
        }
        return <pre key={nodeKey}><code>{node.value || children}</code></pre>;
      
      case 'hr':
        return <hr key={nodeKey} />;
      
      case 'br':
        return <br key={nodeKey} />;
      
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
              return <CodeBlock key={nodeKey} language={language}>{childrenContent}</CodeBlock>;
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
            return <CodeBlock key={nodeKey} language={node.language || 'javascript'}>{node.children}</CodeBlock>;
          }
        }
        
        // If we have children, render them wrapped in a div
        if (children && children.length > 0) {
          return <div key={nodeKey}>{children}</div>;
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
  
  // Reset counter for each render
  keyCounter = 0;
  
  // Handle root level
  if (content.children && Array.isArray(content.children)) {
    const rendered = content.children.map((child, i) => renderNode(child, `root-${i}`)).filter(Boolean);
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
          description={getBlogItem?.summary || getBlogItem?.title}
          keyword={getBlogItem?.tags?.join(", ")}
          url={`/blog/${router.query.slug}`}
          type="article"
        />

        <Layout previousPost={previousPost} nextPost={nextPost}>
          <div className="relative">
            <article className="max-w-4xl mx-auto">
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

              {/* Comments Section */}
              <Comments slug={router.query.slug} />
            </article>
            
            <TableOfContents 
              content={getBlogItem?.blocks?.map(b => b.block) || []} 
            />
          </div>
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
