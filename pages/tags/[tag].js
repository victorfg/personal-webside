import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { client } from '../../.tina/__generated__/client'
import Link from 'next/link'
import { formatTitleForUrl } from '../../components/Utils'
import { MetaComponent } from '../../components/MetaComponent'

export default function TagPage (props) {
  const data = props.data
  const router = useRouter()
  const { tag } = router.query
  const [filteredPosts, setFilteredPosts] = useState([])
  const decodedTag = tag ? decodeURIComponent(tag) : ''

  useEffect(() => {
    if (tag) {
      const filtered = data.page.rows.filter((post) =>
        post.tags?.includes(decodedTag)
      )
      setFilteredPosts(filtered)
    }
  }, [tag, decodedTag, data.page.rows])

  return (
    <>
      <MetaComponent
        titleMeta={decodedTag || 'Topic'}
        description={`Posts tagged with ${decodedTag || 'this topic'}.`}
        keyword={decodedTag}
        url={tag ? `/tags/${tag}` : '/tags'}
        type='website'
      />

      <div className='max-w-2xl'>
        <header className='mb-8'>
          <p className='text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2'>
            Topic
          </p>
          <h1 className='font-serif text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-50'>
            {decodedTag || '…'}
          </h1>
        </header>

        <section aria-label={`Posts tagged with ${decodedTag}`}>
          {filteredPosts.length === 0
            ? (
              <p className='text-sm text-gray-500 dark:text-gray-400 py-8'>
                No posts with this tag.
              </p>
              )
            : (
              <ul className='divide-y divide-gray-200 dark:divide-gray-800'>
                {filteredPosts.map((post) => (
                  <li key={post.title} className='py-8 sm:py-9'>
                    <h2 className='font-serif text-xl sm:text-2xl font-semibold tracking-tight'>
                      <Link
                        href={`/blog/${formatTitleForUrl(post.title)}`}
                        className='text-gray-900 hover:text-primary-600 dark:text-gray-50 dark:hover:text-primary-400 transition-colors'
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className='mt-3 text-[0.95rem] leading-relaxed text-gray-600 dark:text-gray-400 line-clamp-2'>
                      {post.summary}
                    </p>
                  </li>
                ))}
              </ul>
              )}
        </section>

        <p className='mt-10'>
          <Link
            href='/'
            className='text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors'
          >
            ← Posts
          </Link>
        </p>
      </div>
    </>
  )
}

export const getStaticPaths = async () => {
  const { data } = await client.queries.page({
    relativePath: 'home.json'
  })

  const tagSet = new Set()
  data.page.rows.forEach((row) => {
    (row.tags || []).forEach((t) => tagSet.add(t))
  })

  const paths = [...tagSet].map((tag) => ({
    params: { tag }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async () => {
  const { data, query, variables } = await client.queries.page({
    relativePath: 'home.json'
  })

  return {
    props: {
      data,
      query,
      variables
    }
  }
}
