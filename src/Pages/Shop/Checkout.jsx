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
import { useNavigate } from "react-router-dom";
import { Shoporder, Shoptopbar } from "../../Components/ShopTopBar";
import { Link } from "react-router-dom";
import EmailClothe from "../../Pages/Catalog/EmailClothe";
import { CommonService } from "../../Components/CommonService";
import { useSelector,useDispatch } from "react-redux";
import { useState } from "react";
import Selectaddress from "./Selectaddress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {getAllBaskets} from "../../slices/layouts/basket"
import { changeAccont } from "../../slices/layouts/accont";
const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addressData, setAddressData] = useState("");
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState("");
  const [selectedBalance, setSelectedBalance] = useState(true);
  const basket = useSelector((state) => state.persistedReducer.Basket.basket);
  const user = useSelector((state) => state.persistedReducer.User.userId);
  const token = useSelector((state) => state.persistedReducer.User.token);

  const userData = useSelector(
    (state) => state.persistedReducer.Accont.user
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
      if (addressData == "") {
        throw new Error("Zəhmət olmasa xanaları doldurun");
      } else {
        const request = await axios.post(
          `${process.env.REACT_APP_BASE_URL}Orders/PostOrder`,
          {
            name: userData.name,
            surname: userData.surname,
            fatherName: "string",
            apartment: addressData,
            streetAddres: addressData,
            address: addressData,
            isBalance: selectedBalance,
            city: addressData,
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
        const req = await axios.get(`${process.env.REACT_APP_BASE_URL}Account/MyAccount?id=${userData.id}`)

        const responses = await Promise.all([request, req])
        dispatch(changeAccont(responses[1].data))
        toast.success("Sifarişiniz qeydə alındı");
        dispatch(getAllBaskets([]))
        navigate('/shop/confirm')
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
        {basket.length > 0 ? <Container>
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
                    basket.length > 0 &&
                    basket.find((i) => i.basketDiscountPrice != null) ? basket.find((i) => i.basketDiscountPrice != null) .basketDiscountPrice : 0
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
        </Container> : <Row id="search-result-elem" className="d-flex justify-content-center flex-grow-1">
      <Col lg={12}>
        <div className="text-center py-5">
          <div className="avatar-lg mx-auto mb-4">
            <div className="avatar-title bg-primary-subtle text-primary rounded-circle fs-24">
              <i className="bi bi-search"></i>
            </div>
          </div>

          <h5>Səbətdə məhsul yoxdur</h5>
        </div>
      </Col>
    </Row>}
      </section>
      <EmailClothe />
      <CommonService />
    </>
  );
};

export default Checkout;
