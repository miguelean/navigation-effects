import { Transition } from '~components/atoms/Transition'
import { Header } from '~components/organisms/Header'
import { NavigationContextProvider } from '~components/providers/NavigationProvider'
import '~styles/globals.css'

export const metadata = {
  title: 'Navigation Effects',
  description: 'Cool navigation effects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className='hiddenScrollBar'>
        <NavigationContextProvider>
          <Transition />
          {children}
        </NavigationContextProvider>
      </body>
    </html>
  )
}
