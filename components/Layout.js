import Link from 'next/link'
import { formatTitleForUrl } from './Utils'

export const Layout = ({ children, previousPost, nextPost }) => {
  const isNextPostOnly = nextPost && !previousPost

  return (
    <div id='style-scroll-custom' className='default-layout'>
      {children}

      {(previousPost || nextPost) && (
        <nav
          className='blog-navigation mt-12 pt-8 border-t border-gray-200 dark:border-gray-800'
          aria-label='Post navigation'
        >
          <p className='mb-4 text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500'>
            Continue reading
          </p>

          <div
            className={`flex gap-8 ${
              isNextPostOnly ? 'justify-end' : 'justify-between'
            }`}
          >
            {previousPost && (
              <Link
                href={`/blog/${formatTitleForUrl(previousPost.title)}`}
                className='group max-w-md text-left'
                rel='prev'
              >
                <span className='block text-xs text-gray-500 dark:text-gray-400 mb-1'>
                  ← Previous
                </span>
                <span className='font-serif text-lg font-semibold text-gray-900 group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400 transition-colors'>
                  {previousPost.title}
                </span>
              </Link>
            )}

            {nextPost && (
              <Link
                href={`/blog/${formatTitleForUrl(nextPost.title)}`}
                className='group max-w-md text-right'
                rel='next'
              >
                <span className='block text-xs text-gray-500 dark:text-gray-400 mb-1'>
                  Next →
                </span>
                <span className='font-serif text-lg font-semibold text-gray-900 group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400 transition-colors'>
                  {nextPost.title}
                </span>
              </Link>
            )}
          </div>
        </nav>
      )}
    </div>
  )
}
