import { CurvesContextProps } from '../../providers/CurvesProvider/interfaces'
import type { GridContextProps } from '../../providers/GridProvider/interfaces'
import type { MainContextProps } from '../../providers/MainProvider/interfaces'

export interface LayerProps
  extends
    Partial<GridContextProps>,
    Partial<CurvesContextProps>,
    Partial<MainContextProps> {
  active?: boolean
  index: number
  layer: any
  getCell: any
  setIsDragging(val: boolean): void
  updateLayer: any
  convertPoints?: any
  getAnchorPoint?: any
}
