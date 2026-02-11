import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export const TableOfContents = ({ content }) => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    // Extract headings from content
    const extractedHeadings = [];

    const processNode = (node) => {
      if (!node) return;

      if (typeof node === "object" && node.type) {
        // Check if it's a heading (h2, h3, h4)
        if (["h2", "h3", "h4"].includes(node.type) && node.children) {
          const text = node.children
            .filter((child) => child.type === "text")
            .map((child) => child.text)
            .join("");

          if (text) {
            extractedHeadings.push({
              id: text.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
              text: text,
              level: parseInt(node.type.charAt(1)),
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
      content.forEach((block) => {
        if (block && typeof block === "object") {
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
      { rootMargin: "-20% 0px -35% 0px" },
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

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setUserInteracted(true);
  };

  return (
    <nav
      className="toc-container hidden xl:block fixed right-8 top-32 w-64"
      style={{ overflow: "visible" }}
    >
      <motion.button
        onClick={handleToggle}
        className="flex items-center justify-between w-full group cursor-pointer"
        aria-label="Toggle table of contents"
        initial={{ scale: 1 }}
        animate={{
          scale: !isOpen && !userInteracted ? [1, 1.15, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: !isOpen && !userInteracted ? Infinity : 0,
          repeatDelay: 2,
        }}
      >
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
          Table of Contents
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <ul className="space-y-2 text-sm mt-3">
              {headings.map((heading, index) => (
                <li
                  key={`${heading.id}-${index}`}
                  style={{ paddingLeft: `${(heading.level - 2) * 0.75}rem` }}
                >
                  <a
                    href={`#${heading.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(heading.id)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                    className={`
                      block py-1 transition-colors duration-200
                      hover:text-indigo-600 dark:hover:text-indigo-400
                      ${
                        activeId === heading.id
                          ? "text-indigo-600 dark:text-indigo-400 font-medium"
                          : "text-gray-600 dark:text-gray-400"
                      }
                    `}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Utility function to add IDs to headings in rendered content
export const addHeadingIds = (node) => {
  if (!node || typeof node !== "object") return node;

  if (["h2", "h3", "h4"].includes(node.type) && node.children) {
    const text = node.children
      .filter((child) => child.type === "text")
      .map((child) => child.text)
      .join("");

    if (text) {
      return {
        ...node,
        id: text.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      };
    }
  }

  return node;
};
