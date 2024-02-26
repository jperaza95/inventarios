import StockProducto from "./StockProducto";

function ProdsPorArea({ reportePorProducto, setExito }) {


   
        return (
            <>
                <tr>
                    <td colSpan="7" className="tdSubtitulo">
                        {reportePorProducto.codigoProducto + "- " + reportePorProducto.nombreProd}
                    </td>
                </tr>
                {
                    reportePorProducto.stocksProducto.map(sp => (

                        <StockProducto key={sp.codigoArea} {...sp} setExito={setExito} />

                    ))
                }
            </>
        );

    


}
    export default ProdsPorArea;

