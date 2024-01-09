import Link from "next/link";

const TopicsFilter = ({ displayedPosts }) => {
  const countTags = () => {
    const tagCounts = {};

    displayedPosts.forEach((row) => {
      row.tags?.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    return tagCounts;
  };

  const tags = countTags();
  const sortedTagCounts = Object.entries(tags).sort((a, b) => b[1] - a[1]);

  return (
    <div className="w-full sm:w-1/2 mx-auto text-black bg-white flex flex-wrap items-center justify-center dark:bg-transparent p-4 mt-10">
      <div className="w-full text-center mb-7 font-bold"></div>
      {sortedTagCounts.map(([tag, count]) => (
        <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} passHref>
          <a className="mx-2 mb-2 bg-gray-200 hover:bg-gray-300 text-black font-semibold py-2 px-4 rounded-lg dark:text-white bg-transparent border">
            {tag} ({count})
          </a>
        </Link>
      ))}
    </div>
  );
};

export default TopicsFilter;
