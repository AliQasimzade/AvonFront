import React, { useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Breadcrumb,
  Card,
  Form,
  Table,
  Button,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { recentlyOrder } from "../Common/data";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllDeliveryServices } from "../services/getRequests";
export const Shoptopbar = ({ title, page }) => {

  return (
    <>
      <section className="page-wrapper bg-primary">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center d-flex align-items-center justify-content-between">
                <h4 className="text-white mb-0">{title}</h4>
                <Breadcrumb bsPrefix=" breadcrumb breadcrumb-light justify-content-center mb-0 fs-15">
                  <Breadcrumb.Item href="#">Shop</Breadcrumb.Item>
                  <Breadcrumb.Item active aria-current="page">
                    {page}
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export const Shoporder = ({ dic, subtotal, total }) => {
  const [delivery, setDelivery] = useState([])
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState([])
  const [order, setOrder] = useState([])


  const handleDeliveryChanger = (e, d) => {
    if (e.target.checked) {
      setSelectedDeliveryMethod(d)
    }

  }
  console.log(selectedDeliveryMethod);


  const fetchDelivery = async () => {
    try {
      const data = await getAllDeliveryServices();
      setDelivery(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchDelivery();
  }, [])

  const user = useSelector((state) => state.persistedReducer.Accont);
  const { pathname } = useLocation();
  return (
    <>
      <Card className="overflow-hidden mt-5">
        <Card.Header className="border-bottom-dashed">
          <h5 className="card-title mb-0 fs-15">Sifarişin yekun detalları</h5>
        </Card.Header>
        <Card.Body className=" pt-4">
          <div className="table-responsive table-card">
            <Table className="table-borderless mb-0 fs-15">
              <tbody>
                {
                  user.user[0].balance > 0 ? (
                    <tr>
                      <td>
                        <Form.Label className="text-muted">Balansdan ödəmə</Form.Label>
                      </td>
                      <td>
                        <div className="mt-1">
                          <Form.Check type="radio" name="formRadios" id="checkoutFromBalance" className="form-Check-input" />
                          {user.user[0].balance} AZN
                        </div>
                      </td>
                    </tr>
                  ) : ""
                }
                {pathname === "/resmilesdirme" && <tr>
                  <td>
                    <Form.Label className="text-muted">Çatdırılmada nağd ödəmə</Form.Label>
                  </td>
                  <td>
                    <div className="d-flex justify-content-between mt-1">
                      <Form.Check type="radio" name="formRadios" id="checkoutWithCOD" className="form-Check-input" defaultChecked />
                      <span>Nağd</span>
                    </div>
                  </td>
                </tr>}
                {
                  pathname === "/resmilesdirme" && delivery.map((de, index) => (
                    <tr key={index}>
                      <td>
                        <img src={de.image} style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: '50%', marginRight: '15px' }} alt="" />
                        <Form.Label htmlFor={de.name} className="text-muted">{de.name}</Form.Label>
                      </td>
                      <td>
                        <div className="d-flex justify-content-between mt-1">
                          <Form.Check type="radio" onClick={(e) => handleDeliveryChanger(e, de)} name="delivery" id={de.name} className="form-Check-input" checked={de.price == 0} />
                          <span>{de.price} AZN</span>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </div>
          <div className="table-responsive table-card">
            <Table className="table-borderless mb-0 mt-2 fs-15">
              <tbody>
                <tr>
                  <td>Ümumi məhsulların qiyməti :</td>
                  <td className="text-end cart-subtotal">
                    {subtotal || "0.00"} ₼
                  </td>
                </tr>
                <tr>
                  <td>
                    Endirim miqdarı <span className="text-muted"></span>:
                  </td>
                  <td className="text-end cart-discount">%{dic}</td>
                </tr>
                {pathname === "/resmilesdirme" && (
                  <tr>
                    <td>Çatdırılma xidməti :</td>
                    <td className="text-end cart-shipping">
                      {!selectedDeliveryMethod.price ? 0 : selectedDeliveryMethod.price} ₼
                    </td>
                  </tr>

                )}
                <tr className="table-active">
                  <th>Yekun ödəniləcək məbləğ :</th>
                  <td className="text-end">
                    <span className="fw-semibold cart-total">
                      {Number(total) + Number(selectedDeliveryMethod.price)} ₼
                    </span>
                  </td>
                </tr>

              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export const BrandedProduct = ({ title }) => {
  const handleLike = (event) => {
    if (event.closest("button").classList.contains("active")) {
      event.closest("button").classList.remove("active");
    } else {
      event.closest("button").classList.add("active");
    }
  };
  return (
    <>
      <section className="section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={12}>
              <div className="d-flex align-items-center justify-content-between mb-4 pb-1">
                <h4 className="flex-grow-1 mb-0">{title}</h4>
                <div className="flex-shrink-0">
                  <Link to="#" className="link-effect link-primary">
                    All Products{" "}
                    <i className="ri-arrow-right-line ms-1 align-bottom"></i>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            {(recentlyOrder || []).map((item, inx) => {
              return (
                <Col xxl={3} lg={4} md={6} key={inx}>
                  <Card className="ecommerce-product-widgets border-0 rounded-0 shadow-none overflow-hidden card-animate">
                    <div className="bg-light bg-opacity-50 rounded py-4 position-relative">
                      <Image
                        src={item.img}
                        alt=""
                        style={{ maxHeight: "200px", maxWidth: "100%" }}
                        className="mx-auto d-block rounded-2"
                      />
                      <div className="action vstack gap-2">
                        <Button
                          variant="danger"
                          className="btn avatar-xs p-0 btn-soft-warning custom-toggle product-action"
                          data-bs-toggle="button"
                          onClick={(e) => handleLike(e.target)}
                        >
                          <span className="icon-on">
                            <i className="ri-heart-line"></i>
                          </span>
                          <span className="icon-off">
                            <i className="ri-heart-fill"></i>
                          </span>
                        </Button>
                      </div>
                      {item.presentag && (
                        <div className="avatar-xs label">
                          <div className="avatar-title bg-danger rounded-circle fs-11">
                            {item.presentag}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="pt-4">
                      {item?.color ? (
                        <ul className="clothe-colors list-unstyled hstack gap-1 mb-3 flex-wrap">
                          <li>
                            <Form.Control
                              type="radio"
                              name="sizes10"
                              id="product-color-102"
                            />
                            <Form.Label
                              className={`avatar-xxs btn btn-${item.color[0] || ""
                                } p-0 d-flex align-items-center justify-content-center rounded-circle`}
                              htmlFor="product-color-102"
                            ></Form.Label>
                          </li>
                          <li>
                            <Form.Control
                              type="radio"
                              name="sizes10"
                              id="product-color-103"
                            />
                            <Form.Label
                              className={`avatar-xxs btn btn-${item.color[1] || ""
                                } p-0 d-flex align-items-center justify-content-center rounded-circle`}
                              htmlFor="product-color-103"
                            ></Form.Label>
                          </li>
                          <li>
                            <Form.Control
                              type="radio"
                              name="sizes10"
                              id="product-color-104"
                            />
                            <Form.Label
                              className={`avatar-xxs btn btn-${item.color[2] || ""
                                } p-0 d-flex align-items-center justify-content-center rounded-circle`}
                              htmlFor="product-color-104"
                            ></Form.Label>
                          </li>
                          <li>
                            <Form.Control
                              type="radio"
                              name="sizes10"
                              id="product-color-105"
                            />
                            <Form.Label
                              className={`avatar-xxs btn btn-${item.color[3] || ""
                                } p-0 d-flex align-items-center justify-content-center rounded-circle`}
                              htmlFor="product-color-105"
                            ></Form.Label>
                          </li>
                        </ul>
                      ) : (
                        <div className="avatar-xxs mb-3">
                          <div className="avatar-title bg-light text-muted rounded cursor-pointer">
                            <i className={`${item.icone}`}></i>
                          </div>
                        </div>
                      )}

                      <Link to="#">
                        <h6 className="text-capitalize fs-15 lh-base text-truncate mb-0">
                          {item.title}
                        </h6>
                      </Link>
                      <div className="mt-2">
                        <span className="float-end">
                          {item.ratting}{" "}
                          <i className="ri-star-half-fill text-warning align-bottom"></i>
                        </span>
                        <h5 className="mb-0">{item.price}</h5>
                      </div>
                      <div className="mt-3">
                        <Link
                          to="/shop/shopingcard"
                          className="btn btn-primary w-100 add-btn"
                        >
                          <i className="mdi mdi-cart me-1"></i> Add To Cart
                        </Link>
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
    </>
  );
};
