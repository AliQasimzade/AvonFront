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
import {
  ScrollMenu,
  VisibilityContext,
  Arrow,
} from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";

export const TopCategoies = ({ title }) => {
  return (
    <Row className="justify-content-center">
      <Col lg={12}>
        <div className="mb-5 text-center">
          <h2 className="mb-3">{title}</h2>
          <p className="text-muted fs-15 mb-0">Bütün məhsullara bax</p>
        </div>
      </Col>
    </Row>
  );
};

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    <button
      className="btn btn-primary"
      disabled={isFirstItemVisible}
      onClick={() => scrollPrev()}
      style={{ cursor: "pointer" }}
    >
      <i className="bi bi-arrow-left"></i>
    </button>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <button
      className="btn btn-primary"
      disabled={isLastItemVisible}
      onClick={() => scrollNext()}
      style={{ cursor: "pointer" }}
    >
      <i className="bi bi-arrow-right"></i>
    </button>
  );
}

function CardMenu({ onClick, title }) {
  const visibility = React.useContext(VisibilityContext);

  return (
    <div
      className="text-center"
      id="hover_card"
      onClick={() => onClick(visibility)}
      style={{
        width: "160px",
        scrollBar: "none",
      }}
      tabIndex={0}
    >
      <div>
        <Link to={`/brendler/${title.slug}`}>
          <h5 className="mb-2 fs-15">{title.name}</h5>
        </Link>
      </div>
    </div>
  );
}
import { useParams } from "react-router-dom";
const Clothing = (props) => {
  const [brands, setBrands] = useState([]);
  const [selected, setSelected] = useState([]);
  const [position, setPosition] = useState(0);
  const [products, setProducts] = useState([]);
  const [brandName, setBrandName] = useState("");
  const { slug } = useParams();
  useEffect(() => {
    fetchBrands();
  }, [slug]);

  const fetchBrands = async () => {
    try {
      const response1 = axios.get(
        `${process.env.REACT_APP_BASE_URL}Brands/GetAll
        `
      );
      const response2 = axios.get(
        `https://avonazerbaijan.com/Brendler?slug=${slug}`
      );

      const responses = await Promise.all([response1, response2]);

      setBrands(responses[0].data);
      setBrandName(responses[1].data.name);
      setProducts(responses[1].data.products);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const isItemSelected = (id) => !!selected.find((el) => el === id);

  const handleClick =
    (id) =>
    ({ getItemById, scrollToItem }) => {
      const itemSelected = isItemSelected(id);

      setSelected((currentSelected) =>
        itemSelected
          ? currentSelected.filter((el) => el !== id)
          : currentSelected.concat(id)
      );
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
                  {brandName != "" && brandName}
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
            <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
              {brands.length > 0 &&
                brands.map((brand, ind) => {
                  return (
                    <CardMenu
                      lg={2}
                      md={3}
                      sm={6}
                      key={ind}
                      onClick={handleClick(ind)}
                      title={brand}
                    />
                  );
                })}
            </ScrollMenu>
          </Row>
        </Container>
      </section>
      <section className="section pt-0 mt-4">
        <CommonProduct cxxl="4" cmd="6" />
      </section>
      <section className="section pb-0">
        <Container>
          <TopCategoies title={brandName} />
          <Row>
            {products.length > 0 ? (
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
                          src={prd.posterImage}
                          alt=""
                          style={{ maxHeight: 215, maxWidth: "100%" }}
                          className="mx-auto d-block"
                        />
                      </div>
                      <div className="product-btn px-3">
                        <Link
                          to={`/mehsul-detallari/${prd.slug}`}
                          className="btn btn-primary btn-sm w-75 add-btn"
                        >
                          <i className="mdi mdi-cart me-1"></i> Ətraflı bax
                        </Link>
                      </div>
                    </div>
                    <Card.Body className="card-body">
                      <div>
                        <Link to={`/mehsul-detallari/${prd.slug}`}>
                          <h6 className="fs-15 lh-base text-truncate mb-0">
                            {prd.name}
                          </h6>
                        </Link>
                        <div className="mt-3">
                          {prd.discountPrice > 0 ? (
                            <h5 className="mb-0">
                              {prd.discountPrice > 0
                                ? prd.salePrice -
                                  (prd.salePrice *
                                    prd.discountPrice) /
                                    100
                                : prd.salePrice}{" "}
                              ₼
                              <span className="text-muted fs-12">
                                <del>{prd.salePrice} ₼</del>
                              </span>
                            </h5>
                          ) : (
                            <h5 className="mb-0">{prd.salePrice} ₼</h5>
                          )}
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Row id="search-result-elem">
                <Col lg={12}>
                  <div className="text-center py-5">
                    <div className="avatar-lg mx-auto mb-4">
                      <div className="avatar-title bg-primary-subtle text-primary rounded-circle fs-24">
                        <i className="bi bi-search"></i>
                      </div>
                    </div>

                    <h5>Uyğun nəticə tapılmadı</h5>
                  </div>
                </Col>
              </Row>
            )}
          </Row>
        </Container>
      </section>

      <DefauilOffer />
      <CommonService />
    </>
  );
};

export default withRouter(withTranslation()(Clothing));
