import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Table,
  Image,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Shoptopbar } from "../../Components/ShopTopBar";
import { shopProducDetails } from "../../Common/data";
import EmailClothe from "../../Pages/Catalog/EmailClothe";
import { CommonService } from "../../Components/CommonService";
import { useSelector } from "react-redux";
const Trackorder = () => {
  const orders = useSelector((state) => state.persistedReducer.Accont.user[0]);
  console.log(orders);
  document.title = "Track Order | RGAgency - React FrontEnd";
  const [searchOrder, setSearchOrder] = useState(null);
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    const findOrder = orders.orders.find((order) => {
      const code = order.codePrefix + order.codeNumber;
      if (code == search) {
        return order;
      }
    });
    if (findOrder) {
      setSearchOrder(findOrder);
    } else {
      setSearchOrder(null);
    }
    setSearch("");
  };

  const desc = (data) => {
    return { __html: data };
  };
  return (
    <>
      <Shoptopbar title="Track Order" page="Track Order" />
      <Container className="pb-4">
        <div className="w-25 d-flex flex-column mt-4">
          <h3>Sifariş Axtar</h3>
          <div className="d-flex gap-2">
            <Form.Control
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Order ID..."
            />
            <Button onClick={handleSearch}>Axtar</Button>
          </div>
        </div>
      </Container>
      {searchOrder != null && (
        <div>
          <section className="section">
            <Container>
              <Row>
                <Col lg={12}>
                  <div className="mb-4 pb-2">
                    <h5 className="mb-0 text-decoration-underline                                                                                                                                                                                                                                                                   ">
                      Order ID{" "}
                      <b>#{searchOrder.codePrefix + searchOrder.codeNumber}</b>
                    </h5>
                  </div>
                </Col>
              </Row>
              <div className="track-orders">
                <Row className="justify-content-between gy-4 gy-md-0">
                  <Col
                    md={3}
                    className="order-tracking text-start text-md-center ps-4 ps-md-0 completed"
                  >
                    <span className="is-complete"></span>
                    <h6 className="fs-15 mt-3 mt-md-4">Gözləmədə</h6>
                  </Col>
                  <Col
                    md={3}
                    className={`order-tracking text-start text-md-center ps-4 ps-md-0 ${
                      searchOrder.status == "Qəbul" && "completed"
                    }`}
                  >
                    <span className="is-complete"></span>
                    <h6 className="fs-15 mt-3 mt-md-4">Qəbul</h6>
                  </Col>
                  <Col
                    md={3}
                    className={`order-tracking text-start text-md-center ps-4 ps-md-0 ${
                      searchOrder.status == "İmtina" && "completed"
                    }`}
                  >
                    <span className="is-complete"></span>
                    <h6 className="fs-15 mt-3 mt-md-4">İmtina</h6>
                  </Col>
                </Row>
              </div>
            </Container>
          </section>
          <section className="section pt-0">
            <Container>
              <Card className="border-dashed">
                <Card.Body className="border-bottom border-bottom-dashed p-4">
                  <Row className="g-3">
                    <Col lg={3} xs={6}>
                      <p className="text-muted mb-2 text-uppercase fw-medium fs-12">
                        Invoice ID
                      </p>
                      <h5 className="fs-14 mb-0">
                        #
                        <span id="invoice-no">
                          {searchOrder.codePrefix + searchOrder.codeNumber}
                        </span>
                      </h5>
                    </Col>
                    <Col lg={3} xs={6}>
                      <p className="text-muted mb-2 text-uppercase fw-medium fs-12">
                        Date
                      </p>
                      <h5 className="fs-14 mb-0 d-flex gap-1 align-items-center">
                        <span id="invoice-date ">
                          {new Date(searchOrder.createdAt).toLocaleDateString()}
                        </span>
                        <small className="text-muted" id="invoice-time">
                          {new Date(searchOrder.createdAt).getHours()} :{" "}
                          {new Date(searchOrder.createdAt).getMinutes()}
                        </small>
                      </h5>
                    </Col>
                    <Col lg={3} xs={6}>
                      <p className="text-muted mb-2 text-uppercase fw-medium fs-12">
                        Status
                      </p>
                      <span
                        className="badge badge-soft-success fs-11"
                        id="payment-status"
                      >
                        {searchOrder.status}
                      </span>
                    </Col>
                    <Col lg={3} xs={6}>
                      <p className="text-muted mb-2 text-uppercase fw-medium fs-12">
                        Total Amount
                      </p>
                      <h5 className="fs-14 mb-0">
                        $
                        <span id="total-amount">{searchOrder.totalAmount}</span>
                      </h5>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Body className="p-4">
                  <Row className="g-3">
                    <Col xs={6}>
                      <h6 className="text-muted text-uppercase fs-12 mb-3">
                        Billing Address
                      </h6>
                      <h6 id="billing-name">
                        {orders.name} {orders.surname}
                      </h6>
                      <p
                        className="text-muted mb-1"
                        id="billing-address-line-1"
                      >
                        {orders.address}
                      </p>
                      <p className="text-muted mb-1">
                        <span>Phone: </span>
                        <span id="billing-phone-no">{orders.phoneNumber}</span>
                      </p>
                    </Col>
                    <Col xs={6}>
                      <h6 className="text-muted text-uppercase fs-12 mb-3">
                        Shipping Address
                      </h6>
                      <h6 id="shipping-name">
                        {orders.name} {orders.surname}
                      </h6>
                      <p
                        className="text-muted mb-1"
                        id="shipping-address-line-1"
                      >
                        {searchOrder.streetAddres}, {searchOrder.apartment},{" "}
                        {searchOrder.city}
                      </p>
                      <p className="text-muted mb-1">
                        <span>Phone: +</span>
                        <span id="shipping-phone-no">(123) 456-7890</span>
                      </p>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Body className="p-4">
                  <div className="table-responsive">
                    <Table className="table-borderless text-center table-nowrap align-middle mb-0">
                      <thead>
                        <tr className="table-active">
                          <th scope="col" style={{ width: "50px" }}>
                            #
                          </th>
                          <th scope="col">Product Details</th>
                          <th scope="col">Endirimli Qiymeti - Endirimsiz qiymeti</th>
                          <th scope="col">Quantity</th>
                          <th scope="col" className="text-end">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody id="products-list">
                        {searchOrder?.orderItems?.map((item, index) => {
                          return (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td className="text-start">
                                <div className="d-flex align-items-center gap-2">
                                  <div className="avatar-sm flex-shrink-0">
                                    <div
                                      className={`avatar-title bg-subtle rounded-3`}
                                    >
                                      <Image
                                        src={item.product.posterImage}
                                        alt=""
                                        className="avatar-xs"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex-grow-1">
                                    <h6>{item.product.name}</h6>
                                    <p
                                      className="text-muted mb-0"
                                      dangerouslySetInnerHTML={desc(
                                        item.description
                                      )}
                                    ></p>
                                  </div>
                                </div>
                              </td>
                              <td>${item.salePrice} - {item.product.salePrice}</td>
                              <td>{item.count}</td>
                              <td className="text-end">
                                $
                                {Number(item.salePrice * item.count).toFixed(2)}
                              </td>
                            </tr>
                          );
                        })}
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
                              searchOrder?.orderItems?.reduce(
                                (acc, it) =>
                                  acc + (it.count * it.product.salePrice), 0
                              )
                            ).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Discount
                            <small className="text-muted">(RGAgency15)</small>
                          </td>
                          <td className="text-end">
                            -{" "}
                            {
                              searchOrder?.orderItems.find(
                                (s) => s.discountPrice > 0
                              ).discountPrice
                            }
                            %
                          </td>
                        </tr>
                        <tr>
                          <td>Shipping Charge</td>
                          <td className="text-end">
                            ₼{searchOrder.deliveryAdress.price}
                          </td>
                        </tr>
                        <tr className="border-top border-top-dashed fs-15">
                          <th scope="row">Total Amount</th>
                          <th className="text-end">
                            ₼
                            {searchOrder.totalAmount +
                              searchOrder.deliveryAdress.price}
                          </th>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </Container>
          </section>
        </div>
      )}

      <EmailClothe />
      <CommonService />
    </>
  );
};

export default Trackorder;
