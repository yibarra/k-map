import type { GridProviderProps } from '../../../providers/GridProvider/interfaces'
import type { MainContextProps } from '../../../providers/MainProvider/interfaces'
import type { PointType } from '../../Point/interfaces'
import type { LayerProps } from '../interfaces'

export interface LayerPointsProps
  extends
    Partial<LayerProps>,
    Partial<GridProviderProps>,
    Partial<MainContextProps> {
  currentPoint: number
  isDragging: boolean
  deleteLayerPoint: any
  newPoint: PointType
  points: any
  properties: Record<string, string | number>
  remove: boolean
  setIsDragging(val: boolean): void
  setNewPoint(val: PointType): void
  setCurrentPoint(index: number): void
}
