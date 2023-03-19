import { createContext, useCallback, useContext, useState } from 'react'

import { DataContext } from '../DataProvider'
import { PositionContext } from '../PositionProvider'
import type { LayerContextProps, LayerItemProps, LayerProviderProps } from './interfaces'

// layer context
const LayerContext = createContext({} as LayerContextProps)

// layer provider
const LayerProvider = ({ children }: LayerProviderProps) => {
  const { layers, positions, setLayers } = useContext(DataContext)
  const { createPosition, deletePosition, updatePosition } = useContext(PositionContext)

  const [current, setCurrent] = useState<number>(positions?.length ? positions[0] : 0)
  
  // create layer
  const createLayer = useCallback((id: string) => {
    try {
      createPosition(id)

      setLayers((prevState: LayerItemProps[]) => {
        const count = prevState.length
        const layer = {
          id: id,
          name: `New Layer ${count > 0 ? count + 1 : ''}`,
          currentPoint: 0,
          curves: [],
          lineProperties: {},
          pointsProperties: {},
          points: []
        }

        return [...prevState, layer]
      })

    } catch (e) {
      console.error(`[ERROR LAYER CREATE]: ${e}`)
    }
  }, [createPosition, setLayers])

  // delete layer
  const deleteLayer = useCallback((id: string) => {
    setLayers(
      (prevState: LayerItemProps[]) => {
        deletePosition(id)

        return prevState.filter((layer) => layer.id !== id)
      }
    )
  }, [deletePosition, setLayers])

  // update information position, colors, etc
  const updateLayer = useCallback((id: string, prop: string, data: any) => {
    const nextLayers = layers.map((layer: any) => {
      if (layer instanceof Object === false) return

      if (layer.id === id && Object.prototype.hasOwnProperty.call(layer, prop)) {
        layer[prop] = data
      }

      return layer
    })

    setLayers(nextLayers)
  }, [])

  // update position layer
  const updateLayerPosition = useCallback((from: number, to: number) => {
    updatePosition(from, to)
  }, [updatePosition])

  return (
    <LayerContext.Provider value={{
      current,
      layers,
      createLayer,
      deleteLayer,
      updateLayer,
      updateLayerPosition,
    }}>
      {children}
    </LayerContext.Provider>
  )
}

export { LayerContext, LayerProvider }
export default LayerProvider