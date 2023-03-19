import type { GridContextProps } from "../../providers/GridProvider/interfaces"

export type PointType = {
  x: number
  y: number
}

export type PointBase = number[]

export interface WithPointProps extends Partial<GridContextProps> {
  active?: boolean
  callback(point: PointType): void
  currentPoint?: number
  index: number
  isDragging?: boolean
  position: number
  properties: any
  setNewPoint(point: PointType): void
  setCurrentPoint(index: number): void
  setIsDragging(val: boolean): void
  setClickPoint(): void
  size: number
  updateLayerPoint(props: any, index: number): void
  x: number
  y: number
}


export interface PointProps {
  any?: any
}