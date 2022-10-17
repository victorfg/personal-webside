import { Layout } from '../../components/Layout'
import { useTina } from 'tinacms/dist/edit-state'
import { client } from '../../.tina/__generated__/client'
import {getItemFromArray} from '../../models/models';
import { staticRequest } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function Home (props) {
  let getBlogItem;
  const { data, isLoading } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data
  })

  if (typeof window !== 'undefined') {
    getBlogItem = getItemFromArray(window.location.pathname, data.page.rows);
  }

  return (
    <Layout>
     <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
        {getBlogItem?.title}
      </h1>
      {(getBlogItem?.blocks || []).map((block, b) => (
        <div className='prose max-w-none pb-4 dark:prose-dark text-justify'>
            <article key={b} style={{ flex: 1 }}>
              <TinaMarkdown content={block.block} />
            </article>
        </div>
      ))}
      {/*DEBUG*/}
      {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const { data } = await client.queries.pageConnection()
  const paths = data.pageConnection.edges.map((x) => {
    return { params: { slug: x.node._sys.filename } }
  })

  return {
    paths,
    fallback: 'blocking'
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
  /* TODO: Try to filter in query */
  /*const query = `
      query Post($relativePath: String!) {
        page(relativePath: $relativePath) {
          rows {
            title,
            description
          }
        }
      }
    `
  const variables = {
    relativePath: 'home.json',
  }

  let data = {}
  try {
    data = await client.request({
      query,
      variables,
    })
  } catch (error) {
    console.log(error)
  }

  return {
    props: {
      query,
      variables,
      data
    },
  }*/
}
