import { useContext } from 'react'
import uniqid from 'uniqid'

import { DataContext } from '../../../providers/DataProvider'
import { LayerContext } from '../../../providers/LayerProvider'
import Layer from '../Layer'

import * as S from './styles'

// controls layers
const ControlsLayers = () => {
  const { layers } = useContext(DataContext)
  const { createLayer } = useContext(LayerContext)
  
  // render
  return (
    <div>
      controles layers
      <button onClick={() => createLayer(uniqid())}>create layer</button>

      <S.ControlsLayerContainerDiv>
        {layers.map((layer: any, i: number) => 
          <Layer {...layer} key={i} />
        )}
      </S.ControlsLayerContainerDiv>
    </div>
  )
}

export default ControlsLayers
