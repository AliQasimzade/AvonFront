import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react"
import { Col, Container, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { withTranslation } from "react-i18next";
import withRouter from "../../../Components/withRouter";
const CollectionSlider = (props) => {
    const [brands, setBrands] = useState([])
    useEffect(() => {
        fetchBrands();
    }, []);



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