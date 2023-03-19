import type { PropsWithChildren } from 'react'

export interface ColorContextProps {
  hslToHex(h: number, s: number, l: number): string
  getRandomPastelColor(): string
}

export interface ColorProviderProps extends PropsWithChildren {
  any?: any
}