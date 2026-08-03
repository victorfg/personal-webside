import Link from 'next/link'

const TopicsFilter = ({ displayedPosts }) => {
  const countTags = () => {
    const tagCounts = {}

    displayedPosts.forEach((row) => {
      row.tags?.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    })

    return tagCounts
  }

  const tags = countTags()
  const sortedTagCounts = Object.entries(tags).sort((a, b) => b[1] - a[1])

  if (sortedTagCounts.length === 0) return null

  return (
    <section
      className='mt-10 pt-8 border-t border-gray-200 dark:border-gray-800'
      aria-label='Topics'
    >
      <header className='mb-5 max-w-2xl'>
        <h2 className='font-serif text-xl sm:text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-50'>
          Topics
        </h2>
      </header>

      <nav className='flex flex-wrap items-baseline gap-x-3 gap-y-2 text-sm'>
        {sortedTagCounts.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className='text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors'
          >
            {tag}
            <span className='ml-1 text-gray-400 dark:text-gray-500'>({count})</span>
          </Link>
        ))}
      </nav>
    </section>
  )
}

export default TopicsFilter
