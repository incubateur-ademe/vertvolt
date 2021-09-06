import React from 'react'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'

const Wrapper = styled.span`
  color: ${(props) => props.theme.colors.main};
  cursor: pointer;
`
const Sup = styled.sup`
  font-size: 0.8em;
  line-height: 0;
`
export default function Tooltip(props) {
  return (
    <>
      <Wrapper data-tip={props.tip} data-html={true}>
        {props.children} {!props.noSup && <Sup>(?)</Sup>}
      </Wrapper>
      <ReactTooltip />
    </>
  )
}
