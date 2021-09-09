import React from 'react'

import TresEngageSansRaeh from './logo/TresEngageSansRaeh.js'
import TresEngage from './logo/TresEngage.js'
import EngageSansRaeh from './logo/EngageSansRaeh.js'
import Engage from './logo/Engage.js'

export default function Logo(props) {
  return props.label === 'Niveau très engagé sans ARENH' ? (
    <TresEngageSansRaeh small={props.small} label={props.label} />
  ) : props.label === 'Niveau très engagé' ? (
    <TresEngage small={props.small} label={props.label} />
  ) : props.label === 'Niveau engagé sans ARENH' ? (
    <EngageSansRaeh small={props.small} label={props.label} />
  ) : (
    <Engage small={props.small} label={props.label} />
  )
}
