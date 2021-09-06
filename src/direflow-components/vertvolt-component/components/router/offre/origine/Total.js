import React from 'react'

import setLabelTechnologie from '../../../../utils/setLabelTechnologie'
import Table from '../../../misc/Table'

export default function Total(props) {
  console.log(props.offre.total)
  return (
    <Table first>
      <Table.Header
        onClick={() => props.setCurrent('total')}
        current={props.current === 'total'}
      >
        <th>Total</th>
        <Table.Total>{props.offre.total[props.value]} MWh</Table.Total>
      </Table.Header>
      {props.current === 'total' &&
        props.offre.technologies.map((technologie) =>
          technologie[`total_${props.value}`] ? (
            <Table.Technologie key={technologie.technologie}>
              <td>{setLabelTechnologie(technologie.technologie)}</td>
              <Table.Value>
                {technologie[`total_${props.value}`]} MWh
              </Table.Value>
            </Table.Technologie>
          ) : null
        )}
    </Table>
  )
}
