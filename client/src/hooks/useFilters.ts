import { type Arqueos } from '../types/arqueo'
import { useMemo, useState } from 'react'

interface FilterPDV {
  filteredPDV: Arqueos
  searchPDV: string
  setSearchPDV: React.Dispatch<React.SetStateAction<string>>
  searchCate: string
  setSearchCate: React.Dispatch<React.SetStateAction<string>>
}

function filterByPDV (pdv: Arqueos, searchPDV: string): Arqueos {
  return pdv.filter(({ fechavisita, supervisor }) =>
    ((fechavisita != null) ? fechavisita.toLowerCase().includes(searchPDV.toLowerCase()) : false) ||
    ((supervisor != null) ? supervisor.toLowerCase().includes(searchPDV.toLowerCase()) : false)
  )
}


export function useFilter (pdv: Arqueos): FilterPDV {
  const [searchPDV, setSearchPDV] = useState('')
  const [searchCate, setSearchCate] = useState('')

  const filteredPDV = useMemo(() => {
    const filtered = filterByPDV(pdv, searchPDV)

    return filtered
  }, [pdv, searchPDV, searchCate])

  return { searchPDV, setSearchPDV, filteredPDV, setSearchCate, searchCate }
}
