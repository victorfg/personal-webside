import Link from "next/link";
import { formatTitleForUrl } from "./Utils";

export const Layout = ({ children, previousPost, nextPost }) => {
  return (
    <div id="style-scroll-custom" className="default-layout">
      <main>{children}</main>
      <div className="blog-navigation flex justify-between">
        {previousPost && (
          <Link href={`/blog/${formatTitleForUrl(previousPost.title)}`}>
            <a className="prev-post">←{previousPost.title}</a>
          </Link>
        )}
        {nextPost && (
          <Link href={`/blog/${formatTitleForUrl(nextPost.title)}`}>
            <a className="next-post">{nextPost.title} →</a>
          </Link>
        )}
      </div>
    </div>
  );
};
