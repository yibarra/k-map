import React from 'react'
import ReactDOM from 'react-dom/client'

import Main from './layout/Main'

import ColorProvider from './providers/ColorProvider'
import CurvesProvider from './providers/CurvesProvider'
import DataProvider from './providers/DataProvider'
import GridProvider from './providers/GridProvider'
import { LayerProvider } from './providers/LayerProvider'
import MainProvider from './providers/MainProvider'
import { PointProvider } from './providers/PointProvider'
import PositionProvider from './providers/PositionProvider'

import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MainProvider>
      <DataProvider>
        <GridProvider>
          <ColorProvider>
            <PositionProvider>
              <LayerProvider>
                <CurvesProvider>
                  <PointProvider>
                    <Main />
                  </PointProvider>
                </CurvesProvider>
              </LayerProvider>
            </PositionProvider>
          </ColorProvider>
        </GridProvider>
      </DataProvider>
    </MainProvider>
  </React.StrictMode>,
)
