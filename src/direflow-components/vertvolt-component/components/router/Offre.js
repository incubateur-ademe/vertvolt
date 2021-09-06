import React, { useContext } from 'react'

import { useOffre } from '../../utils/api'
import SearchContext from '../../utils/SearchContext'
import BackButton from './offre/BackButton'
import Header from './offre/Header'
import Origine from './offre/Origine'
import Additionnalite from './offre/Additionnalite'
import Details from './offre/Details'

export default function Offre() {
  const { currentOffre } = useContext(SearchContext)
  const { data } = useOffre(currentOffre)

  return data ? (
    <>
      <BackButton />
      <Header offre={data} />
      <Origine offre={data} />
      <Additionnalite offre={data} />
      <Details offre={data} />
      <div>
        Retrouvez le détail des données sur{' '}
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://data.ademe.fr/'
        >
          data.ademe.fr
        </a>
      </div>
    </>
  ) : null
}
