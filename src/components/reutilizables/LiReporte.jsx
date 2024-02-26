import React from 'react';

import { useNavigate } from "react-router-dom"



function LiReporte({ dirReporte, titulo, idInventario }) {

    let navigate = useNavigate();

    const irAReporte = () => {
        idInventario !== "" ?
            navigate(`/${dirReporte}/${idInventario}`)
            : navigate(`/${dirReporte}`); //caso en que no se pasa idInventario (ej reporte de variacion)
    }

  return (
      <li>
          <div onClick={irAReporte}>
              
              <a className="nav-link">
                  {titulo}
              </a>
          </div>

      </li>
    );

}

export default LiReporte;