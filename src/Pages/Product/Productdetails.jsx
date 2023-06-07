import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Tab,
  Tooltip,
  Nav,
  Table,
  ProgressBar,
  Breadcrumb,
  Form,
  Image,
  Card,
} from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import SimpleBar from "simplebar-react";
//scss
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";

//components
import {
  descriptionData,
  productInterestedCard,
  productprogress,
  sliderProduct,
} from "../../Common/data";
import { BrandedProduct } from "../../Components/ShopTopBar";
import { CommonService } from "../../Components/CommonService";
import EmailClothe from "../../Pages/Catalog/EmailClothe";
//img
import profileBg from "../../assets/images/profile-bg.jpg";
import avatar5 from "../../assets/images/users/avatar-5.jpg";
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar8 from "../../assets/images/users/avatar-8.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";
const Productdetails = () => {
  const [proDetail, setproDetail] = useState([]);
  const [sliderImg, setSliderImg] = useState([]);
  const [features, setFeatures] = useState([])
  const [count, setCount] = useState(0);
  const { skuId } = useParams();
  console.log(skuId);

  useEffect(() => {
    axios
      .get(
        `http://avontest0910-001-site1.dtempurl.com/api/Products/Manage/ProductGetForSkuId?SkuId=${skuId}`
      )
      .then((res) => {
        setproDetail(res.data.product);
        // console.log(res.data.product);
       axios.get(`http://avontest0910-001-site1.dtempurl.com/api/Products/ProductGetForBaseCode?Code=${res.data.code}`)
       .then(res => {
        console.log(res.data);
        setFeatures(res.data)
       })

        setSliderImg(res.data.product.productImages);
      });
  }, []);

  const handleSetImg = (id) => {
    console.log(id);
    setSliderImg(
      proDetail.productImages.filter((selectImg, index) => index === id)
    );
  };

  //tooltip
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Terms & Conditions
    </Tooltip>
  );

  //like button
  const handleLikeIcone = (event) => {
    if (event.closest("button").classList.contains("active")) {
      event.closest("button").classList.remove("active");
    } else {
      event.closest("button").classList.add("active");
    }
  };
  return (
    <>
      <section
        className="ecommerce-about"
        style={{
          backgroundImage: `url(${proDetail.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-overlay bg-primary" style={{ opacity: "0.85" }} />
        <Container>
          <Row className="justify-content-center">
            <Col lg={6}>
              <div className="text-center">
                <h1 className="text-white mb-0">Product Details</h1>
                <Breadcrumb bsPrefix="breadcrumb breadcrumb-light justify-content-center mt-4">
                  <Breadcrumb.Item href="#">Product</Breadcrumb.Item>
                  <Breadcrumb.Item active aria-current="page">
                    {" "}
                    Product Details{" "}
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </Col>
            {/*end col*/}
          </Row>
          {/*end row*/}
        </Container>
        {/*end container*/}
      </section>
      <section className="section">
        <Container>
          <Row className="gx-2">
            <Col lg={6}>
              <Row>
                <Col md={2}>
                  <div className="swiper productSwiper mb-3 mb-lg-0 swiper-initialized swiper-vertical swiper-pointer-events swiper-free-mode swiper-watch-progress swiper-backface-hidden swiper-thumbs">
                    <div
                      className="swiper-wrapper"
                      id="swiper-wrapper-6100bf53c3db1675b"
                      aria-live="polite"
                      style={{
                        transform: "translate3d(0px, 0px, 0px)",
                        transitionDuration: "0ms",
                      }}
                    >
                      {(proDetail.productImages || [])?.map((item, idx) => {
                        return (
                          <div
                            key={idx}
                            className="swiper-slide swiper-slide-thumb-active swiper-slide-visible swiper-slide-next"
                            role="group"
                            aria-label={`${idx} / ${proDetail.productImages.length} `}
                            style={{ height: "105px", marginBottom: "10px" }}
                          >
                            <div className="product-thumb rounded cursor-pointer">
                              <Image
                                src={item?.image}
                                alt=""
                                fluid
                                onClick={() => handleSetImg(idx)}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <span
                      className="swiper-notification"
                      aria-live="assertive"
                      aria-atomic="true"
                    />
                  </div>
                </Col>
                {/*end col*/}
                <Col md={10}>
                  <div className="bg-light rounded-2 position-relative ribbon-box overflow-hidden">
                    <div className="ribbon ribbon-danger ribbon-shape trending-ribbon">
                      <span className="trending-ribbon-text">Trending</span>
                      <i className="ri-flashlight-fill text-white align-bottom float-end ms-1" />
                    </div>

                    <Swiper
                      // onSwiper={setThumbsSwiper}
                      rewind={true}
                      navigation={true}
                      modules={[FreeMode, Navigation, Thumbs]}
                      className="swiper productSwiper2 swiper-backface-hidden"
                    >
                      {(sliderImg || [])?.map((item, idx) => {
                        return (
                          <SwiperSlide key={idx}>
                            <div
                              className="swiper-slide swiper-slide-duplicate"
                              data-swiper-slide-index={idx}
                              role="group"
                              aria-label={`${idx} / ${proDetail.productImages.length}`}
                              style={{ width: "458px", marginRight: "10px" }}
                            >
                              <Image src={item.image} alt="" fluid />
                            </div>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                </Col>
                {/*end col*/}
                <Col lg={12}>
                  <div className="mt-3">
                    <div className="hstack gap-2">
                      <Button variant="success" className="btn btn-hover w-100">
                        {" "}
                        <i className="bi bi-basket2 me-2" /> Add To Cart
                      </Button>
                      <Button variant="primary" className="btn btn-hover w-100">
                        {" "}
                        <i className="bi bi-cart2 me-2" /> Buy Now
                      </Button>
                      <Button
                        className="btn btn-soft-danger custom-toggle btn-hover"
                        data-bs-toggle="button"
                        aria-pressed="false"
                        onClick={(ele) => handleLikeIcone(ele.target)}
                      >
                        <span className="icon-on">
                          <i className="ri-heart-line" />
                        </span>
                        <span className="icon-off">
                          <i className="ri-heart-fill" />
                        </span>
                      </Button>
                    </div>
                  </div>
                </Col>
                {/*end col*/}
              </Row>
              {/*end row*/}
            </Col>
            {/*end col*/}
            <Col lg={5} className="ms-auto">
              <div className="ecommerce-product-widgets mt-4 mt-lg-0">
                <div className="mb-4">
                  <div className="d-flex gap-3 mb-2">
                    <div className="fs-15 text-warning">
                      {/* {
                                                proDetail.comments.length > 0 ? <span className="float-end">{proDetail.comments.map((retinhg) => retinhg.star).reduce((acc, item) => acc + item, 0) / proDetail.comments.length}:<p>retingi yoxdur</p>
                                                    <i className="ri-star-half-fill text-warning align-bottom"></i>
                                                </span> :
                                                    <span className="float-end">retingi yoxdur
                                                        <i className="ri-star-half-fill text-warning align-bottom"></i>
                                                    </span>
                                                
                                            } */}
                    </div>
                  </div>
                  <h4 className="lh-base mb-1">{proDetail.name}</h4>
                  <p className="text-muted mb-4">{proDetail.description}</p>
                  <h5 className="fs-24 mb-4">
                    {proDetail.salePrice}
                    <span className="text-muted fs-14">
                      <del>
                        {proDetail.salePrice -
                          (proDetail.salePrice * proDetail.discountPrice) / 100}
                      </del>
                    </span>
                    <span className="fs-14 ms-2 text-danger">
                      {" "}
                      ( {proDetail.discountPrice} off)
                    </span>
                  </h5>
                  <ul className="list-unstyled vstack gap-2">
                    <li>
                      {proDetail.inStock == false ? (
                        <div>
                          <i className="bi bi-check2-circle me-2 align-middle text-success" />
                          In stock
                        </div>
                      ) : (
                        <div>
                          <i class="bi bi-x-circle me-2 align-middle text-danger"></i>
                          out of stock
                        </div>
                      )}
                    </li>
                  </ul>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <h5 className="fs-15 mb-0">Quanty:</h5>
                  <div className="input-step ms-2">
                    <Button
                      className="minus"
                      onClick={() => setCount(count - 1)}
                    >
                      –
                    </Button>
                    <Form.Control
                      type="number"
                      className="product-quantity1"
                      value={count > 0 ? count : 0}
                      min={0}
                      max={100}
                      readOnly
                    />
                    <Button
                      className="plus"
                      onClick={() => setCount(count + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <Row className="gy-3">
                  <Col md={6}>
                    <div>
                      <h6 className="fs-14 fw-medium text-muted">
                        {proDetail?.variant?.type == "color"
                          ? "Colors"
                          : proDetail?.variant?.type == "size"
                          ? "Sizes"
                          : proDetail?.variant?.type == "weight"
                          ? "Weights"
                          : "Images"}
                        :
                      </h6>
                      <ul className="clothe-size list-unstyled hstack gap-2 mb-0 flex-wrap">
                      {features.length > 0 ? features.map((feature, index) => (
                          <li key={index}>
                          <Form.Control
                            type="radio"
                            name="sizes"
                            id="product-color-2"
                          />
                          <Form.Label
                            style={{ backgroundColor: feature.colorCode }}
                            className="avatar-xs btn  p-0 d-flex align-items-center justify-content-center rounded-circle"
                            htmlFor="product-color-2"
                          />
                        </li>
                      ) ) : <h1>Cesidi yoxdur</h1>}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            {/*end col*/}
          </Row>
          {/*end row*/}
        </Container>
        {/*end container*/}
      </section>
      <section className="section pt-0">
        <Container>
          <Row>
            <Col lg={12}>
              <Tab.Container
                id="left-tabs-example"
                defaultActiveKey="Description"
              >
                <Row>
                  <Col sm={12}>
                    <Nav variant="tabs" className="nav-tabs-custom mb-3">
                      <Nav.Item as="li">
                        <Nav.Link as="a" eventKey="Description">
                          {" "}
                          Description
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <Nav.Link as="a" eventKey="Ratings">
                          Ratings Reviews
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="Description">
                        <div
                          className="tab-pane active show"
                          id="profile1"
                          role="tabpanel"
                        >
                          <Table className="table-sm table-borderless align-middle">
                            <tbody>
                              {(descriptionData || [])?.map((item, idx) => {
                                return (
                                  <tr key={idx}>
                                    <th>{item.thead}</th>
                                    <td>{item.tdata}</td>
                                  </tr>
                                );
                              })}
                              <tr>
                                <th>Color</th>
                                <td>
                                  <div className="avatar-xs">
                                    <div className="avatar-title rounded" />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                          <p className="text-muted fs-15">
                          {proDetail.description}
                          </p>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Ratings">
                        <div
                          className="tab-pane show"
                          id="profile2"
                          role="tabpanel"
                        >
                          <div>
                            <div className="d-flex flex-wrap gap-4 justify-content-between align-items-center mt-4">
                              <div className="flex-shrink-0">
                                <h5 className="fs-15 mb-3 fw-medium">
                                  Total Rating's
                                </h5>
                                <h2 className="fw-bold mb-3">10.14k</h2>
                                <p className="text-muted mb-0">
                                  Growth in reviews on this year
                                </p>
                              </div>
                              <hr className="vr" />
                              <div className="flex-shrink-0">
                                <h5 className="fs-15 mb-3 fw-medium">
                                  Average Rating
                                </h5>
                                <h2 className="fw-bold mb-3">
                                  5.6
                                  <span className="fs-16 align-middle text-warning ms-2">
                                    <i className="ri-star-fill" />
                                    <i className="ri-star-fill" />
                                    <i className="ri-star-fill" />
                                    <i className="ri-star-fill" />
                                    <i className="ri-star-half-fill" />
                                  </span>
                                </h2>
                                <p className="text-muted mb-0">
                                  Average rating on this year
                                </p>
                              </div>
                              <hr className="vr" />
                              <div className="flex-shrink-0 w-xl">
                                {(productprogress || [])?.map((item, idx) => {
                                  return (
                                    <Row
                                      className="align-items-center g-3 align-items-center mb-2"
                                      key={idx}
                                    >
                                      <Col className="col-auto">
                                        <div>
                                          <h6 className="mb-0 text-muted fs-13">
                                            <i className="ri-star-fill text-warning me-1 align-bottom" />
                                            {item.num}
                                          </h6>
                                        </div>
                                      </Col>
                                      <Col>
                                        <div>
                                          <ProgressBar
                                            now={item.value}
                                            variant={`${item.color}`}
                                            className="progress animated-progress progress-sm"
                                          />
                                        </div>
                                      </Col>
                                      <Col className="col-auto">
                                        <div>
                                          <h6 className="mb-0 text-muted fs-13">
                                            {item.progressnum}
                                          </h6>
                                        </div>
                                      </Col>
                                    </Row>
                                  );
                                })}
                              </div>
                            </div>
                            <SimpleBar
                              className="mt-4"
                              style={{ maxHeight: "350px" }}
                            >
                              <div className="d-flex p-3 border-bottom border-bottom-dashed">
                                <div className="flex-shrink-0 me-3">
                                  <Image
                                    className="avatar-xs"
                                    src={avatar5}
                                    alt=""
                                    roundedCircle
                                  />
                                </div>
                                <div className="flex-grow-1">
                                  <div className="d-flex mb-3">
                                    <div className="flex-grow-1">
                                      <div>
                                        <div className="mb-2 fs-12">
                                          <span>
                                            <i className="ri-star-fill text-warning align-bottom" />
                                          </span>
                                          <span>
                                            <i className="ri-star-fill text-warning align-bottom" />
                                          </span>
                                          <span>
                                            <i className="ri-star-fill text-warning align-bottom" />
                                          </span>
                                          <span>
                                            <i className="ri-star-line text-warning align-bottom" />
                                          </span>
                                          <span>
                                            <i className="ri-star-line text-warning align-bottom" />
                                          </span>
                                        </div>
                                        <h6 className="mb-0">Donald Risher</h6>
                                      </div>
                                    </div>
                                    <div className="flex-shrink-0">
                                      <p className="mb-0 text-muted">
                                        <i className="ri-calendar-event-fill me-2 align-middle" />
                                        Aug 16, 2022
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <h5 className="lh-base fs-15">
                                      Design Quality
                                    </h5>
                                    <p className="mb-0">
                                      " This is an incredible framework worth so
                                      much in the right hands! Nowhere else are
                                      you going to get so much flexibility and
                                      great code for a few dollars. Highly
                                      recommend purchasing today! Like right
                                      now! "
                                    </p>
                                  </div>
                                  <div className="d-flex mt-4">
                                    <div className="flex-shrink-0 me-3">
                                      <Image
                                        className="avatar-xs"
                                        src={avatar1}
                                        alt=""
                                        roundedCircle
                                      />
                                    </div>
                                    <div className="flex-grow-1">
                                      <div className="d-flex mb-3">
                                        <div className="flex-grow-1">
                                          <div>
                                            <h6 className="mb-2">
                                              Jansh Brown
                                            </h6>
                                            <p className="mb-0 text-muted fs-13">
                                              Admin
                                            </p>
                                          </div>
                                        </div>
                                        <div className="flex-shrink-0">
                                          <p className="mb-0 text-muted">
                                            <i className="ri-calendar-event-fill me-2 align-middle" />
                                            Aug 16, 2022
                                          </p>
                                        </div>
                                      </div>
                                      <p className="mb-0">Thank You</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="d-flex p-3 border-bottom border-bottom-dashed">
                                <div className="flex-shrink-0 me-3">
                                  <Image
                                    className="avatar-xs"
                                    src={avatar3}
                                    alt=""
                                    roundedCircle
                                  />
                                </div>
                                <div className="flex-grow-1">
                                  <div className="d-flex mb-3">
                                    <div className="flex-grow-1">
                                      <div>
                                        <div className="mb-2 fs-12">
                                          <span>
                                            <i className="ri-star-fill text-warning align-bottom" />
                                          </span>
                                          <span>
                                            <i className="ri-star-fill text-warning align-bottom" />
                                          </span>
                                          <span>
                                            <i className="ri-star-fill text-warning align-bottom" />
                                          </span>
                                          <span>
                                            <i className="ri-star-fill text-warning align-bottom" />
                                          </span>
                                          <span>
                                            <i className="ri-star-fill text-warning align-bottom" />
                                          </span>
                                        </div>
                                        <h6 className="mb-0">Richard Smith</h6>
                                      </div>
                                    </div>
                                    <div className="flex-shrink-0">
                                      <p className="mb-0 text-muted">
                                        <i className="ri-calendar-event-fill me-2 align-middle" />
                                        Dec 10, 2022
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <h5 className="lh-base fs-15">
                                      Feature Availability
                                    </h5>
                                    <p className="mb-0">
                                      " Hello everyone, I would like to suggest
                                      here two contents that you could create.
                                      Course pages and blog pages. In them you
                                      could insert the listing and management of
                                      courses and listing and management of
                                      blog. The theme is perfect, one of the
                                      best purchases I've ever made. "
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="d-flex p-3 border-bottom border-bottom-dashed mb-3">
                                <div className="flex-shrink-0 me-3">
                                  <Image
                                    className="avatar-xs"
                                    src={avatar8}
                                    alt=""
                                    roundedCircle
                                  />
                                </div>
                                <div className="flex-grow-1">
                                  <div className="d-flex mb-3">
                                    <div className="flex-grow-1">
                                      <div>
                                        <div className="mb-2 fs-12">
                                          <span>
                                            <i className="ri-star-fill text-warning align-bottom" />
                                          </span>
                                          <span>
                                            <i className="ri-star-fill text-warning align-bottom" />
                                          </span>
                                          <span>
                                            <i className="ri-star-fill text-warning align-bottom" />
                                          </span>
                                          <span>
                                            <i className="ri-star-half-fill text-warning align-bottom" />
                                          </span>
                                          <span>
                                            <i className="ri-star-line text-warning align-bottom" />
                                          </span>
                                        </div>
                                        <h6 className="mb-0">Pauline Moll</h6>
                                      </div>
                                    </div>
                                    <div className="flex-shrink-0">
                                      <p className="mb-0 text-muted">
                                        <i className="ri-calendar-event-fill me-2 align-middle" />
                                        Aug 16, 2022
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <h5 className="lh-base fs-15">
                                      Design Quality
                                    </h5>
                                    <p className="mb-0">
                                      "We have used your other templates as well
                                      and seems it's amazing with the design and
                                      code quality. Wish you best for the future
                                      updates. Keep updated you will be #1 in
                                      near future. "
                                    </p>
                                  </div>
                                  <div className="d-flex mt-4">
                                    <div className="flex-shrink-0 me-3">
                                      <Image
                                        className="avatar-xs"
                                        src={avatar1}
                                        alt=""
                                        roundedCircle
                                      />
                                    </div>
                                    <div className="flex-grow-1">
                                      <div className="d-flex mb-3">
                                        <div className="flex-grow-1">
                                          <div>
                                            <h6 className="mb-2">
                                              Jansh Brown
                                            </h6>
                                            <p className="mb-0 text-muted fs-13">
                                              Admin
                                            </p>
                                          </div>
                                        </div>
                                        <div className="flex-shrink-0">
                                          <p className="mb-0 text-muted">
                                            <i className="ri-calendar-event-fill me-2 align-middle" />
                                            Aug 16, 2022
                                          </p>
                                        </div>
                                      </div>
                                      <p className="mb-0">Thank You</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </SimpleBar>

                            <div className="pt-3">
                              <h5 className="fs-18">Add a Review</h5>
                              <div>
                                <Form action="#">
                                  <div className="d-flex align-items-center mb-3">
                                    <span className="fs-14">Your rating:</span>
                                    <div className="ms-3">
                                      <span className="fs-14">
                                        <i className="ri-star-fill text-warning align-bottom" />
                                      </span>
                                      <span className="fs-14">
                                        <i className="ri-star-fill text-warning align-bottom" />
                                      </span>
                                      <span className="fs-14">
                                        <i className="ri-star-fill text-warning align-bottom" />
                                      </span>
                                      <span className="fs-14">
                                        <i className="ri-star-fill text-warning align-bottom" />
                                      </span>
                                      <span className="fs-14">
                                        <i className="ri-star-half-fill text-warning align-bottom" />
                                      </span>
                                    </div>
                                  </div>
                                  <div className="mb-3">
                                    <Form.Control
                                      name="your-name"
                                      placeholder="Title"
                                      type="text"
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <Form.Control
                                      as="textarea"
                                      name="your-commemt"
                                      placeholder="Enter your comments & reviews"
                                      rows={4}
                                      defaultValue={""}
                                    />
                                  </div>
                                  <div className="text-end">
                                    <Button
                                      variant="primary"
                                      className="btn-hover"
                                      type="submit"
                                      value="Submit"
                                    >
                                      Send Review
                                      <i className="ri-send-plane-2-line align-bottom ms-1" />
                                    </Button>
                                  </div>
                                </Form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Col>
            {/*end col*/}
          </Row>
          {/*end row*/}
        </Container>
      </section>

      <div className="position-relative">
        <Container>
          <Row>
            <Col lg={12}>
              <h4 className="mb-4">You might be interested in</h4>
            </Col>
          </Row>
          <Row className="gy-3">
            {(productInterestedCard || [])?.map((item, idx) => {
              return (
                <Col lg={4} key={idx}>
                  <Card
                    as="a"
                    href="/products-grid/right"
                    className="card mb-3 card-animate stretched-link"
                  >
                    <Row className="g-0">
                      <Col sm={4}>
                        <Image
                          src={item.img}
                          className="rounded-start h-100 object-fit-cover"
                          alt="..."
                          fluid
                        />
                      </Col>
                      <Col sm={8}>
                        <Card.Body className="h-100 d-flex flex-column">
                          <h4 className={item.class}>{item.title}</h4>
                          <p className="card-text text-muted">{item.dic}</p>
                          <div className="mt-auto">
                            <div className={`btn btn-soft-${item.bg} btn-sm`}>
                              Shop Now
                            </div>
                          </div>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
      <BrandedProduct title="Similar Products" />
      <EmailClothe />
      <CommonService />
    </>
  );
};

export default Productdetails;
