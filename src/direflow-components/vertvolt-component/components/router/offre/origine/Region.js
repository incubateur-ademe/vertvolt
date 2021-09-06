import React from 'react'

import setLabelTechnologie from '../../../../utils/setLabelTechnologie'
import Table from '../../../misc/Table'

export default function Region(props) {
  return (
    <Table>
      <Table.Header
        onClick={() => props.setCurrent(props.region.region)}
        current={props.current === props.region.region}
      >
        <th>{props.region.region}</th>
        <Table.Total>{props.region[`total_${props.value}`]} KWh</Table.Total>
      </Table.Header>
      {props.current === props.region.region &&
        props.region.technologies.map((technologie) => (
          <Table.Technologie key={technologie.technologie}>
            <td>{setLabelTechnologie(technologie.technologie)}</td>
            <Table.Value>{technologie[props.value]} KWh</Table.Value>
          </Table.Technologie>
        ))}
    </Table>
  )
}
