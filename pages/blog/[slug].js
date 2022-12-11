import { Layout } from '../../components/Layout'
import { useTina } from 'tinacms/dist/edit-state'
import { client } from '../../.tina/__generated__/client'
import {getItemFromArray} from '../../models/models';
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { CodeblockCustom } from '../../components/CodeblockCustom';
import {DateCustomComponent} from '../../components/DateCustomComponent'
import { MetaComponent } from '../../components/MetaComponent';
import { useEffect } from 'react';

const pageComponents = {
  CodeBlock: props => {
    return <CodeblockCustom content={props.children} language={props.language} />
  }
}

export default function Home (props) {
  let getBlogItem;
  const { data, isLoading } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data
  })

  useEffect(() => {
    document.querySelector(".mb-auto").classList.remove('position-relative');
    document.querySelector(".footer-main").classList.remove('position-bottom');
  });

  if (typeof window !== 'undefined') {
    getBlogItem = getItemFromArray(window.location.pathname, data.page.rows);
  }

  return (
    <>
      <MetaComponent titleMeta={getBlogItem?.title}/>
      <Layout>
        <h1 className='mb-3 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
          {getBlogItem?.title}
        </h1>
        {getBlogItem?.date &&
          <DateCustomComponent data={getBlogItem.date}/>
        }
        {(getBlogItem?.tags || []).map((tagItem, i) => (
          <span key={tagItem + '_' + i} className="inline-block cursor-pointer mt-1 ml-2">
            <span
              className="bg-indigo-100 text-indigo-800 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium"
            >
              {tagItem}
            </span>
          </span>
        ))}
        {(getBlogItem?.blocks || []).map((block, i) => (
          <div className='prose max-w-none pb-4 dark:prose-dark text-justify'key={'contePost_'+i}>
            <article>
              <TinaMarkdown components={pageComponents} content={block.block}/>
            </article>
          </div>
        ))}
        {/*DEBUG*/}
        {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
      </Layout>
    </>
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
}
