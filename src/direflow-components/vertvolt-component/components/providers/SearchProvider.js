import React, { useState } from 'react'

import SearchContext from '../../utils/SearchContext'

export default function SearchProvider(props) {
  const [currentOffre, setCurrentOffre] = useState('')

  const [search, setSearch] = useState('')
  const [fournisseur, setFournisseur] = useState('')
  const [label, setLabel] = useState('')

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        fournisseur,
        setFournisseur,
        label,
        setLabel,
        currentOffre,
        setCurrentOffre,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  )
}
