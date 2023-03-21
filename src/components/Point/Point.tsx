import { useCallback, useEffect, useRef } from 'react'
import { Circle, Group } from 'react-konva'
import type { KonvaEventObject } from 'konva/lib/Node'

import { WithPoint } from './withPoint'
import ToolTip from '../ToolTip'

// point
const Point = ({
  active,
  callbackMove,
  callback,
  getCell,
  isAnchor,
  isDragging,
  properties,
  setIsAnchor,
  setIsDragging,
  x,
  y,
}: any) => {
  const element = useRef<any>(null)
  const point = getCell(x, y)

  // on drag start point
  const onDragStartPoint = (event: KonvaEventObject<DragEvent>) => {
    event.cancelBubble = true

    setIsDragging(true)
  }

  // on grad point
  const onDragMovePoint = useCallback((event: KonvaEventObject<DragEvent>) => {
    event.cancelBubble = true

    const { evt: { clientX, clientY } } = event

    if (typeof callbackMove === 'function') {
      callbackMove({ x: clientX, y: clientY })
    }
  }, [callbackMove])

  // on drag end point
  const onDragEndPoint = useCallback((event: KonvaEventObject<DragEvent>) => {
    event.cancelBubble = true

    const { evt: { clientX, clientY } } = event
    
    const value = getCell(clientX, clientY)

    if (active && value && element.current) {
      const [posX, posY] = value

      element.current.to({
        x: posX,
        y: posY,
        duration: 0.4,
      })

      setIsDragging(() => {
        if (typeof callback === 'function') {
          callback([clientX, clientY])
        }

        return false
      })
    } else {
      element.current.to({ x, y, duration: 0.2 })
    }
  }, [callback, getCell, setIsDragging])

  // use effect
  useEffect(() => {
    if (element.current) {
      if (typeof element.current.to !== 'undefined') {
        element.current.to({ ...properties })
      }
    }
  }, [element, properties])

  // position
  const [xPoint, yPoint] = point

  // render
  return (
    <Group>
      {(active && isDragging) &&
        <ToolTip x={xPoint} y={yPoint - (50 + properties.radius)} />}

      <Circle
        {...properties}
        draggable={active}
        onDragStart={onDragStartPoint}
        onDragMove={onDragMovePoint}
        onDragEnd={onDragEndPoint}
        ref={element}
        stroke={active ? properties.active : properties.stroke }
        x={xPoint ?? x}
        y={yPoint ?? y}
      />
    </Group>
  )
}

export default WithPoint(Point)
