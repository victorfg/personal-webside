import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTina } from "tinacms/dist/react";
import { client } from "../.tina/__generated__/client";
import useDeviceDetect from "../utils/utils";
import { ListItem } from "../components/Animations";
import { DateCustomComponent } from "../components/DateCustomComponent";
import CustomPagination from "../components/CustomPagination";
import { formatTitleForUrl } from "../components/Utils";

export default function Home(props) {
  const { isMobile } = useDeviceDetect();
  const { data, isLoading } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const containerRef = useRef(null);
  const postHeight = 180;

  useEffect(() => {
    document.querySelector(".mb-auto").classList.add("position-relative");
    document.querySelector(".footer-main").classList.add("position-bottom");
  });

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || containerRef.current.children.length === 0) {
        return;
      }

      const newPostsPerPage = calculatePostsPerPage();

      if (newPostsPerPage) {
        setPostsPerPage(newPostsPerPage);
        setTotalPages(
          Math.ceil((data.page.rows || []).length / newPostsPerPage)
        );
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [data, postHeight]);

  const calculatePostsPerPage = () => {
    if (postHeight === 0) return;

    const headerHeight = document.querySelector(".header").offsetHeight;
    const footerHeight = document.querySelector(".footer-main").offsetHeight;
    const windowHeight = window.innerHeight;
    const contentHeight = windowHeight - headerHeight - footerHeight;

    const calculatedPostsPerPage = Math.floor(contentHeight / postHeight);
    return Math.max(calculatedPostsPerPage, 1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const displayedPosts = (data.page.rows || []).slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    return (
      <div className="posts-container">
        <div id="content-posts" ref={containerRef}>
          {displayedPosts.map((row, i) => (
            <ListItem key={"postItem_" + i}>
              <div className={isMobile ? "mt-10" : "ml-3 mt-5"}>
                <Link
                  href={`/blog/${formatTitleForUrl(row.title)}`}
                  legacyBehavior
                  passHref
                  onError={() => {
                    window.location.href = "/404";
                  }}
                >
                  <a className="cursor-pointer">
                    <h1 className="p-3 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
                      {row.title}
                    </h1>
                  </a>
                </Link>
                {row.date && (
                  <span className="p-3">
                    <DateCustomComponent data={row.date} />
                  </span>
                )}
                {(row.tags || []).map((tagItem, i) => (
                  <span
                    key={tagItem + "_" + i}
                    className="inline-block cursor-pointer mt-1 mr-1"
                  >
                    <span className="bg-indigo-100 text-indigo-800 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium">
                      {tagItem}
                    </span>
                  </span>
                ))}
              </div>
            </ListItem>
          ))}
        </div>
        <div className="pagination-container">
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
        {/*DEBUG*/}
        {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
      </div>
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
