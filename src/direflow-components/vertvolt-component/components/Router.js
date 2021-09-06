import React, { useContext } from 'react'

import SearchContext from '../utils/SearchContext'
import Home from './router/Home'
import Offre from './router/Offre'

export default function Router() {
  const { currentOffre } = useContext(SearchContext)

  return currentOffre ? <Offre /> : <Home />
}
