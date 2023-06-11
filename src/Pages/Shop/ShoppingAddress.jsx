import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import DeleteModal from "../../Components/DeleteModal";
import { useSelector } from "react-redux";
export const ShopingAddress = ({ title, HomeAdd, officeAdd, }) => {
    //modal
    const [removeModel, setRemovemodel] = useState(false);
    const RemoveModel = () => setRemovemodel(!removeModel);
    const [id, setId] = useState(false);
    const deleteData = () => {
        setId(true);
    }



    return (
        <>
            <div className="mt-4 pt-2">
                <div className="d-flex align-items-center mb-4">
                    <div className="flex-grow-1">
                        <h5 className="mb-0">{title || ''}</h5>
                    </div>
                    <div className="flex-shrink-0">
                        <Link to={"/hesabim/unvanlarim"} className="badge badge-soft-secondary link-secondary">
                            Ünvan əlavə et
                        </Link>
                    </div>
                </div>
                <Row className="gy-3">
                    <Col lg={6} xs={12}>
                        <div className="form-check card-radio">
                            <Form.Control id="shippingAddress01" name="shippingAddress" type="radio" className="form-check-input" />
                            <Form.Label className="form-check-label" htmlFor="shippingAddress01">
                                <span className={`${HomeAdd ? "mb-3 text-uppercase fw-semibold d-block" : "d-none"}`}>{HomeAdd || ''}</span>

                                <span className="fs-14 mb-2 d-block fw-semibold">{user.user[0].address.split(",")}</span>
                                <span className="text-muted fw-normal text-wrap mb-1 d-block">{user.user[0].address.split(",")}</span>
                                <span className="text-muted fw-normal d-block">{user.user[0].address.split(",")}</span>
                            </Form.Label>
                        </div>
                        <div className="d-flex flex-wrap p-2 py-1 bg-light rounded-bottom border mt-n1">
                            <div>
                                <Link to='/hesabim/unvanlarim' className="d-block text-body p-1 px-2"><i className="ri-pencil-fill text-muted align-bottom me-1"></i> Edit</Link>
                            </div>
                            <div>
                                <Link to="/hesabim/unvanlarim" className="d-block text-body p-1 px-2">
                                    <i className="ri-delete-bin-fill text-muted align-bottom me-1"></i> Remove</Link>
                            </div>
                        </div>
                    </Col>
                    <Col lg={6} xs={12}>
                        <div className="form-check card-radio">
                            <Form.Control id="shippingAddress02" name="shippingAddress" type="radio" className="form-check-input" />
                            <Form.Label className="form-check-label" htmlFor="shippingAddress02">
                                <span className={`${officeAdd ? "mb-3 text-uppercase fw-semibold d-block" : "d-none"}`}>{officeAdd || ''}</span>
                                <span className="fs-14 mb-2 d-block fw-semibold">{user.user[0].otherAddress.split(",")}</span>
                                <span className="text-muted fw-normal text-wrap mb-1 d-block">{user.user[0].otherAddress.split(",")}</span>
                                <span className="text-muted fw-normal d-block">{user.user[0].otherAddress.split(",")}</span>
                            </Form.Label>
                        </div>
                        <div className="d-flex flex-wrap p-2 py-1 bg-light rounded-bottom border mt-n1">
                            <div>
                                <Link to='/hesabim/unvanlarim' className="d-block text-body p-1 px-2"><i className="ri-pencil-fill text-muted align-bottom me-1"></i> Edit</Link>
                            </div>
                            <div>
                                <Link to="#removeAddressModal" className="d-block text-body p-1 px-2" data-bs-toggle="modal"><i className="ri-delete-bin-fill text-muted align-bottom me-1" onClick={RemoveModel}></i> Remove</Link>
                            </div>
                        </div>
                    </Col>
                </Row>
                <DeleteModal removeModel={removeModel} hideModal={RemoveModel} onClick={RemoveModel} deleteData={deleteData} id={id} />
            </div>
        </ >
    )
}