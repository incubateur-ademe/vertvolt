import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.h5`
  margin: 0.3rem 0 1.5rem;
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.label[props.label]};
  text-transform: uppercase;
`
const Badge = styled.span`
  padding: 0.3rem 1rem;
  color: ${(props) => props.theme.colors.background};
  background-color: ${(props) => props.theme.colors.label[props.label]};
  border-radius: 0.3rem;
`
export default function label(props) {
  return (
    <Wrapper label={props.label}>
      <Badge label={props.label}>
        {props.label.includes('très') ? 'Très engagé' : 'Engagé'}
      </Badge>
    </Wrapper>
  )
}
