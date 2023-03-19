import { createContext, useCallback } from 'react'

import type {
  CurvePointType,
  CurvesContextProps,
  CurvesProviderProps,
  CurveType,
} from './interfaces'

const CurvesContext = createContext({} as CurvesContextProps)

const CurvesProvider = ({ children }: CurvesProviderProps) => {
  // find point curve
  const findPointCurve = useCallback(
    (curves: CurveType[], index: number): CurvePointType => {
      let translate = false
      let pointInitial = false

      const element: CurveType[] = curves.filter((item: CurveType) => {
        if (item.pointEnd === index || item.pointInit === index) {
          if (item.pointInit === index) {
            translate = true
          }

          if (item.pointEnd === index) {
            pointInitial = true
          }

          return true
        }

        return false
      })

      return {
        element: element[0],
        pointInitial,
        translate
      }
    },
    []
  )

  // return
  return (
    <CurvesContext.Provider
      value={{
        findPointCurve,
      }}
    >
      {children}
    </CurvesContext.Provider>
  )
}

export { CurvesContext, CurvesProvider }
export default CurvesProvider