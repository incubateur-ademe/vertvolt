import React from 'react'

import setLabelTechnologie from '../../../../utils/setLabelTechnologie'
import Table from '../../../misc/Table'

export default function Region(props) {
  return props.region[`total_${props.value}`] ? (
    <Table>
      <Table.Header
        onClick={() => props.setCurrent(props.region.region)}
        current={props.current === props.region.region}
      >
        <th>{props.region.region}</th>
        <Table.Total>{props.region[`total_${props.value}`]} %</Table.Total>
      </Table.Header>
      {props.current === props.region.region &&
        props.region.technologies.map((technologie) =>
          technologie[props.value] ? (
            <Table.Technologie key={technologie.technologie}>
              <td>{setLabelTechnologie(technologie.technologie)}</td>
              <Table.Value>{technologie[props.value]} %</Table.Value>
            </Table.Technologie>
          ) : null
        )}
    </Table>
  ) : null
}
