import React, { useCallback, useEffect, useRef } from 'react'
import { Line as LineKonva } from 'react-konva'
import type { Context } from 'konva/lib/Context'
import type { Shape } from 'konva/lib/Shape'

import type { LineProps } from './interfaces'

// line
const Line: React.FC<LineProps> = ({
  active = false,
  convertPoints,
  curves,
  isDragging = false,
  points,
  properties,
}) => {
  const elementLayerRef = useRef<any>(null)

  // draw line
  const drawLine = (context: Context, shape: Shape) => {
    const lines = convertPoints(curves, points)

    context.beginPath()

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line) {
        const [ x, y, move ] = line

        if (move) {
          context.moveTo(x, y)
        } else {
          context.lineTo(x, y)
        }
      }
    }
    
    context.fillStrokeShape(shape)
  }

  // use effect
  useEffect(() => {
    if (typeof elementLayerRef.current.to !== 'undefined') {
      elementLayerRef.current.to({ ...properties })
    }
  }, [active, isDragging, properties])

  // render
  return (
    <LineKonva
      {...properties}
      listening={false}
      ref={elementLayerRef}
      sceneFunc={drawLine}
    />
  )
}

export default Line
