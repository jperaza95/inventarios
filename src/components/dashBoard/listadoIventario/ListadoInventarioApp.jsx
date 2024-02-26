import React from 'react';
import ListadoInventarioContenido from './ListadoInventarioContenido';
import { useParams } from 'react-router-dom';



function listadoInventarioApp() {
    const { idSucursal } = useParams();
  return (
      <div>
          <ListadoInventarioContenido idSucursal={idSucursal} />
      </div>
  );
}

export default listadoInventarioApp;