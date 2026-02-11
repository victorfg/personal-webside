import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const siteMetadata = require('../siteMetadata/siteMetadata');

const Comments = ({ slug }) => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const provider = siteMetadata?.comment?.provider;

    if (provider === 'giscus') {
      const config = siteMetadata.comment.giscusConfig;
      
      // Remove existing giscus if any
      const existingScript = document.querySelector('script[src*="giscus"]');
      if (existingScript) {
        existingScript.remove();
      }
      const existingContainer = document.querySelector('.giscus');
      if (existingContainer) {
        existingContainer.remove();
      }

      // Create new giscus
      const script = document.createElement('script');
      script.src = 'https://giscus.app/client.js';
      script.setAttribute('data-repo', config.repo || '');
      script.setAttribute('data-repo-id', config.repositoryId || '');
      script.setAttribute('data-category', config.category || '');
      script.setAttribute('data-category-id', config.categoryId || '');
      script.setAttribute('data-mapping', config.mapping || 'pathname');
      script.setAttribute('data-strict', '0');
      script.setAttribute('data-reactions-enabled', config.reactions || '1');
      script.setAttribute('data-emit-metadata', config.metadata || '0');
      script.setAttribute('data-input-position', config.inputPosition || 'bottom');
      script.setAttribute('data-theme', resolvedTheme === 'dark' ? config.darkTheme : config.theme);
      script.setAttribute('data-lang', config.lang || 'en');
      script.setAttribute('crossorigin', 'anonymous');
      script.async = true;

      const commentsDiv = document.getElementById('giscus-comments');
      if (commentsDiv) {
        commentsDiv.appendChild(script);
      }
    }
  }, [mounted, theme, resolvedTheme, slug]);

  if (!mounted) {
    return null;
  }

  const provider = siteMetadata?.comment?.provider;

  if (!provider || provider === 'none') {
    return null;
  }

  return (
    <div className="comments-container mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      {provider === 'giscus' && (
        <div id="giscus-comments" className="giscus-wrapper">
          {/* Giscus will be loaded here */}
        </div>
      )}
      {provider === 'utterances' && (
        <div id="utterances-comments">
          {/* You can implement Utterances here if needed */}
        </div>
      )}
      {provider === 'disqus' && (
        <div id="disqus-comments">
          {/* You can implement Disqus here if needed */}
        </div>
      )}
    </div>
  );
};

export default Comments;
