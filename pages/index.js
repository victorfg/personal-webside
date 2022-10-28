import { useTina } from 'tinacms/dist/edit-state'
import { client } from '../.tina/__generated__/client'
import { v4 as uuidv4 } from 'uuid';
import Head from 'next/head'
import Link from 'next/link'
import { Layout } from '../components/Layout';
import { TinaMarkdown } from "tinacms/dist/rich-text";
import useDeviceDetect from '../utils/utils'
import { usePresence, motion } from "framer-motion";

export default function Home (props) {
  const { isMobile } = useDeviceDetect();
  const { data, isLoading } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data
  })

  if (isLoading){
    return <div>Loading...</div>
  } else {
    return (
      <>
        <Head>
          <title>PersonalBlog</title>
          <meta name='description' content='A personal blog' />
          <meta name='og:title' content='A personal blog' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Layout home>
          {(data.page.rows || []).map((row, i) => (
            <ListItem>
              <Link href={`/blog/${row.title}`} key={uuidv4()}>
                <a className='cursor-pointer'>
                  <h1 className='text-5xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100'>
                    {row.title}
                  </h1>
                  {(row?.blocks || []).map((block, b) => (
                    <div className={(isMobile ? '' : 'truncate') + ' prose max-w-none pb-4 dark:prose-dark text-justify'} key={uuidv4()}>
                      <article style={{ flex: 1 }}>
                        <TinaMarkdown content={block.block} />
                      </article>
                    </div>
                  ))}
                </a>
              </Link>
            </ListItem>
          ))}
          {/*DEBUG*/}
          {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
        </Layout>
      </>
    )
  }
}

const transition = { ease: "easeInOut", duration: 0.4 }

function ListItem({ children }) {
  const [isPresent, safeToRemove] = usePresence()

  const animations = {
    layout: true,
    initial: 'out',
    style: {
      position: isPresent ? 'static' : 'absolute'
    },
    animate: isPresent ? 'in' : 'out',
    whileTap: 'tapped',
    variants: {
      in: { scaleY: 1, opacity: 1 },
      out: { scaleY: 0, opacity: 0, zIndex: -1 },
      tapped: { scale: 0.98, opacity: 0.5, transition: { duration: 2.5 } }
    },
    onAnimationComplete: () => !isPresent && safeToRemove(),
    transition
  }

  return (
    <motion.h2 {...animations}>
      {children}
    </motion.h2>
  )
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
