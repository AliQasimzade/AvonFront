import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Image,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
//img
import avonLogo from "../../assets/images/avonLogo.png";
import { useDispatch } from "react-redux";
import { changeAccont } from "../../slices/layouts/accont";
import { getAllBaskets } from "../../slices/layouts/basket";

import { changeToken, changeUserId } from "../../slices/layouts/user";
import { getAllWisslist } from "../../slices/layouts/wistliss";
const Signin = () => {
  const passwordtype = "password";
  const [password, setPassword] = useState("password");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Bu xana doldurulmalıdır"),
      password: Yup.string()
        .min(8, "Şifrə ən azı 8 simvol olmalıdır")
        .matches(RegExp("(.*[0-9].*)"), "Ən azı 1 rəqəm olmalıdır")
        .required("Bu xana doldurulmalıdır"),
    }),

    onSubmit: (values) => {
      axios
        .post(
          "https://avonazerbaijan.com/api/Account/Login",
          values
        )
        .then((rest) => {
          const decoded = jwt_decode(rest.data);
          dispatch(changeUserId(decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']));
          dispatch(changeToken(rest.data));
          axios
            .get(
              `https://avonazerbaijan.com/api/Account/MyAccount?id=${decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']}`
            )
            .then((res) => {
              axios.get(`https://avonazerbaijan.com/api/Baskets/GetAll?appUserId=${decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']}`)
              .then(res => dispatch(getAllBaskets(res.data)))

              axios.get(`https://avonazerbaijan.com/api/WishLists/GetAll?appUserId=${decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']}`)
              .then(res => dispatch(getAllWisslist(res.data)))
              toast.success("Uğurla giriş olundu!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });

              dispatch(changeAccont(res.data));
              setTimeout(() => {
                navigate("/ana-sehife");
              }, 1000);
            });
        })
        .catch((err) => {
          toast.error("Ad və ya şifrə yanlışdır!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    },
  });

  const handleToogle = () => {
    passwordtype === password ? setPassword("text") : setPassword("password");
  };
  return (
    <>
      <section className="auth-page-wrapper position-relative bg-light min-vh-100 d-flex align-items-center justify-content-between">
        <ToastContainer />
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
                      <p className="text-muted fs-15">
                        AVON-a davam etmək üçün hesabınıza daxil olun
                      </p>
                      <div className="p-2">
                        <Form action="#" onSubmit={formik.handleSubmit}>
                          <div className="mb-3">
                            <Form.Label htmlFor="userName">E-poçt</Form.Label>
                            <Form.Control
                              type="text"
                              name="userName"
                              id="userName"
                              placeholder="E-poçtunuzu daxil edin"
                              value={formik.values.userName}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.errors.userName &&
                              formik.touched.userName ? (
                              <span className="text-danger">
                                {formik.errors.userName}
                              </span>
                            ) : null}
                          </div>
                          <div className="mb-3">
                            <div className="float-end">
                              <Link
                                to={"/sifreni-sifirla "}
                                className="text-muted"
                              >
                                Parolu unutdun?
                              </Link>
                            </div>
                            <Form.Label htmlFor="password-input">
                              Şifrə
                            </Form.Label>
                            <div className="position-relative auth-pass-inputgroup mb-3">
                              <Form.Control
                                type={password}
                                className=" pe-5 password-input"
                                name="password"
                                placeholder="Şifrənizi daxil edin"
                                id="password-input"
                                value={formik.values.password}
                                onChange={formik.handleChange}
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
                                onClick={handleToogle}
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
                              Daxil Ol
                            </Button>
                          </div>
                        </Form>
                        <div className="text-center mt-2">
                          <p className="mb-0">
                            Hesabınız yoxdur?{" "}
                            <Link
                              to="/qeydiyyat"
                              className="fw-semibold text-secondary text-decoration-underline"
                            >
                              {" "}
                              Qeydiyyatdan keçin
                            </Link>{" "}
                          </p>
                        </div>
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
                      ©{new Date().getFullYear()} Avon Azərbaycan. Crafted with{" "}
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

export default Signin;
