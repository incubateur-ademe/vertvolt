import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.small ? 12 : 23)}rem;
  height: ${(props) => (props.small ? 12 : 23)}rem;
  padding: 2.4rem;
  font-size: ${(props) => (props.small ? 1.2 : 2.4)}rem;
  font-weight: bold;
  text-align: center;
  color: ${(props) => props.theme.colors.background};
  background-color: ${(props) => props.theme.colors.label[props.label]};
  border-radius: ${(props) => (props.small ? 6 : 12)}rem 0
    ${(props) => (props.small ? 6 : 12)}rem 0;
  ${(props) => props.theme.mq.small} {
    display: none;
  }
`
export default function Logo(props) {
  return (
    <Wrapper small={props.small} label={props.label}>
      {props.label}
    </Wrapper>
  )
}
