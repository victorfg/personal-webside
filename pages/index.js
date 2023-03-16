import { useTina } from "tinacms/dist/edit-state";
import { client } from "../.tina/__generated__/client";
import Link from "next/link";
import { DateCustomComponent } from "../components/DateCustomComponent";
import { ListItem } from "../components/Animations";
import { useEffect } from "react";
import useDeviceDetect from "../utils/utils";

export default function Home(props) {
  const { isMobile } = useDeviceDetect();
  const { data, isLoading } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  useEffect(() => {
    document.querySelector(".mb-auto").classList.add("position-relative");
    document.querySelector(".footer-main").classList.add("position-bottom");
  });

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        {(data.page.rows || []).map((row, i) => (
          <ListItem key={"postItem_" + i}>
            <div className={isMobile ? "mt-10" : "ml-3 mt-5"}>
              <Link
                href={`/blog/${row.title}`}
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
        {/*DEBUG*/}
        {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
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
