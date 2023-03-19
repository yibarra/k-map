import { createContext, useCallback, useContext } from 'react'
import type { KonvaEventObject } from 'konva/lib/Node'

import { CurvesContext } from '../CurvesProvider'
import { GridContext } from '../GridProvider'
import type { CurvesContextProps, CurveType } from '../CurvesProvider/interfaces'
import type { GridContextProps } from '../GridProvider/interfaces'
import type { PointContextProps, PointProviderProps } from './interfaces'

const PointContext = createContext({} as PointContextProps)

// point provider
const PointProvider = ({ children }: PointProviderProps) => {
  const { getCell } = useContext<GridContextProps>(GridContext)
  const { findPointCurve } = useContext<CurvesContextProps>(CurvesContext)

  const createPoint = (event: KonvaEventObject<MouseEvent>) => {
    event.cancelBubble = true

    /*
    const position = Number(layers[current].currentPoint) + 1
    const values = getCell(event.evt.clientX, event.evt.clientY)
    
    if (values) {
      createLayerPoint(
        position,
        {
          x: values[0],
          y: values[1],
          position,
        }
      )
    }*/
  }

  // convert point
  const convertPoint = useCallback(
    (curves: CurveType[], point: number[], index: number): number[] | void => {
      const { element } = findPointCurve(curves, index)
      const cellPoint = getCell(point[0], point[1])

      if (cellPoint) {
        const [x, y] = cellPoint

        if (!element) {
          return [x, y]
        } else {
          if (element.pointInit === index && element.pointInit < element.pointEnd) {
            return [x, y, 0]
          } else {
            return [x, y, 1]
          }
        }
      }
    },
    [findPointCurve, getCell]
  )

  // convert points
  const convertPoints = useCallback(
    (curves: CurveType[], points: number[][]): number[][] => {
      const result: number[][] = []

      for (let index = 0; index < points.length; index++) {
        const item = points[index]
        const point = convertPoint(curves, [item[0], item[1]], index)

        if (point) {
          result.push(point)
        }
      }

      return result
    },
    [convertPoint]
  )

  // get anchor point
  const getAnchorPoint = useCallback(
    (init: number[], end: number[]): number[] | void => {
      const dx: number = Math.abs(init[0] - end[0])
      const dy: number = Math.abs(init[1] = end[1])

      return getCell(dx, dy)
    },
    []
  )
  
  // render
  return (
    <PointContext.Provider value={{
        createPoint,
        convertPoints,
        getAnchorPoint,
      }}
    >
      {children}
    </PointContext.Provider>
  )
}

export { PointContext, PointProvider }
export default PointProvider