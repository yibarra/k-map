import { createContext, useContext } from 'react'
import { MainContextProps } from '../MainProvider/interfaces'
import { MainContext } from '../MainProvider/MainProvider'

import type { KeyboardContextProps, KeyboardProviderProps } from './interfaces'

const KeyboardContext = createContext({} as KeyboardContextProps)

// color provider
const KeyboardProvider = ({ children }: KeyboardProviderProps) => {
  const {
    setCurve,
    setEnable,
    setRemove,
  } = useContext<MainContextProps>(MainContext)

  // on key down
  const onKeyDown = (event: KeyboardEvent, callback: any): void => {
    if (event.shiftKey) {
      setEnable(true)
    }
    
    if (event.shiftKey && event.altKey) {
      setEnable(false)
      setRemove(true)
    }

    if (event.key === 'Meta') {
      setCurve(true)
    }

    if (typeof callback === 'function') {
      callback(event)
    }
  }

  // on key up
  const onKeyUp = (event: KeyboardEvent, callback: any): void => {
    setCurve(false)
    setEnable(false)
    setRemove(false)

    if (typeof callback === 'function') {
      callback(event)
    }
  }

  return (
    <KeyboardContext.Provider value={{
      onKeyDown,
      onKeyUp
    }}>
      {children}
    </KeyboardContext.Provider>
  )
}

export { KeyboardContext, KeyboardProvider }
export default KeyboardProvider