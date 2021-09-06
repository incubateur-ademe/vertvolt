import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  ${(props) => props.theme.mq.small} {
    display: none;
  }
`
export default function Logo(props) {
  return <Wrapper>{props.label}</Wrapper>
}
