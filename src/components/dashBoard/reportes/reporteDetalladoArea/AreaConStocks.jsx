import React from 'react';
import StockProducto from '../reporteCronologico/StockCrono';

function AreaConStocks({ areaSt, setExito }) {
    return (
        <>
            <tr>
                <td colSpan="7" className="tdSubtitulo">
                    {"Area: " + areaSt.codigoArea + "- " + areaSt.nameArea}
                </td>
            </tr>
            {
                areaSt.stocksArea.map(sc => (

                    <StockProducto key={sc.idStockCronologico} {...sc} setExito={setExito} />

                ))
            }
        </>
  );
    
}

export default AreaConStocks;