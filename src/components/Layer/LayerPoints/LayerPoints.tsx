import React, { useCallback } from 'react'
import { Shape } from 'react-konva'
import type { KonvaEventObject } from 'konva/lib/Node'

import Point from '../../Point'
import type { Context } from 'konva/lib/Context'
import type { Shape as ShapeType } from 'konva/lib/Shape'
import type { LayerPointsProps } from './interfaces'
import type { PointType } from '../../Point/interfaces'

// layer points
const LayerPoints = ({
  active,
  // createLayerCurve,
  currentPoint,
  curve,
  // deleteLayerPoint,
  getCell,
  isDragging,
  points,
  properties,
  remove,
  setCurrentPoint,
  setIsDragging,
  setNewPoint,
  updatePointPosition,
}: any) => {
  const point = points[currentPoint]

  // check adjacent point
  const checkAdjacentPoint = (point: any, position: number) => {
    console.info('adjacent point')
    return false
    /*
    if (point && (point.position - 1 === position || point.position + 1 === position)) {
      console.info(position, points)
      const pointEnd = points.filter((pointItem: PointTypePosition) => pointItem.position === position)[0]

      if (pointEnd && typeof createLayerCurve === 'function') {
        createLayerCurve(point, pointEnd)
      }
    } else {
      console.error(`[POINT NOT ADJACENT TO CREATE CURVE] ${position}`)
    }
    */
  }

  // draw points
  const drawPoints = useCallback((context: Context, shape: ShapeType) => {
    context.beginPath()

    for (const point of points) {
      const values = getCell(point.x, point.y)
        
      if (values) {
        const [x, y] = values

        if (active && isDragging) {
          if (currentPoint !== point.position) {
            shape.fill(properties.fill.toString())
            context.arc(x, y, 10, 0, 2 * Math.PI, false)
          }
        } else {
          shape.fill(properties.fill.toString())
          context.arc(x, y, 10, 0, 2 * Math.PI, false)
        }
      }
      
      context.closePath()
    }
    
    context.fillShape(shape)
  }, [getCell, points, properties])

  // on click
  const onClickPoint = (event: KonvaEventObject<MouseEvent>) => {
    const { evt: { clientX, clientY }} = event
    const values = getCell(clientX, clientY)

    if (values) {
      for (const [index, point] of points.entries()) {
        const valuesPoint = getCell(point.x, point.y)

        if (valuesPoint[0] === values[0] && valuesPoint[1] === values[1]) {
          if (remove) {
            // deleteLayerPoint(index)
          } else if (curve === true) {
            checkAdjacentPoint(points[currentPoint], point.position)
          } else {
            setCurrentPoint(index)
          }
        }
      }
    }
  }

  // render
  return (
    <>
      <Shape sceneFunc={drawPoints} onClick={onClickPoint} fill="red" />

      {!remove && active && <Point
        {...point}
        active={active}
        callback={updatePointPosition}
        getCell={getCell}
        isDragging={isDragging}
        properties={properties}
        setIsDragging={setIsDragging}
      />}
    </>
  )
}

export default LayerPoints
