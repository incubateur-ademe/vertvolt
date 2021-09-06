import React, { useContext } from 'react'
import styled from 'styled-components'

import SearchContext from '../../../../utils/SearchContext'

const Wrapper = styled.select`
  flex: 1;
  margin: 0 0.8rem;

  ${(props) => props.theme.mq.small} {
    flex: auto;
    width: 100%;
  }
`
export default function Label() {
  const { label, setLabel } = useContext(SearchContext)

  return (
    <Wrapper
      name='label'
      value={label}
      onChange={(e) => {
        setLabel(e.target.value)
      }}
    >
      <option value={''}>Label</option>
      <option value='Niveau très engagé sans ARENH'>
        Offre très engagée sans nucléaire
      </option>
      <option value='Niveau très engagé'>Offre très engagée</option>
      <option value='Niveau engagé sans ARENH'>
        Offre engagée sans nucléaire
      </option>
      <option value='Niveau engagé'>Offre engagée</option>
    </Wrapper>
  )
}
