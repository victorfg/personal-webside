import { useTina } from 'tinacms/dist/edit-state'
import { client } from '../.tina/__generated__/client'
import { v4 as uuidv4 } from 'uuid';
import Head from 'next/head'
import Link from 'next/link'
import { usePresence, motion } from "framer-motion";

export default function Home (props) {
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
        <>
          {(data.page.rows || []).map((row, i) => (
            <ListItem>
              <Link href={`/blog/${row.title}`} key={uuidv4()}>
                <a className='cursor-pointer'>
                  <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100'>
                    {row.title}
                  </h1>              
                </a>
              </Link>
              {(row.tags || []).map((tagItem, i) => (
                <span className="inline-block cursor-pointer mt-2 mr-1">
                  <span
                    className="bg-indigo-100 text-indigo-800 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium"
                  >
                    {tagItem}
                  </span>
                </span>
              ))}
            </ListItem>
          ))}
          {/*DEBUG*/}
          {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
        </>
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
