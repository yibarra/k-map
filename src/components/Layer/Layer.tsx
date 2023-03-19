import React, { useCallback, useState } from 'react'
import { Group } from 'react-konva'

import type { LayerProps } from './interfaces'
import type { PointBase, PointType } from '../Point/interfaces'
import LayerLine from './LayerLine'
import Curve from '../Line/Curve'
import LayerPoints from './LayerPoints'

// layer
const Layer: React.FC<LayerProps> = ({
  getAnchorPoint,
  active,
  getCell,
  convertPoints,
  index,
  isDragging = false,
  layer,
  remove = false,
  setIsDragging,
  updateLayer,
}) => {
  const {
    curves,
    currentPoint,
    id,
    lineProperties,
    points,
    pointsProperties,
    pointsPositions,
  } = layer

  const [newPoint, setNewPoint] = useState<PointType>({ x: 0, y: 0 })

  // update points line
  const factoryPoints = useCallback((
    type?: string
  ): number[][] => {
    if (!Array.isArray(points)) {
      return []
    }

    return Object.values(
      points.map(
        (item: PointType, index: number) =>
          index === currentPoint && type === 'ref'
            ? [ newPoint.x, newPoint.y ]
            : [ item.x, item.y ]
      )
    )
  }, [points])

  // get point
  const getPoint = useCallback((index: number) => {
    if (Array.isArray(points)) {
      const indexPoint = pointsPositions[index]
      const point = points[indexPoint]

      return getCell(point.x, point.y)
    }
  }, [points, pointsPositions])

  // update current point
  const updateCurrentPoint = useCallback((index: number) => {
    updateLayer(id, 'currentPoint', index)
  }, [id, updateLayer])

  // update curve point anchor
  const updateCurve = useCallback((index: number, curve: number[]) => {
    const updateCurves = curves
    
    updateCurves.map((item: any, key: number) => {
      if (key === index) {
        item.curve = curve
      }

      return curve
    })

    updateLayer(id, 'curves', updateCurves)
  }, [curves, id, updateLayer])

  // update set position 
  const updatePointPosition = useCallback((val: PointBase) => {
    const [xP, yP] = val
    const current = pointsPositions.find((v: number) => v === currentPoint)

    const updatePosition = points
    updatePosition[current] = { x: xP, y: yP }

    updateLayer(id, 'points', updatePosition)
  }, [currentPoint, pointsPositions, updateLayer])

  // render
  return (
    <Group zIndex={index}>
      {Array.isArray(points) && 
        <>
          {Array.isArray(curves) && curves.map((curve: any, index: number) => (
            <Curve
              active={true}
              currentPoint={currentPoint}
              curve={curve}
              layerId={id}
              index={index}
              isDragging={isDragging}
              getCell={getCell}
              getPoint={getPoint}
              key={index}
              newPoint={newPoint}
              properties={lineProperties}
              setIsDragging={setIsDragging}
              updateCurve={updateCurve}
            />
          ))}

          <LayerLine
            active={active}
            curves={curves}
            currentPoint={currentPoint}
            convertPoints={convertPoints}
            getCell={getCell}
            isDragging={isDragging}
            newPoint={newPoint}
            points={factoryPoints()}
            properties={lineProperties}
          />

          <LayerPoints
            active={true}
            currentPoint={currentPoint}
            getCell={getCell}
            isDragging={isDragging}
            points={points}
            properties={pointsProperties}
            remove={remove}
            setCurrentPoint={updateCurrentPoint}
            setIsDragging={setIsDragging}
            updatePointPosition={updatePointPosition}
          />
        </>
      }
    </Group>
  )
}

export default Layer