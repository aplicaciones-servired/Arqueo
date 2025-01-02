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
  canti_billete_cienmil: string
  total_billete_cienmil: string
  canti_billete_cincuentamil: string
  total_billete_cincuentamil: string
  canti_billete_veintemil: string
  total_billete_veintemil: string
  canti_billete_diezmil: string
  total_billete_diezmil: string
  canti_billete_cincomil: string
  total_billete_cincomil: string
  canti_billete_dosmil: string
  total_billete_dosmil: string
  canti_billete_mil: string
  canti_moneda_mil: string
  total_moneda_mil: string
  canti_moneda_quinientos: string
  total_moneda_quinientos: string
  canti_moneda_docientos: string
  total_moneda_docientos: string
  canti_moneda_cien: string
  total_moneda_cien: string
  canti_moneda_cincuenta: string
  total_moneda_ciencuenta: string
  total_efectivo: string
  canti_billete_cienmil1: string
  total_billete_cienmil1: string
  canti_billete_cincuentamil1: string
  total_billete_cincuentamil1: string
  canti_billete_veintemil1: string
  total_billete_veintemil1: string
  canti_billete_diezmil1: string
  total_billete_diezmil1: string
  canti_billete_cincomil1: string
  total_billete_cincomil1: string
  canti_billete_dosmil1: string
  total_billete_dosmil1: string
  canti_billete_mil1: string
  canti_moneda_mil1: string
  total_moneda_mil1: string
  canti_moneda_quinientos1: string
  total_moneda_quinientos1: string
  canti_moneda_docientos1: string
  total_moneda_docientos1: string
  canti_moneda_cien1: string
  total_moneda_cien1: string
  canti_moneda_cincuenta1: string
  total_moneda_ciencuenta1: string
  total_efectivo1: string
  total_premios_pagados1: string
  total: string
  total_premios_pagados: string
  entrega_colocador: string
  sobrantefaltante_caja: string
  base_efectivos: string
  tirilla_recaudos: string
  colocador_cajafuerte: string
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
  observacion112?: string
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
  requisito30: string
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
                    <Text style={styles.text}> sobrantefaltante: {datos.sobrantefaltante}</Text>
                    <Text style={styles.text}> cantida de billetes cienmil: {datos.canti_billete_cienmil}</Text>
                    <Text style={styles.text}> total billetes cienmil: {datos.total_billete_cienmil}</Text>
                    <Text style={styles.text}> cantida de billetes cincuentamil: {datos.canti_billete_cincuentamil}</Text>
                    <Text style={styles.text}> total billetes cincuentamil: {datos.total_billete_cincuentamil}</Text>
                    <Text style={styles.text}> cantida de billetes veintemil: {datos.canti_billete_veintemil}</Text>
                    <Text style={styles.text}> total billetes veintemil: {datos.total_billete_veintemil}</Text>
                    <Text style={styles.text}> cantida de billetes diezmil: {datos.canti_billete_diezmil}</Text>
                    <Text style={styles.text}> total billete diezmil: {datos.total_billete_diezmil}</Text>
                    <Text style={styles.text}> cantida de billetes cincomil: {datos.canti_billete_cincomil}</Text>
                    <Text style={styles.text}> total billetes  cincomil: {datos.total_billete_cincomil}</Text>
                    <Text style={styles.text}> cantida de billetes dosmil: {datos.canti_billete_dosmil}</Text>
                    <Text style={styles.text}> total billetes dosmil: {datos.total_billete_dosmil}</Text>
                    <Text style={styles.text}> cantida de billetes mil: {datos.canti_billete_mil}</Text>
                    <Text style={styles.text}> cantida de billetes mil: {datos.canti_billete_mil}</Text>
                    <Text style={styles.text}> cantida de monedas mil: {datos.canti_moneda_mil}</Text>
                    <Text style={styles.text}> total monedas mil: {datos.total_moneda_mil}</Text>
                    <Text style={styles.text}> cantidad de monedas quinientos: {datos.canti_moneda_quinientos}</Text>
                    <Text style={styles.text}> total  monedas de quinientos: {datos.total_moneda_quinientos}</Text>
                    <Text style={styles.text}> cantidad de monedas de cientos: {datos.canti_moneda_docientos}</Text>
                    <Text style={styles.text}> total monedas de docientos: {datos.total_moneda_docientos}</Text>
                    <Text style={styles.text}> cantidad de moneda cien: {datos.canti_moneda_cien}</Text>
                    <Text style={styles.text}> total monedas de cien: {datos.total_moneda_cien}</Text>
                    <Text style={styles.text}> cantidad monedas cincuenta: {datos.canti_moneda_cincuenta}</Text>
                    <Text style={styles.text}> total monedas de ciencuenta: {datos.total_moneda_ciencuenta}</Text>
                    <Text style={styles.text}> total efectivo: {datos.total_efectivo}</Text>
                    <Text style={styles.text}> cantida de billetes cienmil caja personal: {datos.canti_billete_cienmil1}</Text>
                    <Text style={styles.text}> total billetes cienmil caja personal: {datos.total_billete_cienmil1}</Text>
                    <Text style={styles.text}> cantida de billetes cincuentamil caja personal: {datos.canti_billete_cincuentamil1}</Text>
                    <Text style={styles.text}> total billetes cincuentamil caja personal: {datos.total_billete_cincuentamil1}</Text>
                    <Text style={styles.text}> cantida de billetes veintemil caja personal: {datos.canti_billete_veintemil1}</Text>
                    <Text style={styles.text}> total billetes veintemil caja personal: {datos.total_billete_veintemil1}</Text>
                    <Text style={styles.text}> cantida de billetes diezmil caja personal: {datos.canti_billete_diezmil1}</Text>
                    <Text style={styles.text}> total_billete_diezmil caja personal: {datos.total_billete_diezmil1}</Text>
                    <Text style={styles.text}> cantida de billetes cincomil caja personal: {datos.canti_billete_cincomil1}</Text>
                    <Text style={styles.text}> total billetes  cincomil caja personal: {datos.total_billete_cincomil1}</Text>
                    <Text style={styles.text}> cantida de billetes dosmil caja personal: {datos.canti_billete_dosmil1}</Text>
                    <Text style={styles.text}> total billetes dosmil caja personal: {datos.total_billete_dosmil1}</Text>
                    <Text style={styles.text}> cantida de billetes mil caja personal: {datos.canti_billete_mil1}</Text>
                    <Text style={styles.text}> cantida de billetes mil caja personal: {datos.canti_billete_mil1}</Text>
                    <Text style={styles.text}> cantida de monedas mil caja personal: {datos.canti_moneda_mil1}</Text>
                    <Text style={styles.text}> total monedas mil caja personal: {datos.total_moneda_mil}</Text>
                    <Text style={styles.text}> cantidad de monedas quinientos caja personal: {datos.canti_moneda_quinientos1}</Text>
                    <Text style={styles.text}> total  monedas de quinientos caja personal: {datos.total_moneda_quinientos1}</Text>
                    <Text style={styles.text}> cantidad de monedas de cientos caja personal: {datos.canti_moneda_docientos1}</Text>
                    <Text style={styles.text}> total monedas de docientos caja personal: {datos.total_moneda_docientos1}</Text>
                    <Text style={styles.text}> cantidad de moneda cien caja personal: {datos.canti_moneda_cien1}</Text>
                    <Text style={styles.text}> total monedas de cien caja personal: {datos.total_moneda_cien1}</Text>
                    <Text style={styles.text}> cantidad monedas cincuenta caja personal: {datos.canti_moneda_cincuenta1}</Text>
                    <Text style={styles.text}> total monedas de ciencuenta caja personal: {datos.total_moneda_ciencuenta1}</Text>
                    <Text style={styles.text}> total efectivo caja personal: {datos.total_efectivo1}</Text>
                    <Text style={styles.text}> total premios pagados caja personal: {datos.total_premios_pagados1}</Text>
                    <Text style={styles.text}> total caja personal: {datos.total}</Text>
                    <Text style={styles.text}> total premios pagados: {datos.total_premios_pagados}</Text>
                    <Text style={styles.text}> entrega colocador: {datos.entrega_colocador}</Text>
                    <Text style={styles.text}> sobrantefaltante en caja: {datos.sobrantefaltante_caja}</Text>
                    <Text style={styles.text}> base efectivos: {datos.base_efectivos}</Text>
                    <Text style={styles.text}> tirilla recaudos: {datos.tirilla_recaudos}</Text>
                    <Text style={styles.text}> colocador cajafuerte : {datos.colocador_cajafuerte}</Text>
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
                        <Text style={styles.text}> nombre del juego 1: {datos.nombre_juego2} </Text>
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
                        <Text style={styles.text}> nombre del juego 1: {datos.nombre_juego3} </Text>
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
                        <Text style={styles.text}> nombre del juego 1: {datos.nombre_juego4} </Text>
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
                    if ({datos.totaldescargados}) {
                        <Text style={styles.text}> total cantidad descargados: {datos.totaldescargados} </Text>
                    }
                    if ({datos.totalvalor}) {
                        <Text style={styles.text}> valor total descargado : {datos.totalvalor} </Text>
                    }
                    <Text style={styles.text}> ¿El punto de venta tiene puerta cerrada con candado y/o seguro?:  {datos.requisito1}</Text>
                    if ({datos.observacion1}) {
                        <Text style={styles.text}> observacion: {datos.observacion1}</Text>
                    }
                    <Text style={styles.text}> ¿Tiene elementos de aseo, sillas en buen estado?:  {datos.requisito2}</Text>
                    if ({datos.observacion2}) {
                        <Text style={styles.text}> observacion: {datos.observacion2} </Text>
                    }
                    <Text style={styles.text}> ¿Tiene aviso de videovigilancia y camaras?:  {datos.requisito3}</Text>
                    if ({datos.observacion3}) {
                        <Text style={styles.text}> observacion: {datos.observacion3}</Text>
                    }
                    <Text style={styles.text}> ¿El Colocador cuenta con prendas emblematicas y presentación adecuada?:  {datos.requisito4}</Text>
                    if ({datos.observacion4}) {
                        <Text style={styles.text}> observacion: {datos.observacion4}</Text>
                    }
                    <Text style={styles.text}> ¿El usuario del colocador corresponde a la cedula del mismo?:  {datos.requisito5}</Text>
                    if ({datos.observacion5}) {
                        <Text style={styles.text}> observacion: {datos.observacion5}</Text>
                    }
                    <Text style={styles.text}> ¿La versión del aplicativo BNET esta actualizada?:  {datos.requisito6}</Text>
                    if ({datos.observacion6}) {
                        <Text style={styles.text}> observacion: {datos.observacion6}</Text>
                    }
                    <Text style={styles.text}> ¿El colocador ofrece los productos y servicios comercializados por la empresa al 100%?:  {datos.requisito7}</Text>
                    if ({datos.observacion7}) {
                        <Text style={styles.text}> observacion: {datos.observacion7}</Text>
                    }
                    <Text style={styles.text}> ¿La publicidad exhibida en el punto de venta se encuentra actualizada?:  {datos.requisito8}</Text>
                    if ({datos.observacion8}) {
                        <Text style={styles.text}> observacion: {datos.observacion8}</Text>
                    }
                    <Text style={styles.text}> ¿El colocador solicita el documento de identificación al cliente?:  {datos.requisito9}</Text>
                    if ({datos.observacion9}) {
                        <Text style={styles.text}> observacion: {datos.observacion9}</Text>
                    }
                    <Text style={styles.text}> El uso del sistema biométrico esta activo?:  {datos.requisito10}</Text>
                    if ({datos.observacion10}) {
                        <Text style={styles.text}> observacion: {datos.observacion10}</Text>
                    }
                    <Text style={styles.text}> ¿El colocador conoce de Supervoucher, y esta en funcionamiento?:  {datos.requisito11}</Text>
                    if ({datos.observacion11}) {
                        <Text style={styles.text}> observacion: {datos.observacion11}</Text>
                    }
                    <Text style={styles.text}> ¿El Colocador conoce el procedimiento que debe realizar a remitentes y destinatarios menores de edad?:  {datos.requisito12} </Text>
                    if ({datos.observacion112}) {
                        <Text style={styles.text}> observacion: {datos.observacion112}</Text>
                    }
                    <Text style={styles.text}> ¿El colocador conoce los reportes de operaciones en efectivo (R.O.E) firmas, huellas. (Transacciones =$10.000.000)?:  {datos.requisito13}</Text>
                    if ({datos.observacion13}) {
                        <Text style={styles.text}> observacion: {datos.observacion13}</Text>
                    }
                    <Text style={styles.text}> ¿Tiene aviso externo que indica Vigilado y Controlado Mintic y Colaborador Autorizado?:  {datos.requisito14}</Text>
                    if ({datos.observacion14}) {
                        <Text style={styles.text}> observacion: {datos.observacion14}</Text>
                    }
                    <Text style={styles.text}> ¿Tiene cuadro Banner con la marca SuperGIROS (aviso de canales de comunicación)?:  {datos.requisito15}</Text>
                    if ({datos.observacion15}) {
                        <Text style={styles.text}> observacion: {datos.observacion15}</Text>
                    }
                    <Text style={styles.text}> ¿Tiene afiche normativo visible o tarifario con las condiciones del servicio?:  {datos.requisito16}</Text>
                    if ({datos.observacion16}) {
                        <Text style={styles.text}> observacion: {datos.observacion16}</Text>
                    }
                    <Text style={styles.text}> ¿Cuenta con sticker tirilla electronica CRC?:  {datos.requisito17}</Text>
                    if ({datos.observacion17}) {
                        <Text style={styles.text}> observacion: {datos.observacion17}</Text>
                    }
                    <Text style={styles.text}> ¿Tiene normativa Giros Internacionales, camara o lector five y Sticker de pagos internacionales?:  {datos.requisito18}</Text>
                    if ({datos.observacion18}) {
                        <Text style={styles.text}> observacion: {datos.observacion18}</Text>
                    }
                    <Text style={styles.text}> ¿El Supervisor Comercial realiza las visitas constantemente, da buen trato y suministra los insumos a tiempo?  Cantidad de visitas del Supervisor Comercial al mes?:  {datos.requisito19}</Text>
                    if ({datos.observacion19}) {
                        <Text style={styles.text}> observacion: {datos.observacion19}</Text>
                    }
                    <Text style={styles.text}> ¿Las recargas efectuadas por el Colocador se trasmiten a través de la red propia de la empresa?:  {datos.requisito20}</Text>
                    if ({datos.observacion20}) {
                        <Text style={styles.text}> observacion: {datos.observacion20}</Text>
                    }
                    <Text style={styles.text}> ¿La lotería física tiene impreso el nombre de la empresa, de no ser asi reportar inmediatamente?:  {datos.requisito21}</Text>
                    if ({datos.observacion21}) {
                        <Text style={styles.text}> observacion: {datos.observacion21}</Text>
                    }
                    <Text style={styles.text}> ¿El punto de venta tiene caja fuerte y caja digital? el responsable tiene conocimiento sobre las bases de efectivo asignadas para caja auxiliar y caja digital?:  {datos.requisito22}</Text>
                    if ({datos.observacion22}) {
                        <Text style={styles.text}> observacion: {datos.observacion22}</Text>
                    }
                    <Text style={styles.text}> ¿Se cumple con los topes de efectivo establecidos para la caja digital  y caja auxiliar (ptos de venta con giros)?:  {datos.requisito23}</Text>
                    if ({datos.observacion23}) {
                        <Text style={styles.text}> observacion: {datos.observacion23}</Text>
                    }
                    <Text style={styles.text}> ¿El colocador tiene conocimiento sobre los montos máximos para pago de premios?:  {datos.requisito24}</Text>
                    if ({datos.observacion24}) {
                        <Text style={styles.text}> observacion: {datos.observacion24}</Text>
                    }
                    <Text style={styles.text}> ¿El colocador conoce los requisitos para pago de premios?:  {datos.requisito25}</Text>
                    if ({datos.observacion25}) {
                        <Text style={styles.text}> observacion: {datos.observacion25}</Text>
                    }
                    <Text style={styles.text}> ¿Tiene buzon de PQR, formato de gane y de giros?:  {datos.requisito26}</Text>
                    if ({datos.observacion26}) {
                        <Text style={styles.text}> observacion: {datos.observacion26}</Text>
                    }
                    <Text style={styles.text}> ¿El Colocador cuenta con las bases acerca del SARL, SARLAFT, SARO?:  {datos.requisito27}</Text>
                    if ({datos.observacion27}) {
                        <Text style={styles.text}> observacion: {datos.observacion27}</Text>
                    }
                    <Text style={styles.text}> ¿El Colocador conoce la definición de operación inusual y operación sospechosa?:  {datos.requisito28}</Text>
                    if ({datos.observacion28}) {
                        <Text style={styles.text}> observacion: {datos.observacion28}</Text>
                    }
                    <Text style={styles.text}> VERIFICACION INSUMOS PARA PREVENCION DE COVID 19:  {datos.requisito29}</Text>
                    <Text style={styles.text}> ¿Tapabocas?:  {datos.requisito30}</Text>
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
