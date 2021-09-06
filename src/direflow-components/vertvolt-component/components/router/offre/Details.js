import React from 'react'

import Card from '../../misc/Card'
import Tooltip from '../../misc/Tooltip'

export default function Details(props) {
  return (
    <Card>
      <Card.Title>Informations complémentaires</Card.Title>
      <Card.Table>
        <Card.Label>
          <Tooltip
            tip={`Un fournisseur a aujourd'hui l'obligation d'assurer un équilibre mensuel entre l'achat d'électricité verte et la consommation des clients de l'offre.<br/>Cet indicateur mesure cet équilibre en temps réel.<br/>Pour une valeur de 60 %, cela signifie qu'à chaque instant l'électricité achetée par le fournisseur est composée en moyenne à 60 % d'électricité renouvelable, et toujours à 100 % en moyenne sur le mois.`}
          >
            Taux moyen de couverture demi-horaire
          </Tooltip>
        </Card.Label>
        <Card.Number>
          {props.offre.couverture_demi_horaire_offre * 100} %{' '}
        </Card.Number>
      </Card.Table>
      <Card.Table>
        <Card.Label>
          <Tooltip
            tip={`Le suivi de consommation est une option que tout client peut activer via son espace personnel sur le site de son fournisseur.<br/>Cette option permet de suivre l'évolution de sa consommation dans le temps à un pas de temps de 30 minutes.`}
          >
            Part des clients de l'offre ayant activé le suivi de consommation
          </Tooltip>
        </Card.Label>
        <Card.Number>
          {props.offre.part_suivi_consommation_offre * 100} %{' '}
        </Card.Number>
      </Card.Table>
    </Card>
  )
}
