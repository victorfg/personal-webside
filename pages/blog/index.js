import Link from 'next/link'
import { useTina } from 'tinacms/dist/edit-state'
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from '../../.tina/__generated__/client'
import { v4 as uuidv4 } from 'uuid';
import useDeviceDetect from '../../utils/utils'
import { Layout } from '../../components/Layout';
import { CodeblockCustom } from '../../components/CodeblockCustom';
import { MetaComponent } from '../../components/MetaComponent';

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
  },
  CodeBlock: props => {
    return <CodeblockCustom content={props.children} language={props.language} />
  }
}

export default function PostList (props) {
  const { isMobile } = useDeviceDetect();
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
        <MetaComponent />
        {isMobile && 
          <Layout>
            {(data.page.rows || []).map((row, i) => (
              <Link href={`/blog/${row.title}`} key={uuidv4()}>
                <a className='cursor-pointer'>
                  <h1 className='text-5xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100'>
                    {row.title}
                  </h1>
                  {(row?.blocks || []).map((block, b) => (
                    <div className='prose max-w-none pb-4 dark:prose-dark text-justify' key={uuidv4()}>
                        <article style={{ flex: 1 }}>
                          <TinaMarkdown components={pageComponents} content={block.block} />
                        </article>
                    </div>
                  ))}
                </a>
              </Link>
            ))}
          </Layout>
        }  
        {!isMobile && 
          (data.page.rows || []).map((row, i) => (
            <Link href={`/blog/${row.title}`} key={uuidv4()}>
              <a className='cursor-pointer'>
                <h1 className='text-5xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100'>
                  {row.title}
                </h1>
                {(row?.blocks || []).map((block, b) => (
                  <div className='prose max-w-none pb-4 dark:prose-dark text-justify' key={uuidv4()}>
                      <article style={{ flex: 1 }}>
                        <TinaMarkdown components={pageComponents} content={block.block} />
                      </article>
                  </div>
                ))}
              </a>
            </Link>
          ))
        }
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
