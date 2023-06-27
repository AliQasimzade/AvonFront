import React from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import { latestProduct } from "../../../Common/data";
import { CommonTitle } from "../../../Components/Homepage";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { withTranslation } from "react-i18next";
import withRouter from "../../../Components/withRouter";
import { useState } from "react";
import { getAllProducts } from "../../../services/getRequests";
import { useEffect } from "react";
const LastestCollection = (props) => {

    const [latestProduct, setLatestProduct] = useState([]);

    const fetchProducts = async () => {
        const data = await getAllProducts(1);
        setLatestProduct(data);
    }
    useEffect(() => {
        fetchProducts();
    }, [])
    return (
        <>

            <section className="section pb-0">
                <Container>
                    <CommonTitle
                        title={props.t('latest-arrival')}
                        dicription={props.t('latest-arrival-desc')} />
                    <Row>
                        <Col lg={12}>
                            <Swiper modules={[Navigation, Autoplay]}
                                slidesPerView={4}
                                spaceBetween={30}
                                navigation={{
                                    nextEl: ".swiper-button-next",
                                    prevEl: ".swiper-button-prev",
                                }}
                                breakpoints={{
                                    640: {
                                        slidesPerView: 4,
                                        spaceBetween: 30,
                                    },
                                    768: {
                                        slidesPerView: 4,
                                        spaceBetween: 30,
                                    },
                                    1024: {
                                        slidesPerView: 4,
                                        spaceBetween: 30,
                                    },
                                }}
                                loop={true}
                                autoplay={{ delay: 2500, disableOnInteraction: false }}
                                className="latest-slider pt-5 swiper-pointer-events">
                                <div className="swiper-button-next h-auto" aria-controls="swiper-wrapper-2aa67f756d27c1eb" tabIndex={0} role="button" aria-label="Next slide"></div>
                                <div className="swiper-button-prev h-auto" aria-controls="swiper-wrapper-2aa67f756d27c1eb" tabIndex={0} role="button" aria-label="Previous slide"></div>
                                <div className="swiper-wrapper">
                                    {(latestProduct || []).map((item, key) => (
                                        <SwiperSlide className="swiper-slide" key={key}>
                                            <Card className="overflow-hidden">
                                                <div className="rounded-top py-4">
                                                    <div className="gallery-product" style={{ height: '200px', display:'flex', alignItems:'center' }}>
                                                        <Image src={item.posterImage} alt="" style={{ maxHeight: "215px", maxWidth: "100%" }} className="mx-auto d-block" />
                                                    </div>
                                                </div>
                                                <Card.Body >
                                                    <div>
                                                        <Link to={`mehsul-detallari/${item.skuId}`}>
                                                            <h6 className="fs-15 lh-base text-truncate mb-0" data-key={`t-${item.name}`}>{props.t(`${item.name}`)}</h6>
                                                        </Link>
                                                        <div className="mt-3">
                                                            <span className="float-end">5 <i className="ri-star-half-fill text-warning align-bottom"></i></span>
                                                            {
                                                                item.discountPrice > 0 ? (
                                                                    <h5 className="mb-0">{item.discountPrice > 0 ? (item.salePrice - (item.salePrice * item.discountPrice) / 100) : item.salePrice} ₼<span className="text-muted fs-12"><del>{item.salePrice} ₼</del></span></h5>
                                                                ) : (
                                                                    <h5 className="mb-0">{item.salePrice} ₼</h5>
                                                                )
                                                            }
                                                        </div>
                                                        <div className="mt-3">
                                                            <Link to={`/mehsul-detallari/${item.skuId}`} className="btn btn-primary btn-sm">
                                                                <i className="mdi mdi-cart me-1"></i>
                                                                Ətrafı bax
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </SwiperSlide>
                                    ))}
                                </div>
                            </Swiper>
                        </Col>
                    </Row>
                </Container>
            </section>
        </ >
    )
}

export default withRouter(withTranslation()(LastestCollection));