/* eslint-disable no-unused-vars */
import React from 'react'


import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import { setFiltroSucursal, } from '../../../../features/sucursalesSlice'
//import FiltroNombreSuc from '../updateSucursal/FiltroNombreSuc'
//import AddSucursal from '../agregarSucursal/addSucursal'

import CalculoPersonalFechaInventario from "./calculoPersonalComponentes/calculoPersonalBloque1/CalculoPersonalFechaInventario"
import CalculoPersonalCliente from "./calculoPersonalComponentes/calculoPersonalBloque1/CalculoPersonalCliente"
import CalculoPersonalSucursal from "./calculoPersonalComponentes/calculoPersonalBloque1/CalculoPersonalSucursal"
import CalculoPersonalSeccion from "./calculoPersonalComponentes/calculoPersonalBloque1/CalculoPersonalSeccion"
import CalculoPersonalCiudad from "./calculoPersonalComponentes/calculoPersonalBloque1/CalculoPersonalCiudad"
import CalculoPersonalDuracion from "./calculoPersonalComponentes/calculoPersonalBloque1/CalculoPersonalDuracion"
import CalculoPersonalHoraInicio from "./calculoPersonalComponentes/calculoPersonalBloque1/CalculoPersonalHoraInicio"
import CalculoPersonalTransporte from "./calculoPersonalComponentes/calculoPersonalBloque1/CalculoPersonalTransporte"
import CalculoPersonalCena from "./calculoPersonalComponentes/calculoPersonalBloque1/CalculoPersonalCena"
import CalculoPersonalJornada from "./calculoPersonalComponentes/calculoPersonalBloque1/CalculoPersonalJornada"
import CalculoPersonalDireccion from "./calculoPersonalComponentes/calculoPersonalBloque1/CalculoPersonalDireccion"

import CalculoPersonalHorasMapeoDiurno from "./calculoPersonalComponentes/calculoPersonalBloque2/CalculoPersonalHorasMapeoDiurno"
import CalculoPersonalHorasMapeoNocturno from "./calculoPersonalComponentes/calculoPersonalBloque2/CalculoPersonalHorasMapeoNocturno"
import CalculoPersonalHorasConteoDiurnoOperadores from "./calculoPersonalComponentes/calculoPersonalBloque2/CalculoPersonalHorasConteoDiurnoOperadores"
import CalculoPersonalHorasConteoNocturnoOperadores from "./calculoPersonalComponentes/calculoPersonalBloque2/CalculoPersonalHorasConteoNocturnoOperadores"
import CalculoPersonalHorasExtraDiurnasOperadores from "./calculoPersonalComponentes/calculoPersonalBloque2/CalculoPersonalHorasExtraDiurnasOperadores"
import CalculoPersonalHorasExtraNocturnasOperadores from "./calculoPersonalComponentes/calculoPersonalBloque2/CalculoPersonalHorasExtraNocturnasOperadores"
import CalculoPersonalTotalHorasExtraOperadores from "./calculoPersonalComponentes/calculoPersonalBloque2/CalculoPersonalTotalHorasExtraOperadores"

import CalculoPersonalHorasConteoDiurnoAuditores from "./calculoPersonalComponentes/calculoPersonalBloque3/CalculoPersonalHorasConteoDiurnoAuditores"
import CalculoPersonalHorasConteoNocturnoAuditores from "./calculoPersonalComponentes/calculoPersonalBloque3/CalculoPersonalHorasConteoNocturnoAuditores"
import CalculoPersonalHorasExtrasDiurnasAuditores from "./calculoPersonalComponentes/calculoPersonalBloque3/CalculoPersonalHorasExtrasDiurnasAuditores"
import CalculoPersonalHorasExtrasNocturnasAuditores from "./calculoPersonalComponentes/calculoPersonalBloque3/CalculoPersonalHorasExtrasNocturnasAuditores"
import CalculoPersonalTotalHorasAuditores from "./calculoPersonalComponentes/calculoPersonalBloque3/CalculoPersonalTotalHorasAuditores"

import CalculoPersonalHorasConteoPromedioPorOperador from "./calculoPersonalComponentes/calculoPersonalBloque4/CalculoPersonalHorasConteoPromedioPorOperador"
import CalculoPersonalHorasVistaDeDiferencias from "./calculoPersonalComponentes/calculoPersonalBloque4/CalculoPersonalHorasVistaDeDiferencias"
import CalculoPersonalHorasDescColectoresArmadoDeArchivo from "./calculoPersonalComponentes/calculoPersonalBloque4/CalculoPersonalHorasDescColectoresArmadoDeArchivo"
import CalculoPersonalHorasDescansoPorColaborador from "./calculoPersonalComponentes/calculoPersonalBloque4/CalculoPersonalHorasDescansoPorColaborador"
import CalculoPersonalHorasDescansoTotal from "./calculoPersonalComponentes/calculoPersonalBloque4/CalculoPersonalHorasDescansoTotal"
import CalculoPersonalHorasTotalInventario from "./calculoPersonalComponentes/calculoPersonalBloque4/CalculoPersonalHorasTotalInventario"

import CalculoPersonalOperadoresBackup from "./calculoPersonalComponentes/calculoPersonalBloque5/CalculoPersonalOperadoresBackup"
import CalculoPersonalTotalOperadores from "./calculoPersonalComponentes/calculoPersonalBloque5/CalculoPersonalTotalOperadores"
import CalculoPersonalSupervisiones from "./calculoPersonalComponentes/calculoPersonalBloque5/CalculoPersonalSupervisiones"
import CalculoPersonalLideres from "./calculoPersonalComponentes/calculoPersonalBloque5/CalculoPersonalLideres"
import CalculoPersonalAuditores from "./calculoPersonalComponentes/calculoPersonalBloque5/CalculoPersonalAuditores"
import CalculoPersonalTotalOperadoresParaConteo from "./calculoPersonalComponentes/calculoPersonalBloque5/CalculoPersonalTotalOperadoresParaConteo"
import CalculoPersonalTotalOperariosMasAuditoresMasBackup from "./calculoPersonalComponentes/calculoPersonalBloque5/CalculoPersonalTotalOperariosMasAuditoresMasBackup"
import CalculoPersonalCantPersonasVistaDiferencias10Porciento from "./calculoPersonalComponentes/calculoPersonalBloque5/CalculoPersonalCantPersonasVistaDiferencias10Porciento"
import CalculoPersonalUniPorPersona from "./calculoPersonalComponentes/calculoPersonalBloque5/CalculoPersonalUniPorPersona"
import CalculoPersonalUniPorHoraOProductividad from "./calculoPersonalComponentes/calculoPersonalBloque5/CalculoPersonalUniPorHoraOProductividad"
import CalculoPersonalUnidades from "./calculoPersonalComponentes/calculoPersonalBloque5/CalculoPersonalUnidades"
import CalculoPersonalJornadas from "./calculoPersonalComponentes/calculoPersonalBloque5/CalculoPersonalJornadas"





const CalculoPersonalAdd = () => {

    const dispatch = useDispatch();

    const filtro = useSelector(state => state.clientes.clientes)

    //useEffect(() => {

    //    dispatch(setFiltroSucursal(""))

    //}, [])


    const idCalculoPersonal = useSelector(state => state.calculosPersonales.idCalculoPersonal)


    // Este efecto se ejecutará cada vez que el valor de 'idCalculoPersonal' en el estado cambie
    useEffect(() => {
        // Aquí actualizas el valor seleccionado del select según el valor de 'idCalculoPersonal'
        const selectElement = document.getElementById('idCalculo');
        if (selectElement) {
            selectElement.textContent = idCalculoPersonal;
        }
    }, [idCalculoPersonal]); // La dependencia del efecto es 'idCalculoPersonal'




    return (
        <div className="container-fluid">
            <div className="row">
                {/* Primera columna */}
                <div className="col-md-6">

                    <div>
                        {/* Contenido de la primera columna */}
                        <div>
                            {idCalculoPersonal != 0 && <label htmlFor="idCalculo">Actualizando ID:{idCalculoPersonal}</label>}
                            {idCalculoPersonal == 0 && <p id="pCreando" name="pCreando">Creando c&aacute;lculo de personal</p>}
                        </div>

                        <div>
                            <CalculoPersonalFechaInventario />
                            <CalculoPersonalCliente />
                            <CalculoPersonalSucursal />
                            <CalculoPersonalSeccion />
                            <CalculoPersonalCiudad />
                            <CalculoPersonalDuracion />
                            <CalculoPersonalHoraInicio />
                            <CalculoPersonalTransporte />
                            <CalculoPersonalCena />
                            <CalculoPersonalJornada />
                            <CalculoPersonalDireccion />
                        </div>

          
                        <CalculoPersonalHorasMapeoDiurno />
                        <CalculoPersonalHorasMapeoNocturno />
                        <CalculoPersonalHorasConteoDiurnoOperadores />
                        <CalculoPersonalHorasConteoNocturnoOperadores />
                        <CalculoPersonalHorasExtraDiurnasOperadores />
                        <CalculoPersonalHorasExtraNocturnasOperadores />
                        <CalculoPersonalTotalHorasExtraOperadores />

        
                    </div>
                </div>

                {/* Segunda columna */}
                <div className="col-md-6">
                    <div>
                        {/* Contenido de la segunda columna */}
                        {/* ... (otros componentes) */}

                        <CalculoPersonalHorasConteoDiurnoAuditores />
                        <CalculoPersonalHorasConteoNocturnoAuditores />
                        <CalculoPersonalHorasExtrasDiurnasAuditores />
                        <CalculoPersonalHorasExtrasNocturnasAuditores />
                        <CalculoPersonalTotalHorasAuditores />

                        {//Fin del tercer bloque
                        }

                        <CalculoPersonalHorasConteoPromedioPorOperador />
                        <CalculoPersonalHorasVistaDeDiferencias />
                        <CalculoPersonalHorasDescColectoresArmadoDeArchivo />
                        <CalculoPersonalHorasDescansoPorColaborador />
                        <CalculoPersonalHorasDescansoTotal />
                        <CalculoPersonalHorasTotalInventario />

                        {//Fin del cuarto bloque
                        }

                        <CalculoPersonalOperadoresBackup />
                        <CalculoPersonalTotalOperadores />
                        <CalculoPersonalSupervisiones />
                        <CalculoPersonalLideres />
                        <CalculoPersonalAuditores />
                        <CalculoPersonalTotalOperadoresParaConteo />
                        <CalculoPersonalTotalOperariosMasAuditoresMasBackup />
                        <CalculoPersonalCantPersonasVistaDiferencias10Porciento />
                        <CalculoPersonalUniPorPersona />
                        <CalculoPersonalUniPorHoraOProductividad />
                        <CalculoPersonalUnidades />
                        <CalculoPersonalJornadas />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CalculoPersonalAdd