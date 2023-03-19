import { useCallback } from 'react'
import SelectorDashItem from './SelectorDashItem'

import * as S from './styles'

// selector dash
const SelectorDash = ({ properties, onChangeValue }: any) => {
  // on change dash
  const onChangeDash = useCallback((value: number, type: string) => {
    const dash = (type === 'gap')
      ? [properties.dash[0], value]
      : [value, properties.dash[1]]

      onChangeValue(dash, properties)
  }, [ properties, onChangeValue ])

  // render
  return (
    <>
      {Array.isArray(properties.dash) &&
        <S.SelectorDashDiv>
          <SelectorDashItem
            max={10}
            min={0}
            onChangeDash={onChangeDash}
            value={properties.dash[0]}
          />

          <SelectorDashItem
            max={10}
            min={0}
            onChangeDash={onChangeDash}
            type="gap"
            value={properties.dash[1]}
          />
        </S.SelectorDashDiv>
      }
    </>
  )
}

export default SelectorDash
