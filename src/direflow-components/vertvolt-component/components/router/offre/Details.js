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
            tip={`Un taux de 60 % par exemple signifie que l'électricité commercialisée dans le cadre de l’offre labellisée est à chaque instant à 60 % d’origine renouvelable en moyenne.<br/>Elle est toujours à 100 % en moyenne sur le mois.`}
          >
            Taux moyen de couverture demi-horaire
          </Tooltip>
        </Card.Label>
        <Card.Number>
          {props.offre.couverture_demi_horaire_offre ? (
            <>{props.offre.couverture_demi_horaire_offre * 100} % </>
          ) : (
            'NC'
          )}
        </Card.Number>
      </Card.Table>
      <Card.Table>
        <Card.Label>
          <Tooltip
            tip={`Pourcentage des clients de l’offre labellisée ayant activé le suivi de leur consommation en temps réel.`}
          >
            Part des clients de l'offre ayant activé le suivi de consommation
          </Tooltip>
        </Card.Label>
        <Card.Number>
          {props.offre.part_suivi_consommation_offre &&
          props.offre.part_suivi_consommation_offre !== 'NC' ? (
            <>
              {(props.offre.part_suivi_consommation_offre * 100).toLocaleString(
                'fr-fr',
                { maximumFractionDigits: 2 }
              )}{' '}
              %{' '}
            </>
          ) : (
            'NC'
          )}
        </Card.Number>
      </Card.Table>
    </Card>
  )
}
