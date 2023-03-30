import React from "react";

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`pagination-button${currentPage === i ? " active" : ""}`}
          onClick={() => handleClick(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="custom-pagination">
      {/*currentPage > 1 && (
        <button
          className="pagination-button"
          onClick={() => handleClick(currentPage - 1)}
        >
          Previous
        </button>
      )*/}
      {renderPageNumbers()}
      {/*currentPage < totalPages && (
        <button
          className="pagination-button"
          onClick={() => handleClick(currentPage + 1)}
        >
          Next
        </button>
      )*/}
    </div>
  );
};

export default CustomPagination;