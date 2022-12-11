import Link from 'next/link'

export const Layout = ({ children, home }) => {
  return (
    <div id="style-scroll-custom" className='default-layout'>
      <main>{children}</main>
      {!home && (
        <div>
          <Link href='/'>
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}
