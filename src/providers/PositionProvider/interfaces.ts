import type { PropsWithChildren } from 'react'

export interface PositionContextProps {
  createPosition: any
  deletePosition: any
  positions: any
  updatePosition: any
}

export interface PositionProviderProps extends PropsWithChildren {
  any?: any
}