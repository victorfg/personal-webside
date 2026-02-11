import { useEffect, useState } from "react";

export const TableOfContents = ({ content }) => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    // Extract headings from content
    const extractedHeadings = [];
    
    const processNode = (node) => {
      if (!node) return;
      
      if (typeof node === 'object' && node.type) {
        // Check if it's a heading (h2, h3, h4)
        if (['h2', 'h3', 'h4'].includes(node.type) && node.children) {
          const text = node.children
            .filter(child => child.type === 'text')
            .map(child => child.text)
            .join('');
          
          if (text) {
            extractedHeadings.push({
              id: text.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
              text: text,
              level: parseInt(node.type.charAt(1))
            });
          }
        }
        
        // Process children recursively
        if (node.children && Array.isArray(node.children)) {
          node.children.forEach(processNode);
        }
      }
    };

    if (content && Array.isArray(content)) {
      content.forEach(block => {
        if (block && typeof block === 'object') {
          processNode(block);
        }
      });
    }

    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    // Track active section on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -35% 0px" }
    );

    // Observe all heading elements
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) {
    return null; // Don't show TOC if there are less than 3 headings
  }

  return (
    <nav className="toc-container hidden xl:block fixed right-8 top-32 w-64">
      <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 pr-4">
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wide">
          Table of Contents
        </h3>
        <ul className="space-y-2 text-sm">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 2) * 0.75}rem` }}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
                className={`
                  block py-1 transition-colors duration-200
                  hover:text-indigo-600 dark:hover:text-indigo-400
                  ${activeId === heading.id 
                    ? 'text-indigo-600 dark:text-indigo-400 font-medium' 
                    : 'text-gray-600 dark:text-gray-400'
                  }
                `}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

// Utility function to add IDs to headings in rendered content
export const addHeadingIds = (node) => {
  if (!node || typeof node !== 'object') return node;
  
  if (['h2', 'h3', 'h4'].includes(node.type) && node.children) {
    const text = node.children
      .filter(child => child.type === 'text')
      .map(child => child.text)
      .join('');
    
    if (text) {
      return {
        ...node,
        id: text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      };
    }
  }
  
  return node;
};
