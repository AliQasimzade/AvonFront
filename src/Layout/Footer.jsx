import React, { useState, useEffect, memo } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import withRouter from "../Components/withRouter";

//img
import logolight from "../assets/images/Logo.svg";
import logodark from "../assets/images/Logo.svg";
import { getAllCategories, getAllSettings } from "../services/getRequests";

const Footer = (props) => {

    const [category, setCategory] = useState([]);

    useEffect(() => {
        getCategory();
        getSocials();
    }, [])

    const getCategory = async () => {
        try {
            const response = await getAllCategories();
            setCategory(response);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const [setting, setSetting] = useState([])
    const getSocials = async () => {
        try {
            const res = await getAllSettings()
            setSetting(res)
        } catch (error) {
            console.error(error);
        }
    }

    console.log(setting);


    return (
        <>
            <section className="section footer-landing pb-0">
                <Container >
                    <Row>
                        <Col lg={4}>
                            <div className="footer-info">
                                <Image src={logolight} alt="" height="88" className="logo-light" />
                                <Image src={logodark} alt="" height="88" className="logo-dark" />
                                <p className="footer-desc mt-4 mb-2 me-3">Avon Azərbaycan</p>

                                <div className="footer-social mt-4">
                                    <ul className="list-inline mb-0">
                                        <li className="list-inline-item">
                                            <Link to="#" className="text-reset"><i className="mdi mdi-facebook"></i></Link>
                                        </li>
                                        <li className="list-inline-item">
                                            <Link to="#" className="text-reset"><i className="mdi mdi-twitter"></i></Link>
                                        </li>
                                        <li className="list-inline-item">
                                            <Link to="#" className="text-reset"><i className="mdi mdi-google"></i></Link>
                                        </li>
                                        <li className="list-inline-item">
                                            <Link to="#" className="text-reset"><i className="mdi mdi-pinterest"></i></Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>

                        <Col lg={8}>
                            <Row className="pl-0 pl-lg-3">
                                <Col md={3}>
                                    <div className="mt-lg-0 mt-4">
                                        <h5 className="footer-title" data-key="t-categories">{props.t('categories')}</h5>
                                        <ul className="list-unstyled footer-link mt-3">
                                            {
                                                category.slice(0, 5).map((cat, ind) => (
                                                    <li key={ind}>
                                                        <Link to={`category/${cat.name}`}>{cat.name}</Link>
                                                    </li>
                                                ))
                                            }
                                            {category.length > 5 && (
                                                <li>
                                                    <Link to="/categories" data-key="t-see-all-categories">{props.t('see-all-categories')}</Link>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="mt-lg-0 mt-4">
                                        <h5 className="footer-title" data-key="t-information">{props.t('information')}</h5>
                                        <ul className="list-unstyled footer-link mt-3">
                                            <li><Link to="#" data-key="t-custom-service">{props.t('custom-service')}</Link></li>
                                            <li><Link to="#" data-key="t-faqs">{props.t('faqs')}</Link></li>
                                            <li><Link to="#" data-key="t-ordering">{props.t('ordering')}</Link></li>
                                            <li><Link to="#" data-key="t-tracking">{props.t('tracking')}</Link></li>
                                            <li><Link to="#" data-key="t-contact">{props.t('contact')}</Link></li>
                                        </ul>
                                    </div>
                                </Col>

                                <Col md={3}>
                                    <div className="mt-lg-0 mt-4">
                                        <h5 className="footer-title" data-key="t-account">{props.t('account')}</h5>
                                        <ul className="list-unstyled footer-link mt-3">
                                            <li><Link to="#" data-key="t-sign-in">{props.t('sign-in')}</Link></li>
                                            <li><Link to="#" data-key="t-view-cart">{props.t('view-cart')}</Link></li>
                                            <li><Link to="#" data-key="t-wishlist">{props.t('wishlist')}</Link></li>
                                            <li><Link to="#" data-key="t-track-order">{props.t('track-order')}</Link></li>
                                            <li><Link to="#" data-key="t-help">{props.t('help')}</Link></li>
                                        </ul>
                                    </div>
                                </Col>

                                <Col md={3}>
                                    <div className="mt-lg-0 mt-4">
                                        <h5 className="footer-title" data-key="t-customer-service">{props.t('customer-service')}</h5>
                                        <ul className="list-unstyled footer-link mt-3">
                                            <li><Link to="#" data-key="t-payment-methods">{props.t('payment-methods')}</Link></li>
                                            <li><Link to="#" data-key="t-money-back">{props.t('money-back')}</Link></li>
                                            <li><Link to="#" data-key="t-return">{props.t('return')}</Link></li>
                                            <li><Link to="#" data-key="t-shipping">{props.t('shipping')}</Link></li>
                                            <li><Link to="#" data-key="t-terms-and-conditions">{props.t('terms-and-conditions')}</Link></li>
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row className="footer-border-alt mt-4 align-items-center fs-15">
                        <Col sm={12}>
                            © AVON.NET.AZ  {new Date().getFullYear()}.  Müəllif hüquqları qorunur. Hazırladı  <a href="https://rgagency.org/" className="text-reset text-decoration-none">RG Agency</a>
                        </Col>
                    </Row>
                </Container>
            </section>
        </ >
    )
}

export default memo(withRouter(withTranslation()(Footer)));