import { useState } from "react";
import { client } from "../.tina/__generated__/client";
import CustomPagination from "../components/CustomPagination";
import PostsLists from "../components/PostsLists";
import Searcher from "../components/Searcher";
import TopicsFilter from "../components/TopicsFilter";
import useDeviceDetect from "../utils/utils";

export default function Home(props) {
  const { isMobile } = useDeviceDetect();
  // For TinaCMS 2.x local mode, use data directly
  const data = props.data;
  const isLoading = false;
  const [filteredPosts, setFilteredPosts] = useState(data.page.rows);
  const [currentPage, setCurrentPage] = useState(1);
  const allPosts = data.page.rows;
  const postsPerPage = 3;


  const handleSearch = (searchTerm) => {
    const filtered = allPosts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = filteredPosts.slice(firstPostIndex, lastPostIndex);

    return (
      <>
        <section aria-label="Search posts">
          <Searcher onSearch={handleSearch} />
        </section>
        <section className="posts-container md:mt-10 container mx-auto" aria-label="Blog posts list">
          <PostsLists displayedPosts={currentPosts} />
          <CustomPagination
            totalPosts={filteredPosts.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />

          {/*DEBUG*/}
          {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
        </section>
        <aside aria-label="Filter by topics">
          <TopicsFilter displayedPosts={allPosts} />
        </aside>
      </>
    );
  }
}

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
