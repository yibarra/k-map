import type { ReactNode } from 'react'
import type { Context } from 'konva/lib/Context'

export type AxisType = [number, number, number, number, number] // x, y, size, x original, y original

export interface GridContextProps {
  createGridBoxes(ctx: Context, width: number, height: number): void
  getCell(x: number, y: number): AxisType | void
  sizeBox: number
  fixPositionCenter(value: number, sizeAxis: number, axis: number, sizeBox: number): number
  setSizeBox(val: number): void
}

export interface GridProviderProps {
  children: ReactNode
}