import { Link } from '~components/atoms/Link'
import { Slider } from '~components/organisms/Slider'
import { Header } from '~components/organisms/Header'

export default function Home() {
  return (
    <main className='w-screen h-full flex flex-col justify-center items-center bg-black'>
      <Header />
      <Slider page={1} />
      <Link href='/1' /> {/* Add invisible link for SEO */}
      <div className='w-full h-screen bg-gradient-pure-lust-reverse' />
    </main>
  )
}
