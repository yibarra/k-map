
import { Stage as StageKonva, Layer as LayerKonva } from 'react-konva'

import type { GridContextProps } from '../../../providers/GridProvider/interfaces'
import type { KonvaEventObject } from 'konva/lib/Node'
import type { StageProps } from './interfaces'
import { useContext } from 'react'

import { LayerContext } from '../../../providers/LayerProvider'
import { GridContext } from '../../../providers/GridProvider'
import { CurvesContext } from '../../../providers/CurvesProvider'

import Grid from '../../../components/Grid'
import Layer from '../../../components/Layer'

import type { CurvesContextProps } from '../../../providers/CurvesProvider/interfaces'
import type  { LayerContextProps } from '../../../providers/LayerProvider/interfaces'
import { PointContextProps } from '../../../providers/PointProvider/interfaces'
import { PointContext } from '../../../providers/PointProvider'

// stage
const Stage = ({ size, setIsDragging, isDragging }: StageProps) => {
  const { createGridBoxes, getCell } = useContext<GridContextProps>(GridContext)
  const { current, layers, updateLayer } = useContext<LayerContextProps>(LayerContext)
  const { findPointCurve } = useContext<CurvesContextProps>(CurvesContext)
  const { getAnchorPoint, convertPoints } = useContext<PointContextProps>(PointContext)

  // create point layer active
  const createPoint = (event: KonvaEventObject<MouseEvent>) => {
    event.cancelBubble = true

    console.info('CREATE POINT')
  }

  console.info(layers)

  // render
  return (
    <StageKonva
      className="stage"
      tabIndex={0}
      height={size.height}
      onClick={createPoint}
      width={size.width}
    >
      <LayerKonva>
        <Grid createGridBoxes={createGridBoxes} {...size} />

        {Array.isArray(layers) && layers.map((layer: any, index: number) =>
          <Layer
            active={current === layer.id}
            getAnchorPoint={getAnchorPoint}
            getCell={getCell}
            isDragging={isDragging}
            convertPoints={convertPoints}
            index={index}
            layer={layer}
            key={index}
            setIsDragging={setIsDragging}
            updateLayer={updateLayer}
          />
        )}
      </LayerKonva>
    </StageKonva>
  )
}

export default Stage
