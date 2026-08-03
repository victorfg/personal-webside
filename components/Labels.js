import Link from 'next/link'

const Labels = ({ tagItem, bigLabel = false }) => {
  const size = bigLabel ? 'text-base' : 'text-xs'

  const handleClick = (e) => {
    e.stopPropagation()
  }

  return (
    <Link
      href={`/tags/${encodeURIComponent(tagItem)}`}
      className={`${size} text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors`}
      onClick={handleClick}
    >
      {tagItem}
    </Link>
  )
}

export default Labels
