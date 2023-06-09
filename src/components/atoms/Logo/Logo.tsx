'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useNavigationContext } from '~components/providers/NavigationProvider'
import { Link } from '../Link/Link'

type LogoProps = {
  className?: string
}

export const Logo = ({ className }: LogoProps) => {
  const { push } = useRouter()
  const path = usePathname()
  const { setNavigate, setDelay } = useNavigationContext()
  const handleLinkClick = (e: { stopPropagation: () => void }) => {
    if (path !== '/') {
      e.stopPropagation()
      setDelay(1000)
      setNavigate(true)
      setTimeout(() => {
        setDelay(500)
        push(`/`)
      }, 1000)
    }
  }
  return (
    <span className={className}>
      <Link className='w-full h-full' onClick={handleLinkClick} href={'/'}>
        <svg viewBox='0 0 370 68.9792524435448'>
          <defs id='SvgjsDefs1957'></defs>
          <g
            id='SvgjsG1958'
            transform='matrix(3.405878539290953,0,0,3.405878539290953,-120.2922249607305,-135.80600274659244)'
            fill='#ffd460'
          >
            <g xmlns='http://www.w3.org/2000/svg'>
              <polygon points='37.876,59.597 35.319,57.04 42.625,49.734 35.319,42.431 37.876,39.874 47.738,49.734  '></polygon>
            </g>
            <g xmlns='http://www.w3.org/2000/svg'>
              <rect x='48.182' y='56.51' width='16.498' height='3.617'></rect>
            </g>
          </g>
          <g
            id='SvgjsG1959'
            transform='matrix(3.9221840034309534,0,0,3.9221840034309534,116.07781599656904,-19.10260747493964)'
            fill='#ffd460'
          >
            <path d='M1.26 20 c-0.14 0 -0.26 -0.12 -0.26 -0.26 l0 -11.98 c0 -0.14 0.12 -0.26 0.26 -0.26 l2.88 0 c0.1 0 0.2 0.06 0.24 0.14 l3 7.4 l2.98 -7.4 c0.04 -0.08 0.14 -0.14 0.24 -0.14 l2.88 0 c0.14 0 0.26 0.12 0.26 0.26 l0 11.98 c0 0.14 -0.12 0.26 -0.26 0.26 l-2.34 0 c-0.14 0 -0.26 -0.12 -0.26 -0.26 l0 -6.44 l-2.44 6.2 c-0.04 0.08 -0.14 0.14 -0.22 0.14 l-1.68 0 c-0.1 0 -0.2 -0.06 -0.24 -0.14 l-2.46 -6.2 l0 6.44 c0 0.14 -0.12 0.26 -0.26 0.26 l-2.32 0 z M16 20 c-0.08 0 -0.16 -0.04 -0.2 -0.12 c-0.06 -0.06 -0.06 -0.16 -0.04 -0.24 l4.66 -11.98 c0.04 -0.1 0.14 -0.16 0.24 -0.16 l2.68 0 c0.1 0 0.2 0.06 0.24 0.16 l4.58 11.98 c0.02 0.08 0.02 0.16 -0.04 0.24 c-0.04 0.08 -0.12 0.12 -0.2 0.12 l-2.78 0 c-0.1 0 -0.2 -0.06 -0.24 -0.16 l-0.74 -1.84 l-4.5 0.02 l-0.74 1.82 c-0.04 0.1 -0.14 0.16 -0.24 0.16 l-2.68 0 z M20.48 15.5 l2.88 0 l-1.44 -4.24 z M30.040000000000003 20 c-0.14 0 -0.26 -0.12 -0.26 -0.26 l0 -11.98 c0 -0.14 0.12 -0.26 0.26 -0.26 l2.36 0 c0.08 0 0.16 0.04 0.22 0.1 l4.6 7.1 l0 -6.94 c0 -0.14 0.12 -0.26 0.26 -0.26 l2.46 0 c0.14 0 0.26 0.12 0.26 0.26 l0 11.98 c0 0.14 -0.12 0.26 -0.26 0.26 l-2.36 0 c-0.08 0 -0.16 -0.04 -0.22 -0.1 l-4.58 -7.06 l0 6.9 c0 0.14 -0.12 0.26 -0.26 0.26 l-2.48 0 z M46.46 20 c-0.1 0 -0.2 -0.06 -0.24 -0.16 l-4 -12 c-0.04 -0.08 -0.02 -0.16 0.02 -0.24 c0.06 -0.06 0.14 -0.1 0.22 -0.1 l2.8 0 c0.1 0 0.2 0.06 0.24 0.18 l2.38 7.82 l2.4 -7.82 c0.04 -0.12 0.14 -0.18 0.24 -0.18 l2.68 0 c0.08 0 0.16 0.04 0.22 0.1 c0.04 0.08 0.06 0.16 0.02 0.24 l-4.06 12 c-0.04 0.1 -0.12 0.16 -0.24 0.16 l-2.68 0 z M55.46 20 l0 -11.98 c0 -0.5 0.1 -0.6 0.26 -0.6 l8.76 0 c0.14 0 0.26 0.1 0.26 0.24 l0 2.26 c0 0.14 -0.12 0.26 -0.26 0.26 l-5.92 0 l0 2.08 l3.74 0 c0.14 0 0.26 0.12 0.26 0.26 l0 2.24 c0 0.14 -0.12 0.26 -0.26 0.26 l-3.74 0 l0 2.14 l5.9 0 c0.14 0 0.26 0.12 0.26 0.26 l0 2.24 c0 0.14 -0.12 0.26 -0.26 0.26 l-8.74 0 c-0.16 0 -0.26 -0.12 -0.26 0.08 z'></path>
          </g>
        </svg>
      </Link>
    </span>
  )
}
