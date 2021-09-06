import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Summary = styled.div`
  font-size: 1.4rem;
`
const Pages = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Page = styled.button`
  padding: none;
  border: none;
  background: none;
`
const Next = styled.button`
  margin-left: 1rem;
  padding: 1rem;
  background: none;
  border: 0.1rem solid ${(props) => props.theme.colors.main};
  border-radius: 50%;

  svg {
    display: block;
  }
`
export default function Pagination(props) {
  return Math.ceil(props.results.length / props.offresPerPage) > 1 ? (
    <Wrapper>
      <Summary>
        Résultats {props.currentPage * props.offresPerPage}-
        {props.currentPage * props.offresPerPage + props.offresPerPage} sur{' '}
        {props.results.length}
      </Summary>
      <Pages>
        {[...Array(Math.ceil(props.results.length / props.offresPerPage))].map(
          (_, index) => (
            <Page onClick={() => props.setCurrentPage(index)}>{index + 1}</Page>
          )
        )}
        <Next
          onClick={() =>
            props.setCurrentPage((prevCurrentPage) => prevCurrentPage + 1)
          }
          disabled={
            props.currentPage ===
            Math.floor(props.results.length / props.offresPerPage)
          }
        >
          <svg width='16' height='16' viewBox='0 0 16 16'>
            <path
              d='M12.5602 7.99998C12.5602 8.28673 12.4507 8.57345 12.2322 8.79207L5.35249 15.6717C4.91486 16.1093 4.20531 16.1093 3.76785 15.6717C3.33039 15.2343 3.33039 14.5248 3.76785 14.0872L9.8554 7.99998L3.76806 1.91275C3.33061 1.47512 3.33061 0.765782 3.76806 0.32836C4.20552 -0.109488 4.91507 -0.109488 5.35271 0.32836L12.2324 7.20789C12.451 7.42662 12.5602 7.71334 12.5602 7.99998Z'
              fill='#004899'
            />
          </svg>
        </Next>
      </Pages>
    </Wrapper>
  ) : null
}
