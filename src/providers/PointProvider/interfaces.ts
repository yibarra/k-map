import type { KonvaEventObject } from 'konva/lib/Node'
import type { PropsWithChildren } from 'react'

export interface PointContextProps {
  createPoint(event?: KonvaEventObject<MouseEvent>): void
  convertPoints?: any
  getAnchorPoint?: any
}

export interface PointProviderProps extends PropsWithChildren {
  any?: any
}