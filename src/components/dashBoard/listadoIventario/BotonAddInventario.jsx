import React from 'react';
import { useNavigate } from "react-router-dom";

function BotonAddInventario({ idSucursal }) {

    const agregarinventario = () => navigate(`/agregarinventario/${idSucursal}`);
    
    let navigate = useNavigate();


  return (
      <div className="container mt-4">

          <button type="button" className="btn btn-primary mb-3" onClick={() => agregarinventario()}>
              Agregar Nuevo Inventario
          </button>

      </div>
  );
}

export default BotonAddInventario;