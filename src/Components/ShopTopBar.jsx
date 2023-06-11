import React from "react";
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

export const Shoporder = ({ dic, subtotal, charge, tax, total }) => {
    const { pathname } = useLocation();
    console.log(pathname);
  return (
    <>
      <Card className="overflow-hidden mt-5">
        <Card.Header className="border-bottom-dashed">
          <h5 className="card-title mb-0 fs-15">Order Summary</h5>
        </Card.Header>
        <Card.Body className=" pt-4">
          <div className="table-responsive table-card">
            <Table className="table-borderless mb-0 fs-15">
              <tbody>
                <tr>
                  <td>Sub Total :</td>
                  <td className="text-end cart-subtotal">
                    ${subtotal || "0.00"}
                  </td>
                </tr>
                <tr>
                  <td>
                    Discount <span className="text-muted">(RGAgency15)</span>:
                  </td>
                  <td className="text-end cart-discount">%{dic}</td>
                </tr>
                {pathname === "/resmilesdirme" && (
                  <tr>
                    <td>Shipping Charge :</td>
                    <td className="text-end cart-shipping">
                      $0
                    </td>
                  </tr>
           
                )}
                <tr className="table-active">
                  <th>Total (USD) :</th>
                  <td className="text-end">
                    <span className="fw-semibold cart-total">
                      ${subtotal}
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
                              className={`avatar-xxs btn btn-${
                                item.color[0] || ""
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
                              className={`avatar-xxs btn btn-${
                                item.color[1] || ""
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
                              className={`avatar-xxs btn btn-${
                                item.color[2] || ""
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
                              className={`avatar-xxs btn btn-${
                                item.color[3] || ""
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
