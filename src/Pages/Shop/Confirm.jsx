import React from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import { Shoptopbar } from "../../Components/ShopTopBar";
import success from "../../assets/images/success-img.png";
import EmailClothe from "../../Pages/Catalog/EmailClothe";

const Confirm = () => {
    document.title = "Sifariş təsdiqləndi | Avon Azərbaycan";
    return (
        <>
            <Shoptopbar title="Confirmation" page="Order Confirm" />
            <section className="section">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <Card>
                                <Card.Body className="p-4 p-md-5">
                                    <div className="text-center">
                                        <Image src={success} alt="" className="w-50" />
                                    </div>
                                    <div className="text-center mt-5 pt-1">
                                        <h4 className="mb-3 text-capitalize">Sifarişiniz qeydə alındı!</h4>
                                        <p className="text-muted mb-2">Sifarişin təsdiqlənməsi ilə bağlı e-poçt ünvanınıza bildiriş göndəriləcək</p>
                                        <div className="mt-4 pt-2 hstack gap-2 justify-content-center">
                                            <Link to='/hesabim/sifaris-tarixcesi' className="btn btn-primary btn-hover">Sifarişə bax <i className="ri-arrow-right-line align-bottom ms-1"></i></Link>
                                            <Link to='/ana-sehife' className="btn btn-soft-danger btn-hover">Əsas səhifəyə qayıt <i className="ri-home-4-line align-bottom ms-1"></i></Link>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
            <EmailClothe />
             
        </>
    )
}

export default Confirm;