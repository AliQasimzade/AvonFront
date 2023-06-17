import React, { useState, useRef } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import avonLogo from "../../assets/images/avonLogo.png";
import { storage } from "../../firebase/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("");
  const addStoreImage = () => {
    formik.setFieldValue("profileImage", fileRef.current.files[0]);
    console.log(fileRef.current.name);
    const file = fileRef.current.files[0];
    const storageRef = ref(storage, fileRef.current.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          setProfileImage(downloadURL);
        });
      }
    );
  };

  const [passwordtype, setPasswordtype] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      address: "",
      email: "",
      phone: "",
      idForReferal: "",
      otherAddress: "",
      password: "",
      repeatPassword: "",
      profileImage: profileImage,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Adınızı daxil edin"),
      surname: Yup.string().required("Soyadınızı daxil edin"),
      address: Yup.string().required("Ünvanınızı daxil edin"),
      otherAddress: Yup.string(),
      email: Yup.string().email().required("E-poçt ünvanınızı daxil edin"),
      phone: Yup.string().required("Əlaqə nömrənizi daxil edin"),
      idForReferal: Yup.string(),
      password: Yup.string()
        .min(8, "Şifrə ən azı 8 simvoldan ibarət olmalıdır")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/, {
          message:
            "Şifrə ən azı bir böyük, bir kiçik hərf və ən azı 1 rəqəmdən ibarət olmalıdır",
        })
        .required("Şifrənizi daxil edin"),
      repeatPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Şifrələr eyni olmalıdır")
        .required("Şifrənin təkrarını daxil edin"),
      profileImage: Yup.mixed().required(),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setSubmitting(true);
      try {
        const profileImage = values.profileImage;
        const imageRef = ref(storage, "avatars/" + profileImage.name);
        const uploadTask = uploadBytesResumable(imageRef, profileImage);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Yüklənir" + progress + "% done");
          },
          (error) => {
            setErrors({ file: "Error uploading profile image" });
            console.error("Error uploading profile image:", error);
          },
          async () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              const formData = { ...values, profileImage: downloadURL };
              axios
                .post(
                  "https://ilkin944-001-site1.itempurl.com/api/Account/register",
                  formData
                )
                .then((response) => {
                  console.log("Response from API:", response.data);
                  axios
                    .get(
                      `https://ilkin944-001-site1.itempurl.com/api/Account/ConfirmEmail?token=${response.data}&email=${values.email}`
                    )
                    .then((res) => {
                      console.log(res.data);
                      toast.success(res.data.message);
                      setTimeout(() => {
                        navigate("/giris");
                      }, 1000);
                    });
                })
                .catch((error) => {
                  console.error("Error posting data:", error);
                  toast.error(error.message);
                })
                .finally(() => {
                  setSubmitting(false);
                });
            });
          }
        );
      } catch (error) {
        setSubmitting(false);
        setErrors({ file: "Error uploading profile image" });
        console.error("Error uploading profile image:", error);
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
        <div className="w-100">
          <Container>
            <Row className="justify-content-center">
              <Col lg={12}>
                <div className="auth-card mx-lg-3">
                  <Card className="border-0 mb-0">
                    <Card.Header className="border-0 ">
                      <Row className="d-flex justify-content-center">
                        <Col lg={6} xs={3}>
                          <Image src={avonLogo} alt="" className="img-fluid" />
                        </Col>
                      </Row>
                    </Card.Header>
                    <Card.Body>
                      <p className="text-muted fs-15">
                        Satış nümayəndəsi olmaq istəyirsən? Elə isə indi qeydiyyatdan keç, e-poçtuna gələn təsdiq mesajına klikləyərək hesabını aktivləşdir
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
                                Adınız <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Adınızı daxil edin"
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
                                Soyad <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id="surname"
                                name="surname"
                                placeholder="Soyadınızı daxil edin"
                                value={formik.values.surname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                              {formik.touched.surname &&
                              formik.errors.surname ? (
                                <div className="text-danger">
                                  {formik.errors.surname}
                                </div>
                              ) : null}
                            </div>
                            <div className="mb-3 col-12 col-lg-6">
                              <Form.Label htmlFor="address">
                                Əsas ünvan <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id="address"
                                name="address"
                                placeholder="Ünvanı daxil edin"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                              {formik.touched.address &&
                              formik.errors.address ? (
                                <div className="text-danger">
                                  {formik.errors.address}
                                </div>
                              ) : null}
                            </div>
                            <div className="mb-3 col-12 col-lg-6">
                              <Form.Label htmlFor="otherAddress">
                                İkinci ünvan
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id="otherAddress"
                                name="otherAddress"
                                placeholder="Ünvanı daxil edin"
                                value={formik.values.otherAddress}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                              {formik.touched.otherAddress &&
                              formik.errors.otherAddress ? (
                                <div className="text-danger">
                                  {formik.errors.otherAddress}
                                </div>
                              ) : null}
                            </div>
                            <div className="mb-3 col-12 col-lg-6">
                              <Form.Label htmlFor="useremail">
                                E-poçt <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                type="email"
                                id="useremail"
                                name="email"
                                placeholder="E-poçtunuzu daxil edin"
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
                                Telfon nömrəsi <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id="phone"
                                name="phone"
                                placeholder="Telefon nömrənizi daxil edin"
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
                                Sizi dəvət edən satış nümayəndəsinin referal kodu
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id="idForReferal"
                                name="idForReferal"
                                placeholder="Referal kodu daxil edin"
                                value={formik.values.idForReferal}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                            <div className="mb-3 col-12 col-lg-6">
                              <Form.Label htmlFor="password-input">
                                Şifrə <span className="text-danger">*</span>
                              </Form.Label>
                              <div className="position-relative auth-pass-inputgroup">
                                <Form.Control
                                  type={passwordtype ? "text" : "password"}
                                  className="pe-5 password-input"
                                  placeholder="Şifrəni daxil edin"
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
                                  onClick={() => setPasswordtype(!passwordtype)}
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
                                Şifrənin təkrarı{" "}
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <div className="position-relative auth-pass-inputgroup">
                                <Form.Control
                                  type={passwordtype ? "text" : "password"}
                                  className="pe-5 password-input"
                                  placeholder="Şifrənin təkrarını daxil edin"
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
                                Profil şəkliniz
                              </Form.Label>
                              <Form.Control
                                type="file"
                                id="profileImage"
                                name="profileImage"
                                ref={fileRef}
                                onChange={() => addStoreImage()}
                              />
                            </div>
                            <div className="mt-4">
                              <Button
                                variant="primary"
                                className="w-100"
                                type="submit"
                              >
                                Qeydiyyatdan keç
                              </Button>
                            </div>
                          </Row>
                        </Form>
                      </div>
                      <div className="mt-4 text-center">
                        <p className="mb-0">
                          Hesabınız var?{" "}
                          <Link
                            to="/giris"
                            className="fw-semibold text-primary text-decoration-underline"
                          >
                           Daxil olun
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
                      © {new Date().getFullYear()} Avon Azərbaycan. Crafted with{" "}
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
