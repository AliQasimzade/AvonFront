import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react"
import { Col, Container, Row, Image } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { withTranslation } from "react-i18next";
import withRouter from "../../../Components/withRouter";
import { CommonTitle } from "../../../Components/Homepage";
import { useSelector } from "react-redux";
const CollectionSlider = (props) => {

    const reviews = useSelector((state) => state.Comments)
    console.log(reviews);

    const [comments, setComments] = useState([]);
    const [brands, setBrands] = useState([])


    useEffect(() => {
        fetchComments();
        fetchBrands();
    }, []);


    const fetchComments = async () => {
        try {
            const response = await fetch("https://avonazerbaijan.com/api/Comments/Manage/GetAll?isDeleted=false&isAccepted=false");
            if (response.ok) {
                const data = await response.json();
                setComments(data);
            } else {
                console.error("Error:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const fetchBrands = async () => {
        try {
            const response = await fetch("https://avonazerbaijan.com/api/Brands/GetAll");
            if (response.ok) {
                const data = await response.json();
                setBrands(data);
            } else {
                console.error("Error:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <section className="section">
                <Container>
                    <CommonTitle
                        title={props.t('customers-say')}
                        dicription={props.t('customers-say-desc')} />
                    <Row>
                        <Col lg={12}>
                            <Swiper className="testi-slider swiper-pointer-events swiper-backface-hidden"
                                wrapperClass="my-5"
                                spaceBetween={20}
                                slidesPerView={3}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[Pagination]}
                                breakpoints={{
                                    640: {
                                        slidesPerView: 3,
                                        spaceBetween: 20,
                                    },
                                    768: {
                                        slidesPerView: 3,
                                        spaceBetween: 20,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                        spaceBetween: 20,
                                    },
                                }}
                            >
                                {comments.map((comment, index) => (
                                    <SwiperSlide key={index} className={`mt-${comment.top}`}>
                                        <div className="client-box m-1">
                                            <div className="client-desc p-4 border rounded">
                                                <p className="mb-0 fs-16">{comment.message}</p>
                                            </div>
                                            <div className="pt-4">
                                                <div className="d-flex align-items-center mt-4 pt-1">
                                                    <Image src={comment.star} alt="" className="avatar-sm" rounded />
                                                    <div className="flex-grow-1 ms-3">
                                                        <p className="text-muted mb-0">{comment.name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </Col>
                    </Row>
                    <Row className="row-cols-lg-5 row-cols-md-3 row-cols-1 text-center justify-content-center align-items-center g-3 mt-5 pt-lg-5">
                        {
                            brands.map((brand, index) => {
                                return (
                                    <Col key={index}>
                                        <div className="client-images">
                                            <Link to={`brands/${brand.name}`} title={brand.name}>{brand.name}</Link>
                                        </div>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default withRouter(withTranslation()(CollectionSlider));