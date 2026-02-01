import Link from "next/link";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { ListItem } from "./Animations";
import { DateCustomComponent } from "./DateCustomComponent";
import { formatTitleForUrl } from "./Utils";
import Labels from "./Labels";

const PostsLists = ({ displayedPosts }) => {
  const router = useRouter();

  const handleArticleClick = (title) => {
    router.push(`/blog/${formatTitleForUrl(title)}`);
  };

  return (
    <section id="content-posts" aria-label="Blog posts">
      {displayedPosts.map((row, i) => (
        <ListItem key={uuidv4()}>
          <article 
            className="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out dark:bg-transparent border cursor-pointer"
            onClick={() => handleArticleClick(row.title)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleArticleClick(row.title);
              }
            }}
          >
            <header className="flex justify-between items-center">
              {row.date && (
                <time className="font-light text-gray-600" dateTime={row.date}>
                  <DateCustomComponent data={row.date} />
                </time>
              )}
              <div onClick={(e) => e.stopPropagation()}>
                {(row.tags || []).map((tagItem, i) => (
                  <Labels key={uuidv4()} tagItem={tagItem} index={i} />
                ))}
              </div>
            </header>
            <div className="mt-2">
              <h2 className="text-2xl text-black font-bold hover:text-gray-600 dark:text-white">
                {row.title}
              </h2>

              <p className="mt-2 prose max-w-full dark:text-gray-400">
                {row.summary}
              </p>
            </div>
          </article>
        </ListItem>
      ))}
    </section>
  );
};

export default PostsLists;
