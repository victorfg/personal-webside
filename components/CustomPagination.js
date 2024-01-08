import React from "react";
import { v4 as uuidv4 } from "uuid";

const CustomPagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="pagination-container">
      <div className="custom-pagination">
        {pages.map((page, index) => {
          return (
            <button
              key={uuidv4()}
              onClick={() => setCurrentPage(page)}
              className={`pagination-button${
                currentPage === page ? " active" : ""
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CustomPagination;
