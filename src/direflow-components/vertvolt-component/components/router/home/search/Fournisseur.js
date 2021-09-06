import React, { useContext } from 'react'
import styled from 'styled-components'

import { useOffres } from '../../../../utils/api'
import SearchContext from '../../../../utils/SearchContext'

const Wrapper = styled.select`
  flex: 1;
  margin: 0 0.8rem;

  ${(props) => props.theme.mq.small} {
    flex: auto;
    width: 100%;
    margin-bottom: 1.6rem;
  }
`
export default function Fournisseur() {
  const { data } = useOffres()

  const { fournisseur: currentFournisseur, setFournisseur } =
    useContext(SearchContext)
  return data ? (
    <Wrapper
      name='fournisseur'
      value={currentFournisseur}
      onChange={(e) => {
        setFournisseur(e.target.value)
      }}
    >
      <option value=''>Fournisseur</option>
      {data
        .map((offre) => offre.nom_fournisseur)
        .reduce((acc, cur) => (acc.includes(cur) ? acc : [...acc, cur]), [])
        .map((fournisseur) => (
          <option value={fournisseur} key={fournisseur}>
            {fournisseur}
          </option>
        ))}
    </Wrapper>
  ) : null
}
