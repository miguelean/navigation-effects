'use client'

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

const NavigationContext = createContext<{
  navigate: boolean
  setNavigate: Dispatch<SetStateAction<boolean>>
  delay: number
  setDelay: Dispatch<SetStateAction<number>>
}>({ navigate: false, setNavigate: () => {}, delay: 500, setDelay: () => {} })

export const NavigationContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [navigate, setNavigate] = useState(true)
  const [delay, setDelay] = useState(500)

  return (
    <NavigationContext.Provider
      value={{ navigate, setNavigate, delay, setDelay }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export const useNavigationContext = () => useContext(NavigationContext)
