import React from 'react'

import Card from '../../misc/Card'

export default function Details(props) {
  return (
    <Card>
      <Card.Title>Informations complémentaires</Card.Title>
      <Card.Table>
        <Card.Label>Taux moyen de couverture demi-horaire</Card.Label>
        <Card.Number>
          {props.offre.couverture_demi_horaire_offre * 100} %{' '}
        </Card.Number>
      </Card.Table>
      <Card.Table>
        <Card.Label>
          Part des clients de l'offre ayant activé le suivi de consommation
        </Card.Label>
        <Card.Number>
          {props.offre.part_suivi_consommation_offre * 100} %{' '}
        </Card.Number>
      </Card.Table>
    </Card>
  )
}
