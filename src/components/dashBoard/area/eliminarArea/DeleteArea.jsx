import React from 'react';
import AlertDanger from '../../../reutilizables/AlertDanger';
import AlertSuccess from '../../../reutilizables/AlertSuccess;'

function DeleteArea({ idInventario }) {



  return (
      <>
          <div className="col-12">
              <h1>Eliminar &aacute;reas</h1>
              <p>Eliminar un rango de &aacute;reas del inventario {idInventario}</p>
          </div>


          <table className="table table-striped">
              <thead>
                  <tr>
                      <th scope="col">Nombre</th>
                      <th scope="col">Desde</th>
                      <th scope="col">Hasta</th>
                      <th scope="col">Acci&oacute;n</th>

                  </tr>
              </thead>


              <tbody>
                  <tr>

                      <td>
                          <input type="text" id="name" className="form-control" value={nameUP} onChange={handleNameChange} />
                      </td>

                      <td>
                          <input type="number" id="desde" className="form-control" value={desde} onChange={handleDesde} onBlur={validarDesdeHasta} min={0} />
                      </td>

                      <td>
                          {/*onBlur se ejecuta luego de que el campo pierde el foco*/}
                          <input type="number" id="hasta" className="form-control" value={hasta} onChange={handleHasta} onBlur={validarDesdeHasta} min={0} />
                      </td>

                      <td>
                          <input type="button" className="btn btn-outline-primary" onClick={() => eliminar()} value='Eliminar' />
                      </td>

                  </tr>

              </tbody>

          </table>

          {error && <AlertDanger mensaje={message} />}
          {success && <AlertSuccess mensaje={message} />}


      </>
  );
}

export default DeleteArea;