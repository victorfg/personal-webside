import Link from "next/link";
import { client } from "../../.tina/__generated__/client";

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
        
        // If we have children, render them wrapped in a div
        if (children && children.length > 0) {
          return <div key={index}>{children}</div>;
        }
        
        // Unknown node type - log and return null
        console.warn('Unknown node type:', node.type, node);
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
import useDeviceDetect from "../../utils/utils";
import { Layout } from "../../components/Layout";
import { CodeblockCustom } from "../../components/CodeblockCustom";
import { MetaComponent } from "../../components/MetaComponent";

const pageComponents = {
  CodeBlock: (props) => {
    return (
      <CodeblockCustom content={props.children} language={props.language} />
    );
  },
};

export default function PostList(props) {
  const { isMobile } = useDeviceDetect();
  // For TinaCMS 2.x local mode, use data directly
  const data = props.data;
  const isLoading = false;
  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    console.log(data.page.rows);
    return (
      <>
        <MetaComponent />
        {isMobile && (
          <Layout>
            {(data.page.rows || []).map((row, i) => (
              <Link 
                href={`/blog/${row.title}`} 
                key={"titlePost_" + i}
                className="cursor-pointer block"
              >
                <h1 className="text-5xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
                  {row.title}
                </h1>
                {(row?.blocks || []).map((block, i) => (
                  <div
                    className="prose max-w-none pb-4 dark:prose-dark text-justify"
                    key={"contentPost_" + i}
                  >
                    <article style={{ flex: 1 }}>
                      <TinaMarkdown
                        components={pageComponents}
                        content={block.block}
                      />
                    </article>
                  </div>
                ))}
              </Link>
            ))}
          </Layout>
        )}
        {!isMobile &&
          (data.page.rows || []).map((row, i) => (
            <Link 
              href={`/blog/${row.title}`} 
              key={"titleDesktop_" + i}
              className="cursor-pointer block"
            >
              <h1 className="text-5xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
                {row.title}
              </h1>
              {(row?.blocks || []).map((block, i) => (
                <div
                  className="prose max-w-none pb-4 dark:prose-dark text-justify"
                  key={"contentPostDesktop_" + i}
                >
                  <article style={{ flex: 1 }}>
                    <TinaMarkdown
                      components={pageComponents}
                      content={block.block}
                    />
                  </article>
                </div>
              ))}
            </Link>
          ))}
        {/*DEBUG*/}
        {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
      </>
    );
  }
}

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
