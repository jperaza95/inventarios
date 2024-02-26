import React from 'react';

function StockProducto({ codigoArea, nombreProd, codProducto, codBarras, cantidad, precio }) {
    return (

        <tr>



            <td>{codigoArea}</td>
            <td>{nombreProd}</td>
            <td>{codProducto}</td>
            <td>{codBarras}</td>
            <td>{cantidad}</td>
            <td>{precio}</td>
            <td>{(precio*cantidad).toFixed(2)}</td>


        </tr>
    );
}

export default StockProducto;