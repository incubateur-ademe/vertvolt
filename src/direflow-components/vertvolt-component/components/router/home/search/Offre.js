import React, { useContext } from 'react'
import styled from 'styled-components'

import SearchContext from '../../../../utils/SearchContext'

const Wrapper = styled.input`
  flex: 2;
  margin: 0 0.8rem;
  padding: 1rem 3.6rem 1rem 1rem;
  height: 3.6rem;
  font-size: 1.2rem;
  line-height: 1.5;
  background-color: ${(props) => props.theme.colors.input};
  border: 0.1rem solid ${(props) => props.theme.colors.input};
  border-radius: 0.5rem;
`
export default function Offre() {
  const { search, setSearch } = useContext(SearchContext)
  return (
    <Wrapper
      name='offre'
      type='text'
      placeholder='Recherchez une offre...'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  )
}
