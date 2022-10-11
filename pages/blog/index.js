import { Layout } from '../../components/Layout'
import Link from 'next/link'
import { useTina } from 'tinacms/dist/edit-state'
import { client } from '../../.tina/__generated__/client'

export default function PostList (props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data
  })
  const blogList = data.blogConnection.edges
  return (
    <Layout>
      <h1>Blog</h1>
      <div>
        {blogList.map((blog) => (
          <div key={blog.node.id}>
            <Link href={`/blog/${blog.node._sys.filename}`}>
              <a>{blog.node._sys.filename}</a>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const { data, query, variables } = await client.queries.blogConnection()

  return {
    props: {
      data,
      query,
      variables
      // myOtherProp: 'some-other-data',
    }
  }
}
