import React, { useState } from 'react'

import Map from './origine/Map'
import Total from './origine/Total'
import Region from './origine/Region'
import Card from '../../misc/Card'

export default function Origine(props) {
  const [current, setCurrent] = useState('total')

  return (
    <Card>
      <Card.Title>Origine de l'électricité</Card.Title>
      <Card.Columns>
        <Card.Column>
          <Map
            offre={props.offre}
            value={'mwh_offre'}
            current={current}
            setCurrent={setCurrent}
          />
        </Card.Column>
        <Card.Column>
          <Total
            offre={props.offre}
            value={'mwh_offre'}
            current={current}
            setCurrent={setCurrent}
          />
          {props.offre.regions.map((region) => (
            <Region
              key={region.region}
              region={region}
              value={'mwh_offre'}
              current={current}
              setCurrent={setCurrent}
            />
          ))}
        </Card.Column>
      </Card.Columns>
    </Card>
  )
}
