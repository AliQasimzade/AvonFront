import React, { useState } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  Form,
  Button,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AvonLogo from "../../assets/images/Logo.svg";
import { useSearchParams,useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Passwordcreate = () => {
  const passwordtype = "password";
  const confirmPasswordtype = "password";
  const navigate = useNavigate()
  const [password, setPassword] = useState("password");
  const [confirmpassword, setConfirmpassword] = useState("password");
  const [params] = useSearchParams();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Şifrə ən azı 8 simvol olmalıdır")
        .matches(RegExp("(.*[a-z].*)"), "Ən azı 1 kiçik hərf")
        .matches(RegExp("(.*[A-Z].*)"), "Ən azı 1 böyük hərf")
        .matches(RegExp("(.*[0-9].*)"), "Ən azı 1 rəqəm")
        .required("Bu xana doldurulmalıdır"),
      confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("password")], "Şifrələr eyni deyil"),
    }),
    onSubmit: async (values) => {
      try {
        const req = await axios.post(
          `${
            process.env.REACT_APP_BASE_URL
          }Account/updatepassword?userName=${params.get(
            "email"
          )}&resetToken=${params.get("resetToken")}&newPassword=${
            values.password
          }`
        );
        if (req.status != 200) {
          throw new Error('Şifrə dəyişdirmək mümkün olmadı')
         
        } else {
          toast.success("Parolunuz uğurla yeniləndi");
          setTimeout(() => {
            navigate('/giris')
          }, 1000)
        }
      } catch (error) {
        toast.error('Şifrə dəyişdirmək mümkün olmadı');
      }
    },
  });
  const handleTooglePassword = () => {
    passwordtype === password ? setPassword("text") : setPassword("password");
  };
  const handleConfirmPassword = () => {
    confirmPasswordtype === confirmpassword
      ? setConfirmpassword("text")
      : setConfirmpassword("password");
  };
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
        <div className="w-100">
          <Container>
            <Row className="justify-content-center">
              <Col lg={6}>
                <div className="auth-card mx-lg-3">
                  <Card className="border-0 mb-0">
                    <Row className="flex-column align-items-center p-2">
                      <Col lg={6} xs={3}>
                        <Image src={AvonLogo} alt="" className="img-fluid" />
                      </Col>
                      <Col lg={6} xs={9}>
                        <h1 className="text-black lh-base fw-lighter">
                          Yeni şifrə yarat
                        </h1>
                      </Col>
                    </Row>
                    <Card.Body>
                      <p className="text-muted fs-15">
                        Yeni şifrəniz öncəki şifrənizdən fərqli olmalıdır
                      </p>
                      <div className="p-2">
                        <Form action="/giris" onSubmit={formik.handleSubmit}>
                          <div className="mb-3">
                            <Form.Label htmlFor="password-input">
                              Yeni şifrəniz
                            </Form.Label>
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
                              {formik.errors.password &&
                              formik.touched.password ? (
                                <span className="text-danger">
                                  {formik.errors.password}
                                </span>
                              ) : null}
                              <Button
                                className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                id="password-addon"
                                bsPrefix="btn btn-none"
                                onClick={handleTooglePassword}
                              >
                                <i className="ri-eye-fill align-middle" />
                              </Button>
                            </div>
                            <div id="passwordInput" className="form-text">
                              Şifrəniz 8-20 simvoldan ibarət olmalıdır
                            </div>
                          </div>
                          <div className="mb-3">
                            <Form.Label htmlFor="confirm-password-input">
                              Yeni şifrənin təkrarı
                            </Form.Label>
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
                              {formik.errors.confirmPassword &&
                              formik.touched.confirmPassword ? (
                                <span className="text-danger">
                                  {formik.errors.confirmPassword}
                                </span>
                              ) : null}
                              <Button
                                className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                id="confirm-password-input"
                                bsPrefix="btn btn-none"
                                onClick={handleConfirmPassword}
                              >
                                <i className="ri-eye-fill align-middle" />
                              </Button>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button
                              variant="primary"
                              className="w-100"
                              type="submit"
                            >
                              Şifrəni sıfırla
                            </Button>
                          </div>
                        </Form>
                      </div>
                      <div className="mt-4 text-center">
                        <p className="mb-0">
                          Gözlə, mən şifrəmi xatırlayıram...{" "}
                          <Link
                            to="/giris"
                            className="fw-semibold text-primary text-decoration-underline"
                          >
                            {" "}
                            Giriş et{" "}
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
                      © 2021 - {new Date().getFullYear()} Avon Azərbaycan.
                      Hazırladı <i className="mdi mdi-heart text-danger" /> by
                      RGAgency
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

export default Passwordcreate;
