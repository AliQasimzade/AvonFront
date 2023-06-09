import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";

//img
import avonLogo from "../../assets/images/avonLogo.png"
import { useDispatch } from "react-redux";
import { changeAccont } from "../../slices/layouts/accont";
import { getAllBasket } from "../../slices/layouts/basket";

import { changeToken, changeUserId } from "../../slices/layouts/user";
const Signin = () => {
    const passwordtype = 'password';
    const [password, setPassword] = useState('');
    const [userid, setUserid] = useState("")
    const [token, setToken] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            userName: "",
            password: "",
        },
        validationSchema: Yup.object({
            userName: Yup.string().required("This field is required"),
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .matches(RegExp('(.*[a-z].*)'), 'At least lowercase letter')
                .matches(RegExp('(.*[A-Z].*)'), 'At least uppercase letter')
                .matches(RegExp('(.*[0-9].*)'), 'At least one number')
                .required("This field is required"),
        }),

        onSubmit: (values) => {
            axios.post("http://avontest0910-001-site1.dtempurl.com/api/Account/Login", values).then(rest=> {
                const parse = rest.data.split("+");
                const userId = parse[0].split(':')[1];
                const tok = parse[1].split(':')[1];
                setUserid(userId)
                setToken(tok)
                dispatch(changeUserId(userId))
                dispatch(changeToken(tok))
                axios.get(`http://avontest0910-001-site1.dtempurl.com/api/Account/MyAccount?id=${userId}`)
                .then((res) => {
                    dispatch(changeAccont({...res.data}))
                    axios.get(`http://avontest0910-001-site1.dtempurl.com/api/Baskets/GetAll?appUserId=${res.data[0].id}`).then(res => {
                         dispatch(getAllBasket(res.data))
                    })
                })
                navigate("/home")
            })
            
        },
    });

    const handleToogle = () => {
        passwordtype === password ? setPassword("text") : setPassword("password");
    }
    return (
        <>
            <section className="auth-page-wrapper position-relative bg-light min-vh-100 d-flex align-items-center justify-content-between">
                <div className="w-100">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={6}>
                                <div className="auth-card mx-lg-3">
                                    <Card className="border-0 mb-0 p-4">
                                        <Card className=" border-0">
                                            <Row className="justify-content-center">
                                                <Col lg={8} xs={4}>
                                                    <Image src={avonLogo} alt="" className="img-fluid" />
                                                </Col>
                                            </Row>
                                        </Card>
                                        <Card.Body>
                                            <p className="text-muted fs-15">Sign in to continue to AVON.</p>
                                            <div className="p-2">
                                                <Form action="#" onSubmit={formik.handleSubmit} >
                                                    <div className="mb-3">
                                                        <Form.Label htmlFor="userName" >Username</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="userName"
                                                            id="userName"
                                                            placeholder="Enter username"
                                                            value={formik.values.userName}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                        />
                                                        {formik.errors.userName && formik.touched.userName ? (
                                                            <span className="text-danger">{formik.errors.userName}</span>
                                                        ) : null}
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="float-end">
                                                            <Link to={"/sifreni-sifirla"} className="text-muted" >Forgot password?</Link>
                                                        </div>
                                                        <Form.Label htmlFor="password-input">Password</Form.Label>
                                                        <div className="position-relative auth-pass-inputgroup mb-3">
                                                            <Form.Control
                                                                type={password}
                                                                className=" pe-5 password-input"
                                                                name="password"
                                                                placeholder="Enter password"
                                                                id="password-input"
                                                                value={formik.values.password}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                            />
                                                            {formik.errors.password && formik.touched.password ? (
                                                                <span className="text-danger">{formik.errors.password}</span>
                                                            ) : null}
                                                            <Button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" id="password-addon" onClick={handleToogle}>
                                                                <i className="ri-eye-fill align-middle" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <Form.Check type="checkbox" label="Remember me" />
                                                    <div className="mt-4">
                                                        <Button variant="primary" className="w-100" type="submit">Sign In</Button>
                                                    </div>
                                                    <div className="mt-4 pt-2 text-center">
                                                        <div className="signin-other-title">
                                                            <h5 className="fs-13 mb-4 title">Sign In with</h5>
                                                        </div>
                                                    </div>
                                                </Form>
                                                <div className="text-center mt-22">
                                                    <p className="mb-0">Don't have an account ? <Link to='/qeydiyyat' className="fw-semibold text-secondary text-decoration-underline"> SignUp</Link> </p>
                                                </div>
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
                                            {new Date().getFullYear()} RGAgency. Crafted with <i className="mdi mdi-heart text-danger" /> by RGAgency
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </footer>
                </div>
            </section>
        </ >
    )
}

export default Signin;