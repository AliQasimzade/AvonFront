import React from "react";
import {
  Col,
  Container,
  Row,
  Alert,
  Card,
  Button,
  Table,
  Image,
} from "react-bootstrap";
import { Shoporder, Shoptopbar } from "../../Components/ShopTopBar";
import { Link } from "react-router-dom";
import { ShopingAddress } from "./ShoppingAddress";
import EmailClothe from "../../Pages/Catalog/EmailClothe";
import { CommonService } from "../../Components/CommonService";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Selectaddress from "./Selectaddress";
import { selectAddressData } from "../../Common/data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const Checkout = () => {
  const dispatch = useDispatch();
  const [addressData, setAddressData] = useState("");
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState("");
  const [selectedBalance, setSelectedBalance] = useState(true);
  const basket = useSelector((state) => state.persistedReducer.Basket.basket);
  const user = useSelector((state) => state.persistedReducer.User.userId);
  const token = useSelector((state) => state.persistedReducer.User.token);

  const userData = useSelector(
    (state) => state.persistedReducer.Accont.user[0]
  );

  const total =
    basket.length > 0
      ? Number(
          basket.reduce(
            (acc, item) => acc + item.productCount * item.product.salePrice,
            0
          )
        ).toFixed(2)
      : 0;

  const filterByOriginalPriceNotNull =
    basket.length > 0
      ? basket
          .filter((item) => item.originalPrice != null)
          .reduce(
            (acc, item) => acc + item.productCount * item.originalPrice,
            0
          )
      : 0;
  const filterByOriginalPriceNull =
    basket.length > 0
      ? basket
          .filter((item) => item.originalPrice == null)
          .reduce(
            (acc, item) => acc + item.productCount * item.product.salePrice,
            0
          )
      : 0;

  const subtotal = filterByOriginalPriceNotNull + filterByOriginalPriceNull;
  document.title = "Checkout | RGAgency - React FrontEnd";

  const postOrder = async () => {
    try {
      if (selectAddressData == "") {
        throw new Error("Zəhmət olmasa xanaları doldurun");
      } else {
        console.log({
          name: userData.name,
          surname: userData.surname,
          fatherName: "string",
          apartment: selectAddressData,
          streetAddres: selectAddressData,
          address: selectAddressData,
          isBalance: selectedBalance,
          city: userData.city,
          message: "string",
          email: userData.email,
          phone: userData.phoneNumber,
          zipCode: "string",
          deliveryAdressId: selectedDeliveryMethod.id,
        });
        const request = await axios.post(
          `${process.env.REACT_APP_BASE_URL}Orders/PostOrder`,
          {
            name: userData.name,
            surname: userData.surname,
            fatherName: "string",
            apartment: selectAddressData,
            streetAddres: selectAddressData,
            address: selectAddressData,
            isBalance: selectedBalance,
            city: userData.city,
            message: "string",
            email: userData.email,
            phone: userData.phoneNumber,
            zipCode: "string",
            deliveryAdressId: selectedDeliveryMethod.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(request.data);
        toast.success("Sifarişiniz qeydə alındı");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
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
      <Shoptopbar title="Checkout" page="Checkout" />
      <section className="section">
        <Container>
          {!user ? (
            <Row>
              <Col lg={12}>
                <Alert
                  className="alert-danger alert-modern alert-dismissible fade show"
                  role="alert"
                >
                  <i className="bi bi-box-arrow-in-right icons"></i>Hesabınız
                  var?
                  <Alert.Link href="giris" className="link-danger">
                    <strong> Hesabınıza buradan daxil olun</strong>.
                  </Alert.Link>
                  <Button
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></Button>
                </Alert>
              </Col>
            </Row>
          ) : (
            ""
          )}
          <Row>
            <Col lg={8}>
              <Card>
                <Card.Body>
                  <div className="table-responsive table-card">
                    <Table className="align-middle table-borderless table-nowrap text-center mb-0">
                      <thead>
                        <tr>
                          <th scope="col">Məhsulun adı</th>
                          <th scope="col">Endirimsiz qiyməti</th>
                          <th scope="col">Sayı</th>
                          <th scope="col">Endirimli qiyməti</th>
                          <th scope="col">Yekun qiyməti</th>
                        </tr>
                      </thead>
                      <tbody>
                        {basket.length > 0 &&
                          basket
                            .filter((it) => it.originalPrice != null)
                            .map((item, inx) => {
                              return (
                                <tr key={inx}>
                                  <td className="text-start">
                                    <div className="d-flex align-items-center gap-2">
                                      <div className="avatar-sm flex-shrink-0">
                                        <div
                                          className={`avatar-title bg-${item.bg}-subtle rounded-3`}
                                        >
                                          <Image
                                            src={item.product.posterImage}
                                            alt=""
                                            style={{
                                              width: "80px",
                                              height: "113px",
                                              objectFit: "cover",
                                            }}
                                          />
                                        </div>
                                      </div>
                                      <div className="flex-grow-1">
                                        <h6>{item.product.name}</h6>
                                        <p className="text-muted mb-0">
                                          SKU ID: {item.product.skuId}{" "}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td> {item.originalPrice.toFixed(2)} ₼</td>
                                  <td> {item.productCount}</td>
                                  <td>
                                    {" "}
                                    {item.product.salePrice.toFixed(2)} ₼
                                  </td>
                                  <td className="">
                                    {item.product.salePrice.toFixed(2) *
                                      item.productCount}{" "}
                                    ₼
                                  </td>
                                </tr>
                              );
                            })}
                      </tbody>
                    </Table>
                    <Table className="align-middle table-borderless table-nowrap text-center mb-0">
                      <thead>
                        <tr>
                          <th scope="col">Endirimsiz məhsullar</th>
                          <th scope="col">Qiyməti</th>
                          <th scope="col">Sayı</th>
                          <th scope="col">Yekun qiyməti</th>
                        </tr>
                      </thead>
                      <tbody>
                        {basket.length > 0 &&
                          basket
                            .filter((it) => it.originalPrice == null)
                            .map((item, inx) => {
                              return (
                                <tr key={inx}>
                                  <td className="text-start">
                                    <div className="d-flex align-items-center gap-2">
                                      <div className="avatar-sm flex-shrink-0">
                                        <div
                                          className={`avatar-title bg-${item.bg}-subtle rounded-3`}
                                        >
                                          <Image
                                            src={item.product.posterImage}
                                            alt=""
                                            style={{
                                              width: "80px",
                                              height: "113px",
                                              objectFit: "cover",
                                            }}
                                          />
                                        </div>
                                      </div>
                                      <div className="flex-grow-1">
                                        <h6>{item.product.name}</h6>
                                        <p className="text-muted mb-0">
                                          SKU ID: {item.product.skuId}{" "}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    {" "}
                                    {item.product.salePrice.toFixed(2)} ₼
                                  </td>
                                  <td> {item.productCount}</td>
                                  <td className="">
                                    {item.product.salePrice.toFixed(2) *
                                      item.productCount}{" "}
                                    ₼
                                  </td>
                                </tr>
                              );
                            })}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
              <Selectaddress
                addressData={addressData}
                setAddressData={setAddressData}
              />
            </Col>
            <Col lg={4}>
              <div className="sticky-side-div">
                <Shoporder
                  subtotal={subtotal}
                  dic={
                    basket.find((i) => i.basketDiscountPrice != null)
                      .basketDiscountPrice
                  }
                  charge="2.4"
                  total={total}
                  selectedBalance={selectedBalance}
                  setSelectedBalance={setSelectedBalance}
                  selectedDeliveryMethod={selectedDeliveryMethod}
                  setSelectedDeliveryMethod={setSelectedDeliveryMethod}
                />
                <div className="hstack gap-2 justify-content-between justify-content-end">
                  <Link
                    to="/shop/shopingcard"
                    className="btn btn-hover btn-soft-info w-100"
                  >
                    <i className="ri-arrow-left-line label-icon align-middle ms-1"></i>{" "}
                    Səbətə geri dön{" "}
                  </Link>
                  <Button
                    className="btn btn-hover btn-primary w-100"
                    onClick={postOrder}
                  >
                    Sifariş et
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <EmailClothe />
      <CommonService />
    </>
  );
};

export default Checkout;
