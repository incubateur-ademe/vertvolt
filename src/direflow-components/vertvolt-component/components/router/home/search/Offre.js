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
  background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Calque_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 64 64' style='enable-background:new 0 0 64 64;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:none;stroke:%23666666;stroke-width:1.5132;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;%7D%0A%3C/style%3E%3Cpath class='st0' d='M36.6,36.9l8.9,8.9'/%3E%3Ccircle class='st0' cx='29.6' cy='29.9' r='9.8'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right;
  border: 0.1rem solid ${(props) => props.theme.colors.input};
  border-radius: 0.5rem;

  ${(props) => props.theme.mq.small} {
    flex: auto;
    width: 100%;
    margin-bottom: 1.6rem;
  }
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
