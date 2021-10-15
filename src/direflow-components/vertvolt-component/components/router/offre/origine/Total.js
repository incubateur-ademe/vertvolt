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
        <Table.Total>
          {Math.round(props.offre.total[props.value] * 1000) / 10} %
        </Table.Total>
      </Table.Header>
      {props.current === 'total' &&
        props.offre.technologies.map((technologie) =>
          technologie[`total_${props.value}`] ? (
            <Table.Technologie key={technologie.technologie}>
              <td>{setLabelTechnologie(technologie.technologie)}</td>
              <Table.Value>
                {Math.round(technologie[`total_${props.value}`] * 1000) / 10} %
              </Table.Value>
            </Table.Technologie>
          ) : null
        )}
    </Table>
  )
}
