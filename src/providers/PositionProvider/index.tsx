import { createContext, useCallback, useContext } from 'react'
import { arrayMoveImmutable } from 'array-move'

import { DataContext } from '../DataProvider'
import type { PositionContextProps, PositionProviderProps } from './interfaces'

const PositionContext = createContext({} as PositionContextProps)

// Position provider
const PositionProvider = ({ children }: PositionProviderProps) => {
  const { positions, setPositions } = useContext(DataContext)

  // create
  const createPosition = useCallback((id: string) => {
    if (!Array.isArray(positions) || !positions.length) {
      return
    }

    setPositions([id, ...positions])
  }, [positions, setPositions])

  // delete
  const deletePosition = useCallback((id: string) => {
    if (!Array.isArray(positions) || !positions.length) {
      return
    }
    
    setPositions(positions.filter((item: string) => item !== id))
  }, [positions, setPositions])

  // update
  const updatePosition = useCallback((from: number, to: number) => {
    if (!Array.isArray(positions) || !positions.length || to < 0 || to > positions.length - 1) {
      return
    }
    
    setPositions(arrayMoveImmutable(positions, from, to))
  }, [positions, setPositions])

  return (
    <PositionContext.Provider value={{
      createPosition,
      deletePosition,
      positions,
      updatePosition,
    }}>
      {children}
    </PositionContext.Provider>
  )
}

export { PositionContext, PositionProvider }
export default PositionProvider