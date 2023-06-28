import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Adevertise from "./adevertise";
import Index from "../../Components/Index";
import { useParams } from "react-router-dom";
import bannerimg from '../../assets/images/ecommerce/banner.jpg';
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import CatalogCollection from "./CatalogCollection";
import Filters from "./Filters";
import { Helmet } from "react-helmet-async";

const Clothing = () => {
    const { slug } = useParams();
    const [brands, setBrands] = useState([])
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get(`https://avonazerbaijan.com/Brendler?slug=${slug}`)
            .then((res) => {
                setBrands(res.data)
                setProducts(res.data.products)
            })
    }, [slug]);
    return (
        <>
            <Helmet>
                <title>{`${brands.name}`} markası | Avon Azərbaycan</title>
            </Helmet>
            <section className="section pb-0 mt-4">
                <Container fluid >
                    <div className="position-relative rounded-3" style={{ backgroundImage: `url(${bannerimg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                        <Row className="justify-content-end">
                            <Col xxl={4}>
                                <div className="text-end py-4 px-5 mx-xxl-5">
                                    <h1 className="text-white display-5 lh-base text-capitalize ff-secondary mb-3 fst-italic">{brands.name} markasının məhsulları</h1>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>
            <section className="position-relative section">
                <Container fluid>
                    <div className="ecommerce-product gap-4">
                        {/* <Index name="sidebar flex-shrink-0" cxxl="3" clg="4" cmd="6" /> */}
                        <Filters name={name} products={products} setProducts={setProducts} />
                        {products.length > 0 ? (
                            <CatalogCollection
                                cxxl={3}
                                clg={4}
                                cmd={6}
                                cxl={cxl}
                                count={count}
                                setCount={setCount}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                products={products}
                                setProducts={setProducts}
                            />
                        ) : <Row id="search-result-elem" className="d-flex justify-content-center flex-grow-1">
                            <Col lg={12}>
                                <div className="text-center py-5">
                                    <div className="avatar-lg mx-auto mb-4">
                                        <div className="avatar-title bg-primary-subtle text-primary rounded-circle fs-24">
                                            <i className="bi bi-search"></i>
                                        </div>
                                    </div>
                                    <h5>Bu markaya uyğun nəticə tapılmadı</h5>
                                </div>
                            </Col>
                        </Row>}
                    </div>
                </Container>
            </section>
        </>
    )
}

export default Clothing;