import React, { createContext, useEffect, useState } from 'react'
import WebFontLoader from 'webfontloader'

import UseWindowSize from '../../hooks/useWindowSize'

import type { MainContextProps, MainProviderProps } from './interfaces'

// main context
const MainContext = createContext({} as MainContextProps)

// main provider
const MainProvider: React.FC<MainProviderProps> = ({ children }) => {
  const size = UseWindowSize()

  const [animate, setAnimate] = useState<boolean>(true)
  const [curve, setCurve] = useState<boolean>(false)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [enable, setEnable] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [remove, setRemove] = useState<boolean>(false)

  useEffect(() => {
    try {
      WebFontLoader.load({
        google: {
          families: [
            "Roboto Condensed:300,400,700",
            "Roboto Slab:300,400,500,600"
          ]
        }, fontactive: () => {
          setTimeout(() => setLoaded(true), 500)
        }
      })
    } catch (e: unknown) {
      console.error(`[ERROR FONT LOAD: ${e}]`)
    }
  }, [])
  
  // render
  return (
    <MainContext.Provider value={{
      animate,
      curve,
      enable,
      isDragging,
      loaded,
      remove,
      setAnimate,
      setEnable,
      setIsDragging,
      setLoaded,
      setCurve,
      setRemove,
      size,
    }}>
      {children}
    </MainContext.Provider>
  )
}

export { MainContext, MainProvider }
export default MainProvider