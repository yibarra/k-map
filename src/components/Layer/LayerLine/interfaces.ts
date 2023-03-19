import type { PointTypePosition } from '../../Point/interfaces'

export interface LayerLineProps {
  currentPoint?: number
  active?: boolean
  curves: any
  isDragging?: boolean
  newPoint: PointTypePosition
  points: number[][]
  getCell: any
  properties: Record<string, string | number>
  convertPoints?: any
}
