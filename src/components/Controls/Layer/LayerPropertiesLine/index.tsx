import { useCallback } from 'react'

import SelectorColor from '../../../SelectorColor'
import SelectorDash from '../../../SelectorDash'
import SelectorLineType from '../../../SelectorLineType'
import SelectorSize from '../../../SelectorSize'

import * as S from './styles'

const LayerPropertiesLine = ({ index, lineProperties, updateLayerProperties }: any) => {
  // change
  const change = useCallback((prop: string, value: unknown) => {
    updateLayerProperties(prop, value, 'lineProperties')
  }, [updateLayerProperties])


  return (
    <S.LayerPropertiesLineDiv>
      <SelectorColor
        color={lineProperties.stroke}
        setColor={(e: string) => change('stroke', e)}
        variation="line" />

      <SelectorDash
        index={index}
        properties={lineProperties}
        onChangeValue={(e: number[]) => change('dash', e)}
      />

      <SelectorLineType
        onChangeValue={(e: string) => change('lineJoin', e)}
        items={[{ name: 'miter' }, { name: 'round'}, { name: 'bevel' }]}
        variant="join"
      />

      <SelectorLineType
        onChangeValue={(e: string) => change('lineCap', e)}
        items={[{ name: 'butt' }, { name: 'round'}, { name: 'square' }]}
      />

      <SelectorSize
        strokeColor={lineProperties.stroke}
        onChangeValue={(e: string) => change('strokeWidth', e)}
        value={lineProperties.strokeWidth}
      />
    </S.LayerPropertiesLineDiv>
  )
}

export default LayerPropertiesLine
