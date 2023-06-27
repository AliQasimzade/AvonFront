import React from "react";
import { Modal, Button, Form } from "react-bootstrap";


//delete modal
const DeleteModal = ({ removeModel, hideModal, deleteData }) => {

    const handleDelete = () => {
        deleteData();
        hideModal();
    }
    return (
        <Modal show={removeModel} onHide={hideModal} centered id='removeItemModal' className="zoomIn">
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <div className="mt-2 text-center">
                    {/* <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger=" loop" colors={'primary:#f7b84b,secondary:#f06548'} style={{ width: "100px", height: "100px" }}></lord-icon> */}
                    <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                        <h4>Əminsiniz</h4>
                        <p className="text-muted mx-4 mb-0">Məhsulu silmək istədiyinizə əminsiniz?</p>
                    </div>
                </div>
                <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                    <Button className="btn w-sm btn-light" data-bs-dismiss="modal" onClick={hideModal}>Bağla</Button>
                    <Button className="btn w-sm btn-danger" id="remove-product" onClick={handleDelete}>Bəli, sil!</Button>
                </div>
            </Modal.Body>
        </Modal >
    )
}

export default DeleteModal;

//=================================================================

//add addres modal
export const ModalAdd = ({ addressModal, handleClose }) => {
    

    return (
        <>
            
        </>
    )
}