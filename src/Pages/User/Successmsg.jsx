import React from "react"
import { Card, Col, Container, Row ,Image} from "react-bootstrap";
import { Link } from "react-router-dom";

//img
import AvonLogo from "../../assets/images/Logo.svg";

const Successmsg = () => {
    return (
        <>
            <section className="auth-page-wrapper position-relative bg-light min-vh-100 d-flex align-items-center justify-content-between">
                <div className="w-100">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={6}>
                                <div className="auth-card mx-lg-3">
                                    <Card className="border-0 mb-0">
                                            <Row className="align-items-center flex-col">
                                                <Col lg={8} className="mx-auto p-2" xs={3}>
                                                    <Image src={AvonLogo} alt="" className="img-fluid" />
                                                </Col>
                                            </Row>
                                        <Card.Body className="text-center">
                                            <div className="avatar-sm mx-auto mb-4">
                                                <div className="avatar-title bg-success-subtle text-success fs-20 rounded">
                                                    <i className="bi bi-check2-circle" />
                                                </div>
                                            </div>
                                            <p className="text-muted fs-15">E-poçtunuz uğurla təsdiqləndi</p>
                                            <div>
                                                <Link to='/hesabim' className="btn btn-success w-100">Hesabına geri dön</Link>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>{/*end col*/}
                        </Row>{/*end row*/}
                    </Container>{/*end container*/}
                    <footer className="footer">
                        <Container>
                            <Row >
                                <Col lg={12}>
                                    <div className="text-center">
                                        <p className="mb-0 text-muted">©
                                            {new Date().getFullYear()} Avon Azərbaycan Crafted with <i className="mdi mdi-heart text-danger" /> by RGAgency
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </footer>
                </div>
            </section>
        </>
    )
}

export default Successmsg;