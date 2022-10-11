import { Layout } from '../../components/Layout'
import { useTina } from 'tinacms/dist/edit-state'
import { client } from '../../.tina/__generated__/client'

export default function Home (props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data
  })

  return (
    <Layout>
      <code>
        <pre
          style={{
            backgroundColor: 'lightgray'
          }}
        >
          {JSON.stringify(data.blog, null, 2)}
        </pre>
      </code>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const { data } = await client.queries.blogConnection()
  const paths = data.blogConnection.edges.map((x) => {
    return { params: { slug: x.node._sys.filename } }
  })

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async (ctx) => {
  const { data, query, variables } = await client.queries.blog({
    relativePath: ctx.params.slug + '.mdx'
  })

  return {
    props: {
      data,
      query,
      variables
    }
  }
}
