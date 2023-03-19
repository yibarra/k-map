import styled from 'styled-components'

export const MainSection = styled.div<any>`
  background-color: rgba(245, 245, 245, 1);
  height: 100vh;
  position: relative;
  width: 100vw;
  vertical-align: top;

  .stage,
  .konvajs-content {
    left: 0;
    position: absolute;
    tabindex: 0;
    top: 0;
  }
`