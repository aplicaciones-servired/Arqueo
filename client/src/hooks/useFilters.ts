import { type Arqueos } from '../types/arqueo'
import { useMemo, useState } from 'react'

interface FilterPDV {
  filteredPDV: Arqueos
  searchPDV: string
  searchPDS: string
  setSearchPDV: React.Dispatch<React.SetStateAction<string>>
  setSearchPDS: React.Dispatch<React.SetStateAction<string>>
}

function filterByPDV (pdv: Arqueos, searchPDV: string): Arqueos {
  return pdv.filter(({ fechavisita }) =>
    (fechavisita.length > 0) ? fechavisita.toLowerCase().includes(searchPDV.toLowerCase()) : false
  )
}

function filterByPDS (pdv: Arqueos, searchPDS: string): Arqueos {
  return pdv.filter(({ supervisor }) =>
    (supervisor.length > 0) ? supervisor.toLowerCase().includes(searchPDS.toLowerCase()) : false
  )
}

export function useFilter (pdv: Arqueos): FilterPDV {
  const [searchPDV, setSearchPDV] = useState('')
  const [searchPDS, setSearchPDS] = useState('')

  const filteredPDV = useMemo(() => {
    let filtered = pdv

    // Aplica el filtro por fecha si hay un valor de búsqueda
    if (searchPDV.length > 0) {
      filtered = filterByPDV(filtered, searchPDV)
    }

    // Aplica el filtro por supervisor si hay un valor de búsqueda
    if (searchPDS.length > 0) {
      filtered = filterByPDS(filtered, searchPDS)
    }

    return filtered
  }, [pdv, searchPDV, searchPDS])

  return { searchPDV, searchPDS, setSearchPDV, setSearchPDS, filteredPDV }
}
