import { useState } from 'react'

const Searcher = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value
    setSearchTerm(newSearchTerm)
    onSearch(newSearchTerm)
  }

  return (
    <div className='w-full max-w-md'>
      <label htmlFor='post-search' className='sr-only'>
        Search posts
      </label>
      <div className='relative flex items-center border-b border-transparent focus-within:border-primary-500 transition-colors'>
        <span
          className='pointer-events-none absolute left-0 flex items-center text-gray-400 dark:text-gray-500'
          aria-hidden='true'
        >
          <svg
            className='h-4 w-4 fill-current'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
          >
            <path d='M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z' />
          </svg>
        </span>
        <input
          id='post-search'
          type='search'
          className='w-full border-none bg-transparent py-2 pl-7 pr-0 text-sm text-gray-900 placeholder:text-gray-400 shadow-none focus:border-none focus:outline-none focus:ring-0 dark:text-gray-100 dark:placeholder:text-gray-500'
          placeholder='Filter posts by title…'
          name='q'
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
    </div>
  )
}

export default Searcher
