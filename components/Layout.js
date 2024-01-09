import Link from "next/link";
import { formatTitleForUrl } from "./Utils";

export const Layout = ({ children, previousPost, nextPost }) => {
  const isNextPostOnly = nextPost && !previousPost;

  return (
    <div id="style-scroll-custom" className="default-layout">
      <main>{children}</main>
      <div
        className={`blog-navigation flex ${
          isNextPostOnly ? "justify-end" : "justify-between"
        }`}
      >
        {previousPost && (
          <Link href={`/blog/${formatTitleForUrl(previousPost.title)}`}>
            <a className="prev-post inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded border border-gray-300 hover:bg-gray-300 hover:text-white">
              ← {previousPost.title}
            </a>
          </Link>
        )}
        {nextPost && (
          <Link href={`/blog/${formatTitleForUrl(nextPost.title)}`}>
            <a className="next-post inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded border border-gray-300 hover:bg-gray-300 hover:text-white">
              {nextPost.title} →
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};
