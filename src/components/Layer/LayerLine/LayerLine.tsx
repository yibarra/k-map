import React, { useCallback } from 'react'

import Line from '../../Line'
import type { PointTypePosition } from '../../Point/interfaces'
import type { LayerLineProps } from './interfaces'

// layer line
const LayerLine: React.FC<LayerLineProps> = ({
  active,
  curves,
  currentPoint,
  convertPoints,
  isDragging,
  points,
  properties,
  newPoint,
  ...props
}) => {
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

      {/*
      <Line
        {...props}
        active={active}
        isDragging={isDragging}
        points={pointUpdate(points, 'ref')}
        properties={{
          ...properties,
          opacity: isDragging && active ? 1 : 0,
          shadowColor: "#2f5ada",
        }}
      />
      */}
    </>
  )
}

export default LayerLine
