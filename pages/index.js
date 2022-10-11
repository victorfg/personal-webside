import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { useTina } from 'tinacms/dist/edit-state'
import { client } from '../.tina/__generated__/client'
import Head from 'next/head'
import Link from 'next/link'
const siteMetadata = require('../siteMetadata/siteMetadata')

export default function Home (props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data
  })

  return (
    <>
      <Head>
        <title>{data.page.title}</title>
        <meta name='description' content='A personal blog' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        <div className='space-y-2 pt-6 pb-8 md:space-y-5'>
          <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
            {/* Blog */}
          </h1>
          <p className='text-lg leading-7 text-gray-500 dark:text-gray-400'>
            {/* siteMetadata.description */}
          </p>
        </div>
      </div>
      <section>
        <ul>
          {(data?.page?.rows || []).map((row, i) => (
              <li key={i}>
                <article>
                  <TinaMarkdown content={row.block}/>
                </article>
              </li>
            )) }
        </ul>
      </section>
      {/*DEBUG*/}
      {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
    </>
  )
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
