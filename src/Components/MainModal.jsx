import React, { useEffect, useState } from "react";
import {
  Col,
  Modal,
  Row,
  Card,
  Offcanvas,
  Table,
  Form,
  Button,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
//img
import modalImg from "../assets/images/subscribe.png";
import logodark from "../assets/images/avonLogo.png";
import logolight from "../assets/images/avonLogo.png";
import avatar1 from "../assets/images/users/avatar-1.jpg";
import avatar7 from "../assets/images/users/avatar-7.jpg";

//component
import { productData } from "../Common/data";
import DeleteModal from "../Components/DeleteModal";
import { useSelector } from "react-redux";

//go to one page to another page opne modal
export const MainModal = ({ location }) => {
  const [show, setShow] = useState(false);
  const modalhide = () => setShow(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 2000);
  }, [location]);

  return (
    <>
      <Modal
        show={show}
        onHide={modalhide}
        id="subscribeModal"
        contentClassName="border-0"
        size="lg"
        centered
      >
        <Modal.Body className="p-0 bg-info-subtle rounded">
          <Row className="g-0 align-items-center">
            <Col lg={6}>
              <div className="p-4 h-100">
                <span className="badge badge-soft-info fs-13">
                  GET 10% SALE OFF
                </span>
                <h2 className="display-6 mt-2 mb-3">
                  Subscribe & Get <b>50% Special</b> Discount On Email
                </h2>
                <p className="mb-4 pb-lg-2 fs-16">
                  Join our newsletter to receive the latest updates and
                  promotion
                </p>
                <Form action="#">
                  <div className="position-relative ecommerce-subscript">
                    <Form.Control
                      type="email"
                      className="rounded-pill border-0"
                      placeholder="Enter your email"
                    />
                    <Button
                      type="submit"
                      className="btn btn-info btn-hover rounded-pill"
                    >
                      Subscript
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
            <Col lg={6}>
              <div className="p-4 pb-0">
                <Image src={modalImg} alt="" fluid />
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

//===============================================

//invoice modal
export const InvoiceModal = ({
  modal,
  handleClose,
  selectedOrder,
  selectedInvoice,
}) => {
  const userData = useSelector(
    (state) => state.persistedReducer.Accont.user
  );

  const InvoicePrint = () => {
    window.print();
  };
  return (
    <>
      {selectedOrder != null && (
        <Modal
          show={modal}
          onHide={handleClose}
          animation={true}
          dialogClassName="modal-custom-size"
          id="invoiceModal"
          aria-labelledby="invoiceModalLabel"
        >
          <Modal.Header closeButton>
            <h1 className="modal-title fs-5" id="invoiceModalLabel">
              Invoice #{selectedInvoice}
            </h1>
          </Modal.Header>
          <Modal.Body>
            <Card className="mb-0" id="demo">
              <Row>
                <Col lg={12}>
                  <Card.Header className="border-bottom-dashed p-4">
                    <div className="d-sm-flex">
                      <div className="flex-grow-1">
                        <Image
                          src={logodark}
                          className="card-logo card-logo-dark"
                          alt="logo dark"
                          height="26"
                        />
                        <Image
                          src={logolight}
                          className="card-logo card-logo-light"
                          alt="logo light"
                          height="26"
                        />
                        <div className="mt-sm-5 mt-4">
                          <h6 className="text-muted text-uppercase fw-semibold fs-14">
                            Address
                          </h6>
                          <p className="text-muted mb-1" id="address-details">
                            <span>{selectedOrder?.city}</span>,{" "}
                            <span>{selectedOrder.streetAddres}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 mt-sm-0 mt-3">
                        <h6>
                          <span className="text-muted fw-normal">
                            Legal Registration No:
                          </span>{" "}
                          <span id="legal-register-no">987654</span>
                        </h6>
                        <h6>
                          <span className="text-muted fw-normal">Email:</span>{" "}
                          <span id="email">info@rgagency.org</span>
                        </h6>
                        <h6>
                          <span className="text-muted fw-normal">Website:</span>{" "}
                          <Link
                            to="https://rgagency.org/"
                            className="link-primary"
                            target="_blank"
                            id="website"
                          >
                            www.rgagency.org
                          </Link>
                        </h6>
                        <h6 className="mb-0">
                          <span className="text-muted fw-normal">
                            Contact No:{" "}
                          </span>
                          <span id="contact-no"> +(314) 234 6789</span>
                        </h6>
                      </div>
                    </div>
                  </Card.Header>
                  <Col lg={12}>
                    <Card.Body className="p-4">
                      <Row className="g-3">
                        <Col lg={3} xs={6}>
                          <p className="text-muted mb-2 text-uppercase fw-semibold fs-14">
                            Invoice No
                          </p>
                          <h5 className="fs-15 mb-0">#{selectedInvoice}</h5>
                        </Col>

                        <Col lg={3} xs={6}>
                          <p className="text-muted mb-2 text-uppercase fw-semibold fs-14">
                            Date
                          </p>
                          <h5 className="fs-15 mb-0">
                            <span id="invoice-date">
                              {new Date(
                                selectedOrder?.createdAt
                              ).toLocaleDateString("en-EN", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>{" "}
                            <small className="text-muted" id="invoice-time">
                              {new Date(
                                selectedOrder?.createdAt
                              ).toLocaleDateString("en-EN", {
                                hour: "numeric",
                                minute: "numeric",
                              })}
                            </small>
                          </h5>
                        </Col>

                        <Col lg={3} xs={6}>
                          <p className="text-muted mb-2 text-uppercase fw-semibold fs-14">
                            Payment Status
                          </p>
                          <span
                            className={`badge badge-soft-${
                              selectedOrder?.status == "Gözləmədə"
                                ? "warning"
                                : selectedOrder?.status == "Qəbul"
                                ? "success"
                                : "danger"
                            }`}
                            id="payment-status"
                          >
                            {selectedOrder?.status}
                          </span>
                        </Col>

                        <Col lg={3} xs={6}>
                          <p className="text-muted mb-2 text-uppercase fw-semibold fs-14">
                            Total Amount
                          </p>
                          <h5 className="fs-15 mb-0">
                            ₼
                            <span id="total-amount">
                              {selectedOrder?.totalAmount}
                            </span>
                          </h5>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Col>
                  <Col lg={12}>
                    <Card.Body className="p-4 border-top border-top-dashed">
                      <Row className="g-3">
                        <Col xs={12}>
                          <h6 className="text-muted text-uppercase fw-semibold fs-14 mb-3">
                            Billing Address
                          </h6>
                          <p className="fw-medium mb-2 fs-16" id="billing-name">
                            {userData?.name}, {userData?.surname}
                          </p>
                          <p
                            className="text-muted mb-1"
                            id="billing-address-line-1"
                          >
                            {" "}
                            {userData?.otherAddress}
                          </p>
                          <p className="text-muted mb-1">
                            <span>Phone: +</span>
                            <span id="billing-phone-no">
                              {userData?.phoneNumber}
                            </span>
                          </p>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Col>
                  <Col lg={12}>
                    <Card.Body className="p-4">
                      <div className="table-responsive">
                        <Table className="table-borderless text-center table-nowrap align-middle mb-0">
                          <thead>
                            <tr className="table-active">
                              <th scope="col" style={{ width: "50px" }}>
                                #
                              </th>
                              <th scope="col">Product Details</th>
                              <th scope="col">Product Price-Discount Price</th>
                              <th scope="col">Quantity</th>
                              <th scope="col">Discount Price</th>
                              <th scope="col" className="text-end">
                                Amount
                              </th>
                            </tr>
                          </thead>
                          <tbody id="products-list">
                            {selectedOrder?.orderItems.length > 0 &&
                              selectedOrder?.orderItems.map((item, index) => (
                                <tr key={index}>
                                  <th scope="row">{index + 1}</th>
                                  <td className="text-start">
                                    <span className="fw-medium">
                                      {item.product.name}
                                    </span>
                                  </td>
                                  <td>
                                  ₼{item.product.salePrice}  - {item.salePrice != item.product.salePrice ? ` ₼${item.salePrice}`:'Yoxdur'} 
                                  </td>
                                  <td>{item.count}</td>
                                  <td>{item.discountPrice}</td>

                                  <td className="text-end">
                                    ₼
                                    {item.salePrice != 0 ? Number(
                                      item.salePrice * item.count
                                    ).toFixed(2) : Number(
                                      item.product.salePrice * item.count
                                    ).toFixed(2)}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </Table>
                      </div>
                      <div className="border-top border-top-dashed mt-2">
                        <Table
                          className="table-borderless table-nowrap align-middle mb-0 ms-auto"
                          style={{ width: "250px" }}
                        >
                          <tbody>
                            <tr>
                              <td>Sub Total</td>
                              <td className="text-end">
                                ₼
                                {Number(
                                  selectedOrder?.orderItems.reduce(
                                    (acc, item) => {
                                      if(item.salePrice > 0) {
                                         return acc += item.count * item.salePrice
                                      }else {
                                         return acc += item.count * item.product.salePrice
                                      }
                                    },
                                    0
                                  )
                                ).toFixed(2)}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                Discount <small className="text-muted"></small>
                              </td>
                              <td className="text-end">
                                - %
                                {selectedOrder.orderItems.find(f => f.discountPrice > 0).discountPrice}
                              </td>
                            </tr>
                            <tr>
                              <td>Shipping Charge</td>
                              <td className="text-end">
                                ₼{selectedOrder.deliveryAdress.price}
                              </td>
                            </tr>
                            <tr className="border-top border-top-dashed fs-15">
                              <th scope="row">Total Amount</th>
                              <th className="text-end">
                                ₼
                                {selectedOrder?.totalAmount +
                                  selectedOrder.deliveryAdress.price}
                              </th>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                      <div className="mt-4">
                        <div className="alert alert-info">
                          <p className="mb-0">
                            <span className="fw-semibold">NOTES:</span>
                            <span id="note">
                              All accounts are to be paid within 7 days from
                              receipt of invoice. To be paid by cheque or credit
                              card or direct payment online. If account is not
                              paid within 7 days the credits details supplied as
                              confirmation of work undertaken will be charged
                              the agreed quoted fee noted above.
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                        <Link
                          to="print()"
                          className="btn btn-success"
                          onClick={InvoicePrint}
                        >
                          <i className="ri-printer-line align-bottom me-1"></i>{" "}
                          Print
                        </Link>
                        <Link to="#" className="btn btn-primary">
                          <i className="ri-download-2-line align-bottom me-1"></i>{" "}
                          Download
                        </Link>
                      </div>
                    </Card.Body>
                  </Col>
                </Col>
              </Row>
            </Card>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

//=======================================================

//search modal
export const SearchModal = ({ show, handleClose }) => {
  const [value, setValue] = useState("");
  const handlesearch = (event) => {
    setValue(event.value);
  };

  useEffect(() => {
    var searchOption = document.getElementById("search-close-options");
    var dropdown = document.getElementById("search-dropdown");
    var searchInput = document.getElementById("search-options");

    searchInput?.addEventListener("keyup", function () {
      if (searchInput?.value.length > 0) {
        dropdown?.classList.add("show");
        searchOption?.classList.remove("d-none");
      } else {
        dropdown?.classList.remove("show");
        searchOption?.classList.add("d-none");
      }
    });

    searchOption?.addEventListener("click", function () {
      searchInput.value = "";
      dropdown?.classList.remove("show");
      searchOption?.classList.add("d-none");
      setValue("");
    });
  }, [value]);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        contentClassName="rounded"
        id="searchModal"
      >
        <Modal.Header className="p-3">
          <div className="position-relative w-100">
            <Form.Control
              type="text"
              className="form-control-lg border-2"
              placeholder="Search for RGAgency..."
              id="search-options"
              value={value}
              onChange={(e) => handlesearch(e.target)}
            />
            <span className="bi bi-search search-widget-icon fs-17"></span>
            <Link
              to="#"
              className="search-widget-icon fs-14 link-secondary text-decoration-underline search-widget-icon-close"
              id="search-close-options"
            >
              Clear
            </Link>
          </div>
        </Modal.Header>
        <div
          className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 overflow-hidden"
          id="search-dropdown"
        >
          <div className="dropdown-head rounded-top">
            <div className="p-3">
              <Row className="align-items-center">
                <Col>
                  <h6 className="m-0 fs-14 text-muted fw-semibold">
                    {" "}
                    RECENT SEARCHES{" "}
                  </h6>
                </Col>
              </Row>
            </div>

            <div className="dropdown-item bg-transparent text-wrap">
              <Link
                to="/"
                className="btn btn-soft-secondary btn-sm btn-rounded"
              >
                how to setup{" "}
                <i className="mdi mdi-magnify ms-1 align-middle"></i>
              </Link>
              <Link
                to="/"
                className="btn btn-soft-secondary btn-sm btn-rounded"
              >
                buttons <i className="mdi mdi-magnify ms-1 align-middle"></i>
              </Link>
            </div>
          </div>
          <SimpleBar className="pe-2 ps-3 mt-3" style={{ maxHeight: "300px" }}>
            <div className="list-group list-group-flush border-dashed">
              <div className="notification-group-list">
                <h5 className="text-overflow text-muted fs-13 mb-2 mt-3 text-uppercase notification-title">
                  Apps Pages
                </h5>
                <Link
                  to="#"
                  className="list-group-item dropdown-item notify-item"
                >
                  <i className="bi bi-speedometer2 me-2"></i>{" "}
                  <span>Analytics Dashboard</span>
                </Link>
                <Link
                  to="#"
                  className="list-group-item dropdown-item notify-item"
                >
                  <i className="bi bi-filetype-psd me-2"></i>{" "}
                  <span>RGAgency.psd</span>
                </Link>
                <Link
                  to="#"
                  className="list-group-item dropdown-item notify-item"
                >
                  <i className="bi bi-ticket-detailed me-2"></i>{" "}
                  <span>Support Tickets</span>
                </Link>
                <Link
                  to="#"
                  className="list-group-item dropdown-item notify-item"
                >
                  <i className="bi bi-file-earmark-zip me-2"></i>{" "}
                  <span>RGAgency.zip</span>
                </Link>
              </div>

              <div className="notification-group-list">
                <h5 className="text-overflow text-muted fs-13 mb-2 mt-3 text-uppercase notification-title">
                  Links
                </h5>
                <Link
                  to="#"
                  className="list-group-item dropdown-item notify-item"
                >
                  <i className="bi bi-link-45deg me-2 align-middle"></i>{" "}
                  <span>www.rgagency.org</span>
                </Link>
              </div>

              <div className="notification-group-list">
                <h5 className="text-overflow text-muted fs-13 mb-2 mt-3 text-uppercase notification-title">
                  People
                </h5>
                <Link
                  to="#"
                  className="list-group-item dropdown-item notify-item"
                >
                  <div className="d-flex align-items-center">
                    <Image
                      src={avatar1}
                      alt=""
                      className="avatar-xs flex-shrink-0 me-2"
                      roundedCircle
                    />
                    <div>
                      <h6 className="mb-0">Ayaan Bowen</h6>
                      <span className="fs-12 text-muted">React Developer</span>
                    </div>
                  </div>
                </Link>
                <Link
                  to="#"
                  className="list-group-item dropdown-item notify-item"
                >
                  <div className="d-flex align-items-center">
                    <Image
                      src={avatar7}
                      alt=""
                      className="avatar-xs flex-shrink-0 me-2"
                      roundedCircle
                    />
                    <div>
                      <h6 className="mb-0">Alexander Kristi</h6>
                      <span className="fs-12 text-muted">React Developer</span>
                    </div>
                  </div>
                </Link>
                <Link
                  to="#"
                  className="list-group-item dropdown-item notify-item"
                >
                  <div className="d-flex align-items-center">
                    <Image
                      src={avatar7}
                      alt=""
                      className="avatar-xs flex-shrink-0 me-2"
                      roundedCircle
                    />
                    <div>
                      <h6 className="mb-0">Alan Carla</h6>
                      <span className="fs-12 text-muted">React Developer</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </SimpleBar>
        </div>
      </Modal>
    </>
  );
};

//===================================================
//card modal

import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { getAllBaskets } from "../slices/layouts/basket";

export const CardModal = ({ show, handleClose }) => {
  //modal
  const [removeModel, setRemovemodel] = useState(false);
  const [selectedSkuId, setSelectedSkuId] = useState("");
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.persistedReducer.Basket.basket);
  const userId = useSelector((state) => state.persistedReducer.User.userId);

  const RemoveModel = (id, c) => {
    setRemovemodel(true);
    setSelectedSkuId([
      {
        skuId: id,
        count: Number(c),
      },
    ]);
  };

  const deleteData = async () => {
    try {
      const req1 = await axios.post(
        `${process.env.REACT_APP_BASE_URL}Baskets/RemoveBasket?appUserId=${userId}`,
        selectedSkuId
      );
      const req2 = await axios.get(
        `${process.env.REACT_APP_BASE_URL}Baskets/GetAll?appUserId=${userId}`
      );

      const responses = await Promise.all([req1, req2]);
      dispatch(getAllBaskets(responses[1].data));
      toast.success("Məhsul səbətdən uğurla silindi");
    } catch (error) {
      toast.error("Sorğuda xəta baş verdi");
    }
  };

  const CloseremoveModal = () => setRemovemodel(false);

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
      <Offcanvas
        show={show}
        onHide={handleClose}
        backdrop="static"
        placement="end"
      >
        <Offcanvas.Header closeButton className="border-bottom">
          <Offcanvas.Title id="ecommerceCartLabel" as="h5">
            My Cart{" "}
            <span className="badge bg-danger align-middle ms-1 cartitem-badge">
              {basket.length}
            </span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className=" px-0">
          <SimpleBar className="h-100">
            <ul className="list-group list-group-flush cartlist">
              {basket.length > 0 &&
                basket.map((item, inx) => {
                  return (
                    <li key={inx} className="list-group-item product">
                      <div className="d-flex gap-3">
                        <div className="flex-shrink-0">
                          <div
                            className={`avatar-md ${item.bg}-subtle `}
                            style={{ height: "100%" }}
                          >
                            <div
                              className={`avatar-title bg-${item.bg}-subtle rounded-3`}
                            >
                              <Image
                                src={item.product.posterImage}
                                alt=""
                                className="avatar-sm"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <Link to="#">
                            <h5 className="fs-15">{item.product.name}</h5>
                          </Link>
                          <div className="d-flex mb-3 gap-2">
                            <div className="text-muted fw-medium mb-0">
                              $
                              <span className="product-price">
                                {Number(item.product.salePrice).toFixed(2)}
                              </span>
                            </div>
                            <div className="vr"></div>
                            <span className="text-success fw-medium"></span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 d-flex flex-column justify-content-between align-items-end">
                          <Button
                            className="btn btn-icon btn-sm btn-ghost-secondary remove-item-btn"
                            onClick={() =>
                              RemoveModel(item.product.skuId, item.productCount)
                            }
                          >
                            <i className="ri-close-fill fs-16"></i>
                          </Button>
                          <div className="fw-medium mb-0 fs-16">
                            $
                            <span className="product-line-price">
                              {item.product.salePrice.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
            <div className="table-responsive mx-2 border-top border-top-dashed">
              <Table className="table table-borderless mb-0 fs-14 fw-semibold">
                <tbody>
                  <tr>
                    <td>Sub Total :</td>
                    <td className="text-end cart-subtotal">
                      $
                      {basket.length > 0
                        ? Number(
                            basket.reduce(
                              (acc, item) =>
                                acc +
                                item.product.salePrice * item.productCount,
                              0
                            )
                          ).toFixed(2)
                        : 0}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </SimpleBar>
        </Offcanvas.Body>
        <div className="offcanvas-footer border-top p-3 text-center">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="m-0 fs-16 text-muted">Total:</h6>
            <div className="px-2">
              <h6 className="m-0 fs-16 cart-total">
                $
                {basket.length > 0
                  ? Number(
                      basket.reduce(
                        (acc, it) =>
                          acc +
                          it.productCount * it.product.salePrice.toFixed(2),
                        0
                      )
                    ).toFixed(2)
                  : 0}
              </h6>
            </div>
          </div>
          <Row className="g-2">
            <Col xs={6}>
              <Link to="/shop/shopingcard" onClick={handleClose}>
                <Button variant="light" className="btn w-100" id="reset-layout">
                  View Cart
                </Button>
              </Link>
            </Col>
            <Col xs={6}>
              <Link
                to="/resmilesdirme"
                onClick={handleClose}
                className="btn btn-info w-100"
              >
                Continue to Checkout
              </Link>
            </Col>
          </Row>
        </div>
      </Offcanvas>
      <DeleteModal
        hideModal={CloseremoveModal}
        removeModel={removeModel}
        deleteData={deleteData}
      />
    </>
  );
};
