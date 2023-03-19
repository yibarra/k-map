import type { PropsWithChildren } from 'react'

export type CurveType = {
  curve: number[]
  pointEnd: number
  pointInit: number
}

export type CurvePointType = {
  element: CurveType
  pointInitial?: boolean
  translate?: boolean
}

export interface CurvesContextProps {
  findPointCurve(curves: CurveType[], index: number): CurvePointType
}

export interface CurvesProviderProps extends PropsWithChildren {}