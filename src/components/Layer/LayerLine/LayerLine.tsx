import { Context } from 'konva/lib/Context'
import { Shape as ShapeType } from 'konva/lib/Shape'
import { useCallback } from 'react'
import { Shape } from 'react-konva'

import Line from '../../Line'
import type { PointType } from '../../Point/interfaces'
import type { LayerLineProps } from './interfaces'

// layer line
const LayerLine = ({
  active,
  curves,
  currentPoint,
  convertPoints,
  isDragging,
  points,
  properties,
  newPoint,
  ...props
}: any) => {
  // render
  return (
    <>
      <Line
        {...props}
        active={active}
        curves={curves}
        convertPoints={convertPoints}
        isDragging={isDragging}
        points={points}
        properties={{
          ...properties,
          opacity: isDragging || active ? 1 : 1,
          shadowColor: "#2f5ada"
        }}
      />
    </>
  )
}

export default LayerLine
