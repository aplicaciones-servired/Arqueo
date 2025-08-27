import { useMemo, useState } from 'react'
import { type Cronograma } from '../types/cronograma'

import { format, parse, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns'

interface FilterPDV {
  filteredPDV: Cronograma[]
  searchPDV: string
  searchPDS: string
  searchPVDS: string
  setSearchPDV: React.Dispatch<React.SetStateAction<string>>
  setSearchPDS: React.Dispatch<React.SetStateAction<string>>
  setSearchPVDS: React.Dispatch<React.SetStateAction<string>>
}

function filterByPDV (pdv: Cronograma[], searchPDV: string): Cronograma[] {
  // Fecha de hoy normalizada (yyyy-MM-dd)
  const hoy = format(new Date(), 'yyyy-MM-dd')

  return pdv.filter(({ dia }) => {
    if (dia.length === 0) return false

    const parsedDate = parse(dia, 'yyyy-MM-dd', new Date())
    const fecha = format(parsedDate, 'yyyy-MM-dd')

    // Si no hay búsqueda -> mostrar SOLO los de hoy
    if ((searchPDV.length === 0) || searchPDV.trim() === '') {
      return fecha === hoy
    }

    // Si hay búsqueda -> mostrar los que coinciden con esa fecha
    return fecha.includes(searchPDV)
  })
}

// 🔥 Nuevo filtro -> filtra los registros del mes actual
function filterByCurrentMonth (pdv: Cronograma[]): Cronograma[] {
  const now = new Date()
  const start = startOfMonth(now)
  const end = endOfMonth(now)

  return pdv.filter(({ dia }) => {
    if (dia.length === 0) return false

    const parsedDate = parse(dia, 'yyyy-MM-dd', new Date())
    return isWithinInterval(parsedDate, { start, end })
  })
}

function filterByPVDS (pdv: Cronograma[], searchPVDS: string): Cronograma[] {
  return pdv.filter(({ puntodeventa }) =>
    (puntodeventa.length > 0) ? puntodeventa.toLowerCase().includes(searchPVDS.toLowerCase()) : false
  )
}

function filterByPDS (pdv: Cronograma[], searchPDS: string): Cronograma[] {
  return pdv.filter(({ empresa }) =>
    (empresa.length > 0) ? empresa.toLowerCase().includes(searchPDS.toLowerCase()) : false
  )
}

export function useFilterPro (pdv: Cronograma[]): FilterPDV {
  const [searchPDV, setSearchPDV] = useState('')
  const [searchPDS, setSearchPDS] = useState('')
  const [searchPVDS, setSearchPVDS] = useState('')

  const filteredPDV = useMemo(() => {
    let filtered = pdv

    // 👇 Siempre filtra por mes actual en lugar de solo hoy
    filtered = filterByCurrentMonth(filtered)

    // Si el usuario busca fecha manualmente, sobreescribe el filtro de mes
    if (searchPDV.length > 0) {
      filtered = filterByPDV(filtered, searchPDV)
    }

    if (searchPDS.length > 0) {
      filtered = filterByPDS(filtered, searchPDS)
    }

    if (searchPVDS.length > 0) {
      filtered = filterByPVDS(filtered, searchPVDS)
    }

    return filtered
  }, [pdv, searchPDV, searchPDS, searchPVDS])

  return { searchPDV, searchPDS, searchPVDS, setSearchPDV, setSearchPDS, setSearchPVDS, filteredPDV }
}
