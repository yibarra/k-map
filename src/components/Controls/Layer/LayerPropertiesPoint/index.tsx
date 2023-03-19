import { useCallback } from 'react'

import SelectorColor from '../../../SelectorColor'
import SelectorDash from '../../../SelectorDash'
import SelectorLineType from '../../../SelectorLineType'
import SelectorSize from '../../../SelectorSize'

import * as S from './styles'

const LayerPropertiesPoint = ({ index, pointsProperties, updateLayerProperties }: any) => {
  // change value
  const change = useCallback((prop: string, value: unknown) => {
    updateLayerProperties(prop, value, 'pointsProperties')
  }, [updateLayerProperties])

  // render
  return (
    <S.LayerPropertiesPointDiv>
      <SelectorSize
        fill={pointsProperties.strokeWidth}
        onChangeValue={(e: string) => change('strokeWidth', e)}
        value={pointsProperties.strokeWidth}
        variant="block"
      />

      fill
      <SelectorColor
        color={pointsProperties.fill}
        key="fill"
        radius
        setColor={(e: string) => change('fill', e)}
        variation="border"
      />

      stroke
      <SelectorColor
        color={pointsProperties.stroke}
        key="stroke"
        radius
        setColor={(e: string) => change('stroke', e)}
        variation="border"
      />

      active
      <SelectorColor
        color={pointsProperties.active}
        key="active"
        radius
        setColor={(e: string) => change('active', e)}
        variation="border"
      />

      <SelectorDash
        index={index}
        properties={pointsProperties}
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
        key="strokeWidth"
        fill={pointsProperties.fill}
        onChangeValue={(e: string) => change('strokeWidth', e)}
        value={pointsProperties.strokeWidth}
        variant="border"
      />

      <SelectorSize
        key="radius"
        fill={pointsProperties.stroke}
        onChangeValue={(e: string) => change('radius', e)}
        value={pointsProperties.radius}
        variant="block"
      />
    </S.LayerPropertiesPointDiv>
  );
};

export default LayerPropertiesPoint
