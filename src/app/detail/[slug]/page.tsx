import { Gallery } from '~components/organisms/Gallery'
import { Header } from '~components/organisms/Header'

type Params = {
  params: {
    slug: string
  }
}

const DetailPage = async ({ params: { slug } }: Params) => {
  return (
    <main className='w-full h-full flex flex-col justify-center items-center bg-black'>
      <Header />
      <Gallery id={slug} />
      <div className='w-full h-screen bg-gradient-pure-lust-reverse' />
    </main>
  )
}

export default DetailPage
