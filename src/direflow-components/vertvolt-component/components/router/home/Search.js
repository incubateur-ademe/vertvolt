import React from 'react'
import styled from 'styled-components'

import Offre from './search/Offre'
import Fournisseur from './search/Fournisseur'
import Label from './search/Label'

const Wrapper = styled.nav`
  display: flex;
  margin: 0 -0.8rem 4rem;

  ${(props) => props.theme.mq.small} {
    flex-wrap: wrap;
  }
`
export default function Search() {
  return (
    <Wrapper>
      <Offre />
      <Fournisseur />
      <Label />
    </Wrapper>
  )
}
