import React from 'react';

function Producto({ codInterno, codigosDeBarras, desc, precio, familia, stockTeorico, stockReal }) {
    return (

        <tr>
            <td scope="row">{codInterno}</td>
            <td>
                <p>

                    <button className="btn btn-primary" type="button" data-toggle="collapse" data-target={`#id${codInterno}`} aria-expanded="false" aria-controls={`id${codInterno}`}>
                        C&oacute;digos
                    </button>
                </p>
                <div className="collapse" id={`id${codInterno}`}>
                    <div className="card card-body">
                        {codigosDeBarras && codigosDeBarras.map(cod => <small key={cod.codigoBarraId}>{cod.codigo}</small>) }
                    </div>
                </div>

            </td>
            <td>{desc}</td>
            <td>{precio}</td>
            <td>{familia}</td>
            <td>{stockTeorico}</td>
            <td>{stockReal}</td>

      </tr>
  );
}

export default Producto;