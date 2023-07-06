import React, { useRef, useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Tab,
  Nav,
  Card,
  Table,
  Form,
  Image,
  Button,
} from "react-bootstrap";

import userProfile from "../../assets/images/users/user-dummy-img.jpg";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { getUsersWithTeam } from "../../services/getRequests";
import profilebg from "../../assets/images/profile-bg.jpg";
import { orderHistorys, wishlishProduct } from "../../Common/data";
import EmailClothe from "../../Pages/Catalog/EmailClothe";
import { CommonService } from "../../Components/CommonService";
import { changeAccont, logoutUser } from "../../slices/layouts/accont";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logoutToken, logoutUserId } from "../../slices/layouts/user";
import { useFormik } from "formik";
import axios from "axios";
import { storage } from "../../firebase/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import { getAllBaskets } from "../../slices/layouts/basket";
import { getAllWisslist } from "../../slices/layouts/wistliss";
const MyAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [referalUsers, setReferalUsers] = useState([]);
  const [noActiveUsers, setNoActiveUsers] = useState([]);
  const [myPrices, setMyPrices] = useState([]);

  const logOut = () => {
    dispatch(logoutUser());
    dispatch(logoutToken());
    dispatch(logoutUserId());
    dispatch(getAllBaskets([]));
    dispatch(getAllWisslist([]));
    navigate("/giris");
  };
  const userAccountInfo = useSelector(
    (state) => state.persistedReducer.Accont.user
  );

  const getMyPrices = async () => {
    try {
      //5fffdbbb-64bc-4e19-809a-e7b597297622 test userId
      const req = await axios.get(
        `${process.env.REACT_APP_BASE_URL}Account/Price?Id=${userAccountInfo?.id}`
      );
      setMyPrices(req.data);
    } catch (error) { }
  };

  useEffect(() => {
    if (userAccountInfo) {
      setReferalUsers(userAccountInfo?.referalUsers);
      setNoActiveUsers(userAccountInfo?.noActiveUsers)
      getMyPrices();
    } else {
      navigate("/giris");
    }
  }, [dispatch]);

  const addPrice = async (id) => {
    try {
      const req1 = axios.post(
        `${process.env.REACT_APP_BASE_URL}Account/PriceOrder?id=${id}`,
        {
          name: userAccountInfo?.name,
          address: userAccountInfo?.address,
          phoneNumber: userAccountInfo?.phoneNumber,
          description: "Salam",
        }
      );

      const req2 = axios.get(
        `${process.env.REACT_APP_BASE_URL}Account/MyAccount?id=${userAccountInfo.id}`
      );

      const requests = await Promise.all([req1, req2]);
      dispatch(changeAccont(requests[1].data));
      toast.success("Hədiyyəni əlavə etdiniz");
    } catch (error) {
      toast.error("Sorğuda xəta baş verdi");
    }
  };
  const [searchKeys, setSearchKeys] = useState({
    referal: "",
    day: "",
    month: "",
    year: "",
  });

  const searchWithTeam = async () => {
    const checkD = searchKeys.day == "" ? " " : searchKeys.day;
    const checkM = searchKeys.month == "" ? " " : searchKeys.month;
    const checkY = searchKeys.year == "" ? "    " : searchKeys.year;
    if (
      searchKeys.referal == "" ||
      searchKeys.referal == " " ||
      /^\s*$/.test(searchKeys.referal) == true
    ) {
      toast.info("Referal Kodu qeyd etməlisiz!");
    } else {
      const res = await getUsersWithTeam(
        searchKeys.referal,
        checkD,
        checkM,
        checkY
      );
      setReferalUsers(res.referalUsers);
      setNoActiveUsers(res.noActiveUsers)
    }
  };
  const fileRef = useRef(null);
  const [proImg, setProfileImage] = useState(userAccountInfo?.profileImage);
  const addStoreImage = () => {
    formik.setFieldValue("profileImage", fileRef.current.files[0]);
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
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProfileImage(downloadURL);
        });
      }
    );
  };
  const formik = useFormik({
    initialValues: {
      id: userAccountInfo?.id,
      name: userAccountInfo?.name,
      surname: userAccountInfo?.surname,
      profileImage: proImg,
      email: userAccountInfo?.email,
      address: userAccountInfo?.address,
      otherAddress: userAccountInfo?.otherAddress,
      phone: userAccountInfo?.phoneNumber,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Adınızı daxil edin"),
      surname: Yup.string().required("Soyadınızı daxil edin"),
      address: Yup.string().required("Ünvanınızı daxil edin"),
      otherAddress: Yup.string().required("İkinci ünvanınızı daxil edin"),
      email: Yup.string().email().required("E-poçt ünvanınızı daxil edin"),
      phone: Yup.string().required("Əlaqə nömrənizi daxil edin"),
      profileImage: Yup.mixed(),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setSubmitting(true);
      try {
        const formData = { ...values, profileImage: proImg };
        axios
          .post(
            "https://avonazerbaijan.com/api/Account/UpdateProfile",
            formData
          )
          .then((response) => {
            axios
              .get(
                `https://avonazerbaijan.com/api/Account/MyAccount?id=${userAccountInfo?.id}`
              )
              .then((res) => {
                dispatch(changeAccont(res.data));
                toast.success("İstifadəçi uğurla yeniləndi");
              });
          })
          .catch((error) => {
            toast.error("Sorğuda xəta baş verdi");
          })
          .finally(() => {
            setSubmitting(false);
          });
      } catch (error) {
        setSubmitting(false);
        setErrors({ file: "Error uploading profile image" });
      }
    },
  });
  return (
    <>
      <Helmet>
        <title>Mənim hesabım | AVONAZ.NET – Online kosmetika mağazası</title>
      </Helmet>
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
      <section className="position-relative">
        <div
          className="profile-basic position-relative"
          style={{
            backgroundImage: `url(${profilebg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "300px",
          }}
        >
          <div className="bg-overlay bg-primary"></div>
        </div>
        <Container>
          <Row>
            <Col lg={12}>
              <div className="pt-3">
                <div className="mt-n5 d-flex gap-3 flex-wrap align-items-end">
                  {
                    <Image
                      src={
                        userAccountInfo?.profileImage.includes("https")
                          ? userAccountInfo?.profileImage
                          : userProfile
                      }
                      alt=""
                      className="avatar-xl p-1 bg-light mt-n3"
                      rounded
                    />
                  }

                  <div>
                    <h5 className="fs-18">{userAccountInfo?.name}</h5>
                    <div className="text-muted">
                      <i className="bi bi-geo-alt"></i>
                      {userAccountInfo?.otherAddress}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-5">
        <Container>
          <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
            <Row>
              <Col lg={3}>
                <Card>
                  <Card.Body>
                    <Nav variant="pills" className="flex-column gap-3">
                      <Nav.Item as="li">
                        <Nav.Link
                          as="a"
                          href="/"
                          className="fs-15"
                          style={{ cursor: "pointer" }}
                        >Əsas səhifəyə qayıt</Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <Nav.Link
                          as="a"
                          eventKey="profile"
                          className="fs-15"
                          role="presentation"
                          style={{ cursor: "pointer" }}
                        >
                          <i className="bi bi-person-circle align-middle me-1"></i>{" "}
                          Hesab məlumatları
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <Nav.Link
                          as="a"
                          href="/istek-siyahisi"
                          className="fs-15"
                          role="presentation"
                          style={{ cursor: "pointer" }}
                        >
                          <i className="bi bi-bookmark-check align-middle me-1"></i>{" "}
                          İstək siyahısı
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <Nav.Link
                          as="a"
                          href="/hesabim/sifaris-tarixcesi"
                          className="fs-15"
                          role="presentation"
                          style={{ cursor: "pointer" }}
                        >
                          <i className="bi bi-bag align-middle me-1"></i> Sifarişlərim
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <Nav.Link
                          as="a"
                          eventKey="setting"
                          className="fs-15"
                          role="presentation"
                          style={{ cursor: "pointer" }}
                        >
                          <i className="bi bi-gear align-middle me-1"></i>{" "}
                          Parametrlər
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <Nav.Link
                          as="a"
                          eventKey="referalUsers"
                          className="fs-15"
                          role="presentation"
                          style={{ cursor: "pointer" }}
                        >
                          <i className="bi bi-person align-middle me-1"></i>{" "}
                          Biznesim
                        </Nav.Link>
                      </Nav.Item>

                      <Nav.Item as="li">
                        <Nav.Link
                          as="a"
                          eventKey="myprices"
                          className="fs-15"
                          role="presentation"
                          style={{ cursor: "pointer" }}
                        >
                          <i className="bi bi-cash-stack align-middle me-1"></i>
                          Hədiyyələrim
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <Nav.Link
                          as="a"
                          className="fs-15"
                          href="/ana-sehife"
                          onClick={logOut}
                        >
                          <i className="bi bi-box-arrow-right align-middle me-1"></i>{" "}
                          Çıxış
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="profile">
                    <div
                      className="tab-pane fade show active"
                      id="custom-v-pills-profile"
                      role="tabpanel"
                    >
                      <Row>
                        <Col lg={12}>
                          <Card>
                            <Card.Body>
                              <div className="d-flex mb-4">
                                <h6 className="fs-16 text-decoration-underline flex-grow-1 mb-0">
                                  Şəxsi məlumatlar
                                </h6>
                              </div>

                              <div className="table-responsive table-card px-1">
                                <Table className="table-borderless table-sm">
                                  <tbody>
                                    <tr>
                                      <td>Ad</td>
                                      <td className="fw-medium">
                                        {userAccountInfo?.name}{" "}
                                        {userAccountInfo?.surname}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Referal kodum</td>
                                      <td className="fw-medium">
                                        {userAccountInfo?.referalIdforTeam}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Telefon nömrəsi</td>
                                      <td className="fw-medium">
                                        {userAccountInfo?.phoneNumber}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>E-poçt</td>
                                      <td className="fw-medium">
                                        {userAccountInfo?.email}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Ünvan</td>
                                      <td className="fw-medium">
                                        {userAccountInfo?.otherAddress}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Üzvlük başlanğıc tarixi</td>
                                      <td className="fw-medium">
                                        {new Date(
                                          userAccountInfo?.createdTime
                                        ).toLocaleDateString()}
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </div>

                              {/* <div className="mt-4">
                                <h6 className="fs-16 text-decoration-underline">
                                  Billing &amp; Shipping Address
                                </h6>
                              </div> */}
                              {/* <Row className="mt-4">
                                <Col md={6}>
                                  <Card className="mb-md-0">
                                    <Card.Body>
                                      <div className="float-end clearfix">
                                        {" "}
                                        <Link
                                          to="/hesabim/unvanlarim"
                                          className="badge badge-soft-primary"
                                        >
                                          <i className="ri-pencil-fill align-bottom me-1"></i>{" "}
                                          Edit
                                        </Link>{" "}
                                      </div>
                                      <div>
                                        <p className="mb-3 fw-semibold fs-12 d-block text-muted text-uppercase"></p>
                                        <h6 className="fs-14 mb-2 d-block">
                                          R{userAccountInfo?.name}
                                        </h6>
                                        <span className="text-muted fw-normal text-wrap mb-1 d-block">
                                          {userAccountInfo?.otherAddress}
                                        </span>
                                        <span className="text-muted fw-normal d-block">
                                          {userAccountInfo?.phoneNumber}
                                        </span>
                                      </div>
                                    </Card.Body>
                                  </Card>
                                </Col>
                                <Col md={6}>
                                  <Card className="mb-0">
                                    <Card.Body>
                                      <div className="float-end clearfix">
                                        {" "}
                                        <Link
                                          to="/hesabim/unvanlarim"
                                          className="badge badge-soft-primary"
                                        >
                                          <i className="ri-pencil-fill align-bottom me-1"></i>{" "}
                                          Edit
                                        </Link>{" "}
                                      </div>
                                      <div>
                                        <p className="mb-3 fw-semibold fs-12 d-block text-muted text-uppercase">
                                          Shipping Address
                                        </p>
                                        <h6 className="fs-14 mb-2 d-block">
                                          James Honda
                                        </h6>
                                        <span className="text-muted fw-normal text-wrap mb-1 d-block">
                                          1246 Virgil Street Pensacola, FL 32501
                                        </span>
                                        <span className="text-muted fw-normal d-block">
                                          Mo. +(253) 01234 5678
                                        </span>
                                      </div>
                                    </Card.Body>
                                  </Card>
                                </Col>
                              </Row> */}
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="setting">
                    <div
                      className="tab-pane fade show"
                      id="custom-v-pills-setting"
                      role="tabpanel"
                    >
                      <Row>
                        <Col lg={12}>
                          <Card>
                            <Card.Body>
                              <Form
                                className="needs-validation"
                                action="#"
                                onSubmit={formik.handleSubmit}
                              >
                                <Row>
                                  <Col lg={12}>
                                    <h5 className="fs-16 text-decoration-underline mb-4">
                                      Şəxsi məlumatlar
                                    </h5>
                                  </Col>
                                  <Col lg={6}>
                                    <div className="mb-3">
                                      <Form.Label htmlFor="name">
                                        Ad
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
                                      {formik.touched.name &&
                                        formik.errors.name ? (
                                        <div className="text-danger">
                                          {formik.errors.name}
                                        </div>
                                      ) : null}
                                    </div>
                                  </Col>
                                  <Col lg={6}>
                                    <div className="mb-3">
                                      <Form.Label htmlFor="surname">
                                        Soyad
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        id="surname"
                                        name="surname"
                                        placeholder="Enter your name"
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
                                  </Col>
                                  <Col lg={6}>
                                    <div className="mb-3">
                                      <Form.Label htmlFor="phone">
                                        Telefon nömrəsi
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        placeholder="phone"
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                      />
                                      {formik.touched.phone &&
                                        formik.errors.phone ? (
                                        <div className="text-danger">
                                          {formik.errors.phone}
                                        </div>
                                      ) : null}
                                    </div>
                                  </Col>
                                  <Col lg={6}>
                                    <div className="mb-3">
                                      <Form.Label htmlFor="email">
                                        E-poçt
                                      </Form.Label>
                                      <Form.Control
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                      />
                                      {formik.touched.email &&
                                        formik.errors.email ? (
                                        <div className="text-danger">
                                          {formik.errors.email}
                                        </div>
                                      ) : null}
                                    </div>
                                  </Col>
                                  <Col lg={6}>
                                    <div className="mb-3">
                                      <Form.Label htmlFor="address">
                                        Ünvan
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        id="address"
                                        name="address"
                                        placeholder="address"
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
                                  </Col>
                                  <Col lg={6}>
                                    <div className="mb-3">
                                      <Form.Label htmlFor="address">
                                        Digər ünvan
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        id="otherAddress"
                                        name="otherAddress"
                                        placeholder="Other Address"
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
                                  </Col>

                                  <Col lg={6}>
                                    <Form.Label htmlFor="profileImage">
                                      Profil şəkli
                                    </Form.Label>
                                    <Form.Control
                                      id="profileImage"
                                      name="profileImage"
                                      type="file"
                                      ref={fileRef}
                                      onChange={() => addStoreImage()}
                                    />
                                  </Col>
                                  <Col
                                    lg={6}
                                    className="d-flex align-items-center "
                                  >
                                    <button
                                      className="btn btn-primary mt-4   "
                                      type="submit"
                                    >
                                      Təsdiqlə
                                    </button>
                                  </Col>
                                </Row>
                              </Form>
                              {/* <div className="mb-3" id="changePassword">
                                                                <h5 className="fs-16 text-decoration-underline mb-4">Change Password</h5>
                                                                <form action="#">
                                                                    <Row className="g-2">
                                                                        <Col lg={4}>
                                                                            <div>
                                                                                <Form.Label htmlFor="oldpasswordInput" >Old Password*</Form.Label>
                                                                                <Form.Control type="password" id="oldpasswordInput" placeholder="Enter current password" />
                                                                            </div>
                                                                        </Col>
                                                                        <Col lg={4}>
                                                                            <div>
                                                                                <Form.Label htmlFor="newpasswordInput" >New Password*</Form.Label>
                                                                                <Form.Control type="password" id="newpasswordInput" placeholder="Enter new password" />
                                                                            </div>
                                                                        </Col>
                                                                        <Col lg={4}>
                                                                            <div>
                                                                                <Form.Label htmlFor="confirmpasswordInput" >Confirm Password*</Form.Label>
                                                                                <Form.Control type="password" id="confirmpasswordInput" placeholder="Confirm password" />
                                                                            </div>
                                                                        </Col>
                                                                        <Col lg={12}>
                                                                            <div className="mb-3">
                                                                                <Link to="/sifreni-sifirla" className="link-primary text-decoration-underline">Forgot Password ?</Link>
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </form>
                                                            </div> */}
                              {/* <div className="mb-3" id="privacy">
                                                                <h5 className="fs-16 text-decoration-underline mb-4">Privacy Policy</h5>
                                                                <div className="mb-3">
                                                                    <h5 className="fs-15 mb-2">Security:</h5>
                                                                    <div className="d-flex flex-column align-items-center flex-sm-row mb-sm-0">
                                                                        <div className="flex-grow-1">
                                                                            <p className="text-muted fs-14 mb-0">Two-factor Authentication</p>
                                                                        </div>
                                                                        <div className="flex-shrink-0 ms-sm-3">
                                                                            <Link to="#" className="btn btn-sm btn-primary">Enable Two-facor Authentication</Link>
                                                                        </div>
                                                                    </div>
                                                                    <div className="d-flex flex-column align-items-center flex-sm-row mb-sm-0 mt-2">
                                                                        <div className="flex-grow-1">
                                                                            <p className="text-muted fs-14 mb-0">Secondary Verification</p>
                                                                        </div>
                                                                        <div className="flex-shrink-0 ms-sm-3">
                                                                            <Link to="#" className="btn btn-sm btn-primary">Set up secondary method</Link>
                                                                        </div>
                                                                    </div>
                                                                    <div className="d-flex flex-column align-items-center flex-sm-row mb-sm-0 mt-2">
                                                                        <div className="flex-grow-1">
                                                                            <p className="text-muted fs-14 mb-0">Backup Codes</p>
                                                                        </div>
                                                                        <div className="flex-shrink-0 ms-sm-3">
                                                                            <Link to="#" className="btn btn-sm btn-primary">Generate backup codes</Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="mb-3">
                                                                    <h5 className="fs-15 mb-2">Application Notifications:</h5>
                                                                    <ul className="list-unstyled mb-0">
                                                                        <li className="d-flex">
                                                                            <div className="flex-grow-1">
                                                                                <Form.Label htmlFor="directMessage" className="form-check-label fs-14">Direct messages</Form.Label>
                                                                            </div>
                                                                            <div className="flex-shrink-0">
                                                                                <div className="form-check form-switch">
                                                                                    <Form.Check type="switch" />
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                        <li className="d-flex mt-2">
                                                                            <div className="flex-grow-1">
                                                                                <Form.Label className="form-check-label fs-14" htmlFor="desktopNotification">
                                                                                    Show desktop notifications
                                                                                </Form.Label>
                                                                            </div>
                                                                            <div className="flex-shrink-0">
                                                                                <div className="form-check form-switch">
                                                                                    <Form.Check type="switch" />
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                        <li className="d-flex mt-2">
                                                                            <div className="flex-grow-1">
                                                                                <Form.Label className="form-check-label fs-14" htmlFor="emailNotification">
                                                                                    Show email notifications
                                                                                </Form.Label>
                                                                            </div>
                                                                            <div className="flex-shrink-0">
                                                                                <div className="form-check form-switch">
                                                                                    <Form.Check type="switch" />
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                        <li className="d-flex mt-2">
                                                                            <div className="flex-grow-1">
                                                                                <Form.Label className="form-check-label fs-14" htmlFor="chatNotification">
                                                                                    Show chat notifications
                                                                                </Form.Label>
                                                                            </div>
                                                                            <div className="flex-shrink-0">
                                                                                <div className="form-check form-switch">
                                                                                    <Form.Check type="switch" />
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                        <li className="d-flex mt-2">
                                                                            <div className="flex-grow-1">
                                                                                <Form.Label className="form-check-label fs-14" htmlFor="purchaesNotification">
                                                                                    Show purchase notifications
                                                                                </Form.Label>
                                                                            </div>
                                                                            <div className="flex-shrink-0">
                                                                                <div className="form-check form-switch">
                                                                                    <Form.Check type="switch" />
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div> */}
                              {/* <div className="text-sm-end">
                                                                <Link to="#" className="btn btn-secondary d-block d-sm-inline-block"><i className="ri-edit-box-line align-middle me-2"></i> Update Profile</Link>
                                                            </div> */}
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="referalUsers">
                    <Form className="d-flex mb-3 gap-2">
                      <input
                        className="form-control"
                        type="text"
                        value={searchKeys.referal}
                        onChange={(e) =>
                          setSearchKeys({
                            ...searchKeys,
                            referal: e.target.value,
                          })
                        }
                        placeholder="Referal kod ilə axtar"
                      />
                      <input
                        className="form-control"
                        type="number"
                        value={searchKeys.day}
                        onChange={(e) =>
                          setSearchKeys({
                            ...searchKeys,
                            day: e.target.value,
                          })
                        }
                        placeholder="Search by day ex: (20)"
                      />
                      <input
                        className="form-control"
                        type="number"
                        value={searchKeys.month}
                        onChange={(e) =>
                          setSearchKeys({
                            ...searchKeys,
                            month: e.target.value,
                          })
                        }
                        placeholder="Aya əsasən axtar"
                      />
                      <input
                        className="form-control"
                        type="number"
                        value={searchKeys.year}
                        onChange={(e) =>
                          setSearchKeys({
                            ...searchKeys,
                            year: e.target.value,
                          })
                        }
                        placeholder="İlə əsasən axtar"
                      />
                      <Button onClick={searchWithTeam}>Axtar</Button>
                    </Form>
                    <div
                      className="tab-pane fade show"
                      id="custom-v-pills-order"
                      role="tabpanel"
                    >
                      <Card>
                        <Card.Body>
                          <div className="table-responsive table-card">
                            {referalUsers.length > 0 ?
                              (<Table className="fs-15 align-middle table-nowrap">
                                <thead>
                                  <tr>
                                    <th scope="col">Referal kod</th>
                                    <th scope="col">Vəzifəsi</th>
                                    <th scope="col">Ad</th>
                                    <th scope="col">E-poçt</th>
                                    <th scope="col">Telefon</th>
                                    <th scope="col">Öz satışı</th>
                                    <th scope="col">Əmək haqqına hesablanan satış</th>
                                    <th scope="col">Sifariş sayı</th>
                                    <th scope="col">Qrupla birlikdə satış</th>
                                    <th scope="col">Qrupla birlikdə əmək haqqına hesablanan satış</th>
                                    <th scope="col">I generasiya faizi</th>
                                    <th scope="col">II generasiya faizi</th>
                                    <th scope="col">III generasiya faizi</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                    referalUsers.map((item, inx) => {
                                      return (
                                        <tr key={inx}>
                                          <td>{item.referalIdforTeam}</td>
                                          <td>{item.position == null ? "Satış nümayəndəsi" : item.position}</td>
                                          <td>
                                            {" "}
                                            <img
                                              src={item.profileImage}
                                              alt={item.name}
                                              style={{ width: "20px" }}
                                            />
                                            {item.name}
                                          </td>
                                          <td>{item.email}</td>
                                          <td>{item.phoneNumber}</td>
                                          <td>{item.firstAmount}</td>
                                          <td>{item.firstAmountSalary}</td>
                                          <td>
                                            {item.orders
                                              .map((order) => order.totalAmount)
                                              .reduce(
                                                (acc, it) => acc + it,
                                                0
                                              )}{" "}
                                            AZN
                                          </td>
                                          <td>{item.totalAmount}</td>
                                          <td>{item.totalAmountForSalary}</td>
                                          <td>{item.gain}</td>
                                          <td>{item.gain2}</td>
                                          <td>{item.gain3}</td>
                                        </tr>
                                      );
                                    })
                                  }
                                </tbody>
                              </Table>) : (<h3 className="my-4 ps-2">Təəssüf ki, sizin aktiv komandanız yoxdur.</h3>)
                            }
                            {
                              noActiveUsers.length > 0 ? (
                                <Table className="fs-15 align-middle table-nowrap">
                                <thead>
                                  <tr>
                                    <th scope="col">Referal kod</th>
                                    <th scope="col">Vəzifəsi</th>
                                    <th scope="col">Ad</th>
                                    <th scope="col">E-poçt</th>
                                    <th scope="col">Telefon</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                    noActiveUsers.map((item, inx) => {
                                      return (
                                        <tr key={inx}>
                                          <td>{item.referalIdforTeam}</td>
                                          <td>{item.position == null ? "Satış nümayəndəsi" : item.position}</td>
                                          <td>
                                            {" "}
                                            <img
                                              src={item.profileImage}
                                              alt={item.name}
                                              style={{ width: "20px" }}
                                            />
                                            {item.name}
                                          </td>
                                          <td>{item.email}</td>
                                          <td>{item.phoneNumber}</td>
                                        </tr>
                                      );
                                    })
                                  }
                                </tbody>
                              </Table>
                              ) : (<h3>Təbriklər sizin aktiv olmayan komanda üzvünüz yoxdur</h3>)
                            }
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="myprices">
                    <div
                      className="tab-pane fade show"
                      id="custom-v-pills-setting"
                      role="tabpanel"
                    >
                      <Row>
                        <div className="d-flex flex-wrap align-items-center gap-2">
                          {myPrices.length > 0 ? (
                            myPrices.map((price, index) => (
                              <Col
                                key={index}
                                lg={3}
                                md={6}
                                className="element-item seller "
                              >
                                <Card className="overflow-hidden">
                                  <div className={`bg-subtle rounded-top py-4`}>
                                    <div
                                      className="gallery-product"
                                      style={{
                                        height: "200px",
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Image
                                        src={price.price.product.posterImage}
                                        alt=""
                                        style={{
                                          maxHeight: 215,
                                          maxWidth: "100%",
                                        }}
                                        className="mx-auto d-block"
                                      />
                                    </div>
                                    <div className="product-btn px-3">
                                      <Button
                                        onClick={() =>
                                          addPrice(price.id)
                                        }
                                        disabled={
                                          price.isEnable == true &&
                                            price.isTaked == false
                                            ? false
                                            : true
                                        }
                                        className="btn btn-primary btn-sm w-75 add-btn"
                                      >
                                        <i className="mdi mdi-cart me-1"></i>{" "}
                                        Əlavə et
                                      </Button>
                                    </div>
                                  </div>
                                  <Card.Body className="card-body">
                                    <div>
                                      <Link
                                        to={`/mehsul-detallari/${price.price.product.slug}`}
                                      >
                                        <h6 className="fs-15 lh-base text-truncate mb-0">
                                          {price.price.product.name}
                                        </h6>
                                      </Link>
                                      <div className="mt-3">
                                        {price.price.discountPrice} ₼
                                      </div>
                                      <div className="mt-3">
                                        {price.price.title}
                                      </div>

                                      <div className="mt-3">
                                        {new Date(
                                          price.startDate
                                        ).toLocaleDateString("en-EN")}{" "}
                                        -{" "}
                                        {new Date(
                                          price.endDate
                                        ).toLocaleDateString("en-EN")}
                                      </div>
                                    </div>
                                  </Card.Body>
                                </Card>
                              </Col>
                            ))
                          ) : (
                            <Row>
                              <Col lg={12}>
                                <div className="text-center py-5">
                                  <div className="avatar-lg mx-auto mb-4">
                                    <div className="avatar-title bg-primary-subtle text-primary rounded-circle fs-24">
                                      <i className="bi bi-search"></i>
                                    </div>
                                  </div>

                                  <h5>Aylıq hədiyyələr mövcud deyil</h5>
                                </div>
                              </Col>
                            </Row>
                          )}
                        </div>
                      </Row>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </section>
    </>
  );
};

export default MyAccount;
