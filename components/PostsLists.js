import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { ListItem } from "./Animations";
import { DateCustomComponent } from "./DateCustomComponent";
import { formatTitleForUrl } from "./Utils";
import Labels from "./Labels";

const PostsLists = ({ displayedPosts }) => {
  return (
    <div id="content-posts">
      {displayedPosts.map((row, i) => (
        <ListItem key={uuidv4()}>
          <div className="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out dark:bg-transparent border">
            <div className="flex justify-between items-center">
              {row.date && (
                <span className="font-light text-gray-600">
                  <DateCustomComponent data={row.date} />
                </span>
              )}
              <div>
                {(row.tags || []).map((tagItem, i) => (
                  <Labels key={uuidv4()} tagItem={tagItem} index={i} />
                ))}
              </div>
            </div>
            <div className="mt-2">
              <Link
                href={`/blog/${formatTitleForUrl(row.title)}`}
                legacyBehavior
                passHref
                onError={() => {
                  window.location.href = "/404";
                }}
              >
                <a className="text-2xl text-black font-bold hover:text-gray-600 dark:text-white">
                  {row.title}
                </a>
              </Link>
              <p className="mt-2 prose max-w-full dark:text-gray-400">
                {row.summary}
              </p>
            </div>
          </div>
        </ListItem>
      ))}
    </div>
  );
};

export default PostsLists;
