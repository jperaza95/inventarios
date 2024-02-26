import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { NavLink } from "react-router-dom";


function ModalEliminacion(props) {

    const [show, setShow] = useState(false);

    const [cuerpo, setCuerpo] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    return (
        <>
            <input type="button" className="btn btn-outline-danger" onClick={() => (handleShow(), props.setExito(false))} value='Eliminar' />

            <Modal show={show} onHide={handleClose} size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.body}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => {
                        props.onSave();
                        handleClose();

                    }}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEliminacion;