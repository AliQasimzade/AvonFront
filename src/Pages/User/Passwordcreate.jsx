import React, { useState } from "react"
import { Card, Col, Container, Row, Form, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';

//img
import logodark from "../../assets/images/avonLogo.png";
import logolight from "../../assets/images/avonLogo.png";
import auth1 from "../../assets/images/auth/img-1.png";

const Passwordcreate = () => {
    const passwordtype = "password";
    const confirmPasswordtype = 'password';

    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: ""
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(8, 'Şifrə ən azı 8 simvol olmalıdır')
                .matches(RegExp('(.*[a-z].*)'), 'Ən azı 1 kiçik hərf')
                .matches(RegExp('(.*[A-Z].*)'), 'Ən azı 1 böyük hərf')
                .matches(RegExp('(.*[0-9].*)'), 'Ən azı 1 rəqəm')
                .required("Bu xana doldurulmalıdır"),
            confirmPassword: Yup.string()
                .required()
                .oneOf([Yup.ref("password")], "Şifrələr eyni deyil"),
        }),
        onSubmit: (values) => {
            // console.log("value", values);
        },
    });
    const handleTooglePassword = () => {
        passwordtype === password ? setPassword("text") : setPassword("password");
        console.log("password", password);

    }
    const handleConfirmPassword = () => {
        confirmPasswordtype === confirmpassword ? setConfirmpassword("text") : setConfirmpassword("password");
        console.log("confirmpassword", confirmpassword);

    }
    return (
        <>
            <section className="auth-page-wrapper position-relative bg-light min-vh-100 d-flex align-items-center justify-content-between">
                <div className="auth-header position-fixed top-0 start-0 end-0 bg-body">
                    <Container fluid>
                        <Row className=" justify-content-between align-items-center">
                            <Col xs={2}>
                                <Link className="navbar-brand mb-2 mb-sm-0" to="#">
                                    <Image src={logodark} className="card-logo card-logo-dark" alt="logo dark" height={22} />
                                    <Image src={logolight} className="card-logo card-logo-light" alt="logo light" height={22} />
                                </Link>
                            </Col>{/*-end col*/}
                            <div className="col-auto">
                                <ul className="list-unstyled hstack gap-2 mb-0">
                                    <li className="me-md-3">
                                        <Link to="#" className="text-body fw-medium fs-15">Satış nümayəndəsi ol</Link>
                                    </li>
                                    <li className="d-none d-md-block">
                                        <Link to="#" className="btn btn-soft-secondary" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="bi bi-google-play align-middle me-1" /> Tətbiqi yüklə
                                        </Link>
                                    </li>
                                    <li className="d-none d-md-block">
                                        <Link to="#" className="btn btn-soft-primary" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="bi bi-apple align-middle me-1" /> Tətbiqi yüklə
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </Row>{/*end row*/}
                    </Container>{/*end container-fluid*/}
                </div>
                <div className="w-100">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={6}>
                                <div className="auth-card mx-lg-3">
                                    <Card className="border-0 mb-0">
                                        <Card.Header className="bg-primary border-0">
                                            <Row >
                                                <Col lg={4} xs={3}>
                                                    <Image src={auth1} alt="" className="img-fluid" />
                                                </Col>
                                                <Col lg={8} xs={9}>
                                                    <h1 className="text-white lh-base fw-lighter">Yeni şifrə yarat</h1>
                                                </Col>
                                            </Row>
                                        </Card.Header>
                                        <Card.Body>
                                            <p className="text-muted fs-15">Yeni şifrəniz öncəki şifrənizdən fərqli olmalıdır</p>
                                            <div className="p-2">
                                                <Form action='/giris' onSubmit={formik.handleSubmit}>
                                                    <div className="mb-3">
                                                        <Form.Label htmlFor="password-input">Yeni şifrəniz</Form.Label>
                                                        <div className="position-relative auth-pass-inputgroup">
                                                            <Form.Control
                                                                type={password}
                                                                className="pe-5 password-input"
                                                                placeholder="Daxil edin"
                                                                id="password-input"
                                                                name="password"
                                                                onChange={formik.handleChange}
                                                                value={formik.values.password}
                                                                onBlur={formik.handleBlur}
                                                            />
                                                            {formik.errors.password && formik.touched.password ? (
                                                                <span className="text-danger">{formik.errors.password}</span>
                                                            ) : null}
                                                            <Button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" id="password-addon" bsPrefix="btn btn-none" onClick={handleTooglePassword}><i className="ri-eye-fill align-middle" /></Button>
                                                        </div>
                                                        <div id="passwordInput" className="form-text">Şifrəniz 8-20 simvoldan ibarət olmalıdır</div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <Form.Label htmlFor="confirm-password-input">Yeni şifrənin təkrarı</Form.Label>
                                                        <div className="position-relative auth-pass-inputgroup mb-3">
                                                            <Form.Control
                                                                type={confirmpassword}
                                                                className="pe-5 password-input"
                                                                placeholder="Yenidən daxil edin"
                                                                id="confirm-password-input"
                                                                name="confirmPassword"
                                                                value={formik.values.confirmPassword}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                            />
                                                            {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                                                                <span className="text-danger">{formik.errors.confirmPassword}</span>
                                                            ) : null}
                                                            <Button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" id="confirm-password-input" bsPrefix="btn btn-none" onClick={handleConfirmPassword}><i className="ri-eye-fill align-middle" /></Button>
                                                        </div>
                                                    </div>
                                                    <div className="form-check form-check-primary">
                                                        <Form.Control className="form-check-input" type="checkbox" id="auth-remember-check" />
                                                        <Form.Label className="form-check-label" htmlFor="auth-remember-check">Girişimi yaddaşda saxla</Form.Label>
                                                    </div>
                                                    <div className="mt-4">
                                                        <Button variant="primary" className="w-100" type="submit">Şifrəni sıfırla</Button>
                                                    </div>
                                                </Form>
                                            </div>
                                            <div className="mt-4 text-center">
                                                <p className="mb-0">Gözlə, mən şifrəmi xatırlayıram... <Link to='/giris' className="fw-semibold text-primary text-decoration-underline"> Giriş et </Link> </p>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>{/*end col*/}
                        </Row>{/*end row*/}
                    </Container>{/*end container*/}
                    <footer className="footer">
                        <Container>
                            <Row>
                                <Col lg={12}>
                                    <div className="text-center">
                                        <p className="mb-0 text-muted">©
                                            2021 - {new Date().getFullYear()} Avon Azərbaycan. Hazırladı <i className="mdi mdi-heart text-danger" /> by RGAgency
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

export default Passwordcreate;