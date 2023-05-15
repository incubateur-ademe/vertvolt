import React, { useState, useEffect, useContext } from 'react'
import Fuse from 'fuse.js/dist/fuse.basic.esm.min'

import { useOffres } from '../../../utils/api'
import SearchContext from '../../../utils/SearchContext'
import Offre from './list/Offre.js'
import Pagination from './list/Pagination.js'

export default function List() {
  const { data } = useOffres()

  const [currentPage, setCurrentPage] = useState(0)
  const offresPerPage = 12

  const { search, fournisseur, label } = useContext(SearchContext)

  const [results, setResults] = useState([])
  const [fuse, setFuse] = useState(null)
  useEffect(() => {
    if (data) {
      setFuse(
        new Fuse(data, {
          keys: ['nom_offre'],
          threshold: 0.3,
          ignoreLocation: true,
          shouldSort: false,
        })
      )
    }
  }, [data])

  useEffect(() => {
    if (fuse) {
      setResults(
        (search
          ? fuse
              .search(search.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
              .map((result) => result.item)
          : data
        )
          .filter((offre) =>
            fournisseur ? offre.nom_fournisseur === fournisseur : true
          )
          .filter((offre) =>
            label ? offre.niveau_labelisation === label : true
          )
      )
    }
  }, [fuse, search, data, fournisseur, label])

  return results ? (
    <div>
      <div>
        {results.map(
          (offre, index) =>
            index >= currentPage * offresPerPage &&
            index < currentPage * offresPerPage + offresPerPage && (
              <Offre
                key={offre.nom_offre + offre.nom_fournisseur}
                offre={offre}
              />
            )
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        results={results}
        offresPerPage={offresPerPage}
      />
    </div>
  ) : null
}
