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
const LastestCollection = (props) => {
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
                                                <div className={`bg-${item.bg}-subtle rounded-top py-4`}>
                                                    <div className="gallery-product">
                                                        <Image src={item.img} alt="" style={{ maxHeight: "215px", maxWidth: "100%" }} className="mx-auto d-block" />
                                                    </div>
                                                </div>
                                                <Card.Body >
                                                    <div>
                                                        <Link to="product-details">
                                                            <h6 className="fs-15 lh-base text-truncate mb-0" data-key={`t-${item.title}`}>{props.t(`${item.title}`)}</h6>
                                                        </Link>
                                                        <div className="mt-3">
                                                            <span className="float-end" data-key={`t-${item.ratting}`}>{props.t(`${item.ratting}`)}<i className="ri-star-half-fill text-warning align-bottom"></i></span>
                                                            <h5 className="mb-0" data-key={`t-${item.price}`}>{props.t(`${item.price}`)} <span className="text-muted fs-12"><del data-key={`t-${item.deletePrice}`}>{props.t(`${item.deletePrice}`)}</del></span></h5>
                                                        </div>
                                                        <div className="mt-3">
                                                            <Link to='/shop/shopingcard' className="btn btn-primary btn-sm" data-key="t-add-to-card">
                                                                <i className="mdi mdi-cart me-1"></i> 
                                                                {props.t('add-to-card')}
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

export default  withRouter(withTranslation()(LastestCollection));