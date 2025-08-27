import { useEffect, useState } from 'react'
import { Label } from '../components/iu'
import { Card, Table, TableBody, TableHead, TableCell, TableHeaderCell, TableRow } from '@tremor/react'
import { type Cronograma } from '../types//cronograma'
import axios from 'axios'
import { useFilterPro } from '../hooks/cronogramaFilters'
import { useAuth } from '../auth/AuthProvider'
import { toast } from 'react-toastify'
import { BarChart } from '@mui/x-charts/BarChart'
import { API_URL } from '../utils/constans'

const empresas = ['Multired', 'Servired']

const Informe = (): JSX.Element => {
  const [data, setData] = useState<Cronograma[]>([])
  const [currentPage] = useState(1)
  const { searchPDS, setSearchPDS, filteredPDV } = useFilterPro(data)

  const { username } = useAuth()
  const companyname = username.company

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const empresaSeleccionada =
                    searchPDS.length > 0 && searchPDS !== '' ? searchPDS : companyname

        const response = await axios.get<Cronograma[]>(
                    // `http://localhost:3000/cronograma/${empresaSeleccionada}`,
                    `${API_URL}/cronograma/${empresaSeleccionada}`,
                    {
                      params: {
                        page: currentPage,
                        limit: 150
                      }
                    }
        )
        setData(response.data)

        if (response !== null) {
          toast.success('Se obtuvieron los datos correctamente', {
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

    return () => {
      clearInterval(intervalId)
    }
  }, [currentPage, companyname, searchPDS])

  // 👉 estos ya vienen filtrados por el mes actual
  const totalEnEspera = filteredPDV.filter(
    (pdv) => pdv.estado === 'En Espera'
  ).length

  const totalEjecutados = filteredPDV.filter(
    (pdv) => pdv.estado === 'Realizado'
  ).length

  const Retiro = filteredPDV.filter(
    (pdv) => pdv.nota === 'AQUEO DE RETIRO'
  ).length

  const Cerrados = filteredPDV.filter(
    (pdv) => pdv.estado === 'Cerrado'
  ).length

  return (
        <>
            <section className="flex flex- gap-1 justify-self-center">
                <div className="flex items-center md:justify-between gap-2 bg-blue-200 dark:bg-dark-tremor-brand-muted dark:text-white w-12/12 z-50 left-6 mt-5 p-2 px-8 rounded-lg">
                    <Label>Filtrar por Empresa:</Label>
                    <select
                        className="p-2 w-full min-w-max rounded-lg border-none outline-none dark:bg-dark-tremor-content-subtle text-center"
                        onChange={(ev) => {
                          setSearchPDS(ev.target.value)
                        }}
                        value={searchPDS}
                    >
                        <option value="">Seleccione una empresa</option>
                        {empresas.map((empresa) => (
                            <option key={empresa} value={empresa}>
                                {empresa}
                            </option>
                        ))}
                    </select>
                </div>
            </section>

            <Card className='mt-2'>
                <Table className="shadow-lg">
                    <TableHead>
                        <TableRow className='bg-blue-200 dark:bg-dark-tremor-brand-muted dark:text-white'>
                            <TableHeaderCell className='text-center'>Programados</TableHeaderCell>
                            <TableHeaderCell className='text-center'>No Ejecutados</TableHeaderCell>
                            <TableHeaderCell className='text-center'>Ejecutados</TableHeaderCell>
                            <TableHeaderCell className='text-center'>Arqueo de Retiros</TableHeaderCell>
                            <TableHeaderCell className='text-center'>Cerrados</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className='dark:bg-dark-tremor-brand-muted dark:text-white '>
                        <TableRow >
                            <TableCell className='text-center'>{filteredPDV.length}</TableCell>
                            <TableCell className='text-center'>{totalEnEspera}</TableCell>
                            <TableCell className='text-center'>{totalEjecutados}</TableCell>
                            <TableCell className='text-center'>{Retiro}</TableCell>
                            <TableCell className='text-center'>{Cerrados}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Card>
            {/* 👉 gráfico con datos SOLO del mes actual */}
            <BarChart
                yAxis={[
                  {
                    id: 'barCategories',
                    data: ['Programados', 'Sin Ejecutar', 'Ejecutados', 'Por Retiro', 'Cerrados']
                  }
                ]}
                series={[
                  {
                    data: [filteredPDV.length, totalEnEspera, totalEjecutados, Retiro, Cerrados]
                  }
                ]}
                height={300}
                width={600}
                borderRadius={23}

            />
        </>
  )
}

export default Informe
