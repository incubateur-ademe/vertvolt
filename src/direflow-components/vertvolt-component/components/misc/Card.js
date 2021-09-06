import styled from 'styled-components'

const Card = styled.div`
  margin-bottom: ${(props) => (props.list ? 2.4 : 4)}rem;
  padding: 1.6rem 1.6rem;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 0.2rem 0.7rem rgb(0 0 0 / 20%);
`
Card.Table = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 -1.6rem;
  padding: 1.6rem;
  border-top: 0.1rem solid ${(props) => props.theme.colors.mainLight};
  color: ${(props) => props.theme.colors[props.onClick ? 'main' : 'text']};

  cursor: ${(props) => (props.onClick ? 'pointer' : 'normal')};
  transition: background-color 200ms ease-out;

  &:first-of-type {
    border-top: none;
  }
  &:last-child {
    margin-bottom: -1.6rem;
  }

  &:hover {
    background-color: ${(props) =>
      props.theme.colors[props.onClick ? 'mainLight' : 'transparent']};
  }
`
Card.Label = styled.div`
  margin-right: 1.6rem;
`
Card.Number = styled.div`
  font-weight: bold;
  text-align: right;
  white-space: nowrap;
`
Card.Columns = styled.div`
  display: flex;
  justify-content: space-between;

  ${(props) => props.theme.mq.small} {
    flex-direction: column;
  }
`
Card.Column = styled.div`
  flex: ${(props) => (props.flex ? 'auto' : 1)};
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.list ? 'space-between' : 'flex-start')};
  align-items: ${(props) => (props.right ? 'flex-end' : 'flex-start')};
`
Card.Title = styled.h4`
  margin-bottom: 0.8rem;
  font-size: ${(props) => (props.large ? 1.6 : 1.4)}rem;
  color: ${(props) => props.theme.colors.second};
  text-transform: uppercase;
`

export default Card
