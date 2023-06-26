import React from "react";
import { Button, Col, Container, Form, Row, Image } from "react-bootstrap";

//img
import EbgEffect from "../../assets/images/ecommerce/bg-effect.png";
import subscribe from "../../assets/images/ecommerce/subscribe.png";
import { Link } from "react-router-dom";

const EmailClothe = () => {
    return (
        <>
            <section className="section bg-light bg-opacity-25" style={{ backgroundImage: `url(${EbgEffect})`, backgroundPosition: "center", backgroundSize: "cover" }}>
                <Container>
                    <Row className="align-items-center justify-content-between">
                        <Col lg={6}>
                            <div>
                                <p className="fs-15 text-uppercase fw-medium">
                                    <span className="fw-semibold text-danger">Bütün məhsullara</span> 25%-ə qədər endirimlər</p>
                                <h1 className="lh-base text-capitalize mb-3">Evi tərk etmədən ehtiyacın olan bütün məhsullar bir ünvanda</h1>
                                <p className="fs-15 mb-4 pb-2"><Link to="#" className="link-info fw-medium">Avon Azərbaycanla</Link> bütün sifarişlərin bir ünvanda </p>
                                <Form action="#">
                                    <div className="position-relative ecommerce-subscript">
                                        <Form.Control type="email" className="rounded-pill" placeholder="E-poçt ünvanını daxil et" />
                                        <Button type="submit" variant="primary" className="btn-hover rounded-pill">İzləməyə başla</Button>
                                    </div>
                                </Form>
                            </div>
                        </Col>
                        <Col lg={4} >
                            <div className="mt-5 mt-lg-0">
                                <Image fluid src={subscribe} alt="" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default EmailClothe;