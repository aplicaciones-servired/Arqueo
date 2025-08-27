import { Button, Card } from '@tremor/react'
import { useState } from 'react'
import { Input } from '../components/iu'
import axios from 'axios'
import { toast } from 'react-toastify'
import { API_URL } from '../utils/constans'

const empresas = ['Multired', 'Servired']

const notas = ['PROGRAMACION DEL MES', 'AQUEO DE RETIRO']

export default function Programacion (): JSX.Element {
  const [puntovdt, setPuntodvt] = useState('')
  const [fecha, setFecha] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [nota, setNotas] = useState('')

  const handleEnviarcono = async (): Promise<void> => {
    if (puntovdt === '' || fecha === '' || empresa === '') {
      toast.warning('Todos los campos son obligatorios', {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
      return
    }
    try {
      // const response = await axios.post(`http://localhost:3000/cronograma/${empresa}`, {
      const response = await axios.post(`${API_URL}/cronograma/${empresa}`, {
        puntovdt,
        fecha,
        empresa,
        nota
      })

      if (response !== null) {
        toast.success('Se registró correctamente', {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        })
        setPuntodvt('')
        setFecha('')
        setEmpresa('')
        setNotas('')
      }
    } catch (error) {
      toast.error('Error al registrar: ' + String(error), {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    }
  }

  return (
    <Card className='justify-self-center dark:bg-dark-tremor-brand-muted dark:text-white mt-4 text-center w-8/12 border-gray-600 border-y'>
      <div>
        <h1 className='font-bold uppercase'>Programación De Arqueos mensual</h1>
      </div>
      <label className="block text-center mt-4 uppercase">
        Punto de Venta:
      </label>
      <input
        className="px-2 py-1 w-2/6 text-center mt-2  rounded-full border"
        name="puntovdt"
        value={puntovdt}
        placeholder='Ingrese el punto de venta'
        onChange={(e) => { setPuntodvt(e.target.value) }}
      />

      <label className="block text-center mt-4 uppercase">
        Elije una Empresa:
      </label>
      <select name='' className='mt-4  w-2/6 text-center rounded-full' onChange={ev => { setEmpresa(ev.target.value) }} value={empresa}>
        <option value="">Seleccione una empresa</option>
        {empresas.map(empresa => <option key={empresa} value={empresa}>{empresa}</option>)}
      </select>

      <label className="block text-center mt-4 uppercase">
        Motivo del Arquo:
      </label>
      <select name='' className='mt-4  w-2/6 text-center rounded-full' onChange={ev => { setNotas(ev.target.value) }} value={nota}>
        <option value="">Seleccione una nota</option>
        {notas.map(nota => <option key={nota} value={nota}>{nota}</option>)}
      </select>

      <div >
        <label className="block text-center mt-4 uppercase">
          Fecha del arqueo
        </label>
        <Input className="mt-2 rounded-full w-2/6 text-center" type="date" value={fecha} onChange={ev => { setFecha(ev.target.value) }} />
        <p className="justify-self-center rounded-full mt-2 w-2/6 text-1xl text-black bg-gray-100 p-2 dark:bg-gray-800 dark:text-gray-300">
          Dia Selecionado: {(fecha.length > 0) ? fecha.split('-').reverse().join('/') : 'No Hay fecha'}
        </p>
      </div>

      <Button
        className='mt-4 w-1/6'
        onClick={() => { void handleEnviarcono() }}
      >
        Insertar Cronograma
      </Button>

    </Card >
  )
}
