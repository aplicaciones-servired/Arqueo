import { useEffect, useState } from 'react'
import axios from 'axios'
import { Buffer } from 'buffer'
import { useAuth } from '../auth/AuthProvider'
import { useParams } from 'react-router-dom'
import { type Arqueo } from '../types/arqueo'
import { type Datos } from '../components/PDF'
import { Card } from '@tremor/react'
import { BottonExportItems } from '../components/XportExcel'
import { PDF } from '../components/PDF'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { API_URL } from '../utils/constans'
// import { API_URL } from '../utils/constans'

const ArqueoForm = (): JSX.Element => {
  const { username } = useAuth()
  const company = username.empresa.nombre_empresa
  const [data, setData] = useState<Arqueo[]>([])
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        // const response = await axios.get(`http://localhost:3000/arqueos/${company}/${id}`)
        const response = await axios.get(`${API_URL}/arqueos/${company}/${id}`)
        setData(response.data as Arqueo[])

        if (response.data != null) {
          const dataWithBase64Images = response.data.map((item: { firma_auditoria: unknown, firma_colocadora: unknown, imagen_observacion: unknown }) => ({
            ...item,
            firma_auditoria: item.firma_auditoria != null ? Buffer.from(item.firma_auditoria as string).toString('base64') : null,
            firma_colocadora: item.firma_colocadora != null ? Buffer.from(item.firma_colocadora as string).toString('base64') : null,
            imagen_observacion: item.imagen_observacion != null ? Buffer.from(item.imagen_observacion as string).toString() : null
          }))

          setData(dataWithBase64Images as Arqueo[])
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error)
      }
    }

    void fetchData()
  }, [company, id])

  return (

    <>
      {
        data.map((arqueo: Arqueo, index) => (
          <Card key={index} className='dark:bg-dark-tremor-brand-muted dark:text-white'>
            <div className=" bg-blue-500 h-20  rounded-lg ">
              <h1 className="font-bold uppercase text-white text-2xl translate-y-5 translate-x-3 flex flex-col items-center">
                arqueo
              </h1>
              <div className="flex justify-end  -translate-y-3 -translate-x-3 space-x-2">
                <BottonExportItems datos={arqueo} />

                <PDFDownloadLink document={<PDF datos={arqueo as unknown as Datos} company={company ?? ''} />} fileName="PRUEBA.PDF">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg pl-2 " >descargar PDF</button>
                </PDFDownloadLink>
              </div>

            </div>

            <label className="block text-center mt-9 uppercase">
              supervisor
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              name="supervisor"
              disabled
              defaultValue={arqueo.supervisor}
            />

            <label className="block text-center mt-5 uppercase">
              nombre supervisor
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              name="nombre_supervisor"
              disabled
              defaultValue={arqueo.nombre_supervisor}
            />

            <label className="block text-center mt-5 uppercase">
              documento
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              name="documento"
              disabled
              defaultValue={arqueo.documento}
            />

            <label className="block text-center mt-5 uppercase">ip</label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              name="ip"
              disabled
              defaultValue={arqueo.ip}
            />

            <label className="block text-center mt-5 uppercase">nombres</label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              name="nombres"
              disabled
              defaultValue={arqueo.nombres}
            />

            <label className="block text-center mt-5 uppercase">
              sucursal{' '}
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              name="sucursal "
              disabled
              defaultValue={arqueo.sucursal}
            />

            <label className="block text-center mt-5 uppercase">
              punto de venta
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              name="puntodeventa"
              disabled
              defaultValue={arqueo.puntodeventa}
            />

            <label className="block text-center mt-5 uppercase">
              venta bruta
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              name="ventabruta"
              disabled
              defaultValue={arqueo.ventabruta}
            />

            <label className="block text-center mt-5 uppercase">
              basee fectivo
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              name="baseefectivo"
              disabled
              defaultValue={arqueo.baseefectivo}
            />

            <label className="block text-center mt-5 uppercase">
              total ingreso
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              name="totalingreso"
              disabled
              defaultValue={arqueo.totalingreso}
            />

            <label className="block text-center mt-5 uppercase">
              chances abonados
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              name="chancesabonados"
              disabled
              defaultValue={arqueo.chancesabonados}
            />

            <label className="block text-center mt-5 uppercase">
              chances preimpresos
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              name="chancespreimpresos "
              disabled
              defaultValue={arqueo.chancespreimpresos}
            />

            <label className="block text-center mt-5 uppercase">
              premios pagados
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              name="premiospagados"
              disabled
              defaultValue={arqueo.premiospagados}
            />

            <label className="block text-center mt-5 uppercase">
              efectivo caja fuerte
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              name="efectivocajafuerte"
              disabled
              defaultValue={arqueo.efectivocajafuerte}
            />

            <label className="block text-center mt-5 uppercase">
              tirill arecaudo
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              name="tirillarecaudo"
              disabled
              defaultValue={arqueo.tirillarecaudo}
            />

            <label className="block text-center mt-5 uppercase">
              total egresos
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              name="totalegresos"
              disabled
              defaultValue={arqueo.totalegresos}
            />

            <label className="block text-center mt-5 uppercase">
              total billetes
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              name="totalbilletes"
              disabled
              defaultValue={arqueo.totalbilletes}
            />

            <label className="block text-center mt-5 uppercase">
              total monedas
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              name="totalmonedas"
              disabled
              defaultValue={arqueo.totalmonedas}
            />

            <label className="block text-center mt-5 uppercase">
              total arqueo
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              name="totalarqueo"
              disabled
              defaultValue={arqueo.totalarqueo}
            />

            <label className="block text-center mt-5 uppercase">
              sobran tefaltante
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              name="sobrantefaltante"
              disabled
              defaultValue={arqueo.sobrantefaltante}
            />

            <label className="block text-center mt-5 uppercase">
              cantidad billete cienmil caja personal
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              name="canti_billete_cienmil1"
              disabled
              defaultValue={arqueo.canti_billete_cienmil1}
            />

            <label className="block text-center mt-5 uppercase">
              total billete cienmil caja personal
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              name="total_billete_cienmil1"
              disabled
              defaultValue={arqueo.total_billete_cienmil1}
            />

            <label className="block text-center mt-5 uppercase">
              canti billete cincuentamil caja personal
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              name="canti_billete_cincuentamil1"
              disabled
              defaultValue={arqueo.canti_billete_cincuentamil1}
            />

            <label className="block text-center mt-5 uppercase">
              total billete cincuentamil caja personal
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              name="total_billete_cincuentamil1"
              disabled
              defaultValue={arqueo.total_billete_cincuentamil1}
            />

            <label className="block text-center mt-5 uppercase">
              cantidad billetes de veintemil caja personal
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.canti_billete_veintemil1}
              name="canti_billete_veintemil1"
            />

            <label className="block text-center mt-5 uppercase">
              total billetes de veintemil caja personal
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.total_billete_veintemil1}
              name="total_billete_veintemil1"
            />

            <label className="block text-center mt-5 uppercase">
              cantidad billetes de diezmil caja personal
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.canti_billete_diezmil1}
              name="canti_billete_diezmil1"
            />

            <label className="block text-center mt-5 uppercase">
              total billetes de diezmil caja personal
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.total_billete_diezmil1}
              name="total_billete_diezmil1"
            />

            <label className="block text-center mt-5 uppercase">
              cantidad billetes de cincomil caja personal
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.canti_billete_cincomil1}
              name="canti_billete_cincomil1"
            />

            <label className="block text-center mt-5 uppercase">
              total billetes de cincomil caja personal
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.total_billete_cincomil1}
              name="total_billete_cincomil1"
            />

            <label className="block text-center mt-5 uppercase">
              cantidad billetes de dosmil caja personal
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.canti_billete_dosmil}
              name="canti_billete_dosmil"
            />

            <label className="block text-center mt-5 uppercase">
              total billete de dosmil caja personal
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.total_billete_dosmil1}
              name="total_billete_dosmil1"
            />

            <label className="block text-center mt-5 uppercase">
              cantidad billetes de mil caja personal
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.canti_billete_mil1}
              name="canti_billete_mil1"
            />

            <label className="block text-center mt-5 uppercase">
              total billetes de mil caja personal
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.total_billete_mil1}
              name="total_billete_mil1"
            />

            <label className="block text-center mt-5 uppercase">
              cantidad monedas de mil caja personal
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.canti_moneda_mil1}
              name="canti_moneda_mil1"
            />

            <label className="block text-center mt-5 uppercase">
              total monedas de mil caja personal
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.total_moneda_mil1}
              name="total_moneda_mil1"
            />

            <label className="block text-center mt-5 uppercase">
              cantidad monedasde quinientos caja personal
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.canti_moneda_quinientos1}
              name="canti_moneda_quinientos1"
            />

            <label className="block text-center mt-5 uppercase">
              total monedas de quinientos caja personal
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.total_moneda_quinientos1}
              name="total_moneda_quinientos1"
            />

            <label className="block text-center mt-5 uppercase">
              cantidad monedas de docientos caja personal
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.canti_moneda_docientos1}
              name="canti_moneda_docientos1"
            />

            <label className="block text-center mt-5 uppercase">
              total monedas de docientos caja personal
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.total_moneda_docientos1}
              name="total_moneda_docientos1"
            />

            <label className="block text-center mt-5 uppercase">
              cantidad monedas de cien caja personal
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.canti_moneda_cien1}
              name="canti_moneda_cien1"
            />

            <label className="block text-center mt-5 uppercase">
              total monedas de cien caja personal
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.total_moneda_cien1}
              name="total_moneda_cien1"
            />

            <label className="block text-center mt-5 uppercase">
              canti monedas de cincuenta caja personal
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.canti_moneda_cincuenta1}
              name="canti_moneda_cincuenta1"
            />

            <label className="block text-center mt-5 uppercase">
              total monedas de ciencuenta caja personal
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.total_moneda_ciencuenta1}
              name="total_moneda_ciencuenta1"
            />

            <label className="block text-center mt-5 uppercase">
              total efectivo caja personal
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.total_efectivo1}
              name="total_efectivo"
            />

            <label className="block text-center mt-5 uppercase">
              total premios pagados 1
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.total_premios_pagados1}
              name="total_premios_pagados1"
            />

            <label className="block text-center mt-5 uppercase">
              total
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.total}
              name="total"
            />

            <label className="block text-center mt-5 uppercase">
              cantidad billete cienmil
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              name="canti_billete_cienmil"
              disabled
              defaultValue={arqueo.canti_billete_cienmil}
            />

            <label className="block text-center mt-5 uppercase">
              total billete cienmil
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              name="total_billete_cienmil"
              disabled
              defaultValue={arqueo.total_billete_cienmil}
            />

            <label className="block text-center mt-5 uppercase">
              canti billete cincuentamil
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              name="canti_billete_cincuentamil"
              disabled
              defaultValue={arqueo.canti_billete_cincuentamil}
            />

            <label className="block text-center mt-5 uppercase">
              total billete cincuentamil
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              name="total_billete_cincuentamil"
              disabled
              defaultValue={arqueo.total_billete_cincuentamil}
            />

            <label className="block text-center mt-5 uppercase">
              cantidad billetes de veintemil
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.canti_billete_veintemil}
              name="canti_billete_veintemil"
            />

            <label className="block text-center mt-5 uppercase">
              total billetes de veintemil
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.total_billete_veintemil}
              name="total_billete_veintemil"
            />

            <label className="block text-center mt-5 uppercase">
              cantidad billetes de diezmil
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.canti_billete_diezmil}
              name="canti_billete_diezmil"
            />

            <label className="block text-center mt-5 uppercase">
              total billetes de diezmil
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.total_billete_diezmil}
              name="total_billete_diezmil"
            />

            <label className="block text-center mt-5 uppercase">
              cantidad billetes de cincomil
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.canti_billete_cincomil}
              name="canti_billete_cincomil"
            />

            <label className="block text-center mt-5 uppercase">
              total billetes de cincomil
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.total_billete_cincomil}
              name="total_billete_cincomil"
            />

            <label className="block text-center mt-5 uppercase">
              cantidad billetes de dosmil
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.canti_billete_dosmil}
              name="canti_billete_dosmil"
            />

            <label className="block text-center mt-5 uppercase">
              total billete de dosmil
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.total_billete_dosmil}
              name="total_billete_dosmil"
            />

            <label className="block text-center mt-5 uppercase">
              cantidad billetes de mil
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.canti_billete_mil}
              name="canti_billete_mil"
            />

            <label className="block text-center mt-5 uppercase">
              total billetes de mil
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.total_billete_mil}
              name="total_billete_mil"
            />

            <label className="block text-center mt-5 uppercase">
              cantidad monedas de mil
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.canti_moneda_mil}
              name="canti_moneda_mil"
            />

            <label className="block text-center mt-5 uppercase">
              total monedas de mil
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.total_moneda_mil}
              name="total_moneda_mil"
            />

            <label className="block text-center mt-5 uppercase">
              cantidad monedasde quinientos
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.canti_moneda_quinientos}
              name="canti_moneda_quinientos"
            />

            <label className="block text-center mt-5 uppercase">
              total monedas de quinientos
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.total_moneda_quinientos}
              name="total_moneda_quinientos"
            />

            <label className="block text-center mt-5 uppercase">
              cantidad monedas de docientos
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.canti_moneda_docientos}
              name="canti_moneda_docientos"
            />

            <label className="block text-center mt-5 uppercase">
              total monedas de docientos
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.total_moneda_docientos}
              name="total_moneda_docientos"
            />

            <label className="block text-center mt-5 uppercase">
              cantidad monedas de cien
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.canti_moneda_cien}
              name="canti_moneda_cien"
            />

            <label className="block text-center mt-5 uppercase">
              total monedas de cien
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.total_moneda_cien}
              name="total_moneda_cien"
            />

            <label className="block text-center mt-5 uppercase">
              canti monedas de cincuenta
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.canti_moneda_cincuenta}
              name="canti_moneda_cincuenta"
            />

            <label className="block text-center mt-5 uppercase">
              total monedas de ciencuenta
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.total_moneda_ciencuenta}
              name="total_moneda_ciencuenta"
            />

            <label className="block text-center mt-5 uppercase">
              total efectivo
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.total_efectivo}
              name="total_efectivo"
            />

            <label className="block text-center mt-5 uppercase">
              total premioss de pagados
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.total_premios_pagados}
              name="año_total_premios_pagadosla"
            />

            <label className="block text-center mt-5 uppercase">
              base efectivos
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.base_efectivos}
              name="base_efectivos"
            />

            <label className="block text-center mt-5 uppercase">
              tirilla recaudos
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.tirilla_recaudos}
              name="tirilla_recaudos"
            />

            <label className="block text-center mt-5 uppercase">
              entrega colocador
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.entrega_colocador}
              name="entrega_colocador"
            />

            <label className="block text-center mt-5 uppercase">
              sobrante faltante de caja
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.sobrantefaltante_caja}
              name="sobrantefaltante_caja"
            />

            <label className="block text-center mt-5 uppercase">
              colocador caja fuerte
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.colocador_cajafuerte}
              name="colocador_cajafuerte"
            />

            <label className="block text-center mt-5 uppercase">
              rollos bnet
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.rollos_bnet}
              name="rollos_bnet"
            />

            <label className="block text-center mt-5 uppercase">
              rollos fisicos
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.rollos_fisicos}
              name="rollos_fisicos"
            />

            <label className="block text-center mt-5 uppercase">
              diferencia
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.diferencia}
              name="diferencia"
            />

            {(arqueo.nombre_juego !== 0) && (
              <>
                <label className="block text-center mt-5 uppercase">
                  nombre del juego1{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.nombre_juego}
                  name="nombre_juego"
                />
              </>
            )}

            {(arqueo.cantidad_bnet !== 0) && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad en bnet1{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.cantidad_bnet}
                  name="cantidad_bnet"
                />
              </>
            )}

            {(arqueo.cantidad_fisicos !== 0) && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad en fisicos1{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.cantidad_fisicos}
                  name="cantidad_fisicos"
                />
              </>
            )}

            {(arqueo.cantidad_faltante !== 0) && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad faltante a descargar1{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.cantidad_faltante}
                  name="cantidad_faltante"
                />
              </>
            )}

            {(arqueo.cantidad_tiquete !== 0) && (
              <>
                <label className="block text-center mt-5 uppercase">
                  {' '}
                  valor del tiquete1{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.cantidad_tiquete}
                  name="cantidad_tiquete"
                />
              </>
            )}

            {arqueo.descargado != null && (
              <>
                <label className="block text-center mt-5 uppercase">
                  valor descargado por juego1{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.descargado}
                  name="descargado"
                />
              </>
            )}

            {(arqueo.nombre_juego2 !== 0) && (
              <>
                <label className="block text-center mt-5 uppercase">
                  nombre del juego2{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.nombre_juego2}
                  name="nombre_juego2"
                />
              </>
            )}

            {(arqueo.cantidad_bnet2 !== 0) && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad en bnet2{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.cantidad_bnet2}
                  name="cantidad_bnet"
                />
              </>
            )}

            {(arqueo.cantidad_fisicos2 !== 0) && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad en fisicos2{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.cantidad_fisicos2}
                  name="cantidad_fisicos"
                />
              </>
            )}

            {(arqueo.cantidad_faltante2 !== 0) && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad faltante a descargar2{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.cantidad_faltante2}
                  name="cantidad_faltante"
                />
              </>
            )}

            {(arqueo.cantidad_tiquete2 !== 0) && (
              <>
                <label className="block text-center mt-5 uppercase">
                  {' '}
                  valor del tiquete2{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.cantidad_tiquete2}
                  name="cantidad_tiquete"
                />
              </>
            )}

            {(arqueo.descargado2 !== 0) && (
              <>
                <label className="block text-center mt-5 uppercase">
                  valor descargado por juego2{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.descargado2}
                  name="descargado"
                />
              </>
            )}

            {arqueo.nombre_juego3 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  nombre del juego3{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.nombre_juego3}
                  name="nombre_juego2"
                />
              </>
            )}

            {arqueo.cantidad_bnet3 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad en bnet3{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.cantidad_bnet3}
                  name="cantidad_bnet"
                />
              </>
            )}

            {arqueo.cantidad_fisicos3 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad en fisicos3{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.cantidad_fisicos3}
                  name="cantidad_fisicos"
                />
              </>
            )}

            {arqueo.cantidad_faltante3 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad faltante a descargar3{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.cantidad_faltante3}
                  name="cantidad_faltante"
                />
              </>
            )}

            {arqueo.cantidad_tiquete3 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  {' '}
                  valor del tiquete3{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.cantidad_tiquete3}
                  name="cantidad_tiquete"
                />
              </>
            )}

            {arqueo.descargado3 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  valor descargado por juego3{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.descargado3}
                  name="descargado"
                />
              </>
            )}

            {arqueo.nombre_juego4 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  nombre del juego4{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.nombre_juego4}
                  name="nombre_juego2"
                />
              </>
            )}

            {arqueo.cantidad_bnet4 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad en bnet4{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.cantidad_bnet4}
                  name="cantidad_bnet"
                />
              </>
            )}

            {arqueo.cantidad_fisicos4 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad en fisicos4{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.cantidad_fisicos4}
                  name="cantidad_fisicos"
                />
              </>
            )}

            {arqueo.cantidad_faltante4 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad faltante a descargar4{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.cantidad_faltante4}
                  name="cantidad_faltante"
                />
              </>
            )}

            {arqueo.cantidad_tiquete3 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  {' '}
                  valor del tiquete4{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.cantidad_tiquete3}
                  name="cantidad_tiquete"
                />
              </>
            )}

            {arqueo.descargado4 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  valor descargado por juego4{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.descargado4}
                  name="descargado"
                />
              </>
            )}

            <label className="block text-center mt-5 uppercase">
              {' '}
              total cantidad descargados{' '}
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.totaldescargados}
              name="totaldescargados"
            />

            <label className="block text-center mt-5 uppercase">
              valor total descargado{' '}
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.totalvalor}
              name="totalvalor"
            />

            {(arqueo.requisito1.length > 0) && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿El punto de venta tiene puertacerrada con candado y/o seguro?
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito1}
                  name="requisito1"
                />
              </>
            )}

            {(arqueo.observacion1.length > 0) && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion1}
                  name="observacion1"
                />
              </>
            )}

            {arqueo.requisito2.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Tiene elementos de aseo, sillas en buen estado?
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito2}
                  name="requisito2"
                />
              </>
            )}

            {arqueo.observacion2.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion2}
                  name="observacion2"
                />
              </>
            )}

            {arqueo.requisito3.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Tiene aviso de videovigilancia y camaras?
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito3}
                  name="requisito3"
                />
              </>
            )}

            {arqueo.observacion3.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion3}
                  name="observacion3"
                />
              </>
            )}

            {arqueo.requisito4.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿El Colocador cuenta con prendas emblematicas y presentación
                  adecuada?
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito4}
                  name="requisito4"
                />
              </>
            )}

            {arqueo.observacion4.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion4}
                  name="observacion4"
                />
              </>
            )}

            {arqueo.requisito5.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿El usuario del colocador corresponde a la cedula del mismo?
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito5}
                  name="requisito4"
                />
              </>
            )}

            {arqueo.observacion5.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion5}
                  name="observacion5"
                />
              </>
            )}

            {arqueo.requisito6.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿La versión del aplicativo BNET esta actualizada?
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito6}
                  name="requisito6"
                />
              </>
            )}

            {arqueo.observacion6.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion6}
                  name="observacion6"
                />
              </>
            )}

            {arqueo.requisito7.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿El colocador ofrece los productos y servicios comercializados
                  por la empresa al 100%?
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito7}
                  name="requisito7"
                />
              </>
            )}

            {arqueo.observacion7.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion7}
                  name="observacion7"
                />
              </>
            )}

            {arqueo.requisito8.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿La publicidad exhibida en el punto de venta se encuentra
                  actualizada?
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito8}
                  name="requisito8"
                />
              </>
            )}

            {arqueo.observacion8.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion8}
                  name="observacion8"
                />
              </>
            )}

            {arqueo.requisito9.length > 0 && (
              <>
                {' '}
                <label className="block text-center mt-5 uppercase">
                  ¿El colocador solicita el documento de identificación al
                  cliente?
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito9}
                  name="requisito9"
                />
              </>
            )}
            {arqueo.observacion9.length > 0 && (
              <>
                {' '}
                <label className="block text-center mt-5 uppercase">
                  observacion{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion9}
                  name="observacion9"
                />
              </>
            )}

            {arqueo.requisito10.length > 0 && (
              <>
                {' '}
                <label className="block text-center mt-5 uppercase">
                  ¿El uso del sistema biométrico esta activo?
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito10}
                  name="requisito10"
                />
              </>
            )}
            {arqueo.observacion10.length > 0 && (
              <>
                {' '}
                <label className="block text-center mt-5 uppercase">
                  observacion{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion10}
                  name="observacion10"
                />
              </>
            )}

            {arqueo.requisito11.length > 0 && (
              <>
                {' '}
                <label className="block text-center mt-5 uppercase">
                  ¿El colocador conoce de Supervoucher, y esta en
                  funcionamiento?
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito11}
                  name="requisito11"
                />
              </>
            )}
            {arqueo.observacion11.length > 0 && (
              <>
                {' '}
                <label className="block text-center mt-5 uppercase">
                  observacion{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito11}
                  name="observacion11"
                />
              </>
            )}

            {arqueo.requisito12.length > 0 && (
              <>
                {' '}
                <label className="block text-center mt-5 uppercase">
                  ¿El Colocador conoce el procedimiento que debe realizar a
                  remitentes y destinatarios menores de edad?
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito12}
                  name="requisito12"
                />
              </>
            )}
            {arqueo.observacion12.length > 0 && (
              <>
                {' '}
                <label className="block text-center mt-5 uppercase">
                  observacion{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion12}
                  name="observacion12"
                />
              </>
            )}

            {arqueo.requisito13.length > 0 && (
              <>
                {' '}
                <label className="block text-center mt-5 uppercase">
                  ¿El colocador conoce los reportes de operaciones en efectivo
                  (R.O.E) firmas, huellas. (Transacciones &gt;=$10.000.000)?
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito13}
                  name="requisito13"
                />
              </>
            )}
            {arqueo.observacion9.length > 0 && (
              <>
                {' '}
                <label className="block text-center mt-5 uppercase">
                  observacion{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion13}
                  name="observacion13"
                />
              </>
            )}

            {arqueo.requisito14.length > 0 && (
              <>
                {' '}
                <label className="block text-center mt-5 uppercase">
                  ¿Tiene aviso externo que indica Vigilado y Controlado Mintic y
                  Colaborador Autorizado?
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito14}
                  name="requisito14"
                />
              </>
            )}
            {arqueo.observacion14.length > 0 && (
              <>
                {' '}
                <label className="block text-center mt-5 uppercase">
                  observacion{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion14}
                  name="observacion14"
                />
              </>
            )}

            {arqueo.requisito15.length > 0 && (
              <>
                {' '}
                <label className="block text-center mt-5 uppercase">
                  ¿Tiene cuadro Banner con la marca SuperGIROS (aviso de canales
                  de comunicación)?
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito15}
                  name="requisito15"
                />
              </>
            )}
            {arqueo.observacion15.length > 0 && (
              <>
                {' '}
                <label className="block text-center mt-5 uppercase">
                  observacion{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito15}
                  name="observacion15"
                />
              </>
            )}

            {arqueo.requisito16.length > 0 && (
              <>
                {' '}
                <label className="block text-center mt-5 uppercase">
                  ¿Tiene afiche normativo visible o tarifario con las
                  condiciones del servicio?{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito16}
                  name="requisito16"
                />
              </>
            )}
            {arqueo.observacion16.length > 0 && (
              <>
                {' '}
                <label className="block text-center mt-5 uppercase">
                  observacion{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion16}
                  name="observacion16"
                />
              </>
            )}

            {arqueo.requisito17.length > 0 && (
              <>
                {' '}
                <label className="block text-center mt-5 uppercase">
                  ¿Cuenta con sticker tirilla electronica CRC ?
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito17}
                  name="requisito17"
                />
              </>
            )}
            {arqueo.observacion17.length > 0 && (
              <>
                {' '}
                <label className="block text-center mt-5 uppercase">
                  observacion{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion17}
                  name="observacion17"
                />
              </>
            )}

            {arqueo.requisito18.length > 0 && (
              <>
                {' '}
                <label className="block text-center mt-5 uppercase">
                  ¿Tiene normativa Giros Internacionales, camara o lector five y
                  Sticker de pagos internacionales?
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito18}
                  name="requisito18"
                />
              </>
            )}
            {arqueo.observacion18.length > 0 && (
              <>
                {' '}
                <label className="block text-center mt-5 uppercase">
                  observacion{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion18}
                  name="observacion18"
                />
              </>
            )}

            {arqueo.requisito19.length > 0 && (
              <>
                {' '}
                <label className="block text-center mt-5 uppercase">
                  ¿El Supervisor Comercial realiza las visitas constantemente,
                  da buen trato y suministra los insumos a tiempo? Cantidad de
                  visitas del Supervisor Comercial al mes?
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito19}
                  name="requisito19"
                />
              </>
            )}
            {arqueo.observacion19.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion19}
                  name="observacion19"
                />
              </>
            )}

            {arqueo.requisito20.length > 0 && (
              <>
                {' '}
                <label className="block text-center mt-5 uppercase">
                  ¿Las recargas efectuadas por el Colocador se trasmiten a
                  través de la red propia de la empresa?
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito20}
                  name="requisito20"
                />
              </>
            )}
            {arqueo.observacion20.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion20}
                  name="observacion20"
                />
              </>
            )}

            {arqueo.requisito21.length > 0 && (
              <>
                {' '}
                <label className="block text-center mt-5 uppercase">
                  ¿La lotería física tiene impreso el nombre de la empresa, de
                  no ser asi reportar inmediatamente?
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito21}
                  name="requisito21"
                />
              </>
            )}
            {arqueo.observacion21.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion21}
                  name="observacion21"
                />
              </>
            )}

            {arqueo.requisito22.length > 0 && (
              <>
                {' '}
                <label className="block text-center mt-5 uppercase">
                  ¿El punto de venta tiene caja fuerte y caja digital? el
                  responsable tiene conocimiento sobre las bases de efectivo
                  asignadas para caja auxiliar y caja digital?
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito22}
                  name="requisito22"
                />
              </>
            )}
            {arqueo.observacion22.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion22}
                  name="observacion22"
                />
              </>
            )}

            {arqueo.requisito23.length > 0 && (
              <>
                {' '}
                <label className="block text-center mt-5 uppercase">
                  ¿Se cumple con los topes de efectivo establecidos para la caja
                  digital y caja auxiliar (ptos de venta con giros)?
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito23}
                  name="requisito23"
                />
              </>
            )}
            {arqueo.observacion23.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion23}
                  name="observacion23"
                />
              </>
            )}

            {arqueo.requisito24.length > 0 && (
              <>
                {' '}
                <label className="block text-center mt-5 uppercase">
                  ¿El colocador tiene conocimiento sobre los montos máximos para
                  pago de premios?
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito24}
                  name="requisito24"
                />
              </>
            )}
            {arqueo.observacion24.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion24}
                  name="observacion24"
                />
              </>
            )}

            {arqueo.requisito25.length > 0 && (
              <>
                {' '}
                <label className="block text-center mt-5 uppercase">
                  ¿El colocador conoce los requisitos para pago de premios?
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito25}
                  name="requisito25"
                />
              </>
            )}
            {arqueo.observacion25.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion25}
                  name="observacion25"
                />
              </>
            )}

            {arqueo.requisito26.length > 0 && (
              <>
                {' '}
                <label className="block text-center mt-5 uppercase">
                  ¿Tiene buzon de PQR, formato de gane y de giros?{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito26}
                  name="requisito26"
                />
              </>
            )}
            {arqueo.observacion26.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion26}
                  name="observacion26"
                />
              </>
            )}

            {arqueo.requisito27.length > 0 && (
              <>
                {' '}
                <label className="block text-center mt-5 uppercase">
                  ¿El Colocador cuenta con las bases acerca del SARL, SARLAFT,
                  SARO?
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito27}
                  name="requisito27"
                />
              </>
            )}
            {arqueo.observacion27.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion27}
                  name="observacion27"
                />
              </>
            )}

            {arqueo.requisito28.length > 0 && (
              <>
                {' '}
                <label className="block text-center mt-5 uppercase">
                  ¿El Colocador conoce la definición de operación inusual y
                  operación sospechosa?
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito28}
                  name="requisito28"
                />
              </>
            )}
            {(arqueo.requisito29.length > 0) && (
              <>
                <label className="block text-center mt-5 uppercase">
                  VERIFICACION INSUMOS PARA PREVENCION DE COVID 19
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito29}
                  name="requisito29"
                />
              </>
            )}

            {(arqueo.requisito30.length > 0) && (
              <>
                {' '}
                <label className="block text-center mt-5 uppercase">
                  ¿Tapabocas?
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito30}
                  name="requisito30"
                />
              </>
            )}

            <label className="block text-center mt-5 uppercase">longitud</label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.longitud}
              name="longitud"
            />

            <label className="block text-center mt-5 uppercase">
              fecha visita
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.fechavisita}
              name="fechavisita"
            />

            <label className="block text-center mt-5 uppercase">
              hora visita
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.horavisita}
              name="horavisita"
            />

            <label className="block text-center mt-5 uppercase">latitud</label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.latitud}
              name="latitud"
            />

            <label className="block text-center mt-5 uppercase">longitud</label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.longitud}
              name="longitud"
            />

            <label className="block text-center mt-5 uppercase">nombre observacion</label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              disabled
              defaultValue={arqueo.nombre_observacion}
              name="nombre observacion"
            />

            <div className="grid grid-cols-4 gap-4 mt-5">
              <div className="flex flex-col items-center">
                {arqueo.imagen_observacion != null && (
                  <>
                    <h4 className="block uppercase">imagen observacion</h4>
                    <img
                      src={`data:image/png;base64,${arqueo.imagen_observacion}`}
                      className="w-full h-40 mt-7 rotate-90 object-contain"
                      alt="imagen observacion"
                    />
                  </>
                )}
              </div>

              <div>
                {arqueo.firma_auditoria != null && (
                  <>
                    <h4 className="block uppercase">Firma Auditoria</h4>
                    <img
                      src={`data:image/png;base64,${arqueo.firma_auditoria}`}
                      className="w-30 h-20 mt-2"
                      alt="Firma Auditoria"
                    />
                  </>
                )}
              </div>
              <div>
                {arqueo.firma_colocadora != null && (
                  <>
                    <h4 className="block uppercase">Firma Colocadora</h4>
                    <img
                      src={`data:image/png;base64,${arqueo.firma_colocadora}`}
                      className="w-30 h-20 mt-2"
                      alt="Firma Colocadora"
                    />
                  </>
                )}
              </div>
            </div>
          </Card>
        ))

      }
    </>
  )
}

export default ArqueoForm
