import { useCallback } from 'react'
import { Circle, Group, Shape } from 'react-konva'
import type { Context } from 'konva/lib/Context'
import type { KonvaEventObject } from 'konva/lib/Node'
import type { Shape as ShapeType } from 'konva/lib/Shape'

const SIZE_ITEM = 12

const CurveAnchorPoint = ({
  getPoint,
  getCell,
  index,
  isAnchor,
  isDragging,
  pointEnd,
  pointInit,
  setIsAnchor,
  setIsDragging,
  setXY,
  updateCurve,
  x,
  y,
}: any) => {
  const pointAnchor = !isDragging && !isAnchor ? getCell(x, y) : [x, y]

  const pointCurveInit = getPoint(pointInit)
  const pointCurveEnd = getPoint(pointEnd)

  // on drag start point
  const onDragStartPoint = useCallback((event: KonvaEventObject<DragEvent>) => {
    event.cancelBubble = true

    setIsDragging(() => {
      setIsAnchor(true)

      return true
    })
  }, [ setIsAnchor, setIsDragging])

  // on grad point
  const onDragMovePoint = useCallback((event: KonvaEventObject<DragEvent>) => {
    event.cancelBubble = true

    const { evt: { clientX, clientY }} = event
    setXY({ x: clientX, y: clientY })
  }, [setXY])

  // on drag end point
  const onDragEndPoint = useCallback((event: KonvaEventObject<DragEvent>) => {
    event.cancelBubble = true

    const { evt: { clientX, clientY } } = event

    setIsDragging(() => {
      setIsAnchor(false)
      updateCurve(index, [clientX, clientY])

      return false
    })
  }, [index, setIsAnchor, setIsDragging, updateCurve])

  // create lines guide
  const createLayerLines = useCallback((context: Context, shape: ShapeType) => {
    context.beginPath()

    context.moveTo(pointCurveInit[0], pointCurveInit[1])
    context.lineTo(pointAnchor[0], pointAnchor[1])
    context.lineTo(pointCurveEnd[0], pointCurveEnd[1])
    context.fillStrokeShape(shape)
  }, [pointCurveInit, pointCurveEnd])

  // render
  return (
    <Group>
      <Shape
        sceneFunc={createLayerLines}
        listening={false}
        lineJoin="bevel"
        stroke="purple"
        strokeWidth={2}
      />

      <Circle
        draggable
        height={SIZE_ITEM}
        fill="red"
        onDragEnd={onDragEndPoint}
        onDragMove={onDragMovePoint}
        onDragStart={onDragStartPoint}
        x={pointAnchor[0]}
        y={pointAnchor[1]}
        width={SIZE_ITEM}
      />
    </Group>
  )
}

export default CurveAnchorPoint
