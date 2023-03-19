import { useCallback, useState } from 'react'
import { Group, Shape } from 'react-konva'
import type { Context } from 'konva/lib/Context'
import type { Shape as ShapeType } from 'konva/lib/Shape'

import CurveAnchorPoint from '../CurveAnchorPoint'

// line curve
const Curve = ({
  active,
  curve,
  isDragging,
  index,
  getCell,
  getPoint,
  newPoint,
  properties,
  setIsDragging,
  updateCurve,
}: any) => {
  const [x, y] = curve.curve

  const [isAnchor, setIsAnchor] = useState<boolean>(false)
  const [xy, setXY] = useState<{ x: number, y: number }>({ x, y })

  const { pointInit, pointEnd } = curve

  const pointCurveInit = getPoint(pointInit)
  const pointCurveEnd = getPoint(pointEnd)

  // draw curve
  const drawItemCurve = useCallback(
    (context: Context, point: number[], curve: number[]) => {
      context.moveTo(point[0], point[1])

      context.quadraticCurveTo(xy.x, xy.y, curve[0], curve[1])
    },
    [isDragging, isAnchor, xy]
  )

  // draw curves
  const drawCurves = (context: Context, shape: ShapeType) => {
    context.beginPath()

    drawItemCurve(context, pointCurveInit, pointCurveEnd)
    context.fillStrokeShape(shape)
  }

  // render
  return (
    <Group zIndex={index}>
      {active && (
        <CurveAnchorPoint
          {...curve}
          {...xy}
          isDragging={isDragging && isAnchor}
          index={index}
          getCell={getCell}
          getPoint={getPoint} 
          newPoint={newPoint}
          setIsAnchor={setIsAnchor}
          setIsDragging={setIsDragging}
          setXY={setXY}
          updateCurve={updateCurve}
        />
      )}

      <Shape {...properties} sceneFunc={drawCurves} />
    </Group>
  )
}

export default Curve