import React from "react"
import { Col, Container, Row, Alert, Card, Button, Table, Image } from "react-bootstrap";
import { Shoporder, Shoptopbar } from "../../Components/ShopTopBar";
import { Link } from "react-router-dom";
import { shopProducDetails } from "../../Common/data";
import { ShopingAddress } from "./ShoppingAddress";
import EmailClothe from "../../Pages/Catalog/EmailClothe";
import { CommonService } from "../../Components/CommonService";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
const Checkout = () => {
    const [allBasket, setAllBasket] = useState([]);
    const [charge, setCharge] = useState(0);
    const [dis, setDis] = useState(0);
    const [id, setId] = useState("");
    const dispatch = useDispatch();
    const basket = useSelector((state) => state.persistedReducer.Basket.basket);
    const user = useSelector((state) => state.persistedReducer.User.userId);

    useEffect(() => {
        setAllBasket(basket);
    }, []);

    document.title = "Checkout | RGAgency - React FrontEnd";
    return (
        <>
            <Shoptopbar title="Checkout" page="Checkout" />
            <section className="section">
                <Container>
                    {
                        !user ? (
                            <Row >
                                <Col lg={12}>
                                    <Alert className="alert-danger alert-modern alert-dismissible fade show" role="alert">
                                        <i className="bi bi-box-arrow-in-right icons"></i>Hesabınız var?<Alert.Link href="giris" className="link-danger"><strong> Hesabınıza buradan daxil olun</strong>.</Alert.Link>
                                        <Button className="btn-close" data-bs-dismiss="alert" aria-label="Close"></Button>
                                    </Alert>
                                </Col>
                            </Row>
                        ) : ""
                    }
                    <Row>
                        <Col lg={8}>
                            <Card>
                                <Card.Body>
                                    <div className="table-responsive table-card">
                                        <Table className="align-middle table-borderless table-nowrap text-center mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Məhsul</th>
                                                    <th scope="col">Qiyməti</th>
                                                    <th scope="col">Sayı</th>
                                                    <th scope="col">Yekun qiyməti</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    allBasket.length > 0 && allBasket.map((item, inx) => {
                                                        return (
                                                            <tr key={inx}>
                                                                <td className="text-start">
                                                                    <div className="d-flex align-items-center gap-2">
                                                                        <div className="avatar-sm flex-shrink-0">
                                                                            <div className={`avatar-title bg-${item.bg}-subtle rounded-3`}>
                                                                                <Image src={item.product.posterImage} alt="" style={{ width: '80px', height: '113px', objectFit: 'cover' }} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex-grow-1">
                                                                            <h6>{item.product.name}</h6>
                                                                            <p className="text-muted mb-0">SKU ID: {item.product.skuId} </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td> {item.product.salePrice.toFixed(2)} ₼</td>
                                                                <td> {item.productCount}</td>
                                                                <td className="">{(item.product.salePrice.toFixed(2)) * item.productCount} ₼</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                </Card.Body>
                            </Card>
                            <ShopingAddress title="Çatıdırlma ünvanı seçin və ya əlavə edin" HomeAdd="Ev ünvanı" officeAdd="İkinci ünvan" />
                        </Col>
                        <Col lg={4}>
                            <div className="sticky-side-div">
                                <Shoporder subtotal={subtotal} dic={basket.find(i => i.basketDiscountPrice !== null).basketDiscountPrice} total={total} />
                                <div className="hstack gap-2 justify-content-between justify-content-end">
                                    <Link to='/shop/shopingcard' className="btn btn-hover btn-soft-info w-100"><i className="ri-arrow-left-line label-icon align-middle ms-1"></i> Səbətə geri dön </Link>
                                    <Link to='/shop/payment' className="btn btn-hover btn-primary w-100">Sifariş et</Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <EmailClothe />
            <CommonService />
        </>
    )
}

export default Checkout;