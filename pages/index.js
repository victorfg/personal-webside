import { useTina } from 'tinacms/dist/edit-state'
import { client } from '../.tina/__generated__/client'
import { v4 as uuidv4 } from 'uuid';
import Head from 'next/head'
import Link from 'next/link'
import { Layout } from '../components/Layout';
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function Home (props) {
  const { data, isLoading } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data
  })

  console.log(data)

  if (isLoading){
    return <div>Loading...</div>
  } else {
    return (
      <>
        <Head>
        <title>PersonalBlog</title>
        <meta name='description' content='A personal blog' />
        <link rel='icon' href='/favicon.ico' />
        </Head>
        <Layout>
          {(data.page.rows || []).map((row, i) => (
            <Link href={`/blog/${row.title}`} key={uuidv4()}>
              <a className='cursor-pointer'>
                <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
                  {row.title}
                </h1>
                {(row?.blocks || []).map((block, b) => (
                  <article key={b} style={{ flex: 1 }}>
                    <TinaMarkdown content={block.block} />
                  </article>
                ))}
                <p className='text-lg leading-7 text-gray-500 dark:text-gray-400'>
                  {row.description}
                </p>
              </a>
          </Link>
          ))}
          {/*DEBUG*/}
          {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
        </Layout>
      </>
    )
  }
}

export const getStaticProps = async () => {
  const { data, query, variables } = await client.queries.page({relativePath: 'home.json'})

  return {
    props: {
      data,
      query,
      variables,
    }
  }
}
