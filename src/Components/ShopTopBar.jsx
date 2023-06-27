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
import { getAllDeliveryServices, getAllProducts } from "../services/getRequests";
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
                  <Breadcrumb.Item href="/mehsullar">Alış veriş</Breadcrumb.Item>
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

export const Shoporder = ({
  dic,
  subtotal,
  total,
  selectedBalance,
  setSelectedBalance,
  selectedDeliveryMethod,
  setSelectedDeliveryMethod,
}) => {
  const [delivery, setDelivery] = useState([]);

  const handleDeliveryChanger = (e, d) => {
    if (e.target.checked) {
      setSelectedDeliveryMethod(d);
    }
  };

  const fetchDelivery = async () => {
    try {
      const data = await getAllDeliveryServices();
      setDelivery(data);
      setSelectedDeliveryMethod(data.sort((a, b) => a.price - b.price)[0]);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDelivery();
  }, []);

  const changePaymentMethod = (e) => {
    if (e.target.id == "checkoutFromBalance") {
      setSelectedBalance(true);
    } else {
      setSelectedBalance(false);
    }
  };

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
                {pathname === "/resmilesdirme" && (
                  <tr>
                    <td>
                      <Form.Label className="text-muted">
                        Balansdan ödəmə
                      </Form.Label>
                    </td>
                    <td>
                      <div className="mt-1 d-flex justify-content-between">
                        <Form.Check
                          type="radio"
                          onClick={(e) => changePaymentMethod(e)}
                          name="formRadios"
                          id="checkoutFromBalance"
                          className="form-Check-input"
                        />
                        {user.user.balance} ₼
                      </div>
                    </td>
                  </tr>
                )}

                {pathname === "/resmilesdirme" && (
                  <tr>
                    <td>
                      <Form.Label className="text-muted">
                        Çatdırılmada nağd ödəmə
                      </Form.Label>
                    </td>
                    <td>
                      <div className="d-flex justify-content-between mt-1">
                        <Form.Check
                          type="radio"
                          name="formRadios"
                          onClick={(e) => changePaymentMethod(e)}
                          id="checkoutWithCOD"
                          className="form-Check-input"
                          defaultChecked
                        />
                        <span>Nağd</span>
                      </div>
                    </td>
                  </tr>
                )}
                {pathname === "/resmilesdirme" &&
                  delivery.map((de, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={de.image}
                          style={{
                            width: "30px",
                            height: "30px",
                            objectFit: "cover",
                            borderRadius: "50%",
                            marginRight: "15px",
                          }}
                          alt=""
                        />
                        <Form.Label htmlFor={de.name} className="text-muted">
                          {de.name}
                        </Form.Label>
                      </td>
                      <td>
                        <div className="d-flex justify-content-between mt-1">
                          <Form.Check
                            type="radio"
                            checked={
                              selectedDeliveryMethod.name == de.name
                                ? true
                                : false
                            }
                            onClick={(e) => handleDeliveryChanger(e, de)}
                            name="delivery"
                            id={de.name}
                            className="form-Check-input"
                          />
                          <span>{de.price} ₼</span>
                        </div>
                      </td>
                    </tr>
                  ))}
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
                  <td className="text-end cart-discount">{dic}%</td>
                </tr>
                {pathname === "/resmilesdirme" && (
                  <tr>
                    <td>Çatdırılma xidməti :</td>
                    <td className="text-end cart-shipping">
                      {!selectedDeliveryMethod.price
                        ? 0
                        : selectedDeliveryMethod.price}{" "}
                      ₼
                    </td>
                  </tr>
                )}

                {pathname != "/resmilesdirme" && (
                  <tr className="table-active">
                    <th>Yekun ödəniləcək məbləğ :</th>
                    <td className="text-end">
                      <span className="fw-semibold cart-total">
                        {Number(total)} ₼
                      </span>
                    </td>
                  </tr>
                )}
                {pathname == "/resmilesdirme" && (
                  <tr className="table-active">
                    <th>Yekun ödəniləcək məbləğ :</th>
                    <td className="text-end">
                      <span className="fw-semibold cart-total">
                        {Number(selectedDeliveryMethod.price) + Number(total)} ₼
                      </span>
                    </td>
                  </tr>
                )}
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

  const [products, setProducts] = useState([])
  const getProdts = async () => {
    try {
      const data = await getAllProducts(1);
      setProducts(data)
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getProdts();
  }, [])
  return (
    <>
      <section className="section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={12}>
              <div className="d-flex align-items-center justify-content-between mb-4 pb-1">
                <h4 className="flex-grow-1 mb-0">{title}</h4>
                <div className="flex-shrink-0">
                  <Link to="/mehsullar" className="link-effect link-primary">
                    Bütün məhsullara bax{" "}
                    <i className="ri-arrow-right-line ms-1 align-bottom"></i>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            {(products || [])?.filter(a => a.isDefault == true).slice(3, 7).map((item, inx) => {
              return (
                <Col xxl={3} lg={4} md={6} key={inx}>
                  <Card className="ecommerce-product-widgets border-0 rounded-0 shadow-none overflow-hidden card-animate">
                    <div className="bg-light bg-opacity-50 rounded py-4 position-relative">
                      <Image
                        src={item.posterImage}
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
                      <div className="avatar-xs label">
                        <div className="avatar-title bg-danger rounded-circle fs-11">
                          {item.discountPrice} %
                        </div>
                      </div>
                    </div>
                    <div className="pt-4">
                      <Link to="#">
                        <h6 className="text-capitalize fs-15 lh-base text-truncate mb-0">
                          {item.name}
                        </h6>
                      </Link>
                      <div className="mt-2">
                        <span className="float-end">5<i className="ri-star-half-fill text-warning align-bottom"></i>
                        </span>
                        <h5 className="mb-0">{item.salePrice} ₼</h5>
                      </div>
                      <div className="mt-3">
                        <Link
                          to={`/product-details/${item.skuId}`}
                          className="btn btn-primary w-100 add-btn"
                        >
                          <i className="mdi mdi-cart me-1"></i> Ətraflı bax
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
