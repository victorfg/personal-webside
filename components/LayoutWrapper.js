import { useEffect } from 'react'
import Link from 'next/link'
import ThemeSwitch from '../components/ThemeSwitch'
import MobileNav from '../components/MobileNav'
import headerNavLinks from '../siteMetadata/headerNavLinks'
const siteMetadata = require('../siteMetadata/siteMetadata')

const LayoutWrapper = ({ children }) => {
  useEffect(() => {
    animateCSS('.title-header', 'flipInY')
  }, [])

  const animateCSS = (element, animationName, callback) => {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName)

    function handleAnimationEnd () {
      node.classList.remove('animated', animationName)
      node.removeEventListener('animationend', handleAnimationEnd)

      if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
  }

  return (
    <SectionContainer>
      <div className='flex h-screen flex-col justify-between'>
        <header className='flex items-center justify-between py-10'>
          <div>
            <Link href='/' aria-label={siteMetadata.headerTitle}>
              <div className='flex items-center justify-between'>
                <div className='mr-3' />
                {typeof siteMetadata.headerTitle === 'string'
                  ? (
                    <div className='hidden h-6 text-2xl font-semibold sm:block title-header'>
                      {siteMetadata.headerTitle}
                    </div>
                    )
                  : (
                      siteMetadata.headerTitle
                    )}
              </div>
            </Link>
          </div>
          <div className='flex items-center text-base leading-5'>
            <div className='hidden sm:block'>
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                >
                  <a className='p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4'>{link.title}</a>
                </Link>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className='mb-auto'>{children}</main>
      </div>
    </SectionContainer>
  )
}

const SectionContainer = ({ children }) => {
  return <div className='mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0'>{children}</div>
}

export default LayoutWrapper
