import React from 'react';

function StockCrono({ producto, codProd, stockParcial, horaStocked, area }) {
    return (

        <tr>
            

            
            <td>{producto.desc}</td>
            <td>{producto.codInterno}</td>
            <td>{(codProd ? "Interno":"Barras")}</td>
            <td>{stockParcial}</td>
            <td>{horaStocked}</td>
            <td>{area.codigo}</td>
            <td>{area.name}</td>


        </tr>
    );
}

export default StockCrono;