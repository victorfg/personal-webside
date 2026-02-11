import Link from "next/link";
import { formatTitleForUrl } from "./Utils";

export const Layout = ({ children, previousPost, nextPost }) => {
  const isNextPostOnly = nextPost && !previousPost;

  return (
    <div id="style-scroll-custom" className="default-layout">
      {children}
      
      {/* Post Navigation */}
      {(previousPost || nextPost) && (
        <nav
          className="blog-navigation mt-16 pt-8 border-t-2 border-gray-200 dark:border-gray-700"
          aria-label="Post navigation"
        >
          <div className="flex items-center justify-center mb-4">
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Continue Reading
            </span>
          </div>
          
          <div className={`flex gap-4 ${
            isNextPostOnly ? "justify-end" : "justify-between"
          }`}>
            {previousPost && (
              <Link 
                href={`/blog/${formatTitleForUrl(previousPost.title)}`}
                className="group flex-1 max-w-md p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-lg"
                rel="prev"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl group-hover:-translate-x-1 transition-transform duration-300">←</span>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                      Previous Post
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {previousPost.title}
                    </p>
                  </div>
                </div>
              </Link>
            )}
            
            {nextPost && (
              <Link 
                href={`/blog/${formatTitleForUrl(nextPost.title)}`}
                className="group flex-1 max-w-md p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-lg text-right"
                rel="next"
              >
                <div className="flex items-start gap-3 justify-end">
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                      Next Post
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {nextPost.title}
                    </p>
                  </div>
                  <span className="text-2xl group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </Link>
            )}
          </div>
        </nav>
      )}
    </div>
  );
};
