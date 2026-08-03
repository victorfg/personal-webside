import React from 'react'

const CustomPagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage
}) => {
  const pageCount = Math.ceil(totalPosts / postsPerPage)
  if (pageCount <= 1) return null

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1)

  return (
    <nav className='pagination-container' aria-label='Pagination'>
      <div className='custom-pagination'>
        {pages.map((page) => (
          <button
            key={page}
            type='button'
            onClick={() => setCurrentPage(page)}
            className={`pagination-button${
              currentPage === page ? ' active' : ''
            }`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default CustomPagination
