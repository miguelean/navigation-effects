import { Link } from '~components/atoms/Link'
import React from 'react'
import { Slider } from '~components/organisms/Slider'
import { Header } from '~components/organisms/Header'

type Params = {
  params: {
    slug: string
  }
}

const NextPage = async ({ params: { slug } }: Params) => {
  const nexPage = (+slug + 1).toString()
  return (
    <main className='w-screen h-full flex flex-col justify-center items-center bg-black'>
      <Header />
      <Slider page={+slug + 1} />
      <Link href={nexPage} /> {/* Add invisible link for SEO */}
      <div className='w-full h-screen bg-gradient-pure-lust-reverse' />
    </main>
  )
}

export default NextPage
