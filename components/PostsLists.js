import { useRouter } from 'next/router'
import { DateCustomComponent } from './DateCustomComponent'
import { ReadingTime } from './ReadingTime'
import { formatTitleForUrl } from './Utils'
import Labels from './Labels'

const PostsLists = ({ displayedPosts }) => {
  const router = useRouter()

  const handleArticleClick = (title) => {
    router.push(`/blog/${formatTitleForUrl(title)}`)
  }

  return (
    <section id='content-posts' className='w-full divide-y divide-gray-200 dark:divide-gray-800' aria-label='Blog posts'>
      {displayedPosts.map((row) => (
        <article
          key={row.title}
          className='group w-full py-8 sm:py-9 cursor-pointer focus-within:outline-none'
          onClick={() => handleArticleClick(row.title)}
          role='button'
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleArticleClick(row.title)
            }
          }}
        >
          <header className='flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-baseline'>
            <div className='flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400'>
              {row.date && (
                <time dateTime={row.date}>
                  <DateCustomComponent data={row.date} />
                </time>
              )}
              <ReadingTime
                content={row.blocks?.map((b) => b.block) || []}
              />
            </div>
            <div
              className='flex items-center flex-wrap gap-x-2 gap-y-1'
              onClick={(e) => e.stopPropagation()}
            >
              {(row.tags || []).map((tagItem) => (
                <Labels key={tagItem} tagItem={tagItem} />
              ))}
            </div>
          </header>
          <div className='mt-4'>
            <h2 className='font-serif text-2xl font-semibold tracking-tight text-gray-900 group-hover:text-primary-600 dark:text-gray-50 dark:group-hover:text-primary-400 transition-colors'>
              {row.title}
            </h2>
            <p className='mt-3 text-[0.95rem] leading-relaxed text-gray-600 dark:text-gray-400 line-clamp-2'>
              {row.summary}
            </p>
          </div>
        </article>
      ))}
    </section>
  )
}

export default PostsLists
