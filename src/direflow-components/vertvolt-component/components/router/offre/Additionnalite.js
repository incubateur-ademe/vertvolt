import React, { useState } from 'react'

import Map from './origine/Map'
import Total from './origine/Total'
import Region from './origine/Region'
import Card from '../../misc/Card'

export default function Additionnalite(props) {
  const [open, setOpen] = useState(0)
  const [current, setCurrent] = useState('total')

  return (
    <Card>
      <Card.Title>Additionnalite</Card.Title>
      <Card.Table
        onClick={() => setOpen((prevOpen) => (prevOpen === 1 ? 0 : 1))}
      >
        <Card.Label>
          Part de l'électricité achetée à des installations construites après
          2015 sans soutien public
        </Card.Label>
        <Card.Number>
          {props.offre.part_sans_soutien_public_offre * 100} %
        </Card.Number>
      </Card.Table>
      {open === 1 && (
        <Card.Columns>
          <Card.Column>
            <Map
              offre={props.offre}
              value={'mwh_sans_soutien_public'}
              current={current}
              setCurrent={setCurrent}
            />
          </Card.Column>
          <Card.Column>
            <Total
              offre={props.offre}
              value={'mwh_sans_soutien_public'}
              current={current}
              setCurrent={setCurrent}
            />
            {props.offre.regions.map((region) => (
              <Region
                key={region.region}
                region={region}
                value={'mwh_sans_soutien_public'}
                current={current}
                setCurrent={setCurrent}
              />
            ))}
          </Card.Column>
        </Card.Columns>
      )}
      <Card.Table
        onClick={() => setOpen((prevOpen) => (prevOpen === 2 ? 0 : 2))}
      >
        <Card.Label>
          Part de l'électricité achetée à des installations en gouvernance
          partagée
        </Card.Label>
        <Card.Number>
          {props.offre.part_gouvernance_partagee_offre * 100} %
        </Card.Number>
      </Card.Table>
      {open === 2 && (
        <Card.Columns>
          <Card.Column>
            <Map
              offre={props.offre}
              value={'mwh_gouvernance_partagee'}
              current={current}
              setCurrent={setCurrent}
            />
          </Card.Column>
          <Card.Column>
            <Total
              offre={props.offre}
              value={'mwh_gouvernance_partagee'}
              current={current}
              setCurrent={setCurrent}
            />
            {props.offre.regions.map((region) => (
              <Region
                key={region.region}
                region={region}
                value={'mwh_gouvernance_partagee'}
                current={current}
                setCurrent={setCurrent}
              />
            ))}
          </Card.Column>
        </Card.Columns>
      )}
    </Card>
  )
}
