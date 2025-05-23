import { useEffect, useState } from 'react'
import { Card, Table, TableBody, TableHead, TableCell, TableHeaderCell, TableRow, Icon } from '@tremor/react'
import { Input, Label, Button } from '../components/iu'
import { type Arqueos } from '../types/arqueo'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import { useFilter } from '../hooks/useFilters'
import { useNavigate } from 'react-router-dom'
import { RiSearchEyeLine } from '@remixicon/react'
import { type User } from '../types/user'
import { exportarAExcel } from '../components/Export'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { API_URL } from '../utils/constans'

const DahsBoard = ({ zona }: { zona: User }): JSX.Element => {
  const [data, setData] = useState<Arqueos>([])
  const [currentPage, setCurrentPage] = useState(1)
  const { filteredPDV, setSearchPDV, searchPDV } = useFilter(data)
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')

  const navigate = useNavigate()
  console.log('first', zona)
  const companyname = zona.company

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        // const response = await axios.get(`http://localhost:3000/arqueo/${companyname}`, {
        const response = await axios.get(`${API_URL}/arqueo/${companyname}`, {
          params: {
            page: currentPage,
            limit: 150
          }
        })
        setData(response.data as Arqueos)
      } catch (error) {
        console.error('Error al obtener los datos:', error)
      }
    }
    void fetchData()
    const intervalId = setInterval(() => {
      void fetchData()
    }, 300000)

    return () => { clearInterval(intervalId) }
  }, [currentPage])

  const itemsPerPage = 6
  const offset = (currentPage - 1) * itemsPerPage

  const getFormattedDate = (dateString: string): string => {
    const date = parseISO(dateString)
    return format(date, 'dd/MM/yyyy', { locale: es })
  }

  const handleClicks = (id: number) => {
    return () => {
      navigate(`/home/arqueo/${companyname}/${id}`)
    }
  }

  const exportarRegistros = (): void => {
    if (fechaInicio === '' || fechaFin === '') {
      alert('Fechas de inicio y fin deben ser seleccionadas')
      return
    }

    const fechaInicioObj = new Date(fechaInicio)
    const fechaFinObj = new Date(fechaFin)

    const registrosFiltrados = data.filter((data) => {
      const fechaArqueo = new Date(data.fechavisita)
      return fechaArqueo >= fechaInicioObj && fechaArqueo <= fechaFinObj
    })

    exportarAExcel({ registros: registrosFiltrados })
  }

  return (
    <>
      <section className='flex flex-nowrap gap-2 justify-self-center'>
        <div className='flex items-center md:justify-between gap-2 bg-blue-200 dark:bg-dark-tremor-brand-muted dark:text-white w-96 z-50 left-6 mt-1 p-2 px-8 rounded-lg'>
          <Label>Filtrar Por Fecha:</Label>
          <Input type="date" value={searchPDV} onChange={ev => { setSearchPDV(ev.target.value) }} />
        </div>

        <div className='flex items-center  md:justify-between gap-2 bg-blue-200 dark:bg-dark-tremor-brand-muted dark:text-white w-4/6 z-50 left-96 mt-1 p-2 px-8 rounded-lg'>
          <Label>Exportar Por Fecha:</Label>
          <Input
            type="date"
            value={fechaInicio}
            onChange={(e) => { setFechaInicio(e.target.value) }}
          />

          <Input
            type="date"
            value={fechaFin}
            onChange={(e) => { setFechaFin(e.target.value) }}
          />
          <Button
            onClick={exportarRegistros}
          >
            Exportar a Excel
          </Button>
        </div>
      </section>
      <Card className='mt-2'>
        <Table className="shadow-lg">
          <TableHead>
            <TableRow className='bg-blue-200 dark:bg-dark-tremor-brand-muted dark:text-white'>
              <TableHeaderCell className='text-center'>Supervisor</TableHeaderCell>
              <TableHeaderCell className='text-center'>Nombre Completo</TableHeaderCell>
              <TableHeaderCell className='text-center'>Nombres</TableHeaderCell>
              <TableHeaderCell className='text-center'>Sucursal</TableHeaderCell>
              <TableHeaderCell className='text-center'>punto de venta</TableHeaderCell>
              <TableHeaderCell className='text-center'>Fecha Visita</TableHeaderCell>
              <TableHeaderCell className='text-center'>Ver Arqueo</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody className='dark:bg-dark-tremor-brand-muted dark:text-white '>
            {filteredPDV.slice(offset, offset + itemsPerPage).map((pdv, index) => (
              <TableRow key={index}>
                <TableCell className='text-center'>{pdv.supervisor}</TableCell>
                <TableCell className='text-center'>{pdv.nombre_supervisor}</TableCell>
                <TableCell className='text-center'>{pdv.nombres}</TableCell>
                <TableCell className='text-center'>{pdv.sucursal}</TableCell>
                <TableCell className='text-center'>{pdv.puntodeventa}</TableCell>
                <TableCell className='text-center'>{getFormattedDate(pdv.fechavisita)}</TableCell>
                <TableCell className='text-center'>
                  <button>
                    <Icon
                      icon={RiSearchEyeLine}
                      variant="solid"
                      tooltip="Tooltip to place context information"
                      onClick={handleClicks(pdv.id)}
                    />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ReactPaginate
          previousLabel={'Anterior'}
          nextLabel={'Siguiente'}
          pageCount={Math.ceil(filteredPDV.length / itemsPerPage)}
          onPageChange={({ selected }: { selected: number }) => { setCurrentPage(selected + 1) }}
          containerClassName={'flex items-center justify-center mt-4 space-x-2'}
          pageClassName={'bg-gray-400 px-3 py-2 rounded-full'}
          breakClassName={'text-gray-600 '}
          previousClassName={'bg-blue-500 text-white px-3 py-2 rounded-full'}
          nextClassName={'bg-blue-500 text-white px-3 py-2 rounded-full'}
          activeClassName={'bg-blue-700 text-white'}
        />
      </Card>
    </>
  )
}

export default DahsBoard
