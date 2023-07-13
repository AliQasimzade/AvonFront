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
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Selectaddress from "./Selectaddress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { getAllBaskets } from "../../slices/layouts/basket"
import { changeAccont } from "../../slices/layouts/accont";
const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addressData, setAddressData] = useState("");
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState("");
  const [selectedBalance, setSelectedBalance] = useState(false);
  const basket = useSelector((state) => state.persistedReducer.Basket.basket);
  const user = useSelector((state) => state.persistedReducer.User.userId);
  const token = useSelector((state) => state.persistedReducer.User.token);

  const userData = useSelector(
    (state) => state.persistedReducer.Accont.user
  );
  const totalWeight = basket.reduce((acc, item) => {
    const productWeight = Number(item?.product?.veight);
    return acc + productWeight;
  }, 0);
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
  document.title = "Sifarişi rəsmiləşdirmə | Avon Azərbaycan";

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
        navigate('/sifarisiniz-tesdiqlendi')
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const stockBadge = (count) => {
    if (count > 50) {
      return <span className="badge bg-success text-white "> Stokda var</span>
    } else if (50 > count && count > 10) {
      return <span className="badge bg-primary text-white "> Məhdud saydadır</span>
    } else if (1 < count && count < 10) {
      return <span className="badge bg-primary text-white "> Bitmək üzrədir</span>
    } else {
      return <span className="badge bg-dark text-white "> Anbarda yoxdur</span>
    }
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme="light"
      />
      <Shoptopbar title="Sifarişi rəsmiləşdirmə" page="Sifarişi rəsmiləşdirmə" />
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
                    <Table className="align-middle table-borderless text-center mb-5">
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
                                  <td className="text-start" style={{ width: '35%' }}>
                                    <div className="d-flex align-items-center gap-2">
                                      <div className="flex-shrink-0" style={{ width: '50px', height: '50px' }}>
                                        <div
                                          className={`avatar-title bg-${item.bg}-subtle rounded-3`}
                                        >
                                          <Image
                                            src={item.product.posterImage}
                                            alt=""
                                            style={{
                                              width: "50px",
                                              height: "50px",
                                              objectFit: "cover",
                                            }}
                                          />
                                        </div>
                                      </div>
                                      <div className="flex-grow-1">
                        
                                        <h6>{item.product.name} </h6>
                                        <p className="text-muted mb-0">
                                          SKU ID: {item.product.skuId}{" "} <h5>{stockBadge(item.product.stockCount)}</h5>
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td>{item.originalPrice.toFixed(2)} ₼</td>
                                  <td>{item.productCount} x {item?.basketDiscountPrice}%</td>
                                  <td>
                                    {" "}
                                    {item.product.salePrice.toFixed(2)} ₼
                                  </td>
                                  <td className="">
                                    {(item.product.salePrice.toFixed(2) *
                                      item.productCount).toFixed(2)}{" "}
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
              <Card>
                <Card.Body>
                  <div className="table-responsive table-card">
                    <Table className="align-middle table-borderless table-nowrap text-center mb-0">
                      <thead>
                        <tr>
                          <th colSpan={5}>Əməkhaqqına hesablanmayan məhsullar</th>
                        </tr>
                        <tr>
                          <th scope="col">Məhsulun şəkli</th>
                          <th scope="col">Məhsulun adı</th>
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
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div style={{ width: '100%', height: '100%', objectFit: 'contain' }}>
                                        <div
                                          className={`avatar-title bg-${item.bg}-subtle rounded-3`}
                                        >
                                          <Image
                                            src={item.product.posterImage}
                                            alt=""
                                            style={{
                                              width: "80px",
                                              height: "80px",
                                              objectFit: "cover",
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="text-start">
                                    <div className="">
                                      <h6>{item.product.name}</h6>
                                      <p className="text-muted mb-0">
                                        SKU ID: {item.product.skuId}{" "}<h5>{stockBadge(item.product.stockCount)}</h5>
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    {" "}
                                    {item.product.salePrice.toFixed(2)} ₼
                                  </td>
                                  <td> {item.productCount} ədəd</td>
                                  <td className="">
                                    {(item.product.salePrice.toFixed(2) *
                                      item.productCount).toFixed(2)}{" "}
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
              <h5 className="flex-grow-1 fw-medium">Səbətinizdə olan məhsulların ümumi çəkisi: {totalWeight > 0 ? totalWeight.toFixed(3) : 0} kq</h5>
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
                      basket.find((i) => i.basketDiscountPrice != null) ? basket.find((i) => i.basketDiscountPrice != null).basketDiscountPrice : 0
                  }
                  charge="1"
                  total={total}
                  selectedBalance={selectedBalance}
                  setSelectedBalance={setSelectedBalance}
                  selectedDeliveryMethod={selectedDeliveryMethod}
                  setSelectedDeliveryMethod={setSelectedDeliveryMethod}
                />
                <div className="hstack gap-2 justify-content-between justify-content-end">
                  <Link
                    to="/sebet"
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

    </>
  );
};

export default Checkout;
