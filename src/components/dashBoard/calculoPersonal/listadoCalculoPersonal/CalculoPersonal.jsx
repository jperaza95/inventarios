/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import {  /*setFiltro*/ } from '../../../../features/clientesSlice';
import {
    setIdCalculoPersonal, setDate, setIdCliente, setIdSucursal, setSeccion, setDuracion, setHoraInicio,
    setTransporte, setCena, setJornada, setDireccion, setSucursales, setNameCliente, setCiudad,
    setHorasMapD, setHorasMapN,// setHorasConteoNocturnoOp,
    setHorasExtrasDiurnasOp, setHorasExtrasNocturnasOp, //setTotalHorasOperadores,
    /*setHorasConteoDiurnoAud, setHorasConteoNocturnoAud,*/ setHorasExtrasDiurnasAud,
    setHorasExtrasNocturnasAud, /*setTotalHorasAud,*/ setHorasPromedioXOperador,
    setHorasVistaDeDiferencia, setHorasDescColectoresArmadoDeArchivo, setHorasDescanso,
    /*setTotalHorasDescanso, setTotalHorasInventario, setTotalOperadores,*/
    setSupervisores, setLideres, setAuditores,
    //setTotalOperariosMasAuditoresMasBackupMasLider,
    setCantPersonasVista,
    setUniPorHora, setUnidades, setJornadas, borrarUnCalculoPersonal
} from '../../../../features/calculosPersonalesSlice';

import AlertDanger from '../../../reutilizables/AlertDanger';
import { useState } from 'react';
//import ModalEliminacion from "../../../reutilizables/ModalEliminacion";



const CalculoPersonal = ({
    idCalculoPersonal,
    dateCalculoPersonal,
    idCliente,
    idSucursal,
    seccion,
    duracion,
    horaInicio,
    transporte,
    cena,
    jornada,
    //direccion,
    // Fin del primer bloque
    ///////////////////////////////////////////////////
    horasMapD,
    horasMapN,
    horasConteoDiurnoOp,
    horasConteoNocturnoOp,
    horasExtrasDiurnasOp,
    horasExtrasNocturnasOp,
    totalHorasOperadores,
    // Fin del segundo bloque
    ///////////////////////////////////////////////////
    horasConteoDiurnoAud,
    horasConteoNocturnoAud,
    horasExtrasDiurnasAud,
    horasExtrasNocturnasAud,
    totalHorasAud,
    // Fin del tercer bloque
    ///////////////////////////////////////////////////
    horasConteoPromedioXOperador,
    horasVistaDeDiferencia,
    horasDescColectoresArmadoDeArchivo,
    horasDescanso,
    totalHorasDescanso,
    totalHorasInventario,
    // Fin del cuarto bloque
    ///////////////////////////////////////////////////
    operadoresBackup,
    totalOperadores,
    supervisores,
    lideres,
    auditores,
    totalOperadoresParaConteo,
    totalOperariosMasAuditoresMasBackupMasLider,
    cantPersonasVista,
    uniPorPersona,
    uniPorHora,
    unidades,
    cantJornadas,
}) => {

    const dispatch = useDispatch();
    let navigate = useNavigate();


    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const [exito, setExito] = useState(false);



    const borrar = () => {
        eliminar(idCalculoPersonal);
    }
    //FALTA EL LINK
    const eliminar = (idCalculoPersonal) => {

        fetch(`https://inventarioswebapi1.azurewebsites.net/api/CalculoPersonal/${idCalculoPersonal}`, {

            method: 'delete',
            //body: json.stringify(objeliminar),
            headers: {
                'content-type': 'application/json; charset=utf-8', /*'apikey': localstorage.getitem('apikey')*/
            },
        })
            .then((response) => response.json())
            .then((json) => {
                
                if (json.codigo === 200) {
                    setExito(true);
                    dispatch(   (idCalculoPersonal));
                } else {
                    setError(true);
                    setMessage(json.mensaje)

                }
            });

    }


    const clientes = useSelector(state => state.clientes.clientes)
    const clienteSeleccionado = clientes.find(cliente => cliente.idCliente === idCliente);
    // Verifica si el cliente existe y tiene sucursales
    // Declara sucursalSeleccionada con un valor predeterminado
    let sucursalSeleccionada = { name: "Seleccione Sucursal", ciudad: "Seleccione Sucursal", direccion: "Seleccione Sucursal"  };

    if (clienteSeleccionado && clienteSeleccionado.sucursales) {
        // Busca la sucursal correspondiente a idSucursal
         sucursalSeleccionada = clienteSeleccionado.sucursales.find(
            sucursal => sucursal.idSucursal === idSucursal
        );
    }

    //Falta el navigate hacia arriba
    const updatecalculopersonal = () => {
        //navigate("/"); FALTA QUE ME LLEVE HACIA ARRIBA
        
        if (clienteSeleccionado) {

                
            if (clienteSeleccionado.sucursales) {
                // Obtener las sucursales del cliente y enviarlas al estado

                dispatch(setSucursales(clienteSeleccionado.sucursales));
            } else {
                // Limpiar las sucursales si no se encuentra el cliente
                dispatch(setSucursales([]));
            }

        dispatch(setNameCliente(clienteSeleccionado.name));
            if (sucursalSeleccionada) {
                // Obtener la ciudad del sucursal y enviarlas al estado
                dispatch(setCiudad(sucursalSeleccionada.ciudad));
                dispatch(setDireccion(sucursalSeleccionada.adress));
        
            } else {
                dispatch(setCiudad("Seleccione Sucursal"));
                dispatch(setDireccion("Seleccione Sucursal"));
            }
        } else {
        dispatch(setNameCliente(""));
        }
        

        dispatch(setIdCalculoPersonal(idCalculoPersonal));
        dispatch(setDate(dateCalculoPersonal));
        dispatch(setIdCliente(idCliente));
        dispatch(setIdSucursal(idSucursal));

                
        console.log("====================================")

        console.log(seccion)
        console.log(seccion)
        console.log(seccion)
        console.log(seccion)
        console.log(seccion)
        dispatch(setSeccion(seccion));
        dispatch(setDuracion(duracion));
        dispatch(setHoraInicio(horaInicio));
        dispatch(setTransporte(transporte));
        dispatch(setCena(cena));
        dispatch(setJornada(jornada));
        //dispatch(setDireccion(direccion));
        dispatch(setHorasMapD(horasMapD));
        dispatch(setHorasMapN(horasMapN));
        //dispatch(setHorasConteoNocturnoOp(horasConteoNocturnoOp));
        dispatch(setHorasExtrasDiurnasOp(horasExtrasDiurnasOp));
        dispatch(setHorasExtrasNocturnasOp(horasExtrasNocturnasOp));
        //dispatch(setTotalHorasOperadores(totalHorasOperadores));
        //dispatch(setHorasConteoDiurnoAud(horasConteoDiurnoAud));
        //dispatch(setHorasConteoNocturnoAud(horasConteoNocturnoAud));
        dispatch(setHorasExtrasDiurnasAud(horasExtrasDiurnasAud));
        dispatch(setHorasExtrasNocturnasAud(horasExtrasNocturnasAud));
        //dispatch(setTotalHorasAud(totalHorasAud));
        dispatch(setHorasPromedioXOperador(horasConteoPromedioXOperador));
        dispatch(setHorasVistaDeDiferencia(horasVistaDeDiferencia));
        dispatch(setHorasDescColectoresArmadoDeArchivo(horasDescColectoresArmadoDeArchivo));
        dispatch(setHorasDescanso(horasDescanso));
        //dispatch(setTotalHorasDescanso(totalHorasDescanso));
        //dispatch(setTotalHorasInventario(totalHorasInventario));
        //dispatch(setTotalOperadores(totalOperadores));
        dispatch(setSupervisores(supervisores));
        dispatch(setLideres(lideres));
        dispatch(setAuditores(auditores));
        //dispatch(setTotalOperariosMasAuditoresMasBackupMasLider(totalOperariosMasAuditoresMasBackupMasLider));
        dispatch(setCantPersonasVista(cantPersonasVista));
        
        dispatch(setUniPorHora(uniPorHora));
        dispatch(setUnidades(unidades));
        dispatch(setJornadas(cantJornadas));
        

    }


        return (


            <>
                {error && <AlertDanger mensaje={message} />}
                <tr>
                    <th scope="row">{idCalculoPersonal}</th>

                    {/* Primer bloque */}
                    <td>{dateCalculoPersonal}</td>
                    <td>{clienteSeleccionado ?clienteSeleccionado.name:"No seleccionado"}</td>
                    <td>{sucursalSeleccionada?sucursalSeleccionada.name:"No seleccionada"}</td>
                    <td>{seccion}</td>
                    <td>{duracion}</td>
                    <td> {horaInicio}</td>
                    <td>{transporte === 0 ? "A-CONFIRMAR" : transporte === 1 ? "SI" : "NO"}</td>
                    <td>{cena === 0 ? "A-CONFIRMAR" : cena === 1 ? "SI" : "NO"}</td>
                    <td>{jornada === 0 ? "A-CONFIRMAR" : jornada === 1 ? "MATUTINA" : jornada===2? "DIURNA":"NOCTURNA"}</td>
                    {//<td>Dirección: {direccion}</td>
                    }


                    <td>{<input type="button" className="btn btn-outline-secondary" onClick={() => updatecalculopersonal()} value='Modificar' />}</td>


                     <td>{<input type="button" className="btn btn-outline-danger" onClick={() => eliminar(idCliente)} value='Eliminar'/>}</td>
                    <td>
                        {/*<ModalEliminacion*/}
                        {/*    title="Eliminar calculoPersonal"*/}
                        {/*    onSave={borrar}*/}
                        {/*        setExito={setExito}*/}
                        {/*        body={`¿Desea borrar el calculoPersonal de Id: ${idCalculoPersonal}? `}*/}

                        {/*/>*/}
                    </td>

                </tr>

            </>




        )

    
}
    export default CalculoPersonal
