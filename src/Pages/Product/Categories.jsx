import React, { useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Card,
  Button,
  Form,
  Breadcrumb,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination, Navigation } from "swiper";
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
import axios from "axios";

export const TopCategoies = ({ title }) => {
  return (
    <Row className="justify-content-center">
      <Col lg={12}>
        <div className="mb-5 text-center">
          <h2 className="mb-3">{title}</h2>
          <p className="text-muted fs-15 mb-0">View All Categories</p>
        </div>
      </Col>
    </Row>
  );
};
import { useParams } from "react-router-dom";
const Categories = (props) => {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const { slug } = useParams();
  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}SubCatigories/Manage/GetAll?isDeleted=false`
      );
      if (response.status == 200) {
        const data = response.data;
        setCategory(data);
        const filterSub = data.find((sub) => sub.name == slug);
        if (filterSub) {
          setProducts([...filterSub.productSubCategories]);
        } else {
          setProducts([]);
        }
      } else {
        console.error("Error:");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <section
        className="section ecommerce-about"
        style={{
          backgroundImage: `url(${profileBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="bg-overlay bg-primary"
          style={{ opacity: "0.85" }}
        ></div>
        <Container>
          <Row className="justify-content-center">
            <Col lg={6}>
              <div className="text-center">
                <h1
                  className="text-white lh-base text-capitalize"
                  data-key="t-category"
                >
                  {slug}
                </h1>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="mt-5">
        <Container>
          <TopCategoies title={props.t("AllCategories")} />
          <Row>
            {category.length > 0 &&
              category.map((cat, ind) => {
                return (
                  <Col lg={2} md={3} sm={6} key={ind}>
                    <div className="text-center">
                      <div className="mt-4">
                        <Link to={`/catalog/${cat.name}`}>
                          <h5 className="mb-2 fs-15">{cat.name}</h5>
                        </Link>
                        <p className="text-muted fs-12"></p>
                      </div>
                    </div>
                  </Col>
                );
              })}
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
            {products.length > 0 &&
              products.map((prd, ind) => (
                <Col key={ind} lg={4} className="element-item seller">
                  <Card className="overflow-hidden">
                    <div className={`bg-subtle rounded-top py-4`}>
                      <div
                        className="gallery-product"
                        style={{
                          height: "200px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          src={prd.product.posterImage}
                          alt=""
                          style={{ maxHeight: 215, maxWidth: "100%" }}
                          className="mx-auto d-block"
                        />
                      </div>
                      <div className="product-btn px-3">
                        <Link
                          to={`/product-details/${prd.product.skuId}`}
                          className="btn btn-primary btn-sm w-75 add-btn"
                        >
                          <i className="mdi mdi-cart me-1"></i> Ətraflı bax
                        </Link>
                      </div>
                    </div>
                    <Card.Body className="card-body">
                      <div>
                        <Link to={`/product-details/${prd.product.skuId}`}>
                          <h6 className="fs-15 lh-base text-truncate mb-0">
                            {prd.product.name}
                          </h6>
                        </Link>
                        <div className="mt-3">
                          {prd.product.discountPrice > 0 ? (
                            <h5 className="mb-0">
                              {prd.product.discountPrice > 0
                                ? prd.product.salePrice -
                                  (prd.product.salePrice *
                                    prd.product.discountPrice) /
                                    100
                                : prd.product.salePrice}{" "}
                              ₼
                              <span className="text-muted fs-12">
                                <del>{prd.product.salePrice} ₼</del>
                              </span>
                            </h5>
                          ) : (
                            <h5 className="mb-0">{prd.product.salePrice} ₼</h5>
                          )}
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>

          {(sliderCategories || []).map((item, key) => (
            <SwiperSlide key={key}>
              <Card className="card-animate overflow-hidden">
                <div className={`bg-${item.bg}-subtle rounded-top py-4`}>
                  <div className="gallery-product">
                    <Image
                      src={item.img}
                      alt=""
                      style={{ maxHeight: "215px", maxWidth: "100%" }}
                      className="mx-auto d-block"
                    />
                  </div>
                </div>
                <Card.Body className="text-center">
                  <Link to="/product-list" className="stretched-link">
                    <h6 className="fs-16 lh-base text-truncate">
                      {item.title}
                    </h6>
                  </Link>
                </Card.Body>
              </Card>
            </SwiperSlide>
          ))}
        </Container>
      </section>
      <section className="section">
        <Container>
          <TopCategoies title="Masonry" />
          <Row className="g-2">
            <Col lg={7}>
              <Card className="card-height-100">
                <Link
                  to="/products"
                  className="insta-img categrory-box rounded-3"
                >
                  <div className="categrory-content text-center">
                    <span className="categrory-text text-white fs-18">
                      Electronics
                    </span>
                  </div>
                
                </Link>
              </Card>
            </Col>
            <Col lg={5}>
              <Row className="g-2">
                <Col lg={12}>
                  <Card className="mb-0">
                    <Link
                      to="/products"
                      className="insta-img categrory-box rounded-3"
                    >
                      <div className="categrory-content text-center">
                        <span className="categrory-text text-white fs-18">
                          Cosmatics
                        </span>
                      </div>
                      {/* <Image src={instagram2} className="w-100 object-fit-cover" alt="" style={{ maxHeight: "318px" }} /> */}
                    </Link>
                  </Card>
                </Col>
                <Col lg={12}>
                  <Card className="mb-0">
                    <Link
                      to="/products"
                      className="insta-img categrory-box rounded-3"
                    >
                      <div className="categrory-content text-center">
                        <span className="categrory-text text-white fs-18">
                          Handbags &amp; Clutches
                        </span>
                      </div>
                      {/* <Image src={instagram5} className="w-100 object-fit-cover" alt="" style={{ maxHeight: "318px" }} /> */}
                    </Link>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      <DefauilOffer />
      <CommonService />
    </>
  );
};

export default withRouter(withTranslation()(Categories));
