import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from 'react-bootstrap';
import { ProductSide } from "../../Components/ProductSilde";
import { getAllProducts } from "../../services/getRequests";
import { withTranslation } from "react-i18next";
import withRouter from "../../Components/withRouter";
import { useEffect } from "react";
const TopProducts = (props) => {

    const [select, setSelect] = useState([]);

    const fetchedProducts = async () => {
        const data = await getAllProducts(1);
        setSelect(data);
    }
    useEffect(() => {
        fetchedProducts();
    }, [])
    return (
        <>
            <section className="section pt-0">
                <Container >
                    <Row className="mt-5">

                        {/* statistika olmadigina gore gelmeyib hele */}
                        {/* <Col lg={12}>
                            <div className="text-center">
                                <ul className="list-inline categories-filter animation-nav" id="filter">
                                    <li className="list-inline-item" onClick={() => setCategories("All")}><Link to="#" className="categories active" data-key="t-all-arrival">{props.t('all-arrival')}</Link></li>
                                    <li className="list-inline-item" onClick={() => setCategories("seller hot")}><Link to="#" className="categories" data-key="t-best-seller">{props.t('best-seller')}</Link></li>
                                    <li className="list-inline-item" onClick={() => setCategories("hot arrival")}><Link to="#" className="categories" data-key="t-hot-collection">{props.t('hot-collection')}</Link></li>
                                    <li className="list-inline-item" onClick={() => setCategories("trendy")}><Link to="#" className="categories" data-key="t-trendy">{props.t('trendy')}</Link></li>
                                    <li className="list-inline-item" onClick={() => setCategories("arrival")}><Link to="#" className="categories" data-key="t-new-arrival">{props.t('new-arrival')}</Link></li>
                                </ul>
                            </div>
                        </Col> */}
                        <ProductSide
                            isnone
                            fileter={select}
                            cid='gallery-wrapper mt-4 pt-2'
                            cxxl="3"
                            show="show"
                        />
                        <div className="mt-4 text-center">
                            <Link to="/mehsullar" className="btn btn-soft-primary btn-hover" data-key="t-view-all-products">{props.t('view-all-products')} <i className="mdi mdi-arrow-right align-middle ms-1"></i></Link>
                        </div>
                    </Row>
                </Container>
            </section >
        </ >
    )
}

export default withRouter(withTranslation()(TopProducts));