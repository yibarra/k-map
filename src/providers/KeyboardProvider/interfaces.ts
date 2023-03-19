import type { PropsWithChildren } from 'react'

export interface KeyboardContextProps {
  onKeyDown(event: KeyboardEvent, callback: unknown): void
  onKeyUp(event: KeyboardEvent, callback: unknown): void
}

export interface KeyboardProviderProps extends PropsWithChildren {}