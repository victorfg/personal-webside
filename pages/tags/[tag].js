import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTina } from "tinacms/dist/edit-state";
import { client } from "../../.tina/__generated__/client";
import Link from "next/link";
import { formatTitleForUrl } from "../../components/Utils";
import { v4 as uuidv4 } from "uuid";

export default function TagPage(props) {
  const { data, isLoading } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const router = useRouter();
  const { tag } = router.query;
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      if (tag) {
        const filtered = data.page.rows.filter((post) =>
          post.tags.includes(decodeURIComponent(tag))
        );
        setFilteredPosts(filtered);
      }
    }
  }, [isLoading]);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-center">
          Posts tagged with "{tag}"
        </h1>
      </header>
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" aria-label={`Posts tagged with ${tag}`}>
        {filteredPosts.map((post, index) => (
          <article 
            key={uuidv4()}
            className="bg-white text-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out dark:bg-transparent border text-white"
          >
            <div className="p-6">
              <h2 className="text-black font-semibold text-xl mb-2 dark:text-white">
                <Link
                  href={`/blog/${formatTitleForUrl(post.title)}`}
                  onError={() => {
                    window.location.href = "/404";
                  }}
                >
                  <a className="cursor-pointer">{post.title}</a>
                </Link>
              </h2>
              <p className="text-gray-700 dark:text-gray-400">
                {post.summary}
              </p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export const getStaticPaths = async () => {
  const { data } = await client.queries.page({
    relativePath: "home.json",
  });

  const paths = data.page.rows.map((x) => {
    return { params: { tag: x.title } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

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
