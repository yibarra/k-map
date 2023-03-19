import type { PointType } from '../../components/Point/interfaces'

// get point by position
export const getPointByPosition = (
  points: PointType[],
  position: number
): PointType => {
  return points.filter((_, i: number) => i === position)[0]
}

// get curve exist
export const getCurveExist = (curves: any[], pointInit: number, pointEnd: number): boolean => {
  if (!Array.isArray(curves) || !curves.length) {
    return false
  }

  return curves.filter(
    (curve: any) => {
      return (
        (curve.pointEnd === pointEnd && curve.pointInit === pointInit) ||
        (curve.pointEnd === pointInit && curve.pointInit === pointEnd)
      )
    }).length > 0
}

// get point exist in curve
export const getPointExistInCurve = (curves: any[], position: number): boolean | any[] => {
  if (!Array.isArray(curves) || !curves.length) {
    return false
  }

  const pointCurve = curves.filter(
    (curve: any) => curve.pointInit === position || curve.pointEnd === position
  )

  return pointCurve
}

// order points
export const orderPoints = (points: PointType[], index: number) => {
  if (!points) {
    return []
  }

  const pointsOrder = []

  return pointsOrder
}