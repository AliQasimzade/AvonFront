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
  const [userid, setUserid] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("This field is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(RegExp("(.*[0-9].*)"), "At least one number")
        .required("This field is required"),
    }),

    onSubmit: (values) => {
      axios
        .post(
          "http://avontest0910-001-site1.dtempurl.com/api/Account/Login",
          values
        )
        .then((rest) => {
          const parse = rest.data.split("+");
          const userId = parse[0].split(":")[1];
          const tok = parse[1].split(":")[1];
          setUserid(userId);
          setToken(tok);
          dispatch(changeUserId(userId));
          
          dispatch(changeToken(tok));
          axios
            .get( 
              `http://avontest0910-001-site1.dtempurl.com/api/Account/MyAccount?id=${userId}`
            )
            .then((res) => {
              toast.success("Uğurla giriş olundu !", {
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
                navigate("/hesabim");
              }, 1000);
            });
        })
        .catch((err) => {
          toast.error("Ad və ya şifrə yanlışdır !", {
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
                        AVON-a davam etmək üçün daxil olun
                      </p>
                      <div className="p-2">
                        <Form action="#" onSubmit={formik.handleSubmit}>
                          <div className="mb-3">
                            <Form.Label htmlFor="userName">Email</Form.Label>
                            <Form.Control
                              type="text"
                              name="userName"
                              id="userName"
                              placeholder="Enter username"
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
                            {/* <div className="float-end">
                              <Link
                                to={"/auth-pass-reset-basic"}
                                className="text-muted"
                              >
                                Parolu unutdun?
                              </Link>
                            </div> */}
                            <Form.Label htmlFor="password-input">
                              Parol
                            </Form.Label>
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
                      ©{new Date().getFullYear()} RGAgency. Crafted with{" "}
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
