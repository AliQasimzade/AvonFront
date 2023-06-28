import React, { useState, useEffect } from "react";
import bannerimg from '../../assets/images/ecommerce/banner.jpg';

import {
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { withTranslation } from "react-i18next";
import withRouter from "../../Components/withRouter";
//img
import profileBg from "../../assets/images/profile-bg.jpg";
//component
import { CommonProduct, DefauilOffer } from "../../Components/ProductSilde";
import { CommonService } from "../../Components/CommonService";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
export const TopCategoies = ({ title }) => {
  return (
    <Row className="justify-content-center">
      <Col lg={12}>
        <div className="mb-5 text-center">
          <h2 className="mb-3">{title}</h2>
          <p className="text-muted fs-15 mb-0">digər kateqoriyalara bax</p>
        </div>
      </Col>
    </Row>
  );
};
import { useParams } from "react-router-dom";
import Filters from "../Catalog/Filters";
import CatalogCollection from "../Catalog/CatalogCollection";
const Categories = (props) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const { slug } = useParams();
  useEffect(() => {
    axios
      .get(`https://avonazerbaijan.com/kateqoriyalar?slug=${slug}`)
      .then((res) => {
        if (res.status === 200) {
          setCategory(res.data);
          setProducts(res.data.productSubCategories);
        } else {
          navigate('/');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        navigate('/');
      });
  }, [slug, navigate]);

  console.log(category);
  const [count, setCount] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getProducts = async () => {
    const res = await getAllProducts(currentPage);
    const findDefaults = res
      .map((product) => {
        if (product.isDefault == true) {
          return product;
        }
      })
      .filter(Boolean);
    const allPros = [...products, ...findDefaults];
    setProducts(allPros);
    setCount(Array.from({ length: allPros.length }).fill(0));
  };

  useEffect(() => {
    getProducts();
  }, [currentPage]);

  return (
    <>
      <Helmet>
        <title>{`${category.name}`} kateqoriyası | Avon Azərbaycan</title>
      </Helmet>
      <section className="section pb-0 mt-4">
        <Container fluid >
          <div className="position-relative rounded-3" style={{ backgroundImage: `url(${bannerimg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
            <Row className="justify-content-end">
              <Col xxl={4}>
                <div className="text-end py-4 px-5 mx-xxl-5">
                  <h1 className="text-white display-5 lh-base text-capitalize ff-secondary mb-3 fst-italic">{category.name} kateqoriyasının məhsulları</h1>
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
                  <h5>Bu kateqoriyaya uyğun nəticə tapılmadı</h5>
                </div>
              </Col>
            </Row>}
          </div>
        </Container>
      </section>
      <DefauilOffer />
      <CommonService />
    </>
  );
};

export default withRouter(withTranslation()(Categories));
