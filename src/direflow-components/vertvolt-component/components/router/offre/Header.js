import React from 'react'
import styled from 'styled-components'

import Fournisseur from '../../misc/Fournisseur'
import Card from '../../misc/Card'
import Label from '../../misc/Label'
import Logo from '../../misc/Logo'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4rem;

  ${(props) => props.theme.mq.small} {
    flex-direction: column;
  }
`
const Title = styled.h2`
  margin-bottom: 1rem;
  font-size: 3rem;
`
const Description = styled.p`
  margin-bottom: 2.4rem;
  font-size: 1.6rem;

  span {
    color: ${(props) => props.theme.colors.main};
  }
`
export default function Header(props) {
  return (
    <Wrapper>
      <Card.Column>
        <Label label={props.offre.niveau_labelisation} />
        <Title>{props.offre.nom_offre}</Title>
        <Description>
          Electricité 100 % verte - <span>{props.offre.statut_offre}</span>
        </Description>
        <Fournisseur offre={props.offre} />
      </Card.Column>
      <Card.Column right>
        <Logo label={props.offre.niveau_labelisation} />
      </Card.Column>
    </Wrapper>
  )
}
