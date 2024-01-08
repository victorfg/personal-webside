import Link from "next/link";
import { formatTitleForUrl } from "./Utils";

const Labels = ({ tagItem, bigLabel = false, title }) => {
  let baseClasses =
    "cursor-pointer bg-indigo-50 text-indigo-400 inline-flex items-center mx-0.5 px-2 rounded-full text-xs font-medium hover:bg-indigo-100 hover:text-indigo-800";
  if (bigLabel) {
    baseClasses += " text-lg px-4 py-2";
  }

  return (
    <Link
      href={`/tags/${encodeURIComponent(tagItem)}`}
      legacyBehavior
      passHref
      onError={() => {
        window.location.href = "/404";
      }}
    >
      <a href="#" className={baseClasses}>
        {tagItem}
      </a>
    </Link>
  );
};

export default Labels;
