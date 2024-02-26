/* eslint-disable react/prop-types */


import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux';
import {
    agregarUnCalculoPersonal, setCantPersonasVista, setJornadas,
    setIdCalculoPersonal, setDate, setIdCliente, setIdSucursal, setSeccion, setDuracion, setHoraInicio,
    setTransporte, setCena, setJornada, setDireccion, setSucursales, setNameCliente, setCiudad,
    setHorasMapD, setHorasMapN, //setHorasConteoNocturnoOp,
    setHorasExtrasDiurnasOp, setHorasExtrasNocturnasOp,// setTotalHorasOperadores,
    /*setHorasConteoDiurnoAud,*/ /*setHorasConteoNocturnoAud,*/ setHorasExtrasDiurnasAud,
    setHorasExtrasNocturnasAud, /*setTotalHorasAud,*/ setHorasPromedioXOperador,
    setHorasVistaDeDiferencia, setHorasDescColectoresArmadoDeArchivo, setHorasDescanso,
    /*setTotalHorasDescanso, setTotalHorasInventario, setTotalOperadores,*/
    setSupervisores, setLideres, setAuditores,
    //setTotalOperariosMasAuditoresMasBackupMasLider,
    setUniPorHora, setUnidades,
      updateUnCalculoPersonal
} from '../../../features/calculosPersonalesSlice';

import { useState } from "react";
import AlertDanger from '../../reutilizables/alertdanger';
import AlertSuccess from '../../reutilizables/AlertSuccess';

const CalculoPersonalAddButton = () => {
    const dispatch = useDispatch();

    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("")
    //Const para ver si el calculoPersonal es un add o un update
    const idCalculoPersonal = useSelector(state => state.calculosPersonales.idCalculoPersonal)

    //Atributos para el add
    const dateCalculoPersonal = useSelector(state => state.calculosPersonales.date)
    const idCliente = useSelector(state => state.calculosPersonales.idCliente)
    const idSucursal = useSelector(state => state.calculosPersonales.idSucursal)
    const seccion = useSelector(state => state.calculosPersonales.seccion)
    const duracion = useSelector(state => state.calculosPersonales.duracion)
    const horaInicio = useSelector(state => state.calculosPersonales.horaInicio)
    const transporte = useSelector(state => state.calculosPersonales.transporte)
    const cena = useSelector(state => state.calculosPersonales.cena)
    const jornada = useSelector(state => state.calculosPersonales.jornada)
    //const direccion = useSelector(state => state.calculosPersonales.direccion)
    //Fin del primer 

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    const horasMapD = useSelector(state => state.calculosPersonales.horasMapD)
    const horasMapN = useSelector(state => state.calculosPersonales.horasMapN)
    const horasConteoDiurnoOp = useSelector(state => state.calculosPersonales.horasConteoDiurnoOp)
    const horasConteoNocturnoOp = useSelector(state => state.calculosPersonales.horasConteoNocturnoOp)
    const horasExtrasDiurnasOp = useSelector(state => state.calculosPersonales.horasExtrasDiurnasOp)
    const horasExtrasNocturnasOp = useSelector(state => state.calculosPersonales.horasExtrasNocturnasOp)
    const totalHorasOperadores = useSelector(state => state.calculosPersonales.totalHorasOperadores)
    //Fin del segundo bloque                         

    ////////////////////////////////////////////////////////////////////////////////////////////////
    const horasConteoDiurnoAud = useSelector(state => state.calculosPersonales.horasConteoDiurnoAud)
    const horasConteoNocturnoAud = useSelector(state => state.calculosPersonales.horasConteoNocturnoAud)
    const horasExtrasDiurnasAud = useSelector(state => state.calculosPersonales.horasExtrasDiurnasAud)
    const horasExtrasNocturnasAud = useSelector(state => state.calculosPersonales.horasExtrasNocturnasAud)
    const totalHorasAud = useSelector(state => state.calculosPersonales.totalHorasAud)

    //Fin del tercer bloque                            
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    const horasConteoPromedioXOperador = useSelector(state => state.calculosPersonales.horasConteoPromedioXOperador)
    const horasVistaDeDiferencia = useSelector(state => state.calculosPersonales.horasVistaDeDiferencia)
    const horasDescColectoresArmadoDeArchivo = useSelector(state => state.calculosPersonales.horasDescColectoresArmadoDeArchivo)
    const horasDescanso = useSelector(state => state.calculosPersonales.horasDescanso)
    const totalHorasDescanso = useSelector(state => state.calculosPersonales.totalHorasDescanso)
    const totalHorasInventario = useSelector(state => state.calculosPersonales.totalHorasInventario)
    //Fin del cuarto bloque                           
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    const operadoresBackup = useSelector(state => state.calculosPersonales.operadoresBackup)
    const totalOperadores = useSelector(state => state.calculosPersonales.totalOperadores)
    const supervisores = useSelector(state => state.calculosPersonales.supervisores)
    const lideres = useSelector(state => state.calculosPersonales.lideres)
    const auditores = useSelector(state => state.calculosPersonales.auditores)
    const totalOperadoresParaConteo = useSelector(state => state.calculosPersonales.totalOperadoresParaConteo)
    const totalOperariosMasAuditoresMasBackupMasLider = useSelector(state => state.calculosPersonales.totalOperariosMasAuditoresMasBackupMasLider)
    const cantPersonasVista = useSelector(state => state.calculosPersonales.cantPersonasVista)
    const uniPorPersona = useSelector(state => state.calculosPersonales.uniPorPersona)
    const uniPorHora = useSelector(state => state.calculosPersonales.uniPorHora)
    const unidades = useSelector(state => state.calculosPersonales.unidades)
    const cantJornadas = useSelector(state => state.calculosPersonales.cantJornadas)
    // final del 5to bloque





    const add = () => {

        let objAdd = {




            "dateCalculoPersonal": dateCalculoPersonal,
            "idCliente": idCliente,
            "idSucursal": idSucursal,
            "seccion": seccion,
            "duracion": duracion,
            "horaInicio": horaInicio,
            "transporte": transporte,
            "cena": cena,
            "jornada": jornada,
            //"direccion": direccion,
            // Fin del primer bloque

            ///////////////////////////////////////////////////
            "horasMapD": horasMapD,
            "horasMapN": horasMapN,
            "horasConteoDiurnoOp": horasConteoDiurnoOp,
            "horasConteoNocturnoOp": horasConteoNocturnoOp,
            "horasExtrasDiurnasOp": horasExtrasDiurnasOp,
            "horasExtrasNocturnasOp": horasExtrasNocturnasOp,
            "totalHorasOperadores": totalHorasOperadores,
            // Fin del segundo bloque

            ///////////////////////////////////////////////////
            "horasConteoDiurnoAud": horasConteoDiurnoAud,
            "horasConteoNocturnoAud": horasConteoNocturnoAud,
            "horasExtrasDiurnasAud": horasExtrasDiurnasAud,
            "horasExtrasNocturnasAud": horasExtrasNocturnasAud,
            "totalHorasAud": totalHorasAud,
            // Fin del tercer bloque

            ///////////////////////////////////////////////////
            "horasConteoPromedioXOperador": horasConteoPromedioXOperador,
            "horasVistaDeDiferencia": horasVistaDeDiferencia,
            "horasDescColectoresArmadoDeArchivo": horasDescColectoresArmadoDeArchivo,
            "horasDescanso": horasDescanso,
            "totalHorasDescanso": totalHorasDescanso,
            "totalHorasInventario": totalHorasInventario,
            // Fin del cuarto bloque

            ///////////////////////////////////////////////////
            "operadoresBackup": operadoresBackup,
            "totalOperadores": totalOperadores,
            "supervisores": supervisores,
            "lideres": lideres,
            "auditores": auditores,
            "totalOperadoresParaConteo": totalOperadoresParaConteo,
            "totalOperariosMasAuditoresMasBackupMasLider": totalOperariosMasAuditoresMasBackupMasLider,
            "cantPersonasVista": cantPersonasVista,
            "uniPorPersona": uniPorPersona,
            "uniPorHora": uniPorHora,
            "unidades": unidades,
            "cantJornadas": cantJornadas
            // Fin del quinto bloque
               

        }
        //Falta cambiar el link
        fetch(`https://inventarioswebapi1.azurewebsites.net/api/CalculoPersonal`, {
            method: 'POST',
            body: JSON.stringify(objAdd),
            headers: {
                'Content-type': 'application/json; charset=UTF-8', /*'apikey': localStorage.getItem('apiKey')*/
            },
        })
            .then((response) => response.json())
            .then((json) => {


                if (json.codigo === 200) {
                    dispatch(agregarUnCalculoPersonal(json.o));
                    dispatch(setIdCalculoPersonal(json.o.idCalculoPersonal));

                    setError(false);
                    setSuccess(true);
                    setMessage(json.mensaje)

                } else {
                    setSuccess(false);
                    setError(true);
                    setMessage(json.mensaje)
                }


            });
    }

    const vaciar = () => {

        dispatch(setNameCliente(""));
        dispatch(setIdCalculoPersonal(0));
        // Atributos para el add
        dispatch(setDate(
        ));
        dispatch(setIdCliente(0));
        dispatch(setIdSucursal(0));
        dispatch(setSeccion(""));
        dispatch(setCiudad("Seleccione Sucursal"));
        dispatch(setDuracion(0.0));
        dispatch(setHoraInicio(""));
        dispatch(setTransporte(0));
        dispatch(setCena(0));
        dispatch(setJornada(0));
        dispatch(setDireccion("Seleccione Sucursal"));

        // Fin del primer bloque
        //////////////////////////////////////////////////////////////////////////////
        dispatch(setHorasMapD(0.0));
        dispatch(setHorasMapN(0.0));
        //dispatch(setHorasConteoNocturnoOp(0.0)); // horasConteoNocturnoOp = (totalOperadoresParaConteo * horasConteoPromedioXOperador) - horasConteoDiurnoOp
        dispatch(setHorasExtrasDiurnasOp(0.0));
        dispatch(setHorasExtrasNocturnasOp(0.0));
        //dispatch(setTotalHorasOperadores(0.0)); // totalHorasOperadores = horasConteoDiurnoOp + horasConteoNocturnoOp + horasExtrasDiurnasOp + horasExtrasNocturnasOp

        // Fin del segundo bloque
        //////////////////////////////////////////////////////////////////////////////
        //dispatch(setHorasConteoDiurnoAud(0.0)); // horasConteoDiurnoAud = auditores*1.5
        //dispatch(setHorasConteoNocturnoAud(0.0)); // horasConteoNocturnoAud = (auditores * horasConteoPromedioXOperador) - horasConteoDiurnoAud
        dispatch(setHorasExtrasDiurnasAud(0.0));
        dispatch(setHorasExtrasNocturnasAud(0.0));
       // dispatch(setTotalHorasAud(0.0)); // totalHorasAud = horasConteoDiurnoAud + horasConteoNocturnoAud + horasExtrasDiurnasAud + horasExtrasNocturnasAud

        // Fin del tercer bloque
        //////////////////////////////////////////////////////////////////////////////
        dispatch(setHorasPromedioXOperador(0.0));
        dispatch(setHorasVistaDeDiferencia(0.0));
        dispatch(setHorasDescColectoresArmadoDeArchivo(0.0));
        dispatch(setHorasDescanso(0.0));
        //dispatch(setTotalHorasDescanso(0.0)); // totalHorasDescanso = totalOperariosMasAuditoresMasBackupMasLider * horasDescanso // total horas descanso en el inventariado
        //dispatch(setTotalHorasInventario(0.0)); // totalHorasInventario = totalOperariosMasAuditoresMasBackupMasLider * horasConteoPromedioXOperador + (horasMapD + horasMapN) horas total inventario

        // Fin del cuarto bloque
        //////////////////////////////////////////////////////////////////////////////
        //dispatch(setTotalOperadores(0));
        dispatch(setSupervisores(0));
        dispatch(setLideres(0));
        dispatch(setAuditores(0));
        //dispatch(setTotalOperariosMasAuditoresMasBackupMasLider(0)); // totalOperariosMasAuditoresMasBackupMasLider = auditores + operadoresBackup + totalOperadoresParaConteo + lider
        dispatch(setCantPersonasVista(0));
        
        dispatch(setUniPorHora(0));
        dispatch(setUnidades(0));
        dispatch(setJornadas(0));

// Final del 5to bloque
        dispatch(setSucursales([]));
        setError(false);
        setSuccess(true);
        setMessage("Campos limpiados")
    }
    
    const update = (idCalculoPersonal) => {

        let objUpdate = {
            "idCalculoPersonal": idCalculoPersonal,
            "dateCalculoPersonal": dateCalculoPersonal,
            "idCliente": idCliente,
            "idSucursal": idSucursal,
            "seccion": seccion,
            "duracion": duracion,
            "horaInicio": horaInicio,
            "transporte": transporte,
            "cena": cena,
            "jornada": jornada,
            //"direccion": direccion,
            // Fin del primer bloque

            ///////////////////////////////////////////////////
            "horasMapD": horasMapD,
            "horasMapN": horasMapN,
            "horasConteoDiurnoOp": horasConteoDiurnoOp,
            "horasConteoNocturnoOp": horasConteoNocturnoOp,
            "horasExtrasDiurnasOp": horasExtrasDiurnasOp,
            "horasExtrasNocturnasOp": horasExtrasNocturnasOp,
            "totalHorasOperadores": totalHorasOperadores,
            // Fin del segundo bloque

            ///////////////////////////////////////////////////
            "horasConteoDiurnoAud": horasConteoDiurnoAud,
            "horasConteoNocturnoAud": horasConteoNocturnoAud,
            "horasExtrasDiurnasAud": horasExtrasDiurnasAud,
            "horasExtrasNocturnasAud": horasExtrasNocturnasAud,
            "totalHorasAud": totalHorasAud,
            // Fin del tercer bloque

            ///////////////////////////////////////////////////
            "horasConteoPromedioXOperador": horasConteoPromedioXOperador,
            "horasVistaDeDiferencia": horasVistaDeDiferencia,
            "horasDescColectoresArmadoDeArchivo": horasDescColectoresArmadoDeArchivo,
            "horasDescanso": horasDescanso,
            "totalHorasDescanso": totalHorasDescanso,
            "totalHorasInventario": totalHorasInventario,
            // Fin del cuarto bloque

            ///////////////////////////////////////////////////
            "operadoresBackup": operadoresBackup,
            "totalOperadores": totalOperadores,
            "supervisores": supervisores,
            "lideres": lideres,
            "auditores": auditores,
            "totalOperadoresParaConteo": totalOperadoresParaConteo,
            "totalOperariosMasAuditoresMasBackupMasLider": totalOperariosMasAuditoresMasBackupMasLider,
            "cantPersonasVista": cantPersonasVista,
            "uniPorPersona": uniPorPersona,
            "uniPorHora": uniPorHora,
            "unidades": unidades,
            "cantJornadas": cantJornadas
            // Fin del quinto bloque


        } 
        fetch(`https://inventarioswebapi1.azurewebsites.net/api/CalculoPersonal/${idCalculoPersonal}`, {
            method: 'PUT',
            body: JSON.stringify(objUpdate),
            headers: {
                'Content-type': 'application/json; charset=UTF-8', /*'apikey': localStorage.getItem('apiKey')*/
            },
        })
            .then((response) => response.json())
            .then((json) => {
                

                if (json.codigo === 200) {
                    
                    dispatch(updateUnCalculoPersonal({ id: idCalculoPersonal, nuevoCalculoPersonal: json.o }));

                    setError(false);
                    setSuccess(true);
                    setMessage(json.mensaje)
                    

                } else {
                    setSuccess(false);
                    setError(true);
                    setMessage(json.mensaje)

                }


            });

    }



    return (


        <div>
            {idCalculoPersonal == 0 ? <input type="button" onClick={() => add()} value='Agregar' /> : <input type="button" onClick={() => update(idCalculoPersonal)} value='Actualizar' />}
            <input type="button" onClick={() => vaciar()} value='Vaciar Campos (crear un calculo nuevo)' />
            {error && <AlertDanger mensaje={message} />}
            {success && <AlertSuccess mensaje={message} />}
        </div>
    );
};

export default CalculoPersonalAddButton









    



    

   


    











