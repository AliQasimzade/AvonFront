import React from "react";
import {
  Alert,
  Card,
  Col,
  Container,
  Form,
  Row,
  Button,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
//img
import avonLogo from "../../assets/images/Logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Passwordreset = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email()
        .required("Zəhmət olmasa e-poçt hesabınızı daxil edin"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          `https://avonazerbaijan.com/api/Account/passwordreset?userName=${values.email}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: values.email }),
          }
        );
        if (response.ok) {
         toast.success('Zəhmət olmasa e-poçt ünvanınıza keçid edib gələn linkə keçid edin')
         values.email = ""
        } else {
          const errorData = await response.json();
          toast.error(errorData.message)
          values.email = ""
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme="light"
      />
      <section className="auth-page-wrapper position-relative bg-light min-vh-100 d-flex align-items-center justify-content-between">
        <div className="auth-header position-fixed top-0 start-0 end-0 bg-body">
          <Container fluid>
            <Row className="justify-content-between align-items-center">
              <Col xs={2}>
                <Link className="navbar-brand mb-2 mb-sm-0" to="index.html">
                  <Image
                    src={avonLogo}
                    className="card-logo card-logo-dark"
                    alt="logo dark"
                    height={22}
                  />
                  <Image
                    src={avonLogo}
                    className="card-logo card-logo-light"
                    alt="logo light"
                    height={22}
                  />
                </Link>
              </Col>
              {/*-end col*/}
            </Row>
            {/*end row*/}
          </Container>
          {/*end container-fluid*/}
        </div>
        <div className="w-100">
          <Container>
            <Row className="justify-content-center">
              <Col lg={6}>
                <div className="auth-card mx-lg-3">
                  <Card className="border-0 mb-0 p-4">
                    <Card className="border-0">
                      <Row className="justify-content-center">
                        <Col lg={8} xs={4}>
                          <Image src={avonLogo} alt="" className="img-fluid" />
                        </Col>
                      </Row>
                    </Card>
                    <Card.Body>
                      <p className="text-muted fs-15">
                        Şəxsi hesabınızın şifrəsini sıfırlamaq üçün e-poçt
                        hesabınızı yazın
                      </p>
                      <Alert
                        className="alert-borderless alert-warning text-center mb-2 mx-2"
                        role="alert"
                      >
                        E-poçt hesabınızı yazdıqdan sonra şifrə sıfırlanması
                        təlimatı sizə göndəriləcək!
                      </Alert>
                      <div className="p-2">
                        <Form onSubmit={formik.handleSubmit}>
                          <div className="mb-4">
                            <Form.Label htmlFor="email">E-poçt</Form.Label>
                            <Form.Control
                              type="email"
                              id="email"
                              name="email"
                              placeholder="E-poçt ünvanınızı və ya istifadəçi adınızı daxil edin"
                              value={formik.values.email}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.errors.email && formik.touched.email ? (
                              <span className="text-danger">
                                {formik.errors.email}
                              </span>
                            ) : null}
                          </div>
                          <div className="text-center mt-4">
                            <Button
                              variant="primary"
                              className="w-100"
                              type="submit"
                            >
                              Sıfırlama linki göndər
                            </Button>
                          </div>
                        </Form>
                        {/* end form */}
                      </div>
                      <div className="mt-4 text-center">
                        <p className="mb-0">
                          Gözlə, deyəsən şifrəmi xatırlayıram...{" "}
                          <Link
                            to="/giris"
                            className="fw-semibold text-primary text-decoration-underline"
                          >
                            {" "}
                            Şifrəmi bilirəm{" "}
                          </Link>{" "}
                        </p>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
              {/*end col*/}
            </Row>
            {/*end row*/}
          </Container>
          {/*end container*/}
          <footer className="footer">
            <Container>
              <Row>
                <Col lg={12}>
                  <div className="text-center">
                    <p className="mb-0 text-muted">
                      ©{new Date().getFullYear()} Avon Azərbaycan Sevgi ilə hazırladı{" "}
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

export default Passwordreset;
