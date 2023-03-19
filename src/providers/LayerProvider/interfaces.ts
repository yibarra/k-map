import type { PropsWithChildren } from 'react'

export interface LayerItemProps {
  id: string
  name: string
  currentPoint: number
  curves: []
  lineProperties: object
  pointsProperties: object
  points: []
}

export interface LayerContextProps {
  current: number
  createLayer: any
  deleteLayer: any
  layers: any
  updateLayer: any
  updateLayerPosition: any
}

export interface LayerProviderProps extends PropsWithChildren {
  any?: any
}