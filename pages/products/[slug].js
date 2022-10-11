import { parseMdFile } from '../../helpers/markdown'
import { getAllProductSlugs } from '../../helpers/products'
// import ReactMarkdown from 'react-markdown'
const Product = ({ markdownFile }) => {
  return (
    <div>
      <div>title: {markdownFile.frontmatter.title}</div>
      <div>price: {markdownFile.frontmatter.price}</div>
      <div>excerpt: {markdownFile.frontmatter.except}</div>
      <div>image:{markdownFile.frontmatter.image}</div>
      {/* <ReactMarkdown source={markdownFile.markdownBody}/> */}
    </div>
  )
}
const getStaticProps = async ({ params }) => {
  return {
    props: {
      markdownFile: parseMdFile(`products/${params.slug}.md`)
    }
  }
}
const getStaticPaths = async () => {
  return {
    paths: getAllProductSlugs().map((slug) => ({
      params: {
        slug: slug.replace('.md', '')
      }
    })),
    fallback: false
  }
}
export default Product
export {
  getStaticProps,
  getStaticPaths
}
