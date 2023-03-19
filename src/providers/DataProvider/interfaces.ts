import type { PropsWithChildren } from 'react'

export interface DataContextProps {
  layers: any
  positions?: any[]
  setLayers: any
  setPositions: any
  updateData(val: any): void
}

export interface DataProviderProps extends PropsWithChildren {}
