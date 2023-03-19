import { useCallback, useContext } from 'react'

import { LayerContext } from '../../../providers/LayerProvider'
import { PositionContext } from '../../../providers/PositionProvider'
import SelectorColor from '../../SelectorColor'
import SelectorDash from '../../SelectorDash'
import SelectorLineType from '../../SelectorLineType'
import SelectorSize from '../../SelectorSize'
import LayerPropertiesLine from './LayerPropertiesLine'
import LayerPropertiesPoint from './LayerPropertiesPoint'

import * as S from './styles'

const Layer = (props: any) => {
  console.info('layer', props.id)
  const { id, index, name, pointsProperties, lineProperties } = props
  const { deleteLayer, updateLayer, updateLayerPosition } = useContext(LayerContext)
  const { positions } = useContext(PositionContext)

  const pos = Number(positions?.indexOf(id))

  const updateLayerProperties = useCallback((prop: string, data: any, objName: string) => {
    const value: Record<string, unknown> = {}
    value[prop] = data

    updateLayer(id, `${objName}`, { ...props[objName], ...value })
  }, [id, props])

  return (
    <S.LayerDiv style={{ display: 'inline-flex', order: pos + 1 }}>
      <div>
        <p>{name}</p>
        <button
          onClick={() => updateLayerPosition(pos, pos - 1)}
        >up</button>

        <button
          onClick={() => updateLayerPosition(pos, pos + 1)}
        >down</button>

        <button onClick={() => updateLayer(id, 'name', 'cambiamos este e')}>change prop</button>
        <button onClick={() => deleteLayer(id)}>remove</button>
      </div>
      
      <S.LayerLineProperties style={{ width: '100%' }}>
        <S.LayerLabelP>line properties</S.LayerLabelP>

        <LayerPropertiesLine
          lineProperties={lineProperties}
          index={index}
          updateLayerProperties={updateLayerProperties}
        />
      </S.LayerLineProperties>

      <S.LayerLineProperties>
        <S.LayerLabelP>point properties</S.LayerLabelP>

        <LayerPropertiesPoint
          pointsProperties={pointsProperties}
          updateLayerProperties={updateLayerProperties}
        />
      </S.LayerLineProperties>
    </S.LayerDiv>
  )
}

export default Layer
