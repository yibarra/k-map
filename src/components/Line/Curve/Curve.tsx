import { useCallback, useState } from 'react'
import { Group, Shape } from 'react-konva'
import type { Context } from 'konva/lib/Context'
import type { Shape as ShapeType } from 'konva/lib/Shape'

import CurveAnchorPoint from '../CurveAnchorPoint'

// line curve
const Curve = ({
  active,
  curve,
  currentPoint,
  isDragging,
  index,
  getCell,
  getPoint,
  properties,
  setIsDragging,
  updateCurve,
  setXY,
  x,
  y,
}: any) => {
  const { curve: [xC, yC], pointInit, pointEnd } = curve

  const [isAnchor, setIsAnchor] = useState<boolean>(false)

  const pointCurveInit = getPoint(pointInit)
  const pointCurveEnd = getPoint(pointEnd)

  // draw curve
  const drawItemCurve = useCallback(
    (context: Context, point: number[], curve: number[]) => {
      context.moveTo(point[0], point[1])

      if (isDragging && isAnchor) {
        context.quadraticCurveTo(x, y, curve[0], curve[1])
      } else {
        context.quadraticCurveTo(xC, yC, curve[0], curve[1])
      }
    },
    [isDragging, isAnchor, xC, yC, x, y]
  )

  // draw curves
  const drawCurves = useCallback((context: Context, shape: ShapeType) => {
    context.beginPath()

    if (isDragging) {
      if (isAnchor) {
        drawItemCurve(context, pointCurveInit, pointCurveEnd)
      }

      if (currentPoint === pointInit) {
        console.info('POINT INIT', x, y)
        drawItemCurve(context, [x, y], pointCurveEnd)
      } else if (currentPoint === pointEnd) {
        console.info('POINT END')
        drawItemCurve(context, pointCurveInit, [x, y])
      } else {
        drawItemCurve(context, pointCurveInit, pointCurveEnd)
      }
    } else {
      drawItemCurve(context, pointCurveInit, pointCurveEnd)
    }

    context.fillStrokeShape(shape)
  }, [currentPoint, drawItemCurve, pointInit, pointEnd, x, y])

  // render
  return (
    <Group zIndex={index}>
      {active && (
        <CurveAnchorPoint
          {...curve}
          isDragging={isDragging && isAnchor}
          index={index}
          getCell={getCell}
          getPoint={getPoint}
          setIsAnchor={setIsAnchor}
          setIsDragging={setIsDragging}
          setXY={setXY}
          updateCurve={updateCurve}
          x={isDragging && isAnchor ? x : xC}
          y={isDragging && isAnchor ? y : yC}
        />
      )}

      <Shape {...properties} sceneFunc={drawCurves} />
    </Group>
  )
}

export default Curve