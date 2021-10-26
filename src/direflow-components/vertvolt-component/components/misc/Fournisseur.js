import React from 'react'
import styled from 'styled-components'

import Card from './Card'
import Tooltip from './Tooltip'

const Wrapper = styled.div`
  padding: 1.2rem 1.6rem;
  background-color: ${(props) => props.theme.colors.input};
  border-radius: 0.6rem;
`
const Content = styled.p`
  margin: 0;
  font-size: ${(props) => (props.small ? 1.2 : 1.4)}rem;
`
export default function Fournisseur(props) {
  return (
    <Wrapper>
      <Card.Title large={!props.small}>
        {props.offre.nom_fournisseur}
      </Card.Title>
      <Content small={props.small}>
        {props.offre.Recours_ARENH_fournisseur ? (
          <>
            Fait appel à l’
            <Tooltip
              tip={`Accès Régulé à l'Electricité Nucléaire Historique :<br/>permet aux fournisseurs d'acheter de l'électricité nucléaire dans des conditions fixées par les pouvoirs publics.`}
            >
              ARENH
            </Tooltip>
          </>
        ) : (
          <>
            Ne fait pas appel à l
            <Tooltip
              tip={`Accès Régulé à l'Electricité Nucléaire Historique :<br/>permet aux fournisseurs d'acheter de l'électricité nucléaire dans des conditions fixées par les pouvoirs publics.`}
            >
              ARENH
            </Tooltip>
          </>
        )}
        <br />
        {props.offre.clients_offre_labelisee ? (
          <>
            <Tooltip
              tip={`Pourcentage des clients du fournisseur ayant souscrit à une offre labellisée VertVolt.`}
              noSup
            >
              {props.offre.clients_offre_labelisee * 100} %
            </Tooltip>{' '}
            de ses clients ont souscrit à une{' '}
            <Tooltip
              tip={`Pourcentage des clients du fournisseur ayant souscrit à une offre labellisée VertVolt.`}
            >
              offre labelisée VertVolt
            </Tooltip>
          </>
        ) : (
          <>
            Pourcentage des clients du fournisseur ayant souscrit à une offre
            labellisée VertVolt non communiqué.
          </>
        )}
      </Content>
    </Wrapper>
  )
}
