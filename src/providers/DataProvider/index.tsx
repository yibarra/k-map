import { createContext, useCallback, useState } from 'react'

import { dataDefault } from './MainProviderDefault'
import UseLocalStorage from '../../hooks/useLocalStorage'

import type { DataContextProps, DataProviderProps } from './interfaces'

// main context
const DataContext = createContext({} as DataContextProps)

// main provider
const DataProvider = ({ children }: DataProviderProps) => {
  const [data, setData] = UseLocalStorage('k_map', dataDefault)
  const [layers, setLayers] = useState<any>(data.layers)
  const [positions, setPositions] = useState<any>(data.positions)

  const updateData = useCallback((dataUpdate: any) => {
    if (dataUpdate instanceof Object) {
      setData((prev) => {
        return { ...prev, ...dataUpdate }
      })
    }
  }, [setData])
  
  // render
  return (
    <DataContext.Provider value={{
      layers,
      positions,
      updateData,
      setLayers,
      setPositions,
    }}>
      {children}
    </DataContext.Provider>
  )
}

export { DataContext, DataProvider }
export default DataProvider