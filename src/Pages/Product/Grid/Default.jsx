import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import EmailClothe from "../../../Pages/Catalog/EmailClothe";
import { CommonService } from "../../../Components/CommonService";
import { getAllSliderTwos } from "../../../services/getRequests";
import Index from "../../../Components/Index";
const Defaultgrid = () => {
    const [sliderTwoData, setSliderTwoData] = useState([]);


    const getSliders = async () => {
        try {
            const data = await getAllSliderTwos();
            setSliderTwoData(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getSliders();
    }, [])

    return (
        <>
            <section className="section pb-0 mt-4">
                <Container fluid>
                    <Row className="g-2">
                        <Col lg={7}>
                            <Link to={sliderTwoData[0]?.link} className="product-banner-1 mt-4 mt-lg-0 rounded overflow-hidden d-block">
                                <Image src={sliderTwoData[0]?.image} className="w-100 object-fit-cover" rounded alt="" style={{ maxHeight: "480px" }} />
                            </Link>
                        </Col>
                        <Col lg={5}>
                            <Row className="g-2">
                                <Col lg={12}>
                                    <Link to={sliderTwoData[1]?.link} className="product-banner-1 mt-4 mt-lg-0 rounded overflow-hidden d-block">
                                        <Image src={sliderTwoData[1]?.image} className="w-100 object-fit-cover" alt="" style={{ maxHeight: "236px" }} rounded />
                                    </Link>
                                </Col>
                                <Col lg={12}>
                                    <Link to={sliderTwoData[2]?.link} className="product-banner-1 mt-4 mt-lg-0 rounded overflow-hidden d-block">
                                        <Image src={sliderTwoData[2]?.image} className="w-100 object-fit-cover" alt="" style={{ maxHeight: "236px" }} rounded />
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="position-relative section">
                <Container>
                    <div className="ecommerce-product gap-4">
                        <Index name="sidebar small-sidebar flex-shrink-0" cxxl="4" clg="4" cmd="6" cheight="200px" />
                    </div>
                </Container>
            </section>
            <EmailClothe />
            <CommonService />
        </ >
    )
}

export default Defaultgrid;