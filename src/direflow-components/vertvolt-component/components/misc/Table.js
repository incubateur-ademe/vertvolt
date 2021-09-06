import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  margin-top: ${(props) => (props.first ? '1.6rem' : 0)};
  margin-bottom: 2.4rem;
  border: 0.1rem solid ${(props) => props.theme.colors.main};
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.background};
  overflow: hidden;
`
const TableElement = styled.table`
  width: 100%;
  border-collapse: collapse;
`
function Table(props) {
  return (
    <Wrapper first={props.first}>
      <TableElement>
        <tbody>{props.children}</tbody>
      </TableElement>
    </Wrapper>
  )
}

Table.Header = styled.tr`
  color: ${(props) => props.theme.colors[props.current ? 'second' : 'main']};
  cursor: ${(props) => (props.current ? 'normal' : 'pointer')};
  transition: background-color 200ms ease-out;

  &:hover {
    background-color: ${(props) =>
      props.theme.colors[props.current ? 'background' : 'mainLight']};
  }
  th {
    padding: 0.6rem 1.2rem;
  }
`
Table.Technologie = styled.tr`
  &:nth-child(2n) {
    background-color: ${(props) => props.theme.colors.mainLight};
  }
  td {
    padding: 0.6rem 1.2rem;
  }
`
Table.Total = styled.th`
  text-align: right;
  white-space: nowrap;
`
Table.Value = styled.td`
  text-align: right;
  white-space: nowrap;
`

export default Table
