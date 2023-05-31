import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import storage from "../../Components/Firebase";
import axios from "axios";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

//img
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";
import auth1 from "../../assets/images/auth/img-1.png";

const SignUp = () => {
    const [passwordtype, setPasswordtype] = useState(false);
    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            address: "",
            email: "",
            phone: "",
            idForReferal: "",
            password: "",
            repeatPassword: "",
            profileImage: null,
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please enter your name"),
            surname: Yup.string().required("Please enter your surname"),
            address: Yup.string().required("Please enter your address"),
            email: Yup.string().email().required("Please enter a valid email"),
            phone: Yup.string().required("Please enter your phone number"),
            idForReferal: Yup.string(),
            password: Yup.string()
                .min(8, "Password must be at least 8 characters")
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/, {
                    message:
                        "Password must contain at least one lowercase letter, one uppercase letter, and one number",
                })
                .required("Please enter a password"),
            repeatPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Please repeat your password"),
            profileImage: Yup.mixed().required(),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            setSubmitting(true);
            try {
                const profileImage = values.profileImage;
                const imageRef = ref(storage, 'avatars/' + profileImage.name);
                const uploadTask = uploadBytesResumable(imageRef, profileImage);

                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                    },
                    (error) => {
                        setErrors({ file: 'Error uploading profile image' });
                        console.error('Error uploading profile image:', error);
                    },
                    async () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            console.log('File available at', downloadURL);

                            const formData = { ...values, profileImage: downloadURL };
                            axios.post('http://avontest0910-001-site1.dtempurl.com/api/Account/register', formData)
                                .then((response) => {
                                    console.log("Response from API:", response.data);
                                })
                                .catch((error) => {
                                    console.error("Error posting data:", error);
                                })
                                .finally(() => {
                                    setSubmitting(false);
                                });
                        });
                    }
                );
            } catch (error) {
                setSubmitting(false);
                setErrors({ file: 'Error uploading profile image' });
                console.error('Error uploading profile image:', error);
            }
        },
    });
    return (
        <>
            <section className="auth-page-wrapper position-relative bg-light min-vh-100 d-flex align-items-center justify-content-between">
                <div className="auth-header position-fixed top-0 start-0 end-0 bg-body">
                    <Container fluid>
                        <Row className="justify-content-between align-items-center">
                            <Col xs={2}>
                                <Link className="navbar-brand mb-2 mb-sm-0" to="index.html">
                                    <Image
                                        src={logodark}
                                        className="card-logo card-logo-dark"
                                        alt="logo dark"
                                        height={22}
                                    />
                                    <Image
                                        src={logolight}
                                        className="card-logo card-logo-light"
                                        alt="logo light"
                                        height={22}
                                    />
                                </Link>
                            </Col>
                            <Col className="col-auto">
                                <ul className="list-unstyled hstack gap-2 mb-0">
                                    <li className="me-md-3">
                                        <Link
                                            to="#"
                                            className="text-body fw-medium fs-15"
                                        >
                                            Become a Selling
                                        </Link>
                                    </li>
                                    <li className="d-none d-md-block">
                                        <Link
                                            to="#"
                                            className="btn btn-soft-secondary"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <i className="bi bi-google-play align-middle me-1" />{" "}
                                            Download App
                                        </Link>
                                    </li>
                                    <li className="d-none d-md-block">
                                        <Link
                                            to="#"
                                            className="btn btn-soft-primary"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <i className="bi bi-apple align-middle me-1" />{" "}
                                            Download App
                                        </Link>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="w-100">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={12}>
                                <div className="auth-card mx-lg-3">
                                    <Card className="border-0 mb-0">
                                        <Card.Header className="bg-primary border-0">
                                            <Row>
                                                <Col lg={4} xs={3}>
                                                    <Image src={auth1} alt="" className="img-fluid" />
                                                </Col>
                                                <Col lg={8} xs={9}>
                                                    <h1 className="text-white text-capitalize lh-base fw-lighter">
                                                        Let's get started with RGAgency Store
                                                    </h1>
                                                </Col>
                                            </Row>
                                        </Card.Header>
                                        <Card.Body>
                                            <p className="text-muted fs-15">
                                                Get your free RGAgency account now
                                            </p>
                                            <div className="p-2">
                                                <Form
                                                    className="needs-validation"
                                                    action="#"
                                                    onSubmit={formik.handleSubmit}
                                                >
                                                    <Row>
                                                        <div className="mb-3 col-12 col-lg-6">
                                                            <Form.Label htmlFor="name">
                                                                Name{" "}
                                                                <span className="text-danger">*</span>
                                                            </Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                id="name"
                                                                name="name"
                                                                placeholder="Enter your name"
                                                                value={formik.values.name}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                            />
                                                            {formik.touched.name && formik.errors.name ? (
                                                                <div className="text-danger">
                                                                    {formik.errors.name}
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        <div className="mb-3 col-12 col-lg-6">
                                                            <Form.Label htmlFor="surname">
                                                                Surname{" "}
                                                                <span className="text-danger">*</span>
                                                            </Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                id="surname"
                                                                name="surname"
                                                                placeholder="Enter your surname"
                                                                value={formik.values.surname}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                            />
                                                            {formik.touched.surname && formik.errors.surname ? (
                                                                <div className="text-danger">
                                                                    {formik.errors.surname}
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        <div className="mb-3 col-12 col-lg-6">
                                                            <Form.Label htmlFor="address">
                                                                Address{" "}
                                                                <span className="text-danger">*</span>
                                                            </Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                id="address"
                                                                name="address"
                                                                placeholder="Enter your address"
                                                                value={formik.values.address}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                            />
                                                            {formik.touched.address && formik.errors.address ? (
                                                                <div className="text-danger">
                                                                    {formik.errors.address}
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        <div className="mb-3 col-12 col-lg-6">
                                                            <Form.Label htmlFor="useremail">
                                                                Email <span className="text-danger">*</span>
                                                            </Form.Label>
                                                            <Form.Control
                                                                type="email"
                                                                id="useremail"
                                                                name="email"
                                                                placeholder="Enter email address"
                                                                value={formik.values.email}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                            />
                                                            {formik.touched.email && formik.errors.email ? (
                                                                <div className="text-danger">
                                                                    {formik.errors.email}
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        <div className="mb-3 col-12 col-lg-6">
                                                            <Form.Label htmlFor="phone">
                                                                Phone{" "}
                                                                <span className="text-danger">*</span>
                                                            </Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                id="phone"
                                                                name="phone"
                                                                placeholder="Enter your phone number"
                                                                value={formik.values.phone}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                            />
                                                            {formik.touched.phone && formik.errors.phone ? (
                                                                <div className="text-danger">
                                                                    {formik.errors.phone}
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        <div className="mb-3 col-12 col-lg-6">
                                                            <Form.Label htmlFor="idForReferal">
                                                                ID for Referral
                                                            </Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                id="idForReferal"
                                                                name="idForReferal"
                                                                placeholder="Enter ID for referral"
                                                                value={formik.values.idForReferal}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                            />
                                                        </div>
                                                        <div className="mb-3 col-12 col-lg-6">
                                                            <Form.Label htmlFor="password-input">
                                                                Password
                                                            </Form.Label>
                                                            <div className="position-relative auth-pass-inputgroup">
                                                                <Form.Control
                                                                    type={passwordtype ? "text" : "password"}
                                                                    className="pe-5 password-input"
                                                                    placeholder="Enter password"
                                                                    id="password-input"
                                                                    name="password"
                                                                    value={formik.values.password}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                />
                                                                <Button
                                                                    variant="link"
                                                                    className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                                                    id="password-addon"
                                                                    onClick={() =>
                                                                        setPasswordtype(!passwordtype)
                                                                    }
                                                                >
                                                                    <i className="ri-eye-fill align-middle" />
                                                                </Button>
                                                                {formik.touched.password &&
                                                                    formik.errors.password ? (
                                                                    <div className="text-danger">
                                                                        {formik.errors.password}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                        <div className="mb-3 col-12 col-lg-6">
                                                            <Form.Label htmlFor="repeatPassword">
                                                                Repeat Password
                                                            </Form.Label>
                                                            <div className="position-relative auth-pass-inputgroup">
                                                                <Form.Control
                                                                    type={passwordtype ? "text" : "password"}
                                                                    className="pe-5 password-input"
                                                                    placeholder="Repeat password"
                                                                    id="repeatPassword"
                                                                    name="repeatPassword"
                                                                    value={formik.values.repeatPassword}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                />
                                                                {formik.touched.repeatPassword &&
                                                                    formik.errors.repeatPassword ? (
                                                                    <div className="text-danger">
                                                                        {formik.errors.repeatPassword}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                        <div className="mb-3 col-12 col-lg-6">
                                                            <Form.Label htmlFor="profileImage">
                                                                Profile Image
                                                            </Form.Label>
                                                            <Form.Control
                                                                type="file"
                                                                id="profileImage"
                                                                name="profileImage"
                                                                onChange={(event) => {
                                                                    formik.setFieldValue(
                                                                        "profileImage",
                                                                        event.currentTarget.files[0]
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="mt-4">
                                                            <Button variant="primary" className="w-100" type="submit">
                                                                Sign Up
                                                            </Button>
                                                        </div>
                                                    </Row>
                                                </Form>
                                            </div>
                                            <div className="mt-4 text-center">
                                                <p className="mb-0">
                                                    Already have an account?{" "}
                                                    <Link
                                                        to="/auth-signin-basic"
                                                        className="fw-semibold text-primary text-decoration-underline"
                                                    >
                                                        Sign in
                                                    </Link>{" "}
                                                </p>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <footer className="footer">
                        <Container>
                            <Row>
                                <Col lg={12}>
                                    <div className="text-center">
                                        <p className="mb-0 text-muted">
                                            © {new Date().getFullYear()} RGAgency. Crafted with{" "}
                                            <i className="mdi mdi-heart text-danger" /> by RGAgency
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </footer>
                </div>
            </section>
        </>
    );
};

export default SignUp;
