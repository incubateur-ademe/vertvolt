import React from 'react'
import styled from 'styled-components'

import TresEngageSansRaeh from './logo/TresEngageSansRaeh.js'
import TresEngage from './logo/TresEngage.js'
import EngageSansRaeh from './logo/EngageSansRaeh.js'
import Engage from './logo/Engage.js'

const Wrapper = styled.svg`
  width: ${(props) => (props.small ? 15 : 23)}rem;
  height: auto;
  ${(props) => props.theme.mq.small} {
    display: none;
  }
`
export default function Logo(props) {
  return (
    <Wrapper
      width='596'
      height='596'
      viewBox='0 0 596 596'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      small={props.small}
      label={props.label}
    >
      {props.label === 'Niveau très engagé sans ARENH' ? (
        <TresEngageSansRaeh small={props.small} label={props.label} />
      ) : props.label === 'Niveau très engagé' ? (
        <TresEngage small={props.small} label={props.label} />
      ) : props.label === 'Niveau engagé sans ARENH' ? (
        <EngageSansRaeh small={props.small} label={props.label} />
      ) : (
        <Engage small={props.small} label={props.label} />
      )}
    </Wrapper>
  )
}
