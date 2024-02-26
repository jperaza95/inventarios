import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const ReporteProductosNoRegContenido = ({ idInventario }) => {
    const usuarios = useSelector(state => state.usuarios.usuarios);

    const [productosNoRegistrados, setProductosNoRegistrados] = useState([]);

    useEffect(() => {
        const productos = new Set(); //coleccion de valores únicos

        usuarios.forEach(usuario => {
            usuario.conteos.forEach(conteo => {
                if (conteo.inventory && conteo.inventory.idInventario === parseInt(idInventario)) {
                    conteo.totalDeItemsContados.forEach(stock => {
                        if (stock.producto.noEstabaEnMaestro) {
                            productos.add(stock.producto.codInterno);
                        }
                    });
                }
            });
        });

        setProductosNoRegistrados([...productos]);
    }, [usuarios, idInventario]);

    return (
        <div className="container mt-5">
            <h3>Productos Contados No Registrados en el Maestro</h3>
            <ul>
                {productosNoRegistrados.map(codInterno => (
                    <li key={codInterno}>{codInterno}</li>
                ))}
            </ul>
        </div>
    );
}

export default ReporteProductosNoRegContenido;
