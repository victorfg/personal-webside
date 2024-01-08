import { useState, useEffect } from "react";
import { useTina } from "tinacms/dist/edit-state";
import { client } from "../.tina/__generated__/client";
import useDeviceDetect from "../utils/utils";
import CustomPagination from "../components/CustomPagination";
import PostsLists from "../components/PostsLists";
import Searcher from "../components/Searcher";
import TopicsFilter from "../components/TopicsFilter";

export default function Home(props) {
  const { isMobile } = useDeviceDetect();
  const { data, isLoading } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  const [filteredPosts, setFilteredPosts] = useState(data.page.rows);
  const [currentPage, setCurrentPage] = useState(1);
  const allPosts = data.page.rows;
  const postsPerPage = 3;

  useEffect(() => {
    document.querySelector(".mb-auto").classList.add("position-relative");
    document.querySelector(".footer-main").classList.add("position-bottom");
  });

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
        <Searcher onSearch={handleSearch} />
        <div className="posts-container md:mt-10 container mx-auto">
          <PostsLists displayedPosts={currentPosts} />
          <CustomPagination
            totalPosts={filteredPosts.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />

          {/*DEBUG*/}
          {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
        </div>
        <TopicsFilter displayedPosts={allPosts} />
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
