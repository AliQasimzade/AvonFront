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

import userProfile from "../../assets/images/users/user-dummy-img.jpg"
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

const MyAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [referalUsers, setReferalUsers] = useState([]);

  const logOut = () => {
    dispatch(logoutUser());
    dispatch(logoutToken());
    dispatch(logoutUserId());
    navigate("/ana-sehife");
  };
  const userAccountInfo = useSelector(
    (state) => state.persistedReducer.Accont.user[0]
  );

  const getS = async () => {
    const res = await getUsersWithTeam(
      userAccountInfo.referalIdforTeam,
      " ",
      " ",
      " "
    );
    setReferalUsers(res.noActiveUsers);
    console.log(res.referalUsers);
  };
  useEffect(() => {
    if(userAccountInfo) {
      getS();
    }else {
      navigate('/ana-sehife')
    }
    
  }, []);

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
      alert("Ən azından referal kodu qeyd edin ");
    } else {
      const res = await getUsersWithTeam(
        searchKeys.referal,
        checkD,
        checkM,
        checkY
      );
      setReferalUsers(res.noActiveUsers);
      console.log(res.referalUsers);
    }
  };
  const fileRef = useRef(null);
  const [proImg, setProfileImage] = useState("");
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
  const formik = useFormik({
    initialValues: {
      id: userAccountInfo?.id,
      name: userAccountInfo?.name,
      surname: userAccountInfo?.surname,
      profileImage: proImg,
      email: userAccountInfo?.email,
      address: userAccountInfo?.otherAddress,
      phone: userAccountInfo?.phoneNumber,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter your name"),
      surname: Yup.string().required("Please enter your surname"),
      address: Yup.string().required("Please enter your address"),
      email: Yup.string().email().required("Please enter a valid email"),
      phone: Yup.string().required("Please enter your phone number"),
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
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            setErrors({ file: "Error uploading profile image" });
            console.error("Error uploading profile image:", error);
          },
          async () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);

              const formData = { ...values, profileImage: downloadURL };
              axios
                .post(
                  "http://avontest0910-001-site1.dtempurl.com/api/Account/UpdateProfile",
                  formData
                )
                .then((response) => {
                  console.log("Response from API:", response.data);
                  axios
                    .get(
                      `http://avontest0910-001-site1.dtempurl.com/api/Account/MyAccount?id=${userAccountInfo?.id}`
                    )
                    .then((res) => dispatch(changeAccont(res.data[0])))
                    .then(() => location.reload());
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
        setErrors({ file: "Error uploading profile image" });
        console.error("Error uploading profile image:", error);
      }
    },
  });
  return (
    <>
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
                        userAccountInfo?.profileImage.includes('https')
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
                  <div className="ms-md-auto">
                    <Link
                      to="/product-list"
                      className="btn btn-success btn-hover"
                    >
                      <i className="bi bi-cart4 me-1 align-middle"></i> Shopping
                      Now
                    </Link>
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
                          eventKey="profile"
                          className="fs-15"
                          role="presentation"
                        >
                          <i className="bi bi-person-circle align-middle me-1"></i>{" "}
                          Account Info
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <Nav.Link
                          as="a"
                          eventKey="list"
                          className="fs-15"
                          role="presentation"
                        >
                          <i className="bi bi-bookmark-check align-middle me-1"></i>{" "}
                          Wish list
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <Nav.Link
                          as="a"
                          eventKey="order"
                          className="fs-15"
                          role="presentation"
                        >
                          <i className="bi bi-bag align-middle me-1"></i> Order
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <Nav.Link
                          as="a"
                          eventKey="setting"
                          className="fs-15"
                          role="presentation"
                        >
                          <i className="bi bi-gear align-middle me-1"></i>{" "}
                          Settings
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <Nav.Link
                          as="a"
                          eventKey="referalUsers"
                          className="fs-15"
                          role="presentation"
                        >
                          <i className="bi bi-person align-middle me-1"></i>{" "}
                          Referal Users
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <Nav.Link
                          as="a"
                          className="fs-15"
                          href="/cixis"
                          onClick={logOut}
                        >
                          <i className="bi bi-box-arrow-right align-middle me-1"></i>{" "}
                          Logout
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
                                  Personal Info
                                </h6>
                                <div className="flex-shrink-0">
                                  <Link
                                    to="#"
                                    className="badge badge-soft-dark"
                                  >
                                    Edit
                                  </Link>
                                </div>
                              </div>

                              <div className="table-responsive table-card px-1">
                                <Table className="table-borderless table-sm">
                                  <tbody>
                                    <tr>
                                      <td>Customer Name</td>
                                      <td className="fw-medium">
                                        {userAccountInfo?.name}{" "}
                                        {userAccountInfo?.surname}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Mobile / Phone Number</td>
                                      <td className="fw-medium">
                                        {userAccountInfo?.phoneNumber}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Email Address</td>
                                      <td className="fw-medium">
                                        {userAccountInfo?.email}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Location</td>
                                      <td className="fw-medium">
                                        {userAccountInfo?.otherAddress}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Since Member</td>
                                      <td className="fw-medium">
                                        {new Date(
                                          userAccountInfo?.createdTime
                                        ).toLocaleDateString()}
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </div>

                              <div className="mt-4">
                                <h6 className="fs-16 text-decoration-underline">
                                  Billing &amp; Shipping Address
                                </h6>
                              </div>
                              <Row className="mt-4">
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
                              </Row>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="list">
                    <div
                      className="tab-pane fade show"
                      id="custom-v-pills-list"
                      role="tabpanel"
                    >
                      <Row>
                        <Col lg={12}>
                          <Card className="overflow-hidden">
                            <Card.Body>
                              <div className="table-responsive table-card">
                                <Table className="fs-15 align-middle">
                                  <thead>
                                    <tr>
                                      <th scope="col">Product</th>
                                      <th scope="col">Price</th>
                                      <th scope="col">Stock Status</th>
                                      <th scope="col">Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {(wishlishProduct || [])?.map(
                                      (item, inx) => {
                                        return (
                                          <tr key={inx}>
                                            <td>
                                              <div className="d-flex gap-3">
                                                <div className="avatar-sm flex-shrink-0">
                                                  <div
                                                    className={`avatar-title bg-${item.bg}-subtle rounded`}
                                                  >
                                                    <Image
                                                      src={item.img}
                                                      alt=""
                                                      className="avatar-xs"
                                                    />
                                                  </div>
                                                </div>
                                                <div className="flex-grow-1">
                                                  <Link to="/product-details">
                                                    <h6 className="fs-16">
                                                      {item.title}
                                                    </h6>
                                                  </Link>
                                                  <p className="mb-0 text-muted fs-13">
                                                    {item.text}
                                                  </p>
                                                </div>
                                              </div>
                                            </td>
                                            <td>${item.price}</td>
                                            <td>
                                              <span
                                                className={`badge badge-soft-${item.color}`}
                                              >
                                                {item.status}
                                              </span>
                                            </td>
                                            <td>
                                              <ul className="list-unstyled d-flex gap-3 mb-0">
                                                <li>
                                                  <Link
                                                    to="/shop/shopingcard"
                                                    className="btn btn-soft-info btn-icon btn-sm"
                                                  >
                                                    <i className="ri-shopping-cart-2-line fs-13"></i>
                                                  </Link>
                                                </li>
                                                <li>
                                                  <Link
                                                    to="#"
                                                    className="btn btn-soft-danger btn-icon btn-sm"
                                                  >
                                                    <i className="ri-close-line fs-13"></i>
                                                  </Link>
                                                </li>
                                              </ul>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </Table>
                              </div>
                              <div className="hstack gap-2 justify-content-end mt-4">
                                <Link
                                  to="/product-list"
                                  className="btn btn-hover btn-secondary"
                                >
                                  Continue Shopping{" "}
                                  <i className="ri-arrow-right-line align-bottom"></i>
                                </Link>
                                <Link
                                  to="/resmilesdirme"
                                  className="btn btn-hover btn-primary"
                                >
                                  Check Out{" "}
                                  <i className="ri-arrow-right-line align-bottom"></i>
                                </Link>
                              </div>
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
                                      Persional Details
                                    </h5>
                                  </Col>
                                  <Col lg={6}>
                                    <div className="mb-3">
                                      <Form.Label htmlFor="name">
                                        Name
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
                                    </div>
                                  </Col>
                                  <Col lg={6}>
                                    <div className="mb-3">
                                      <Form.Label htmlFor="surname">
                                        surName
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
                                    </div>
                                  </Col>
                                  <Col lg={6}>
                                    <div className="mb-3">
                                      <Form.Label htmlFor="phone">
                                        Phone Number
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
                                    </div>
                                  </Col>
                                  <Col lg={6}>
                                    <div className="mb-3">
                                      <Form.Label htmlFor="email">
                                        Email Address
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
                                    </div>
                                  </Col>
                                  <Col lg={4}>
                                    <div className="mb-3">
                                      <Form.Label htmlFor="address">
                                        address
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
                                    </div>
                                  </Col>
                                  <Col lg={6}>
                                    <button type="submit">Submit</button>
                                  </Col>
                                  <Col lg={6}>
                                    <Form.Label htmlFor="profileImage">
                                      Profile Image
                                    </Form.Label>
                                    <Form.Control
                                      id="profileImage"
                                      name="profileImage"
                                      type="file"
                                      ref={fileRef}
                                      onChange={() => addStoreImage()}
                                    />
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
                        placeholder="Search by referal code"
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
                        placeholder="Search by month ex (1)"
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
                        placeholder="Search by year ex (2023)"
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
                            <Table className="fs-15 align-middle table-nowrap">
                              <thead>
                                <tr>
                                  <th scope="col">Referal Code</th>
                                  <th scope="col">Name</th>
                                  <th scope="col">Email</th>
                                  <th scope="col">Phone</th>
                                  <th scope="col">Total Amount</th>
                                  <th scope="col">Orders Count</th>
                                  <th scope="col">Total Orders Amount</th>
                                  <th scope="col">Monthly Gain</th>
                                </tr>
                              </thead>
                              <tbody>
                                {referalUsers.length > 0 ? (
                                  referalUsers.map((item, inx) => {
                                    return (
                                      <tr key={inx}>
                                        <td>{item.referalIdforTeam}</td>
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
                                        <td>{item.totalAmount}</td>
                                        <td>{item.orders.length}</td>
                                        <td>
                                          {item.orders
                                            .map((order) => order.totalAmount)
                                            .reduce(
                                              (acc, it) => acc + it,
                                              0
                                            )}{" "}
                                          AZN
                                        </td>
                                        <td>{item.gain}</td>
                                      </tr>
                                    );
                                  })
                                ) : (
                                  <div
                                    style={{
                                      display: "flex",
                                      paddingLeft: "10px",
                                    }}
                                  >
                                    <p>No Referal Users</p>
                                  </div>
                                )}
                              </tbody>
                            </Table>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </section>
      <EmailClothe />
      <CommonService />
    </>
  );
};

export default MyAccount;
