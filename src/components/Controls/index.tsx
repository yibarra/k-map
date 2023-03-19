import { useContext } from 'react'
import { DataContext } from '../../providers/DataProvider'

import { MainContext } from '../../providers/MainProvider'
import { PositionContext } from '../../providers/PositionProvider'
import ControlsLayers from './ControlsLayers'
import * as S from './styles'

const Controls = () => {
  const {
    curve,
    enable,
    remove,
  } = useContext(MainContext)

  const { layers, updateData } = useContext(DataContext)
  const { positions } = useContext(PositionContext)

  return (
    <S.ControlsDiv>
      <p style={{ display: 'inline-block' }}><small>{curve ? 'AC' : 'RC'}</small></p> -
      <p style={{ display: 'inline-block' }}><small>{enable ? 'E' : 'D'}</small></p> -
      <p style={{ display: 'inline-block' }}><small>{remove ? 'R' : 'RD'}</small></p>

      <button onClick={() => updateData({ layers, positions })}>
        Save local storage
      </button>

      <ControlsLayers />
    </S.ControlsDiv>
  )
}

export default Controls
