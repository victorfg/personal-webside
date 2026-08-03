import links from '../siteMetadata/links'

const faviconFor = (url) => {
  try {
    const { hostname } = new URL(url)
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`
  } catch {
    return null
  }
}

const LinksList = () => {
  if (!links?.length) return null

  return (
    <section
      className='mt-10 pt-8 border-t border-gray-200 dark:border-gray-800'
      aria-label='Reading'
    >
      <header className='mb-5 max-w-2xl'>
        <h2 className='font-serif text-xl sm:text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-50'>
          Reading
        </h2>
        <p className='mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl'>
          Sites and resources I keep around to read, learn, and come back to.
        </p>
      </header>

      <ul className='flex flex-col'>
        {links.map((link) => {
          const favicon = faviconFor(link.url)
          return (
            <li key={link.url}>
              <a
                href={link.url}
                target='_blank'
                rel='noopener noreferrer'
                className='group flex gap-4 rounded-md px-2 py-4 -mx-2 transition-colors hover:bg-gray-50 dark:hover:bg-white/[0.03]'
              >
                <span className='mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800'>
                  {favicon
                    ? (
                      <img
                        src={favicon}
                        alt=''
                        width={20}
                        height={20}
                        className='h-5 w-5'
                        loading='lazy'
                      />
                      )
                    : (
                      <span className='text-xs text-gray-400' aria-hidden='true'>
                        →
                      </span>
                      )}
                </span>

                <span className='min-w-0 flex-1'>
                  <span className='font-serif text-base sm:text-lg font-semibold tracking-tight text-gray-900 group-hover:text-primary-600 dark:text-gray-50 dark:group-hover:text-primary-400 transition-colors'>
                    {link.title}
                  </span>
                  {link.summary && (
                    <span className='mt-1 block text-sm leading-relaxed text-gray-500 dark:text-gray-400'>
                      {link.summary}
                    </span>
                  )}
                  {link.tags?.length > 0 && (
                    <span className='mt-2 flex flex-wrap gap-x-2 gap-y-1'>
                      {link.tags.map((tag) => (
                        <span
                          key={tag}
                          className='text-xs text-gray-400 dark:text-gray-500'
                        >
                          {tag}
                        </span>
                      ))}
                    </span>
                  )}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default LinksList
