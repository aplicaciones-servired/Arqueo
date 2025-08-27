import { useEffect, useState } from 'react'
import { Card, Table, TableBody, TableHead, TableCell, TableHeaderCell, TableRow } from '@tremor/react'
import { Input, Label, Button } from '../components/iu'
import { type Cronograma } from '../types//cronograma'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import { useFilterPro } from '../hooks/cronogramaFilters'
import { exportarAExcel } from '../components/Export'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { useAuth } from '../auth/AuthProvider'
import { toast } from 'react-toastify'
import { API_URL } from '../utils/constans'

// import { API_URL } from '../utils/constans'
const empresas = ['Multired', 'Servired']
const ProgramacionMes = (): JSX.Element => {
  const [data, setData] = useState<Cronograma[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const { searchPDV, searchPDS, searchPVDS, setSearchPDV, setSearchPDS, setSearchPVDS, filteredPDV } = useFilterPro(data)
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')

  const { username } = useAuth()
  const companyname = username.company
  console.log('first', searchPDS)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const empresaSeleccionada = (searchPDS.length > 0) && searchPDS !== ''
          ? searchPDS
          : companyname
        console.log('first', empresaSeleccionada)
        // const response = await axios.get<Cronograma[]>(`http://localhost:3000/cronograma/${empresaSeleccionada}`, {
        const response = await axios.get(`${API_URL}/cronograma/${empresaSeleccionada}`, {
          params: {
            page: currentPage,
            limit: 150
          }
        })
        setData(response.data)
        console.log('data', data)
        if (response !== null) {
          toast.success('se obtuvieron los datos correctamente', {
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          })
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error)
        toast.error('Error al obtener los datos: ' + String(error), {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        })
      }
    }
    void fetchData()
    const intervalId = setInterval(() => {
      void fetchData()
    }, 300000)

    return () => { clearInterval(intervalId) }
  }, [currentPage, companyname, searchPDS])

  const itemsPerPage = 6
  const offset = (currentPage - 1) * itemsPerPage

  const getFormattedDate = (dateString: string): string => {
    const date = parseISO(dateString)
    return format(date, 'dd/MM/yyyy', { locale: es })
  }

  const exportarRegistros = (): void => {
    if (fechaInicio === '' || fechaFin === '') {
      toast.warning('Fechas de inicio y fin deben ser seleccionadas', {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
      return
    }

    const fechaInicioObj = new Date(fechaInicio)
    const fechaFinObj = new Date(fechaFin)

    const registrosFiltrados = data.filter((data) => {
      const fechaArqueo = new Date(data.dia)
      return fechaArqueo >= fechaInicioObj && fechaArqueo <= fechaFinObj
    })

    exportarAExcel({ registros: registrosFiltrados })
  }

  return (
    <>
      <section className='flex flex-wrap gap-1 justify-self-center'>
        <div className='flex items-center md:justify-between gap-2 bg-blue-200 dark:bg-dark-tremor-brand-muted dark:text-white w-96 z-50 left-6 mt-1 p-2 px-8 rounded-lg'>
          <Label>Filtrar Por Fecha:</Label>
          <Input type="date" value={searchPDV} onChange={ev => { setSearchPDV(ev.target.value) }} />
        </div>

        <div className='flex items-center md:justify-between gap-2 bg-blue-200 dark:bg-dark-tremor-brand-muted dark:text-white w-96 z-50 left-6 mt-1 p-2 px-8 rounded-lg'>
          <Label>Filtrar por PDV:</Label>
          <Input value={searchPVDS} onChange={ev => { setSearchPVDS(ev.target.value) }} />
        </div>

        <div className='flex items-center md:justify-between gap-2 bg-blue-200 dark:bg-dark-tremor-brand-muted dark:text-white w-5/12 z-50 left-6 mt-1 p-2 px-8 rounded-lg'>
          <Label>Filtrar por Empresa:</Label>
          <select name='' className='p-2 w-full min-w-max rounded-lg border-none outline-none dark:bg-dark-tremor-content-subtle text-center' onChange={ev => { setSearchPDS(ev.target.value) }} value={searchPDS}>
            <option value="" className=''>Seleccione una empresa</option>
            {empresas.map(searchPDS => <option key={searchPDS} value={searchPDS}>{searchPDS}</option>)}
          </select>
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
              <TableHeaderCell className='text-center'>Punto de Venta</TableHeaderCell>
              <TableHeaderCell className='text-center'>Empresa</TableHeaderCell>
              <TableHeaderCell className='text-center'>Descripción</TableHeaderCell>
              <TableHeaderCell className='text-center'>Estado del Arqueo</TableHeaderCell>
              <TableHeaderCell className='text-center'>Fecha Visita</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody className='dark:bg-dark-tremor-brand-muted dark:text-white '>
            {filteredPDV.slice(offset, offset + itemsPerPage).map((pdv, index) => (
              <TableRow key={index}>
                <TableCell className='text-center'>{pdv.puntodeventa}</TableCell>
                <TableCell className='text-center'>{pdv.empresa}</TableCell>
                <TableCell className='text-center'>{pdv.nota}</TableCell>
                <TableCell
                  className={`text-center font-semibold ${pdv.estado === 'En Espera' ? 'text-red-500' : 'text-green-500'
                    }`}
                >
                  {pdv.estado}
                </TableCell>
                <TableCell className='text-center'>{getFormattedDate(pdv.dia)}</TableCell>
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

export default ProgramacionMes
