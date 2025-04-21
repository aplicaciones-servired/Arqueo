import React from 'react'
import { Document, Text, Page, StyleSheet, View, Image } from '@react-pdf/renderer'
import servired from '../components/img/servired.png'
import multired from '../components/img/multired.png'

const styles = StyleSheet.create({
  Page: {
    padding: '10px'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: '24',
    textAlign: 'center',
    color: 'black',
    marginTop: '5px',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  text: {
    fontSize: '13',
    color: 'black',
    fontWeight: 'bold',
    marginTop: '10px'
  },
  image: {
    width: '200px',
    height: '100px'
  },
  images: {
    width: '200px',
    height: '200px'
  },
  hr: {
    backgroundColor: 'black',
    height: '2px'
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 10,
    textAlign: 'center',
    fontSize: 12
  }
}
)

export interface Datos {
  supervisor: string
  nombre_supervisor: string
  documento: string
  ip: string
  nombres: string
  sucursal: string
  puntodeventa: string
  ventabruta: string
  baseefectivo: string
  totalingreso: string
  chancesabonados: string
  chancespreimpresos: string
  premiospagados: string
  efectivocajafuerte: string
  tirillarecaudo: string
  totalegresos: string
  totalbilletes: string
  totalmonedas: string
  totalarqueo: string
  sobrantefaltante: string
  totalbilletescaja: string
  totalmonedascaja: string
  totalpremioscaja: string
  total: string
  rollos_bnet: string
  rollos_fisicos: string
  diferencia: string
  nombre_juego?: string
  cantidad_bnet?: string
  cantidad_fisicos?: string
  cantidad_faltante?: string
  cantidad_tiquete?: string
  descargado?: string
  nombre_juego2?: string
  cantidad_bnet2?: string
  cantidad_fisicos2?: string
  cantidad_faltante2?: string
  cantidad_tiquete2?: string
  descargado2?: string
  nombre_juego3?: string
  cantidad_bnet3?: string
  cantidad_fisicos3?: string
  cantidad_faltante3?: string
  cantidad_tiquete3?: string
  descargado3?: string
  nombre_juego4?: string
  cantidad_bnet4?: string
  cantidad_fisicos4?: string
  cantidad_faltante4?: string
  cantidad_tiquete4?: string
  descargado4?: string
  nombre_juego5?: string
  cantidad_bnet5?: string
  cantidad_fisicos5?: string
  cantidad_faltante5?: string
  cantidad_tiquete5?: string
  descargado5?: string
  nombre_juego6?: string
  cantidad_bnet6?: string
  cantidad_fisicos6?: string
  cantidad_faltante6?: string
  cantidad_tiquete6?: string
  descargado6?: string
  nombre_juego7?: string
  cantidad_bnet7?: string
  cantidad_fisicos7?: string
  cantidad_faltante7?: string
  cantidad_tiquete7?: string
  descargado7?: string
  totaldescargados?: string
  totalvalor?: string
  requisito1: string
  observacion1?: string
  requisito2: string
  observacion2?: string
  requisito3: string
  observacion3?: string
  requisito4: string
  observacion4?: string
  requisito5: string
  observacion5?: string
  requisito6: string
  observacion6?: string
  requisito7: string
  observacion7?: string
  requisito8: string
  observacion8?: string
  requisito9: string
  observacion9?: string
  requisito10: string
  observacion10?: string
  requisito11: string
  observacion11?: string
  requisito12: string
  observacion12?: string
  requisito13: string
  observacion13?: string
  requisito14: string
  observacion14?: string
  requisito15: string
  observacion15?: string
  requisito16: string
  observacion16?: string
  requisito17: string
  observacion17?: string
  requisito18: string
  observacion18?: string
  requisito19: string
  observacion19?: string
  requisito20: string
  observacion20?: string
  requisito21: string
  observacion21?: string
  requisito22: string
  observacion22?: string
  requisito23: string
  observacion23?: string
  requisito24: string
  observacion24?: string
  requisito25: string
  observacion25?: string
  requisito26: string
  observacion26?: string
  requisito27: string
  observacion27?: string
  requisito28: string
  observacion28?: string
  requisito29: string
  observacion29?: string
  requisito30: string
  observacion30?: string
  requisito31: string
  observacion31?: string
  requisito32: string
  observacion32?: string
  requisito33?: string
  observacion33?: string
  requisito34?: string
  observacion34?: string
  requisito35?: string
  observacion35?: string
  fechavisita: string
  horavisita: string
  nombre_observacion?: string
  imagen_observacion: string
  firma_auditoria: string
  firma_colocadora: string
}

export const PDF: React.FC<{ datos: Datos, company: string }> = ({ datos, company }) => {
  if (company === 'Multired') { company = multired }
  if (company === 'Servired') { company = servired }

  return (
        <Document>
            <Page style={styles.Page}>
                <View style={styles.header}>
                    <Image src={company} style={styles.image} />
                </View>
                <View style={styles.hr}></View>
                <View>
                    <Text style={styles.title}>Reporte Arqueo</Text>
                    <Text style={styles.text}>Supervisor: {datos.supervisor}</Text>
                    <Text style={styles.text}>nombre supervisor: {datos.nombre_supervisor}</Text>
                    <Text style={styles.text}> Documento: {datos.documento}</Text>
                    <Text style={styles.text}> ip: {datos.ip}</Text>
                    <Text style={styles.text}> nombres: {datos.nombres}</Text>
                    <Text style={styles.text}> sucursal: {datos.sucursal}</Text>
                    <Text style={styles.text}> punto de venta: {datos.puntodeventa}</Text>
                    <Text style={styles.text}> ventabruta: {datos.ventabruta}</Text>
                    <Text style={styles.text}> baseefectivo: {datos.baseefectivo}</Text>
                    <Text style={styles.text}> totalingreso: {datos.totalingreso}</Text>
                    <Text style={styles.text}> chancesabonados: {datos.chancesabonados}</Text>
                    <Text style={styles.text}> chancespreimpresos: {datos.chancespreimpresos}</Text>
                    <Text style={styles.text}> premiospagados: {datos.premiospagados}</Text>
                    <Text style={styles.text}> efectivocajafuerte: {datos.efectivocajafuerte}</Text>
                    <Text style={styles.text}> tirillarecaudo: {datos.tirillarecaudo}</Text>
                    <Text style={styles.text}> totalegresos: {datos.totalegresos}</Text>
                    <Text style={styles.text}> totalbilletes: {datos.totalbilletes}</Text>
                    <Text style={styles.text}> totalmonedas: {datos.totalmonedas}</Text>
                    <Text style={styles.text}> totalarqueo: {datos.totalarqueo}</Text>
                    <Text style={styles.text}> total billetes caja: {datos.totalbilletescaja}</Text>
                    <Text style={styles.text}> sobrantefaltante: {datos.sobrantefaltante}</Text>
                    <Text style={styles.text}> total billetes caja {datos.totalbilletescaja}</Text>
                    <Text style={styles.text}> total monedas caja: {datos.totalmonedascaja}</Text>
                    <Text style={styles.text}> total premios caja: {datos.totalpremioscaja}</Text>
                    <Text style={styles.text}> total: {datos.total}</Text>
                    <Text style={styles.text}> rollos en bnet: {datos.rollos_bnet}</Text>
                    <Text style={styles.text}> rollos fisicos: {datos.rollos_fisicos}</Text>
                    <Text style={styles.text}> diferencia: {datos.diferencia}</Text>
                    if ({datos.nombre_juego}) {
                        <Text style={styles.text}> nombre del juego 1: {datos.nombre_juego} </Text>
                    }
                    if ({datos.cantidad_bnet}) {
                        <Text style={styles.text}> cantidad en bnet: {datos.cantidad_bnet} </Text>
                    }
                    if ({datos.cantidad_fisicos}) {
                        <Text style={styles.text}> cantidad en fisicos: {datos.cantidad_fisicos} </Text>
                    }
                    if ({datos.cantidad_faltante}) {
                        <Text style={styles.text}> cantidad faltante a descargar: {datos.cantidad_faltante} </Text>
                    }
                    if ({datos.cantidad_tiquete}) {
                        <Text style={styles.text}> valor del tiquete: {datos.cantidad_tiquete} </Text>
                    }
                    if ({datos.descargado}) {
                        <Text style={styles.text}> valor descargado por juego : {datos.descargado} </Text>
                    }
                    if ({datos.nombre_juego2}) {
                        <Text style={styles.text}> nombre del juego 2: {datos.nombre_juego2} </Text>
                    }
                    if ({datos.cantidad_bnet2}) {
                        <Text style={styles.text}> cantidad en bnet: {datos.cantidad_bnet2} </Text>
                    }
                    if ({datos.cantidad_fisicos2}) {
                        <Text style={styles.text}> cantidad en fisicos: {datos.cantidad_fisicos2} </Text>
                    }
                    if ({datos.cantidad_faltante2}) {
                        <Text style={styles.text}> cantidad faltante a descargar: {datos.cantidad_faltante2} </Text>
                    }
                    if ({datos.cantidad_tiquete2}) {
                        <Text style={styles.text}> valor del tiquete: {datos.cantidad_tiquete2} </Text>
                    }
                    if ({datos.descargado2}) {
                        <Text style={styles.text}> valor descargado por juego : {datos.descargado2} </Text>
                    }
                    if ({datos.nombre_juego3}) {
                        <Text style={styles.text}> nombre del juego 3: {datos.nombre_juego3} </Text>
                    }
                    if ({datos.cantidad_bnet3}) {
                        <Text style={styles.text}> cantidad en bnet: {datos.cantidad_bnet3} </Text>
                    }
                    if ({datos.cantidad_fisicos3}) {
                        <Text style={styles.text}> cantidad en fisicos: {datos.cantidad_fisicos3} </Text>
                    }
                    if ({datos.cantidad_faltante3}) {
                        <Text style={styles.text}> cantidad faltante a descargar: {datos.cantidad_faltante3} </Text>
                    }
                    if ({datos.cantidad_tiquete3}) {
                        <Text style={styles.text}> valor del tiquete: {datos.cantidad_tiquete3} </Text>
                    }
                    if ({datos.descargado3}) {
                        <Text style={styles.text}> valor descargado por juego : {datos.descargado3} </Text>
                    }
                    if ({datos.nombre_juego4}) {
                        <Text style={styles.text}> nombre del juego 4: {datos.nombre_juego4} </Text>
                    }
                    if ({datos.cantidad_bnet4}) {
                        <Text style={styles.text}> cantidad en bnet: {datos.cantidad_bnet4} </Text>
                    }
                    if ({datos.cantidad_fisicos4}) {
                        <Text style={styles.text}> cantidad en fisicos: {datos.cantidad_fisicos4} </Text>
                    }
                    if ({datos.cantidad_faltante4}) {
                        <Text style={styles.text}> cantidad faltante a descargar: {datos.cantidad_faltante4} </Text>
                    }
                    if ({datos.cantidad_tiquete4}) {
                        <Text style={styles.text}> valor del tiquete: {datos.cantidad_tiquete4} </Text>
                    }
                    if ({datos.descargado4}) {
                        <Text style={styles.text}> valor descargado por juego : {datos.descargado4} </Text>
                    }
                    if ({datos.nombre_juego5}) {
                        <Text style={styles.text}> nombre del juego 5: {datos.nombre_juego5} </Text>
                    }
                    if ({datos.cantidad_bnet5}) {
                        <Text style={styles.text}> cantidad en bnet: {datos.cantidad_bnet5} </Text>
                    }
                    if ({datos.cantidad_fisicos5}) {
                        <Text style={styles.text}> cantidad en fisicos: {datos.cantidad_fisicos5} </Text>
                    }
                    if ({datos.cantidad_faltante5}) {
                        <Text style={styles.text}> cantidad faltante a descargar: {datos.cantidad_faltante5} </Text>
                    }
                    if ({datos.cantidad_tiquete5}) {
                        <Text style={styles.text}> valor del tiquete: {datos.cantidad_tiquete5} </Text>
                    }
                    if ({datos.descargado5}) {
                        <Text style={styles.text}> valor descargado por juego : {datos.descargado5} </Text>
                    }
                    if ({datos.nombre_juego6}) {
                        <Text style={styles.text}> nombre del juego 6: {datos.nombre_juego6} </Text>
                    }
                    if ({datos.cantidad_bnet6}) {
                        <Text style={styles.text}> cantidad en bnet: {datos.cantidad_bnet6} </Text>
                    }
                    if ({datos.cantidad_fisicos6}) {
                        <Text style={styles.text}> cantidad en fisicos: {datos.cantidad_fisicos6} </Text>
                    }
                    if ({datos.cantidad_faltante6}) {
                        <Text style={styles.text}> cantidad faltante a descargar: {datos.cantidad_faltante6} </Text>
                    }
                    if ({datos.cantidad_tiquete6}) {
                        <Text style={styles.text}> valor del tiquete: {datos.cantidad_tiquete6} </Text>
                    }
                    if ({datos.descargado6}) {
                        <Text style={styles.text}> valor descargado por juego : {datos.descargado6} </Text>
                    }
                    if ({datos.nombre_juego7}) {
                        <Text style={styles.text}> nombre del juego 7: {datos.nombre_juego7} </Text>
                    }
                    if ({datos.cantidad_bnet7}) {
                        <Text style={styles.text}> cantidad en bnet: {datos.cantidad_bnet7} </Text>
                    }
                    if ({datos.cantidad_fisicos7}) {
                        <Text style={styles.text}> cantidad en fisicos: {datos.cantidad_fisicos7} </Text>
                    }
                    if ({datos.cantidad_faltante7}) {
                        <Text style={styles.text}> cantidad faltante a descargar: {datos.cantidad_faltante7} </Text>
                    }
                    if ({datos.cantidad_tiquete7}) {
                        <Text style={styles.text}> valor del tiquete: {datos.cantidad_tiquete7} </Text>
                    }
                    if ({datos.descargado7}) {
                        <Text style={styles.text}> valor descargado por juego : {datos.descargado7} </Text>
                    }
                    if ({datos.totaldescargados}) {
                        <Text style={styles.text}> total cantidad descargados: {datos.totaldescargados} </Text>
                    }
                    if ({datos.totaldescargados}) {
                        <Text style={styles.text}> total cantidad descargados: {datos.totaldescargados} </Text>
                    }
                    if ({datos.totalvalor}) {
                        <Text style={styles.text}> valor total descargado : {datos.totalvalor} </Text>
                    }

                    <Text style={styles.text}> ¿Tiene la puerta asegurada?:  {datos.requisito1}</Text>
                    if ({datos.observacion1}) {
                        <Text style={styles.text}> observacion: {datos.observacion1}</Text>
                    }

                    <Text style={styles.text}> ¿Elementos de aseo, sillas, computador, iluminación en buen estado?:  {datos.requisito2}</Text>
                    if ({datos.observacion2}) {
                        <Text style={styles.text}> observacion: {datos.observacion2}</Text>
                    }

                    <Text style={styles.text}> ¿Aviso de videovigilancia y cámaras?:  {datos.requisito3}</Text>
                    if ({datos.observacion3}) {
                        <Text style={styles.text}> observacion: {datos.observacion3}</Text>
                    }

                    <Text style={styles.text}> ¿Utiliza Superflex?:  {datos.requisito4}</Text>
                    if ({datos.observacion4}) {
                        <Text style={styles.text}> observacion: {datos.observacion4}</Text>
                    }

                    <Text style={styles.text}> ¿Tiene caja fuerte?:  {datos.requisito5}</Text>
                    if ({datos.observacion5}) {
                        <Text style={styles.text}> observacion: {datos.observacion5}</Text>
                    }

                    <Text style={styles.text}> ¿Tiene caja digital auxiliar? ¿Conoce las bases de efectivo asignadas?:  {datos.requisito6}</Text>
                    if ({datos.observacion6}) {
                        <Text style={styles.text}> observacion: {datos.observacion6}</Text>
                    }

                    <Text style={styles.text}> ¿Las recargas se hacen a través la Red propia de la Cia?:  {datos.requisito7}</Text>
                    if ({datos.observacion7}) {
                        <Text style={styles.text}> observacion: {datos.observacion7}</Text>
                    }

                    <Text style={styles.text}> ¿Cumple con los topes de efectivo establecidos en caja digital y principal?:  {datos.requisito8}</Text>
                    if ({datos.observacion8}) {
                        <Text style={styles.text}> observacion: {datos.observacion8}</Text>
                    }

                    <Text style={styles.text}> ¿Tiene los premios descargados? ¿Conoce los montos máximos para pago?:  {datos.requisito9}</Text>
                    if ({datos.observacion9}) {
                        <Text style={styles.text}> observacion: {datos.observacion9}</Text>
                    }

                    <Text style={styles.text}> ¿La lotería física tiene impreso el nombre de la Cia?:  {datos.requisito10}</Text>
                    if ({datos.observacion10}) {
                        <Text style={styles.text}> observacion: {datos.observacion10}</Text>
                    }

                    <Text style={styles.text}> ¿Publicidad exhibida actualizada?: {datos.requisito11}</Text>
                    if ({datos.observacion11}) {
                        <Text style={styles.text}> observacion: {datos.observacion11}</Text>
                    }

                    <Text style={styles.text}> ¿Aviso externo de &quot;Vigilado y Controlado Mintic&quot; y &quot;Colaborador Autorizado&quot;?: {datos.requisito12}</Text>
                    if ({datos.observacion12}) {
                        <Text style={styles.text}> observacion: {datos.observacion12}</Text>
                    }

                    <Text style={styles.text}> ¿Afiche MINTIC SUPERGIROS (contiene aviso de canales de comunicación, o tarifario condiciones del servicio, sticker tirilla electronica CRC)?: {datos.requisito13}</Text>
                    if ({datos.observacion13}) {
                        <Text style={styles.text}> observacion: {datos.observacion13}</Text>
                    }

                    <Text style={styles.text}> ¿Calendario resultados Superastro diligenciado (tiene que tener los resultados)?: {datos.requisito14}</Text>
                    if ({datos.observacion14}) {
                        <Text style={styles.text}> observacion: {datos.observacion14}</Text>
                    }

                    <Text style={styles.text}> ¿Presta servicio de Western Union (es obligatorio para cajeros digitales)?: {datos.requisito15}</Text>
                    if ({datos.observacion15}) {
                        <Text style={styles.text}> observacion: {datos.observacion15}</Text>
                    }

                    <Text style={styles.text}> ¿Calendarios de acumulados (Baloto - Miloto - Colorloto)?: {datos.requisito16}</Text>
                    if ({datos.observacion16}) {
                        <Text style={styles.text}> observacion: {datos.observacion16}</Text>
                    }

                    <Text style={styles.text}> ¿Tablero de resultados y acumulados actualizados?: {datos.requisito17}</Text>
                    if ({datos.observacion17}) {
                        <Text style={styles.text}> observacion: {datos.observacion17}</Text>
                    }

                    <Text style={styles.text}> ¿Licencia de funcionamiento de Beneficencia del Valle con año actualizado?: {datos.requisito18}</Text>
                    if ({datos.observacion18}) {
                        <Text style={styles.text}> observacion: {datos.observacion18}</Text>
                    }

                    <Text style={styles.text}> ¿Tiene equipos de Betplay y/o máquinas de ruta? Si los tiene debe tener el aviso &quot;Autoriza Coljuegos&quot;: {datos.requisito19}</Text>
                    if ({datos.observacion19}) {
                        <Text style={styles.text}> observacion: {datos.observacion19}</Text>
                    }

                    <Text style={styles.text}> ¿Tiene aviso código QR para PQR?: {datos.requisito20}</Text>
                    if ({datos.observacion20}) {
                        <Text style={styles.text}> observacion: {datos.observacion20}</Text>
                    }

                    <Text style={styles.text}> ¿Verificar el cableado?: {datos.requisito21}</Text>
                    if ({datos.observacion21}) {
                        <Text style={styles.text}> observacion: {datos.observacion21}</Text>
                    }

                    <Text style={styles.text}> ¿Tiene prendas emblemáticas y presentación adecuada?: {datos.requisito22}</Text>
                    if ({datos.observacion22}) {
                        <Text style={styles.text}> observacion: {datos.observacion22}</Text>
                    }

                    <Text style={styles.text}> ¿El usuario corresponde a la cédula del mismo?: {datos.requisito23}</Text>
                    if ({datos.observacion23}) {
                        <Text style={styles.text}> observacion: {datos.observacion23}</Text>
                    }

                    <Text style={styles.text}> ¿Tiene usuario de giros? ¿Presta el servicio?: {datos.requisito24}</Text>
                    if ({datos.observacion24}) {
                        <Text style={styles.text}> observacion: {datos.observacion24}</Text>
                    }

                    <Text style={styles.text}> ¿Tiene usuario de la ONJ (para Baloto, Miloto, Colorloto)?: {datos.requisito25}</Text>
                    if ({datos.observacion25}) {
                        <Text style={styles.text}> observacion: {datos.observacion25}</Text>
                    }

                    <Text style={styles.text}> ¿Tiene usuario de SUPERFLEX?: {datos.requisito26}</Text>
                    if ({datos.observacion26}) {
                        <Text style={styles.text}> observacion: {datos.observacion26}</Text>
                    }

                    <Text style={styles.text}> ¿Tiene usuario de CORREDOR EMPRESARIAL (astro, chance millonario, Betplay)?: {datos.requisito27}</Text>
                    if ({datos.observacion27}) {
                        <Text style={styles.text}> observacion: {datos.observacion27}</Text>
                    }

                    <Text style={styles.text}> ¿Está realizando recaudo en tesorería BNET a la compañera?: {datos.requisito28}</Text>
                    if ({datos.observacion28}) {
                        <Text style={styles.text}> observacion: {datos.observacion28}</Text>
                    }

                    <Text style={styles.text}> ¿Está comercializando el portafolio completo?: {datos.requisito29}</Text>
                    if ({datos.observacion29}) {
                        <Text style={styles.text}> observacion: {datos.observacion29}</Text>
                    }

                    <Text style={styles.text}> ¿Solicita el documento de identificación al cliente?: {datos.requisito30}</Text>
                    if ({datos.observacion30}) {
                        <Text style={styles.text}> observacion: {datos.observacion30}</Text>
                    }

                    <Text style={styles.text}> ¿Conoce Supervoucher, funciona?: {datos.requisito31}</Text>
                    if ({datos.observacion31}) {
                        <Text style={styles.text}> observacion: {datos.observacion31}</Text>
                    }

                    <Text style={styles.text}> ¿Conoce el procedimiento para remitentes y destinatarios menores de edad?: {datos.requisito32}</Text>
                    if ({datos.observacion32}) {
                        <Text style={styles.text}> observacion: {datos.observacion32}</Text>
                    }

                    <Text style={styles.text}> ¿Conoce los reportes de operaciones en efectivo (R.O.E) firmas, huellas? (Transacciones &gt;=$10.000.000): {datos.requisito33}</Text>
                    if ({datos.observacion33}) {
                        <Text style={styles.text}> observacion: {datos.observacion33}</Text>
                    }

                    <Text style={styles.text}> ¿El Supervisor Cial realiza las visitas?: {datos.requisito34}</Text>
                    if ({datos.observacion34}) {
                        <Text style={styles.text}> observacion: {datos.observacion34}</Text>
                    }

                    <Text style={styles.text}> ¿Conoce los términos SARL, SARLAFT, SARO, operación inusual y operación sospechosa?: {datos.requisito35}</Text>
                    if ({datos.observacion35}) {
                        <Text style={styles.text}> observacion: {datos.observacion35}</Text>
                    }

                    <Text style={styles.text}> fechavisita:  {datos.fechavisita}</Text>
                    <Text style={styles.text}> horavisita:  {datos.horavisita}</Text>
                    if ({datos.nombre_observacion}) {
                        <Text style={styles.text}> nombre de la observacion: {datos.nombre_observacion}</Text>
                    }
                </View >
                <View >
                    <Text style={styles.text}>Imagen Observación:</Text>
                    <Image src={`data:image/jpeg;base64,${datos.imagen_observacion}`} style={styles.image} />

                </View>
                <View >
                    <Text style={styles.text}>Firma Auditoría:</Text>
                    <Image src={`data:image/png;base64,${datos.firma_auditoria}`} style={styles.image} />
                </View>
                <View >
                    <Text style={styles.text}>firma colocadora:</Text>
                    <Image src={`data:image/png;base64,${datos.firma_colocadora}`} style={styles.image} />
                </View>
                <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
                    `Página ${pageNumber} de ${totalPages}`
                )} fixed />
            </Page >
        </Document >
  )
}
