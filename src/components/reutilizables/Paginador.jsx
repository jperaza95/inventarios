
const Paginador = ({ currentPage, totalPages, handlePageClick }) => {

    return (


        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end">
                {currentPage> 1 && <li className="page-item"><a className="page-link" href="#" onClick={() => handlePageClick(currentPage - 1)}>Anterior</a></li>}
                {totalPages > 0 && [...Array(totalPages)].map((_, index) => {

                    const startRange = Math.max(1, currentPage - 2);
                    const endRange = Math.min(startRange + 4, totalPages);


                    // Renderiza solo si esta dentro del rango
                    if (index + 1 >= startRange && index + 1 <= endRange) {
                        return (
                            <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                                <a className="page-link" href="#" onClick={() => handlePageClick(index + 1)}>
                                    {index + 1}
                                </a>
                            </li>
                        );
                    }

                    return null;

                })}


                {currentPage < totalPages && <li className="page-item"><a className="page-link" href="#" onClick={() => handlePageClick(currentPage + 1)}>Siguiente</a></li>}
            </ul>
        </nav>
    );
};

export default Paginador;