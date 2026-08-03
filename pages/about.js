import Link from 'next/link'
import { MetaComponent } from '../components/MetaComponent'

const LINKEDIN = 'https://www.linkedin.com/in/victor-fernandez-gayan/'
const GITHUB = 'https://github.com/victorfg'
const ISKRA = 'https://iskra.cat/ca'

export default function About () {
  return (
    <>
      <MetaComponent
        titleMeta='About'
        description='Victor Fernandez Gayan — frontend developer at Iskra, writing about frontend.'
        keyword='about, frontend, javascript, iskra, victor fernandez'
        url='/about'
        type='website'
      />

      <article className='max-w-2xl'>
        <header className='mb-8'>
          <h1 className='font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-50'>
            About
          </h1>
        </header>

        <div className='space-y-5 text-[1.05rem] leading-relaxed text-gray-700 dark:text-gray-300'>
          <p>
            I’m a frontend developer at{' '}
            <a
              href={ISKRA}
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-900 underline decoration-gray-300 underline-offset-4 hover:text-primary-600 hover:decoration-primary-500 dark:text-gray-100 dark:decoration-gray-600 dark:hover:text-primary-400 transition-colors'
            >
              Iskra
            </a>
            . I write about frontend here — notes and posts from
            day-to-day work with React, Next.js, and the web platform.
          </p>
          <p>
            For a fuller picture of my experience, see LinkedIn. Code and side
            experiments live on GitHub.
          </p>
        </div>

        <nav className='mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm' aria-label='Profiles'>
          <a
            href={LINKEDIN}
            target='_blank'
            rel='noopener noreferrer'
            className='text-gray-900 hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-400 transition-colors underline-offset-4 hover:underline'
          >
            LinkedIn →
          </a>
          <a
            href={GITHUB}
            target='_blank'
            rel='noopener noreferrer'
            className='text-gray-900 hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-400 transition-colors underline-offset-4 hover:underline'
          >
            GitHub →
          </a>
          <Link
            href='/'
            className='text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors'
          >
            ← Posts
          </Link>
        </nav>
      </article>
    </>
  )
}
