import React, { useContext } from 'react'
import styled from 'styled-components'

import SearchContext from '../../../../utils/SearchContext'
import Card from '../../../misc/Card'
import Fournisseur from '../../../misc/Fournisseur'
import Label from '../../../misc/Label'
import Logo from '../../../misc/Logo'

const TitleLink = styled.a`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`
const Title = styled.h3`
  margin-bottom: 1rem;
  font-size: 2.4rem;
`
const Description = styled.p`
  margin-bottom: 1.6rem;
  font-size: 1.4rem;

  span {
    color: ${(props) => props.theme.colors.main};
  }
`
const Link = styled.a`
  ${(props) => props.theme.mq.small} {
    margin-top: 1.6rem;
  }
`
export default function Offre(props) {
  const { setCurrentOffre } = useContext(SearchContext)
  return (
    <Card list>
      <Card.Columns>
        <Card.Column>
          <Label label={props.offre.niveau_labelisation} />
          <TitleLink
            href={`/#${props.offre.nom_offre}`}
            onClick={(e) => {
              e.preventDefault()
              setCurrentOffre(props.offre.nom_offre)
            }}
          >
            <Title onClick={() => setCurrentOffre(props.offre.nom_offre)}>
              {props.offre.nom_offre}
            </Title>
          </TitleLink>
          <Description>
            Electricité 100 % verte - <span>{props.offre.statut_offre}</span>
          </Description>
          <Fournisseur offre={props.offre} small />
        </Card.Column>
        <Card.Column right list>
          <Logo label={props.offre.niveau_labelisation} small />
          <Link
            href={`/#${props.offre.nom_offre}`}
            onClick={(e) => {
              e.preventDefault()
              setCurrentOffre(props.offre.nom_offre)
            }}
          >
            En savoir plus
          </Link>
        </Card.Column>
      </Card.Columns>
    </Card>
  )
}
