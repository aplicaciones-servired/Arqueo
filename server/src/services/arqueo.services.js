// traer configuración de la base de datos
import { pool } from "../connections/dbArqueo.js";

const MULTIRED = 'registro_arqueo_multired';
const SERVIRED = 'registro_arqueo_servired';

function ZonaCompany(zona) {
    if (zona === 'Multired') return MULTIRED;
    if (zona === 'Servired') return SERVIRED;
    throw new Error('Zona no encontrada: ' + zona);
}

// controlador de rutas
// traer todas las tareas
export const getArqueos = async (data, req, res) => {
    const { zona } = data;
    try {
        const [result] = await pool.query(
            `SELECT s.supervisor, IF(s.supervisor = b.login, b.nombre, '') AS nombre_supervisor, s.id, s.ip, s.nombres, s.documento, s.sucursal, s.puntodeventa, s.ventabruta, s.baseefectivo, s.cartera, s.totalingreso, s.chancesabonados, s.chancespreimpresos,s.premiospagados,s.efectivocajafuerte, s.tirillarecaudo, s.totalegresos, s.totalbilletes, s.totalmonedas, s.totalarqueo, s.sobrantefaltante, 
                s.canti_billete_cienmil, s.total_billete_cienmil, s.canti_billete_cincuentamil, s.total_billete_cincuentamil, s.canti_billete_veintemil, s.total_billete_veintemil, s.canti_billete_diezmil, s.total_billete_diezmil, s.canti_billete_cincomil, s.total_billete_cincomil, s.canti_billete_dosmil, s.total_billete_dosmil, s.canti_billete_mil, s.total_billete_mil, 
                
                s.canti_moneda_mil, s.total_moneda_mil, s.canti_moneda_quinientos, s.total_moneda_quinientos, s.canti_moneda_docientos, s.total_moneda_docientos, s.canti_moneda_cien, 
                s.total_moneda_cien, s.canti_moneda_cincuenta, s.total_moneda_ciencuenta, s.total_efectivo,
                s.total_premios_pagados, s.entrega_colocador, s.sobrantefaltante_caja, s.colocador_cajafuerte, s.rollos_bnet, s.rollos_fisicos, s.diferencia,
    
                s.canti_billete_cienmil1, s.total_billete_cienmil1, s.canti_billete_cincuentamil1, s.total_billete_cincuentamil1, s.canti_billete_veintemil1, s.total_billete_veintemil1, s.canti_billete_diezmil1, 
                s.total_billete_diezmil1, s.canti_billete_cincomil1, s.total_billete_cincomil1, s.canti_billete_dosmil1, s.total_billete_dosmil1, s.canti_billete_mil1, s.total_billete_mil1, 
    
                s.canti_moneda_mil1, s.total_moneda_mil1, s.canti_moneda_quinientos1, s.total_moneda_quinientos1, s.canti_moneda_docientos1, s.total_moneda_docientos1, s.canti_moneda_cien1, 
                s.total_moneda_cien1, s.canti_moneda_cincuenta1, s.total_moneda_ciencuenta1, s.total_efectivo1,
                s.total_premios_pagados, s.entrega_colocador, s.sobrantefaltante_caja, s.colocador_cajafuerte, s.rollos_bnet, s.rollos_fisicos, s.diferencia
        
            , s.nombre_juego, s.cantidad_bnet, s.cantidad_fisicos, s.cantidad_faltante, s.cantidad_tiquete, s.descargado
            , s.nombre_juego2, s.cantidad_bnet2, s.cantidad_fisicos2, s.cantidad_faltante2, s.cantidad_tiquete2, s.descargado2
            , s.nombre_juego3, s.cantidad_bnet3, s.cantidad_fisicos3, s.cantidad_faltante3, s.cantidad_tiquete3, s.descargado3
            , s.nombre_juego4, s.cantidad_bnet4, s.cantidad_fisicos4, s.cantidad_faltante4, s.cantidad_tiquete4, s.descargado4
            , s.totaldescargados, s.totalvalor,s.requisito1, s.observacion1, s.requisito2, s.observacion2, s.requisito3, s.observacion3, s.requisito4, s.observacion4, s.requisito5, s.observacion5, s.requisito6, s.observacion6, s.requisito7, 
            s.observacion7, s.requisito8, s.observacion8, s.requisito9, s.observacion9, s.requisito10, s.observacion10, s.requisito11, s.observacion11, s.requisito12, s.observacion12, s.requisito13, s.observacion13, s.requisito14, s.observacion14, s.requisito15, s.observacion15, s.requisito16, s.observacion16, s.requisito17, s.observacion17, s.requisito18, s.observacion18, 
            s.requisito19, s.observacion19, s.requisito20, s.observacion20, s.requisito21, s.observacion21, s.requisito22, s.observacion22, s.requisito23, s.observacion23, s.requisito24, s.observacion24, s.requisito25, s.observacion25, s.requisito26, 
            s.observacion26, s.requisito27, s.observacion27, s.requisito28, s.observacion28, s.requisito29, s.requisito30, s.fechavisita, s.horavisita, s.latitud, s.longitud, s.nombre_observacion
            FROM appseguimiento.${ZonaCompany(zona)} s
            INNER JOIN bdpersona.tbusuario b ON s.supervisor = b.login 
            ORDER BY s.fechavisita DESC`

            
        );
        return result;
    } catch (error) {
        console.error('Error en servicio:', error);
        res.status(500).json({ message: error.message });
        return null;
    }
};


export const getArqueoss = async (data, req, res) => {
    const { zona, id } = data
    console.log('first', zona)
    try {

        const [result] = await pool.query(
            `
                SELECT s.supervisor, IF(s.supervisor = b.login, b.nombre, '') AS nombre_supervisor, s.id, s.ip, s.nombres, s.documento, s.sucursal, s.puntodeventa, s.ventabruta, s.baseefectivo, s.cartera, s.totalingreso, s.chancesabonados, s.chancespreimpresos,s.premiospagados,s.efectivocajafuerte, s.tirillarecaudo, s.totalegresos, s.totalbilletes, s.totalmonedas, s.totalarqueo, s.sobrantefaltante, 
                s.canti_billete_cienmil, s.total_billete_cienmil, s.canti_billete_cincuentamil, s.total_billete_cincuentamil, s.canti_billete_veintemil, s.total_billete_veintemil, s.canti_billete_diezmil, s.total_billete_diezmil, s.canti_billete_cincomil, s.total_billete_cincomil, s.canti_billete_dosmil, s.total_billete_dosmil, s.canti_billete_mil, s.total_billete_mil, 
                
                s.canti_moneda_mil, s.total_moneda_mil, s.canti_moneda_quinientos, s.total_moneda_quinientos, s.canti_moneda_docientos, s.total_moneda_docientos, s.canti_moneda_cien, 
                s.total_moneda_cien, s.canti_moneda_cincuenta, s.total_moneda_ciencuenta, s.total_efectivo,
                s.total_premios_pagados, s.entrega_colocador, s.sobrantefaltante_caja, s.colocador_cajafuerte, s.rollos_bnet, s.rollos_fisicos, s.diferencia,
    
                s.canti_billete_cienmil1, s.total_billete_cienmil1, s.canti_billete_cincuentamil1, s.total_billete_cincuentamil1, s.canti_billete_veintemil1, s.total_billete_veintemil1, s.canti_billete_diezmil1, 
                s.total_billete_diezmil1, s.canti_billete_cincomil1, s.total_billete_cincomil1, s.canti_billete_dosmil1, s.total_billete_dosmil1, s.canti_billete_mil1, s.total_billete_mil1, 
    
                s.canti_moneda_mil1, s.total_moneda_mil1, s.canti_moneda_quinientos1, s.total_moneda_quinientos1, s.canti_moneda_docientos1, s.total_moneda_docientos1, s.canti_moneda_cien1, 
                s.total_moneda_cien1, s.canti_moneda_cincuenta1, s.total_moneda_ciencuenta1, s.total_efectivo1,
                s.total_premios_pagados, s.entrega_colocador, s.sobrantefaltante_caja, s.colocador_cajafuerte, s.rollos_bnet, s.rollos_fisicos, s.diferencia
        
            , s.nombre_juego, s.cantidad_bnet, s.cantidad_fisicos, s.cantidad_faltante, s.cantidad_tiquete, s.descargado
            , s.nombre_juego2, s.cantidad_bnet2, s.cantidad_fisicos2, s.cantidad_faltante2, s.cantidad_tiquete2, s.descargado2
            , s.nombre_juego3, s.cantidad_bnet3, s.cantidad_fisicos3, s.cantidad_faltante3, s.cantidad_tiquete3, s.descargado3
            , s.nombre_juego4, s.cantidad_bnet4, s.cantidad_fisicos4, s.cantidad_faltante4, s.cantidad_tiquete4, s.descargado4
            , s.totaldescargados, s.totalvalor,s.requisito1, s.observacion1, s.requisito2, s.observacion2, s.requisito3, s.observacion3, s.requisito4, s.observacion4, s.requisito5, s.observacion5, s.requisito6, s.observacion6, s.requisito7, 
            s.observacion7, s.requisito8, s.observacion8, s.requisito9, s.observacion9, s.requisito10, s.observacion10, s.requisito11, s.observacion11, s.requisito12, s.observacion12, s.requisito13, s.observacion13, s.requisito14, s.observacion14, s.requisito15, s.observacion15, s.requisito16, s.observacion16, s.requisito17, s.observacion17, s.requisito18, s.observacion18, 
            s.requisito19, s.observacion19, s.requisito20, s.observacion20, s.requisito21, s.observacion21, s.requisito22, s.observacion22, s.requisito23, s.observacion23, s.requisito24, s.observacion24, s.requisito25, s.observacion25, s.requisito26, 
            s.observacion26, s.requisito27, s.observacion27, s.requisito28, s.observacion28, s.requisito29, s.requisito30, s.fechavisita, s.horavisita,s.firma_auditoria, s.firma_colocadora, s.latitud, s.longitud, s.imagen_observacion, s.nombre_observacion
            FROM appseguimiento.${ZonaCompany(zona)} s
            INNER JOIN bdpersona.tbusuario b ON s.supervisor = b.login WHERE s.id=?`, [id]

        );

        return result

    } catch (error) {
        console.error('Error en servicio:', error);
        return res.status(500).json({ message: error.message });
    }
};

