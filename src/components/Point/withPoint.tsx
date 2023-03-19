import React, { useCallback } from 'react'
import UseWindowSize from '../../hooks/useWindowSize'

import type { WithPointProps } from './interfaces'

// with point
export function WithPoint<T extends WithPointProps>(
  Component: React.ComponentType<T>
) {
  const displayName = Component.displayName ?? Component.name

  // point
  const Point = (props: WithPointProps) => {
    const {
      index,
      isDragging,
      setCurrentPoint,
      setIsDragging,
    } = props
    
    const { height, width } = UseWindowSize()

    // set click point
    const setClickPoint = useCallback(
      () => setCurrentPoint(index), [index, setCurrentPoint]
    )

    // render
    return (
      <Component
        {...(props as T)}
        height={height}
        isDragging={isDragging}
        setClickPoint={setClickPoint}
        setIsDragging={setIsDragging}
        width={width}
      />
    )
  }

  Point.displayName = `withPoint(${displayName})`

  return Point
}
