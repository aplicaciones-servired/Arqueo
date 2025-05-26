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

const ArqueoForm = (): JSX.Element => {
  const { username } = useAuth()
  const company = username.company
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

                <PDFDownloadLink document={<PDF datos={arqueo as unknown as Datos} company={company ?? ''} />} fileName="ARQUEO.PDF">
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
              total billetes caja
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              name="totalbilletescaja"
              disabled
              defaultValue={arqueo.totalbilletescaja}
            />

            <label className="block text-center mt-5 uppercase">
              total monedas caja
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              name="totalmonedascaja"
              disabled
              defaultValue={arqueo.totalmonedascaja}
            />

            <label className="block text-center mt-5 uppercase">
              total premios caja
            </label>
            <input
              className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
              type="text"
              name="totalpremioscaja"
              disabled
              defaultValue={arqueo.totalpremioscaja}
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

            {arqueo.cantidad_tiquete4 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  {' '}
                  valor del tiquete4{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.cantidad_tiquete4}
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

            {arqueo.nombre_juego5 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  nombre del juego5{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.nombre_juego5}
                  name="nombre_juego2"
                />
              </>
            )}

            {arqueo.cantidad_bnet5 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad en bnet5{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.cantidad_bnet5}
                  name="cantidad_bnet"
                />
              </>
            )}

            {arqueo.cantidad_fisicos5 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad en fisicos5{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.cantidad_fisicos5}
                  name="cantidad_fisicos"
                />
              </>
            )}

            {arqueo.cantidad_faltante5 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad faltante a descargar5{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.cantidad_faltante5}
                  name="cantidad_faltante"
                />
              </>
            )}

            {arqueo.cantidad_tiquete5 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  {' '}
                  valor del tiquete5{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.cantidad_tiquete5}
                  name="cantidad_tiquete"
                />
              </>
            )}

            {arqueo.descargado5 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  valor descargado por juego5{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.descargado5}
                  name="descargado"
                />
              </>
            )}

            {arqueo.nombre_juego6 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  nombre del juego6{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.nombre_juego6}
                  name="nombre_juego2"
                />
              </>
            )}

            {arqueo.cantidad_bnet6 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad en bnet6{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.cantidad_bnet6}
                  name="cantidad_bnet"
                />
              </>
            )}

            {arqueo.cantidad_fisicos6 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad en fisicos6{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.cantidad_fisicos6}
                  name="cantidad_fisicos"
                />
              </>
            )}

            {arqueo.cantidad_faltante6 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad faltante a descargar6{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.cantidad_faltante6}
                  name="cantidad_faltante"
                />
              </>
            )}

            {arqueo.cantidad_tiquete6 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  {' '}
                  valor del tiquete6{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.cantidad_tiquete6}
                  name="cantidad_tiquete"
                />
              </>
            )}

            {arqueo.descargado6 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  valor descargado por juego6{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.descargado6}
                  name="descargado"
                />
              </>
            )}

            {arqueo.nombre_juego7 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  nombre del juego7{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.nombre_juego7}
                  name="nombre_juego2"
                />
              </>
            )}

            {arqueo.cantidad_bnet7 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad en bnet7{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.cantidad_bnet7}
                  name="cantidad_bnet"
                />
              </>
            )}

            {arqueo.cantidad_fisicos7 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad en fisicos7{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.cantidad_fisicos7}
                  name="cantidad_fisicos"
                />
              </>
            )}

            {arqueo.cantidad_faltante7 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  cantidad faltante a descargar7{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.cantidad_faltante7}
                  name="cantidad_faltante"
                />
              </>
            )}

            {arqueo.cantidad_tiquete7 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  {' '}
                  valor del tiquete4{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.cantidad_tiquete7}
                  name="cantidad_tiquete"
                />
              </>
            )}

            {arqueo.descargado7 !== 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  valor descargado por juego7{' '}
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.descargado7}
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

            <label className="block text-center mt-8 uppercase font-black">
              Verificacion del PDV{' '}
            </label>

            {(arqueo.requisito1.length > 0) && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Tiene la puerta asegurada?
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
                  observacion
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
                  ¿Elementos de aseo, sillas, computador, iluminación en buen estado?
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
                  observacion
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
                  ¿Aviso de videovigilancia y cámaras?
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
                  observacion
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
                  ¿Utiliza Superflex?
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
                  observacion
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
                  ¿Tiene caja fuerte?
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito5}
                  name="requisito5"
                />
              </>
            )}

            {arqueo.observacion5.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
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
                  ¿Tiene caja digital auxiliar? ¿Conoce las bases de efectivo asignadas para caja digital y principal?
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
                  observacion
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
                  ¿Las recargas se hacen a través la Red propia de la Cia?
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
                  observacion
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
                  ¿Cumple con los topes de efectivo establecidos en caja digital y principal?
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
                  observacion
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
                <label className="block text-center mt-5 uppercase">
                  ¿Tiene los premios descargados? ¿Conoce los requisitos y montos máximos para pago de premios?
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
                <label className="block text-center mt-5 uppercase">
                  observacion
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
                <label className="block text-center mt-5 uppercase">
                  ¿La lotería física tiene impreso el nombre de la Cia o de Servicios Transaccionales?
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
                <label className="block text-center mt-5 uppercase">
                  observacion
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
                <label className="block text-center mt-5 uppercase">
                  ¿Publicidad exhibida actualizada?
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
                <label className="block text-center mt-5 uppercase">
                  observacion
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion11}
                  name="observacion11"
                />
              </>
            )}

            {arqueo.requisito12.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Aviso externo de "Vigilado y Controlado Mintic" y "Colaborador Autorizado"?
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
                <label className="block text-center mt-5 uppercase">
                  observacion
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
                <label className="block text-center mt-5 uppercase">
                  ¿Afiche MINTIC SUPERGIROS (contiene aviso de canales de comunicación, o tarifario condiciones del servicio, sticker tirilla electrónica CRC)?
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

            {arqueo.observacion13.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
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
                <label className="block text-center mt-5 uppercase">
                  ¿Calendario resultados Superastro diligenciado (tiene que tener los resultados)?
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
                <label className="block text-center mt-5 uppercase">
                  observacion
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
                <label className="block text-center mt-5 uppercase">
                  ¿Presta servicio de Western Union (es obligatorio para cajeros digitales)?
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
                <label className="block text-center mt-5 uppercase">
                  observacion
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion15}
                  name="observacion15"
                />
              </>
            )}

            {arqueo.requisito16.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Calendarios de acumulados (Baloto - Miloto - Colorloto)?
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
                <label className="block text-center mt-5 uppercase">
                  observacion
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
                <label className="block text-center mt-5 uppercase">
                  ¿Tablero de resultados y acumulados actualizados?
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
                <label className="block text-center mt-5 uppercase">
                  observacion
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
                <label className="block text-center mt-5 uppercase">
                  ¿Licencia de funcionamiento de Beneficencia del Valle con año actualizado?
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
                <label className="block text-center mt-5 uppercase">
                  observacion
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
                <label className="block text-center mt-5 uppercase">
                  ¿Tiene equipos de Betplay y/o máquinas de ruta? Si los tiene debe tener el aviso "Autoriza Coljuegos"
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
                  observacion
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
                <label className="block text-center mt-5 uppercase">
                  ¿Tiene aviso código QR para PQR?
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
                  observacion
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
                <label className="block text-center mt-5 uppercase">
                  ¿Verificar el cableado?
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
                  observacion
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

            <label className="block text-center mt-8 uppercase font-black">
              Cajero y/o Colocador I:{' '}
            </label>

            {arqueo.requisito22.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Tiene prendas emblemáticas y presentación adecuada?
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
                  observacion
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
                <label className="block text-center mt-5 uppercase">
                  ¿El usuario corresponde a la cédula del mismo?
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
                  observacion
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
                <label className="block text-center mt-5 uppercase">
                  ¿Tiene usuario de giros? ¿Presta el servicio?
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
                  observacion
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
                <label className="block text-center mt-5 uppercase">
                  ¿Tiene usuario de la ONJ (para Baloto, Miloto, Colorloto)?
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
                  observacion
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
                <label className="block text-center mt-5 uppercase">
                  ¿Tiene usuario de SUPERFLEX?
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
                  observacion
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
                <label className="block text-center mt-5 uppercase">
                  ¿Tiene usuario de CORREDOR EMPRESARIAL (astro, chance millonario, Betplay)?
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
                  observacion
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
                <label className="block text-center mt-5 uppercase">
                  ¿Está realizando recaudo en tesorería BNET a la compañera?
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

            {arqueo.observacion28.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion28}
                  name="observacion28"
                />
              </>
            )}

            {arqueo.requisito29.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Está comercializando el portafolio completo?
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

            {arqueo.observacion29.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion29}
                  name="observacion29"
                />
              </>
            )}

            {arqueo.requisito30.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Solicita el documento de identificación al cliente?
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

            {arqueo.observacion30.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion30}
                  name="observacion30"
                />
              </>
            )}

            {arqueo.requisito31.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Conoce Supervoucher, funciona?
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito31}
                  name="requisito31"
                />
              </>
            )}

            {arqueo.observacion31.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion31}
                  name="observacion31"
                />
              </>
            )}

            {arqueo.requisito32.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Conoce el procedimiento para remitentes y destinatarios menores de edad?
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito32}
                  name="requisito32"
                />
              </>
            )}

            {arqueo.observacion32.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion32}
                  name="observacion32"
                />
              </>
            )}

            {arqueo.requisito33.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Conoce los reportes de operaciones en efectivo (R.O.E) firmas, huellas? (Transacciones {'>'}= $10.000.000)
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito33}
                  name="requisito33"
                />
              </>
            )}

            {arqueo.observacion33.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion33}
                  name="observacion33"
                />
              </>
            )}

            {arqueo.requisito34.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿El Supervisor Cial realiza las visitas?
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito34}
                  name="requisito34"
                />
              </>
            )}

            {arqueo.observacion34.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion34}
                  name="observacion34"
                />
              </>
            )}

            {arqueo.requisito35.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  ¿Conoce los términos SARL, SARLAFT, SARO, operación inusual y operación sospechosa?
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.requisito35}
                  name="requisito35"
                />
              </>
            )}

            {arqueo.observacion35.length > 0 && (
              <>
                <label className="block text-center mt-5 uppercase">
                  observacion
                </label>
                <input
                  className="px-2 py-1 w-full text-center mt-2 dark:bg-dark-tremor-brand-muted dark:text-white bg-slate-300 rounded-full border cursor-not-allowed"
                  type="text"
                  disabled
                  defaultValue={arqueo.observacion35}
                  name="observacion35"
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
              {/* Imagen Observación */}
              <div className="flex flex-col items-center">
                {arqueo.imagen_observacion != null && (
                  <>
                    <h4 className="block uppercase mb-2">imagen observacion</h4>
                    <img
                      src={`data:image/png;base64,${arqueo.imagen_observacion}`}
                      className="w-40 h-40 object-contain rotate-90"
                      alt="imagen observacion"
                    />
                  </>
                )}
              </div>

              {/* Firma Auditoria */}
              <div className="flex flex-col items-center">
                {typeof arqueo.firma_auditoria === 'string' && arqueo.firma_auditoria.length < 1000000 && (
                  <>
                    <h4 className="block uppercase mb-2">Firma Auditoria</h4>
                    <img
                      src={`data:image/png;base64,${arqueo.firma_auditoria}`}
                      className="w-30 h-20 object-contain"
                      alt="Firma Auditoria"
                    />
                  </>
                )}
              </div>

              {/* Firma Colocadora */}
              <div className="flex flex-col items-center">
                {arqueo.firma_colocadora != null && (
                  <>
                    <h4 className="block uppercase mb-2">Firma Colocadora</h4>
                    <img
                      src={`data:image/png;base64,${arqueo.firma_colocadora}`}
                      className="w-30 h-20 object-contain"
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
