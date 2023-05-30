import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { withTranslation } from "react-i18next";
import withRouter from "../../Components/withRouter";
//img
import profileBg from "../../assets/images/profile-bg.jpg";
//component
import { CommonProduct, DefauilOffer } from "../../Components/ProductSilde";
import { sliderCategories } from "../../Common/data";
import { CommonService } from "../../Components/CommonService";

export const TopCategoies = ({ title }) => {
    return (
        <Row className="justify-content-center">
            <Col lg={12}>
                <div className="mb-5 text-center">
                    <h2 className="mb-3">{title}</h2>
                    <p className="text-muted fs-15 mb-0">Browser the collection of top categories.</p>
                </div>
            </Col>
        </Row>
    )
}

const Categories = (props) => {
    const [category, setCategory] = useState([])
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetchCategory();
        fetchProducts();
    }, [])


    const fetchCategory = async () => {
        try {
            const response = await fetch("http://avontest0910-001-site1.atempurl.com/api/SubCatigories/Manage/GetAll?isDeleted=false");
            if (response.ok) {
                const data = await response.json();
                setCategory(data);
            } else {
                console.error("Error:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const fetchProducts = async () => {
        try {
            const res = await fetch('http://avontest0910-001-site1.atempurl.com/api/Products/Manage/GetAll?isDeleted=false');
            if (res.ok) {
                const data = await res.json();
                setProducts(data);
            } else {
                console.error("Error:", res.statusText)
            }
        } catch (error) {
            console.error("Error", error)
        }
    }


    return (
        <>
            <section className="section ecommerce-about" style={{ backgroundImage: `url(${profileBg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                <div className="bg-overlay bg-primary" style={{ opacity: "0.85" }}></div>
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={6}>
                            <div className="text-center">
                                <h1 className="text-white lh-base text-capitalize" data-key="t-category">{props.t('category')}</h1>
                                <p className="text-white-75 fs-15 mb-0" data-key="t-category-desc">{props.t('category-desc')}</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="mt-5">
                <Container>
                    <TopCategoies title={props.t('category')} />
                    <Row>

                        {
                            category?.map((cat, ind) => {
                                return (
                                    <Col lg={2} md={3} sm={6} key={ind}>
                                        <div className="text-center">
                                            <Image src={cat.image} alt=""
                                                className={` bg-${cat.colorCode}-subtle border border-2 border-${cat.colorCode} border-opacity-10 p-4`} fluid roundedCircle />
                                            <div className="mt-4">
                                                <Link to="#">
                                                    <h5 className="mb-2 fs-15">{cat.name}</h5>
                                                </Link>
                                                <p className="text-muted fs-12">{cat.productSubCategories} Products</p>
                                            </div>
                                        </div>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Container>
            </section>
            <section className="section pt-0">
                <Container>
                    <TopCategoies title="Default" />
                </Container>
                <CommonProduct cxxl="4" cmd="6" />
            </section>
            <section className="section pb-0">
                <Container>
                    <TopCategoies title="Slider Products" />
                    <Row>
                        <Col lg={12}>
                            <Swiper modules={[Navigation, Autoplay]}
                                slidesPerView={4}
                                spaceBetween={15}
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
                                className="swiper mySwiper swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden ">
                                <div className="swiper-button-next"></div>
                                <div className="swiper-button-prev"></div>
                                <div className="swiper-wrapper py-4">

{/* mehsullar bura gelir */}
                                    {/* {
                                        products.map((prd, ind) => {
                                            return (
                                                <SwiperSlide key={ind}>
                                                    <Card className="card-animate overflow-hidden">
                                                        <div className={`bg-${item.bg}-subtle rounded-top py-4`}>
                                                            <div className="gallery-product">
                                                                <Image src={item.img} alt="" style={{ maxHeight: "215px", maxWidth: "100%" }} className="mx-auto d-block" />
                                                            </div>
                                                        </div>
                                                        <Card.Body className="text-center">
                                                            <Link to='/product-list' className="stretched-link">
                                                                <h6 className="fs-16 lh-base text-truncate">{item.title}</h6>
                                                            </Link>
                                                        </Card.Body>
                                                    </Card>
                                                </SwiperSlide>
                                            )
                                        })
                                    } */}

                                    {(sliderCategories || []).map((item, key) => (
                                        <SwiperSlide key={key}>
                                            <Card className="card-animate overflow-hidden">
                                                <div className={`bg-${item.bg}-subtle rounded-top py-4`}>
                                                    <div className="gallery-product">
                                                        <Image src={item.img} alt="" style={{ maxHeight: "215px", maxWidth: "100%" }} className="mx-auto d-block" />
                                                    </div>
                                                </div>
                                                <Card.Body className="text-center">
                                                    <Link to='/product-list' className="stretched-link">
                                                        <h6 className="fs-16 lh-base text-truncate">{item.title}</h6>
                                                    </Link>
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
            {/* <section className="section">
                <Container>
                    <TopCategoies title="Masonry" />
                    <Row className="g-2">
                        <Col lg={7}>
                            <Card className="card-height-100">
                                <Link to='/product-list/defualt' className="insta-img categrory-box rounded-3">
                                    <div className="categrory-content text-center">
                                        <span className="categrory-text text-white fs-18">Electronics</span>
                                    </div>
                                    <Image src={instagram1} className="img-fluid" alt="" />
                                </Link>
                            </Card>
                        </Col>
                        <Col lg={5}>
                            <Row className="g-2">
                                <Col lg={12}>
                                    <Card className="mb-0">
                                        <Link to='/product-list/defualt' className="insta-img categrory-box rounded-3">
                                            <div className="categrory-content text-center">
                                                <span className="categrory-text text-white fs-18">Cosmatics</span>
                                            </div>
                                            <Image src={instagram2} className="w-100 object-fit-cover" alt="" style={{ maxHeight: "318px" }} />
                                        </Link>
                                    </Card>
                                </Col>
                                <Col lg={12}>
                                    <Card className="mb-0">
                                        <Link to='/product-list/defualt' className="insta-img categrory-box rounded-3">
                                            <div className="categrory-content text-center">
                                                <span className="categrory-text text-white fs-18">Handbags &amp; Clutches</span>
                                            </div>
                                            <Image src={instagram5} className="w-100 object-fit-cover" alt="" style={{ maxHeight: "318px" }} />
                                        </Link>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section> */}
            <DefauilOffer />
            <CommonService />
        </>
    )
}

export default withRouter(withTranslation()(Categories));