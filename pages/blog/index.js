import { Layout } from '../../components/Layout'
import Link from 'next/link'
import { useTina } from 'tinacms/dist/edit-state'
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from '../../.tina/__generated__/client'
import { v4 as uuidv4 } from 'uuid';

const pageComponents = {
  NewsletterSignup: props => {
    return (
      <>
        <div>
          <TinaMarkdown content={props.children} />
        </div>
        <div>
          <form>
            <label htmlFor="email-address">Custom email</label>
            <input name="email-address" type="email" required />
            <button type="submit">{props.buttonText}</button>
          </form>
        </div>
      </>
    )
  }
}

export default function PostList (props) {
  const { data, isLoading } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data
  })
  if (isLoading){
    return <div>Loading...</div>
  } else {
    console.log(data.page.rows)
    return (
      <>
        <h1 className="text-5xl font-extrabold dark:text-white">Blog</h1>
        {(data.page.rows || []).map((row, i) => (
          <Link href={`/blog/${row.title}`} key={uuidv4()}>
            <a className='cursor-pointer'>
              <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
                {row.title}
              </h1>
              {(row?.blocks || []).map((block, b) => (
                <article key={b} style={{ flex: 1 }}>
                  <TinaMarkdown components={pageComponents} content={block.block} />
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
