import { useState } from 'react'
import { client } from '../.tina/__generated__/client'
import CustomPagination from '../components/CustomPagination'
import LinksList from '../components/LinksList'
import PostsLists from '../components/PostsLists'
import Searcher from '../components/Searcher'
import TopicsFilter from '../components/TopicsFilter'

export default function Home (props) {
  const data = props.data
  const [filteredPosts, setFilteredPosts] = useState(data.page.rows)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const allPosts = data.page.rows
  const postsPerPage = 3

  const handleSearch = (term) => {
    setSearchTerm(term)
    setCurrentPage(1)
    const filtered = allPosts.filter((post) =>
      post.title.toLowerCase().includes(term.toLowerCase())
    )
    setFilteredPosts(filtered)
  }

  const lastPostIndex = currentPage * postsPerPage
  const firstPostIndex = lastPostIndex - postsPerPage
  const currentPosts = filteredPosts.slice(firstPostIndex, lastPostIndex)

  return (
    <div className='flex flex-col'>
      <section aria-label='Blog posts'>
        <div className='mb-8 max-w-md'>
          <Searcher onSearch={handleSearch} />
        </div>

        <div className='posts-container'>
          {filteredPosts.length === 0
            ? (
              <p className='text-sm text-gray-500 dark:text-gray-400 py-10'>
                No posts match{searchTerm ? ` “${searchTerm}”` : ''}.
              </p>
              )
            : (
              <>
                <PostsLists displayedPosts={currentPosts} />
                <CustomPagination
                  totalPosts={filteredPosts.length}
                  postsPerPage={postsPerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </>
              )}
        </div>
      </section>

      <TopicsFilter displayedPosts={allPosts} />
      <LinksList />
    </div>
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
