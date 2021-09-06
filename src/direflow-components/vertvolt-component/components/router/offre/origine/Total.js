import React from 'react'

import setLabelTechnologie from '../../../../utils/setLabelTechnologie'
import Table from '../../../misc/Table'

export default function Total(props) {
  return (
    <Table first>
      <Table.Header
        onClick={() => props.setCurrent('total')}
        current={props.current === 'total'}
      >
        <th>Total</th>
        <Table.Total>{props.offre.total[props.value]} KWh</Table.Total>
      </Table.Header>
      {props.current === 'total' &&
        props.offre.technologies.map((technologie) => (
          <Table.Technologie key={technologie.technologie}>
            <td>{setLabelTechnologie(technologie.technologie)}</td>
            <Table.Value>{technologie[`total_${props.value}`]} KWh</Table.Value>
          </Table.Technologie>
        ))}
    </Table>
  )
}
