import { createSlice } from "@reduxjs/toolkit";
import {  } from "react-redux";

const initialState = {
    calculosPersonales: [],
    sucursales: [],

    filterCliente: 0,
    filterSucursales: [],
    filterSucursal: 0,
    filterDate:"",

    nameCliente: "",
    idCalculoPersonal:0,
    //Atributos para el add
    date: "",
    idCliente: 0,
    idSucursal: 0,
    seccion:"",
    ciudad: "Seleccione Sucursal",
    duracion: 0.0,
    horaInicio: "",
    transporte: 0,
    cena: 0,
    jornada: 0,
    direccion: "Seleccione Sucursal",
    //Fin del primer bloque
  
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    horasMapD: 0.0,
    horasMapN: 0.0,
    horasConteoDiurnoOp:0.0, //horasConteoDiurnoOp = totalOperadoresParaConteo*1,5
    horasConteoNocturnoOp:0.0, //horasConteoNocturnoOp = (totalOperadoresParaConteo * horasConteoPromedioXOperador) - horasConteoDiurnoOp
    horasExtrasDiurnasOp: 0.0,
    horasExtrasNocturnasOp: 0.0,
    totalHorasOperadores:0.0,//totalHorasOperadores = horasConteoDiurnoOp + horasConteoNocturnoOp + horasExtrasDiurnasOp + horasExtrasNocturnasOp
    //Fin del segundo bloque

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    horasConteoDiurnoAud:0.0,//horasConteoDiurnoAud = auditores*1,5
    horasConteoNocturnoAud:0.0,//horasConteoNocturnoAud = (auditores * horasConteoPromedioXOperador) - horasConteoDiurnoAud
    horasExtrasDiurnasAud: 0.0,
    horasExtrasNocturnasAud: 0.0,
    totalHorasAud:0.0,//totalHorasAud = horasConteoDiurnoAud + horasConteoNocturnoAud + horasExtrasDiurnasAud + horasExtrasNocturnasAud

    //Fin del tercer bloque
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    horasConteoPromedioXOperador: 0.0,
    horasVistaDeDiferencia: 0.0,
    horasDescColectoresArmadoDeArchivo: 0.0,
    horasDescanso: 0.0,
    totalHorasDescanso: 0.0,//totalHorasDescanso = totalOperariosMasAuditoresMasBackupMasLider * horasDescanso //total horas descanso en el inventariado
    totalHorasInventario: 0.0,//totalHorasInventario = totalOperariosMasAuditoresMasBackupMasLider * horasConteoPromedioXOperador + (horasMapD + horasMapN) horas total inventario

    //Fin del cuarto bloque
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    operadoresBackup: 0,
    totalOperadores: 0,
    supervisores: 0,
    lideres:0,
    auditores: 0,
    totalOperadoresParaConteo:0, // totalOperadores + operadores backup
    totalOperariosMasAuditoresMasBackupMasLider: 0, //totalOperariosMasAuditoresMasBackupMasLider = auditores + operadoresBackup + totalOperadoresParaConteo + lider
    cantPersonasVista: 0,
    uniPorPersona: 0,
    uniPorHora: 0,
    unidades: 0,
    cantJornadas:0,
    // final del 5to bloque


}

// Función para calcular uniPorPersona
const calcularUniPorPersona = (state) => {
    state.uniPorPersona = state.uniPorHora * state.horasConteoPromedioXOperador;
    setTotalOperadores(state)
};
 //Reutilizables:

const setTotalOperariosMasAuditoresMasBackupMasLider = (state) => {

    const totalOperadoresParaConteo = Number(state.totalOperadoresParaConteo);
    const auditores = Number(state.auditores);
    const lideres = Number(state.lideres);

            state.totalOperariosMasAuditoresMasBackupMasLider = totalOperadoresParaConteo + auditores + lideres;
            setTotalHorasDescanso(state);
            setTotalHorasInventario(state);

        }
const setHorasConteoNocturnoOp = (state) => {
    const totalOperadoresParaConteo = Number(state.totalOperadoresParaConteo);
    const horasConteoPromedioXOperador = Number(state.horasConteoPromedioXOperador);
    const horasConteoDiurnoOp = Number(state.horasConteoDiurnoOp);


   // console.log(totalOperadoresParaConteo, "*", horasConteoPromedioXOperador, "-",horasConteoDiurnoOp, "=" , (totalOperadoresParaConteo * horasConteoPromedioXOperador) - horasConteoDiurnoOp)
             state.horasConteoNocturnoOp = (totalOperadoresParaConteo *horasConteoPromedioXOperador) - horasConteoDiurnoOp

        }
const setTotalHorasOperadores = (state) => {
    const horasConteoDiurnoOp = Number(state.horasConteoDiurnoOp);
    const horasConteoNocturnoOp = Number(state.horasConteoNocturnoOp);
    const horasExtrasDiurnasOp = Number(state.horasExtrasDiurnasOp);
    const horasExtrasNocturnasOp = Number(state.horasExtrasNocturnasOp);


            state.totalHorasOperadores = horasConteoDiurnoOp + horasConteoNocturnoOp + horasExtrasDiurnasOp + horasExtrasNocturnasOp
   
        }
const setHorasConteoDiurnoAud = (state) => {

    const auditores = Number(state.auditores);
            state.horasConteoDiurnoAud = auditores * 1.5 //Consultar si el 1,5 es fijo o variable
            setHorasConteoNocturnoAud(state)
            setTotalHorasAud(state)
        }
const setHorasConteoNocturnoAud = (state) => {
    const auditores = Number(state.auditores);
    const horasConteoPromedioXOperador = Number(state.horasConteoPromedioXOperador);
    const horasConteoDiurnoAud = Number(state.horasConteoDiurnoAud);
    
        
            state.horasConteoNocturnoAud = (auditores * horasConteoPromedioXOperador) - horasConteoDiurnoAud
            setTotalHorasAud(state)

        }
const setTotalHorasAud = (state) => {
            //console.log("horasConteoDiurnoAud" + state.horasConteoDiurnoAud + "horasConteoNocturnoAud", state.horasConteoNocturnoAud + "horasExtrasDiurnasAud" + state.horasExtrasDiurnasAud +"horasExtrasNocturnasAud"+ state.horasExtrasNocturnasAud)

    const horasConteoDiurnoAud = Number(state.horasConteoDiurnoAud);
    const horasConteoNocturnoAud = Number(state.horasConteoNocturnoAud);
    const horasExtrasDiurnasAud = Number(state.horasExtrasDiurnasAud);
    const horasExtrasNocturnasAud = Number(state.horasExtrasNocturnasAud);

            state.totalHorasAud = horasConteoDiurnoAud + horasConteoNocturnoAud + horasExtrasDiurnasAud + horasExtrasNocturnasAud
        }
const setTotalHorasDescanso = (state) => {
    const totalOperariosMasAuditoresMasBackupMasLider = Number(state.totalOperariosMasAuditoresMasBackupMasLider);
    const horasDescanso = Number(state.horasDescanso);
    

            state.totalHorasDescanso = totalOperariosMasAuditoresMasBackupMasLider * horasDescanso //total horas descanso en el inventariado
        }
const setTotalHorasInventario =(state)=>{

    // Convierte los valores a números antes de realizar la suma
    const totalOperariosMasAuditoresMasBackupMasLider = Number(state.totalOperariosMasAuditoresMasBackupMasLider);
    const conteoPromedioXOperador = Number(state.horasConteoPromedioXOperador);
    const horasMapD = Number(state.horasMapD);
    const horasMapN = Number(state.horasMapN);
   // console.log(conteoPromedioXOperador)
    // Realiza la suma de los valores numéricos
    state.totalHorasInventario = (totalOperariosMasAuditoresMasBackupMasLider * conteoPromedioXOperador) + (horasMapD + horasMapN);
}
const setTotalOperadores = (state) => {

    const unidades = Number(state.unidades);
    const uniPorPersona = Number(state.uniPorPersona);
    const cantJornadas = Number(state.cantJornadas);
    let totalOperadores = 0;
    if (uniPorPersona != 0 && cantJornadas != 0) { totalOperadores = Math.round(unidades / uniPorPersona / cantJornadas).toFixed(0) }
    //console.log(unidades)
    //console.log(uniPorPersona)
    //console.log(cantJornadas)
    //console.log(totalOperadores)

    
    const operadoresBackup = Number(Math.round(totalOperadores / 10).toFixed(0));
    const auditores = Number(Math.round(totalOperadores / 5).toFixed(0));

    state.totalOperadores = totalOperadores
    state.operadoresBackup = operadoresBackup
    state.auditores = auditores
    setHorasConteoDiurnoAud(state)

    const totalOperadoresParaConteo = Number(operadoresBackup) + Number(totalOperadores)

    //console.log(totalOperadoresParaConteo, "y ", totalOperadoresParaConteo*1.5)
    state.totalOperadoresParaConteo = totalOperadoresParaConteo

    setTotalOperariosMasAuditoresMasBackupMasLider(state);

    state.horasConteoDiurnoOp = Number(totalOperadoresParaConteo)* 1.5 //consultar si este numero siempre es fijo o puede variar

    setHorasConteoNocturnoOp(state);
    setTotalHorasOperadores(state)
}



export const calculosPersonalesSlice = createSlice({
    name: "calculosPersonales",
    initialState,
    reducers: {
        setIdCalculoPersonal: (state, action) => {
            state.idCalculoPersonal = action.payload;

        },
        setDate: (state, action) => {
            state.date = action.payload;

        },
        setIdCliente: (state, action) => {
            state.idCliente = action.payload;

        },
        setNameCliente: (state, action) => {
            state.nameCliente = action.payload;

        },
        setSucursales: (state, action) => {
            state.sucursales = action.payload;
        },
        setIdSucursal: (state, action) => {
            state.idSucursal = action.payload;

        },
        setSeccion: (state, action) => {
            state.seccion = action.payload;

        }
        ,
        setCiudad: (state, action) => {
            state.ciudad = action.payload;

        },
        setDuracion: (state, action) => {
            state.duracion = action.payload;

        },
        setHoraInicio: (state, action) => {
            state.horaInicio = action.payload;

        },
        setTransporte: (state, action) => {
            state.transporte = action.payload;

        }, setCena: (state, action) => {
            state.cena = action.payload;

        },
        setJornada: (state, action) => {
            state.jornada = action.payload;

        },
        setDireccion: (state, action) => {
            state.direccion = action.payload;

        },//Fin del primer bloque
        ///////////////////////////////////////////////////////////////////////////////////////////////////
        setHorasMapD: (state, action) => {
            state.horasMapD = action.payload;
            setTotalHorasInventario(state);
        }, setHorasMapN: (state, action) => {
            state.horasMapN = action.payload;
            setTotalHorasInventario(state);
        },
        setHorasExtrasDiurnasOp: (state, action) => {
            state.horasExtrasDiurnasOp = action.payload;
            setTotalHorasOperadores(state)
        }, setHorasExtrasNocturnasOp: (state, action) => {
            state.horasExtrasNocturnasOp = action.payload;
            setTotalHorasOperadores(state)
        },
        //Fin del segundo bloque
        ///////////////////////////////////////////////////////////////////////////////////////////////////
        setHorasExtrasDiurnasAud: (state, action) => {
            state.horasExtrasDiurnasAud = action.payload;
            setTotalHorasAud(state)

        }, setHorasExtrasNocturnasAud: (state, action) => {
            state.horasExtrasNocturnasAud = action.payload;
            setTotalHorasAud(state)

        },

        //Fin del tercer bloque
        ///////////////////////////////////////////////////////////////////////////////////////////////////
        setHorasPromedioXOperador: (state, action) => {
            state.horasConteoPromedioXOperador = action.payload;

            
            calcularUniPorPersona(state);
            setHorasConteoNocturnoOp(state);
            setHorasConteoNocturnoAud(state);
            setTotalHorasInventario(state);
        },
        setHorasVistaDeDiferencia: (state, action) => {
            state.horasVistaDeDiferencia = action.payload;
        },
        setHorasDescColectoresArmadoDeArchivo: (state, action) => {
            state.horasDescColectoresArmadoDeArchivo = action.payload;
        },
        setHorasDescanso: (state, action) => {
            state.horasDescanso = action.payload;
            setTotalHorasDescanso(state);
        },

        //Fin del cuarto bloque
        ///////////////////////////////////////////////////////////////////////////////////////////////////
        
        setSupervisores: (state, action) => {
            state.supervisores = action.payload;

        },
        setLideres: (state, action) => {
            state.lideres = action.payload;
            setTotalOperariosMasAuditoresMasBackupMasLider(state);
        },
        setCantPersonasVista: (state, action) => {
            state.cantPersonasVista = action.payload;

        },
        setUniPorHora: (state, action) => {
            state.uniPorHora = action.payload;
            


            calcularUniPorPersona(state)

            
        },
        setUnidades: (state, action) => {
            state.unidades = action.payload;

            setTotalOperadores(state)
        },
        setJornadas: (state, action) => {
            state.cantJornadas = action.payload;

            
            

            setTotalOperadores(state)
        },

        setAuditores: (state, action) => {
            state.auditores = action.payload;
        },
        // final del 5to bloque
       

        // CRUD de calculos personales
        setCalculosPersonales: (state, action) => {
            state.calculosPersonales = action.payload;
            
        },

        agregarUnCalculoPersonal: (state, action) => {
           // console.log(action);
            //immer
            state.calculosPersonales.push(action.payload);
            
        },

        borrarUnCalculoPersonal: (state, action) => {
            //const id = action.payload;
            //state.clientes = state.clientes.filter((movimiento) => movimiento.id !== id);
            //console.log("Borrado, ", state.clientes);

            const id = action.payload;
            const nuevosCalculosPersonales = state.calculosPersonales.filter(calculoPersonal => calculoPersonal.idCalculoPersonal !== id);
            return {
                ...state,
                calculosPersonales: nuevosCalculosPersonales,

            };


        },

        updateUnCalculoPersonal: (state, action) => {
            //El payload espera un id del cliente a actualizar, y el nuevoCliente
            const { id, nuevoCalculoPersonal } = action.payload;
            console.log(action.payload)
            const index = state.calculosPersonales.findIndex(cliente => cliente.idCliente === id);
            console.log(index, "INDEXXXXXXXXXXXXXXX")
                console.log(state.calculosPersonales)
            if (index !== -1) {
                // Usamos Immer para actualizar el estado de manera inmutable
                state.calculosPersonales[index] = nuevoCalculoPersonal;
            }
        },
        // sets para filters:
        setFilterCliente: (state, action) => {
            state.filterCliente = action.payload;

        }, setFilterSucursales: (state, action) => {
            state.filterSucursales = action.payload;

        }, setFilterSucursal: (state, action) => {
            state.filterSucursal = action.payload;

        }, setFilterDate: (state, action) => {
            state.filterDate = action.payload;

        }
        
        
    }

});

export const { setFilterDate, setFilterSucursal, setFilterCliente, setFilterSucursales, setCalculosPersonales, agregarUnCalculoPersonal, borrarUnCalculoPersonal, updateUnCalculoPersonal, setUnidades, setJornadas, setUniPorHora, setCantPersonasVista, setSupervisores
    , setHorasDescanso, setHorasDescColectoresArmadoDeArchivo, setHorasVistaDeDiferencia, setHorasPromedioXOperador, setHorasExtrasNocturnasAud, setHorasExtrasDiurnasAud, setHorasExtrasNocturnasOp, setHorasExtrasDiurnasOp, setHorasMapN, setHorasMapD, setDireccion, setCena, setSeccion, setTransporte, setDuracion, setDate, setIdCliente, setSucursales, setIdSucursal, setCiudad, setAuditores, setHoraInicio, setIdCalculoPersonal, setJornada, setLideres, setNameCliente } = calculosPersonalesSlice.actions;
export default calculosPersonalesSlice.reducer;