export const formatearFecha = (dateInventario) => {
    const fecha = new Date(dateInventario);
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;

};