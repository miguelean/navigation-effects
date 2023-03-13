import { Logo } from '~components/atoms/Logo'

export const Header = () => {
  return (
    <div className='w-full h-20 flex items-center px-4 sm:px-9 bg-transparent'>
      <Logo className='h-full w-40 flex items-center' />
    </div>
  )
}
