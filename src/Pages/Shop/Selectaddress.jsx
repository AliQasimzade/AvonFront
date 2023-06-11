import React, { useState } from "react";
import { Col, Container, Row, Button, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import DeleteModal, { ModalAdd } from "../../Components/DeleteModal";
import { selectAddressData } from "../../Common/data";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from 'yup';

const Selectaddress = () => {

    const user = useSelector((state) => state.persistedReducer.Accont);

    console.log(user);
    document.title = "Shop | Select address | RGAgency - React FrontEnd";

    const [addressData, setAddressData] = useState("");

    const handleChangeAddress = (e, d) => {
        if (e.target.checked) {
            setAddressData(d)
        }
    }
    console.log(addressData);


    //delete id
    const [id, setId] = useState('');

    //ana-sehife Address
    const [removeModel, setRemovemodel] = useState(false);
    const RemoveModel = (id) => {
        setRemovemodel(!removeModel);
        setId(id);
    };

    const deleteData = () => {
        setAddressData(selectAddressData?.filter((delet) => delet.id !== id));
    }

    //Add address
    const [addressModal, setAddressModal] = useState(false);
    const handleClose = () => setAddressModal(false);
    const handleShow = () => setAddressModal(true);

    const formik = useFormik({
        initialValues: {
            name: "Qəbul edən şəxsin adı",
            address: "Ünvanı tam olaraq qeyd edin",
            phone: "Əlaqə nömrəsi",
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Please Enter Your Name'),
            address: Yup.string().required('Please Enter Your Address'),
            phone: Yup.string().matches(RegExp('[0-9]{7}')).required("Please Enter Your Phone"),
        }),
        onSubmit: (values) => {
            setAddressData(`${values.name}, ${values.address}, ${values.phone}`)
        },
    });


    return (
        <>
            <section className="section">
                <Container>
                    <Row>
                        <Col xs={12}>
                            <div>
                                <h4 className="fs-18 mb-4">Çatdırılma ünvanı seçin və ya əlavə edin</h4>
                                <Row className="g-4" id="address-list">
                                    <Col lg={6}>
                                        <div>
                                            <div className="form-check card-radio">
                                                <Form.Control id="shippingAddress1" name="shippingAddress" type="radio" className="form-check-input" onChange={(e) => handleChangeAddress(e, user.user[0].address)} />
                                                <Form.Label className="form-check-label" htmlFor="shippingAddress1">
                                                    <span className="mb-4 fw-semibold fs-12 d-block text-muted text-uppercase">Ev ünvanı</span>
                                                    <span className="fs-14 mb-2 fw-semibold  d-block">{user.user[0].address}</span>
                                                </Form.Label>
                                            </div>
                                            <div className="d-flex flex-wrap p-2 py-1 bg-light rounded-bottom border mt-n1 fs-13">
                                                <div>
                                                    <Link to="#" className="d-block text-body p-1 px-2 edit-list" data-edit-id="1" data-bs-toggle="modal" data-bs-target="#addAddressModal" onClick={handleShow}>
                                                        <i className="ri-pencil-fill text-muted align-bottom me-1"></i>Düzəliş et</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div>
                                            <div className="form-check card-radio">
                                                <Form.Control id="shippingAddress2" name="shippingAddress" type="radio" className="form-check-input" onChange={(e) => handleChangeAddress(e, user.user[0].otherAddress)} />
                                                <Form.Label className="form-check-label" htmlFor="shippingAddress2">
                                                    <span className="mb-4 fw-semibold fs-12 d-block text-muted text-uppercase">İş ünvanı</span>
                                                    <span className="fs-14 mb-2 fw-semibold  d-block">{user.user[0].otherAddress}</span>
                                                </Form.Label>
                                            </div>
                                            <div className="d-flex flex-wrap p-2 py-1 bg-light rounded-bottom border mt-n1 fs-13">
                                                <div>
                                                    <Link to="#" className="d-block text-body p-1 px-2 edit-list" data-edit-id="1" data-bs-toggle="modal" data-bs-target="#addAddressModal" onClick={handleShow}>
                                                        <i className="ri-pencil-fill text-muted align-bottom me-1"></i>Düzəliş et</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col lg={6}>
                                        <div className="text-center p-4 rounded-3 border border-2 border-dashed">
                                            <div className="avatar-md mx-auto mb-4">
                                                <div className="avatar-title bg-success-subtle text-success rounded-circle display-6">
                                                    <i className="bi bi-house-add"></i>
                                                </div>
                                            </div>
                                            <h5 className="fs-16 mb-3">Fərqli ünvana göndər</h5>
                                            <Button variant="success" className="btn-sm w-xs stretched-link addAddress-modal" data-bs-toggle="modal" data-bs-target="#addAddressModal" onClick={handleShow}>Yarat</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                    <DeleteModal removeModel={removeModel} hideModal={RemoveModel} deleteData={deleteData} />
                    <ModalAdd addressModal={addressModal} handleClose={handleClose} />
                    <Modal show={addressModal} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <h1 className="modal-title fs-5" id="addAddressModalLabel">Add New Address</h1>
                </Modal.Header>
                <Modal.Body>
                    <Form autoComplete="off" className="needs-validation createAddress-form" id="createAddress-form" onSubmit={formik.handleSubmit} >
                        <Form.Control type="hidden" id="addressid-Form.Control" defaultValue="" />
                        <div>
                            <div className="mb-3">
                                <Form.Label htmlFor="addaddress-Name" >Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="addaddress-Name"
                                    placeholder="Daxil edin"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {
                                    formik.errors.name && formik.touched.name ?
                                        (
                                            <span className="text-danger">{formik.errors.name}</span>
                                        ) : null
                                }
                            </div>

                            <div className="mb-3">
                                <Form.Label htmlFor="addaddress-textarea" >Address</Form.Label>
                                <Form.Control as="textarea"
                                    id="addaddress-textarea"
                                    placeholder="Daxil edin"
                                    rows={2}
                                    name="address"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                ></Form.Control>
                                {
                                    formik.errors.address && formik.touched.address ?
                                        (<span className="text-danger">{formik.errors.address}</span>
                                        ) : null
                                }
                            </div>

                            <div className="mb-3">
                                <Form.Label htmlFor="addaddress-phone" >Phone</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="addaddress-phone"
                                    placeholder="Əlaqə nömrəsi"
                                    name="phone"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {
                                    formik.errors.phone && formik.touched.phone ?
                                        (<span className="text-danger">{formik.errors.phone}</span>
                                        ) : null
                                }
                            </div>
                        </div>

                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <Button className="btn btn-light" data-bs-dismiss="modal" onClick={handleClose}>Bağla</Button>
                            <Button type="submit" id="addNewAddress" className="btn btn-primary">Seç</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
                </Container>
            </section>
        </>
    )
}
export default Selectaddress;